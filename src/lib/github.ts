import { execFileSync } from 'node:child_process';

export interface ContributionDay { date: string; count: number; level: 0 | 1 | 2 | 3 | 4 }
export interface PinnedRepo {
	name: string;
	owner: string;
	description: string | null;
	url: string;
	stars: number;
	forks: number;
	language: string | null;
}
export interface GitHubProfile {
	url: string;
	total: number;
	weeks: ContributionDay[][];
	pinned: PinnedRepo[];
}

const levels = { NONE: 0, FIRST_QUARTILE: 1, SECOND_QUARTILE: 2, THIRD_QUARTILE: 3, FOURTH_QUARTILE: 4 } as const;

const query = `query($login: String!) {
	user(login: $login) {
		url
		contributionsCollection {
			contributionCalendar {
				totalContributions
				weeks { contributionDays { date contributionCount contributionLevel } }
			}
		}
		pinnedItems(first: 6, types: REPOSITORY) {
			nodes { ... on Repository { name description url stargazerCount forkCount owner { login } primaryLanguage { name } } }
		}
	}
}`;

// CI provides GITHUB_TOKEN; locally, fall back to the GitHub CLI login.
function token(): string | undefined {
	const fromEnv = process.env.GITHUB_TOKEN || process.env.GH_TOKEN;
	if (fromEnv) return fromEnv;
	try {
		return execFileSync('gh', ['auth', 'token'], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim() || undefined;
	} catch {
		return undefined;
	}
}

async function fetchProfile(login: string): Promise<GitHubProfile | undefined> {
	const auth = token();
	if (!auth) {
		console.warn('[github] No token found; skipping the GitHub section.');
		return undefined;
	}
	try {
		const response = await fetch('https://api.github.com/graphql', {
			method: 'POST',
			headers: { Authorization: `bearer ${auth}`, 'Content-Type': 'application/json', 'User-Agent': 'moaz-coe-blog' },
			body: JSON.stringify({ query, variables: { login } }),
		});
		const { data, errors } = await response.json();
		if (!response.ok || errors || !data?.user) throw new Error(errors?.[0]?.message ?? `HTTP ${response.status}`);
		const { user } = data;
		const calendar = user.contributionsCollection.contributionCalendar;
		return {
			url: user.url,
			total: calendar.totalContributions,
			weeks: calendar.weeks.map((week: any) => week.contributionDays.map((day: any) => ({
				date: day.date,
				count: day.contributionCount,
				level: levels[day.contributionLevel as keyof typeof levels] ?? 0,
			}))),
			pinned: user.pinnedItems.nodes.map((repo: any) => ({
				name: repo.name,
				owner: repo.owner.login,
				description: repo.description,
				url: repo.url,
				stars: repo.stargazerCount,
				forks: repo.forkCount,
				language: repo.primaryLanguage?.name ?? null,
			})),
		};
	} catch (error) {
		console.warn(`[github] Could not load ${login}: ${(error as Error).message}`);
		return undefined;
	}
}

// One request per build, shared by the Arabic and English home pages.
const cache = new Map<string, Promise<GitHubProfile | undefined>>();
export function githubProfile(login: string): Promise<GitHubProfile | undefined> {
	if (!cache.has(login)) cache.set(login, fetchProfile(login));
	return cache.get(login)!;
}
