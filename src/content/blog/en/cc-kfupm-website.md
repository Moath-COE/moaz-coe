---
title: 'Building the Computer Club website at KFUPM'
description: 'A bilingual club website and members dashboard built by a small student team with Next.js, tRPC and Prisma, and the parts of it I built.'
locale: en
pubDate: 2026-10-18
kind: project
tags: ['Next.js', 'TypeScript', 'Case study']
draft: true
---

<!-- TODO: Review every section, replace the TODO notes, then set draft: false. Facts below come from the Razorback360/CC_Website repository. -->

In the 2023–24 academic year I joined a small team of students building a new website for the Computer Club at King Fahd University of Petroleum and Minerals (KFUPM). The club needed two things at once: a public face for students, and a back office for the people running it.

<!-- TODO: Your role in the club, and how you joined the project. -->

## Two sites in one

**The public side** introduced the club and its events. Each event had its own page with posters, photos and documents. Visitors on phones went straight to a page with the club's official accounts.

**The dashboard** was for club administrators. It had three areas:

- an **overview** of what's coming up and what changed recently,
- **events**, organised by semester and category, each either public or members-only, with attachments,
- **members**, with roles (admin or member) and the ability to enable or disable accounts.

Sign-in used KFUPM's Microsoft accounts. A university account alone wasn't enough, though: in production only members already registered and enabled in the dashboard could get in.

## The stack

The site was a [T3 app](https://create.t3.gg/): Next.js 13, TypeScript, tRPC, Prisma with PostgreSQL, and NextAuth, with Supabase storage for images and files. The interface used Tailwind CSS and shadcn/ui, and next-i18next for English and Arabic.

The value of this stack is that types run end to end. The database schema defines the shape of an event once, and the API and the interface inherit it without a separate client to keep in sync:

```prisma
model Event {
    id          String   @id @default(cuid())
    title       String
    description String   @db.Text
    date        DateTime
    public      Boolean  @default(true)

    Organizers  User[]
    Attachments Attachment[]

    Semester   Semester @relation(fields: [semesterId], references: [id], onDelete: Cascade)
    semesterId String

    Category   EventCategory @relation(fields: [categoryId], references: [id], onDelete: Cascade)
    categoryId String

    link String @db.Text
}
```

The schema also keeps a log of system updates (events created, edited or deleted, members added or changed), which is what made a "recent updates" feed on the dashboard straightforward to build.

## My part

My work was mostly on the dashboard's interface and on mobile layouts, across 18 commits between November 2023 and February 2024:

- **Members page**: the member cards and the search bar.
- **Dashboard sidebar**: navigation that adapts to small screens.
- **Overview**: the quick-view bar, the upcoming-events panel and the recent-updates feed.
- **Responsive landing page**: mobile support for the hero section, plus fixes for awkward sizes such as iPad portrait.

Everything went through pull requests reviewed by teammates, and formatting was enforced by Prettier in CI.

<!-- TODO: Credit the team by name if they're happy to be named (GitHub: Razorback360, SauceX22, AbdulellahAlamer). -->

## What I learned

- **A shared component library speeds up a student team.** With shadcn/ui as the common base, new dashboard panels looked consistent from the start, whoever built them.
- **"Responsive" lives in the in-between sizes.** Phones and desktops were easy; tablets in portrait were where layouts broke.
- **Model the history, not just the state.** Logging changes as data gave the dashboard an activity feed almost for free.

<!-- TODO: Add your own lessons. -->

## Where it is now

Development wound down in March 2024, and the site is no longer online. The code is on GitHub at [Razorback360/CC_Website](https://github.com/Razorback360/CC_Website).

<!-- TODO: Confirm the status, and add screenshots if you have them (public/images/cc-kfupm/, then set heroImage). -->
