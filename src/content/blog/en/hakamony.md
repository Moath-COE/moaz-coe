---
title: 'Hakamony: organising pickup games without the group-chat chaos'
description: 'How four of us built an Arabic, mobile-first web app that splits players into teams, schedules matches across fields, and divides the bill — in one summer.'
locale: en
pubDate: 2026-10-18
kind: project
tags: ['Next.js', 'Product', 'Case study']
draft: true
---

<!-- TODO: Review every section, replace the TODO notes, then set draft: false. Facts below come from the Hakamony/source repository. -->

Anyone who has organised a Friday football game knows the routine: a long list of names in a group chat, an argument about fair teams, someone keeping score on their phone, and an awkward conversation about who owes what for the pitch. [Hakamony](https://hakamony.vercel.app/) turns that routine into a few taps.

It is an Arabic, mobile-first web app for organising pickup games of football, volleyball and padel. In the summer of 2024, four of us built it from an empty repository to version 1.0 in about five weeks.

<!-- TODO: One or two sentences on where the idea came from (your own games? friends?) and what "Hakamony" means to you. -->

## What it does

An organiser moves through one short flow:

1. **Choose the event**: sport, number of fields, and the total cost of the booking.
2. **Add players**: type them in, or import a saved list as a JSON file and export it again for next week.
3. **Generate teams**: by maximum team size or by number of teams. Each team gets an Arabic name and a star rating from its players' average level.
4. **Play**: a round-robin schedule where every team meets every other team once, spread across the available fields. When a match ends, the next one starts on the free field.
5. **See the results**: wins, losses, points (three per win), match history, and the cost per player.

## How we built it

Hakamony is a [Next.js 14](https://nextjs.org/) App Router project written in JavaScript and styled with Tailwind CSS. We made one deliberate simplification: **there is no backend**. Every event, team and match lives in the browser's `localStorage`, behind small storage modules that validate what they read and write.

For a first version that was the right trade. Organisers don't need an account, there is nothing to host or secure, and we could spend our five weeks on the flow instead of on servers. The cost is that an event lives on one phone. Sharing results is the obvious next step.

The whole interface is right-to-left Arabic, with a layout capped at phone width, because that is where it gets used: standing next to a pitch.

## My part

I started the repository and acted as the project's maintainer:

- **Setup and standards**: project structure, the Tailwind theme, ESLint with the Airbnb style guide, and Prettier.
- **Delivery**: GitHub Actions workflows that deploy the `dev` branch to a preview environment and `main` to production on Vercel.
- **Planning**: I broke the work into issues and reviewed and merged most of the 88 pull requests.
- **Features**: most of the interface and page logic, including the event summary, the live event dashboard, game settings, the field cards, player editing, match history, ending matches, the stats page and the cost split.

The production deployment is a short workflow that builds once with the Vercel CLI and ships the prebuilt output:

```yaml
on:
  push:
    branches: [main]

jobs:
  Deploy-Production:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - run: npm install --global vercel
      - run: vercel pull --yes --environment=production --token=${{ secrets.VERCEL_TOKEN }}
      - run: vercel build --prod --token=${{ secrets.VERCEL_TOKEN }}
      - run: vercel deploy --prebuilt --prod --token=${{ secrets.VERCEL_TOKEN }}
```

My teammates owned the core algorithms, the storage layer, and player import and export.

<!-- TODO: Credit your teammates by name if they're happy to be named (GitHub: Yousef-Div123, AHMED11178, BTMK1). -->

## What I learned

- **Process is a feature on a short timeline.** Branch protection, a shared style guide and small pull requests meant four people could work in parallel without breaking `main`.
- **Cutting the backend was a product decision, not just a technical one.** It removed sign-up friction at exactly the moment people least want it.
- **Fairness is subjective.** A random shuffle with ratings is a good start, but organisers immediately ask for more control, which is why "winner stays", captains and a points calculator are next on the list.

<!-- TODO: Add your own lessons, and any real feedback or usage you saw. -->

## What's next

Several features are designed but not built yet: winner-stays and random-challenge modes, team captains, and a points calculator.

<!-- TODO: Is development continuing? Add screenshots (put them in public/images/hakamony/ and set heroImage: '/images/hakamony/cover.jpg'). -->

The code is on GitHub at [Hakamony/source](https://github.com/Hakamony/source), and you can try the app at [hakamony.vercel.app](https://hakamony.vercel.app/).
