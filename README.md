# Bilingual blog

A minimal, bilingual Astro blog for writing in Arabic and English, styled after illuminated manuscripts: cool paper, deep ink, lapis blue and a touch of gold, with light and dark themes. Arabic is at `/`; English is at `/en/`. Blog listings start empty until you publish a post. Markdown and MDX are supported.

## Start writing

1. Install dependencies with `pnpm install` and run `pnpm dev`.
2. Copy an existing post in `src/content/blog/ar/` or `src/content/blog/en/` (for example `hakamony.md`) to a descriptive filename in the same folder, such as `my-first-post.md`. `mock-post.md` shows every formatting element available. The filename becomes the post's URL: `/blog/my-first-post/` or `/en/blog/my-first-post/`.
3. Edit the frontmatter and write below the second `---`. Set `pubDate` to your publication date in `YYYY-MM-DD` format. Keep `locale: ar` or `locale: en` matched to the folder. Set `tags: []` or add topic names (e.g. `tags: ['Writing']`). Optionally set `kind: engineering`, `kind: business` or `kind: project` to show an Engineering / Business / Case study badge. `heroImage` is optional; see [Images](#images).
4. Keep `draft: true` while working. Change it to `draft: false` to publish. Drafts never appear on the site, in tags, or in RSS, even during development.

You can write an article in only one language. For posts translated under the **same filename**, the language switcher links directly to the matching article. For different translated filenames, add a mapping to `src/i18n/routes.ts`. Without a translation, the switcher takes readers to the other language's blog index.

Edit your intro and About content in `src/pages/index.astro`, `src/pages/en/index.astro`, `src/pages/about.astro`, and `src/pages/en/about.astro`. Edit navigation and translated interface strings in `src/i18n/ui.ts`.

## Images

Keep post images in `src/content/blog/_assets/`, in a folder per post (e.g. `_assets/my-post/`). Both language versions of a post can use the same files. Link them with a path relative to the post:

- Cover image, in the frontmatter: `heroImage: ../_assets/my-post/cover.jpg`. It is shown at the top of the post and used as the preview when the link is shared. About 1600×800 works best.
- In the text: `![What the image shows](../_assets/my-post/screen.png)`.
- With a caption, as a wide figure: `![What the image shows](../_assets/my-post/diagram.svg "Figure 1. The caption.")`.

The build resizes these images and converts them to WebP, so you can add full-size screenshots and photos. Files in `public/` are served as they are, without optimization; use it only for files that need a fixed URL, such as the favicon or your photo.

## Writing in Obsidian

`src/content/blog` is set up as an [Obsidian](https://obsidian.md) vault: in Obsidian, choose **Open folder as vault** and pick that folder. The shared settings in `.obsidian/app.json` already make Obsidian write standard Markdown links with relative paths (instead of `[[wikilinks]]`) and save pasted or dropped images to `_assets/`. Move them into the post's folder afterwards; Obsidian updates the link.

- **New posts:** enable the core **Templates** plugin and insert `_templates/post.md` (the templates folder is already set). Name the file in kebab-case, since it becomes the URL.
- **Image names:** pasted screenshots are named like `Pasted image 2026….png`. Rename them to something descriptive, or use the "Paste image rename" community plugin.
- **Obsidian-only syntax** doesn't render on the site: wikilinks, embeds (`![[…]]`), callouts (`> [!note]`), `==highlights==` (use `<mark>`) and `%%comments%%` (use `<!-- -->`).
- Your personal Obsidian state (open tabs, plugins, theme) stays out of git; only `app.json` and `templates.json` are committed.

## Configuration

- **Profile:** `src/i18n/sections.ts` holds your profile links (`social`: LinkedIn, GitHub, YouTube, X — shown on the home page and in the footer, hidden when empty), the site title, description, your name, role, photo path (`public/me.jpeg`), the three "What I write about" topics on the home page, the skills list on the About page, and an optional contact address (the contact link appears only when you provide one).
- **Public URL:** `https://moaz-coe.com/`, set in `astro.config.mjs` (see Deployment). This controls canonical URLs, sitemap and RSS links.
- **Visual identity:** colors are tokens at the top of `src/styles/global.css` (`--lapis` is the accent, `--gold` is for ornament only), and `--wide`, `--measure` and `--margin` control the layout widths. The logo, a square-Kufic م inside an eight-pointed star medallion, is in `src/components/Mark.astro` (also `public/favicon.svg`). Headings use Reem Kufi (Arabic) and Bricolage Grotesque (English), body text uses IBM Plex Sans Arabic / IBM Plex Sans, and small labels use IBM Plex Mono. All fonts are self-hosted via Fontsource.

## GitHub activity

The home page shows your GitHub contribution heatmap and pinned repositories, fetched once at build time. Set your username as `github` in `src/i18n/sections.ts`, or remove it to hide the section. Locally the build uses your GitHub CLI login (`gh auth login`); in GitHub Actions it uses the workflow's `GITHUB_TOKEN`. If no token is available or the request fails, the section is simply left out. The data only changes when the site is rebuilt, so enable the daily `schedule` in the deploy workflow to keep it current.

## Deployment

The site deploys to GitHub Pages at https://moaz-coe.com from the `Moath-COE/moaz-coe` repository. `.github/workflows/deploy.yml` builds and deploys on every push to `main`, once a day (to refresh the GitHub activity), and on demand from the Actions tab.

- In the repository's **Settings → Pages**, the source must be **GitHub Actions** and the custom domain `moaz-coe.com` (also kept in `public/CNAME`).
- The site address defaults to `https://moaz-coe.com/` in `astro.config.mjs`. The optional Actions variables `SITE_URL` and `SITE_BASE` override it, e.g. to serve from `https://moath-coe.github.io/repository/` (`SITE_URL=https://moath-coe.github.io`, `SITE_BASE=/repository`).
- DNS is managed in Cloudflare: four `A` records (and `AAAA` records) for `@` pointing at GitHub Pages, and a `CNAME` for `www` to `moath-coe.github.io`. Keep them on **DNS only** (grey cloud); with Cloudflare's proxy on, GitHub can't issue the HTTPS certificate.

See the [Astro GitHub Pages guide](https://docs.astro.build/en/guides/deploy/github/) for more.

## Commands

| Command | Purpose |
| --- | --- |
| `pnpm dev` | Local preview at `localhost:4321` |
| `pnpm build` | Type-check and generate the static site in `dist/` |
| `pnpm preview` | Preview the generated site |

The site uses Astro's [content collections](https://docs.astro.build/en/guides/content-collections/) and [i18n routing](https://docs.astro.build/en/guides/internationalization/). The original AstroLingo theme is by [José Bolaños](https://github.com/jbolns/astrolingo); the original MIT license remains in `LICENSE`.
