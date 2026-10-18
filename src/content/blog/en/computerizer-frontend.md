---
title: "Computerizer: building the frontend for a PC-building site, twice"
description: "A PC-building helper with a guided build tool, price comparison and a blog. How its frontend went from Django templates to a Next.js rewrite, and what an unfinished project taught me."
locale: en
pubDate: 2026-10-18
kind: project
tags: ["Next.js", "Frontend", "Case study"]
draft: false
---

<!-- TODO: Review every section, replace the TODO notes, then set draft: false. Facts below come from the public Computerizer/React-Frontend and Computerizer/Backend repositories. -->

Building your first PC is a maze of compatibility charts, benchmark videos and price tabs. Computerizer set out to be the one place that walks you through it: tell it your budget and what you want to play, and it suggests a build and finds the cheapest place to buy each part.

I was the frontend developer on a small team. Over about a year, the frontend went through two very different versions.

<!-- TODO: How did the team come together, and what was your role or title? -->

## The product

Computerizer had three parts:

- **A build tool.** A guided wizard asks for your budget, your target frame rate and resolution, and then the look you want: form factor, case colour and whether you want RGB lighting. It ends with a suggested build and a "Buy it now" step.
- **Price comparison.** The Django backend tracks parts on Amazon and Newegg and keeps a link to the lowest price for each one.
- **A blog.** Reviews, tutorials, part guides and software, so beginners could learn while they build.

## Version one: Django templates

The first frontend lived inside the Django backend as server-rendered templates. Between October and December 2022 I built its pages: sign-up, sign-in and newsletter subscription, the about page, the recent-posts page and the parts section, with form validation along the way.

Living inside the backend meant one deployment, but it also tied every frontend change to the backend repository. <!-- TODO: Was this why you moved to a separate frontend? -->

## Version two: a Next.js rewrite

In mid-2023 I rewrote the frontend as a separate [Next.js 13](https://nextjs.org/) App Router project, styled with Tailwind CSS and talking to the backend's REST API. I was its only committer.

The App Router suited a content-heavy site. Blog pages are async Server Components that fetch directly from the API, so a post arrives as rendered HTML:

```js
const fetchRecents = async () => {
  const res = await fetch(baseURL + "blog/recent-posts/5/1");
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }
  return res.json();
};
```

A few routing features did real work:

- **Route groups** kept blog posts at clean URLs (`/blog/[postTitle]`) while sharing a layout.
- **`loading.jsx`** gave the blog an instant skeleton while posts streamed in.
- **Parallel and intercepting routes** were meant to open sign-in as a modal over the current page, with `/userAuth` still working as a full page. This was the one piece I never got working reliably, and I left it switched off.

The build tool is a client-side, three-step wizard with its own layout.

## Where it stopped

Development stopped at the end of 2023, before launch. The wizard still ran on sample data, the API address pointed at a local server, and some pages still had placeholder copy.

<!-- TODO: Why did the project stop? Is any part of it live? -->

## What I learned

- **The interface was never the hard part.** A good build tool depends on recommendation logic and fresh price data. Agreeing on that contract with the backend early would have unblocked the wizard much sooner.
- **Rewrites need a finish line.** Moving to Next.js gave us a better foundation, but it also reset progress. Next time I would ship the rewrite page by page instead of all at once.
- **Use new framework features where they earn their place.** Server Components and loading states paid off immediately. Intercepting routes took a lot of effort for a modal the site didn't need yet.

<!-- TODO: Add your own reflections, and screenshots if you have them (_assets/computerizer/, then set heroImage). -->

The code is public: [Computerizer/React-Frontend](https://github.com/Computerizer/React-Frontend) for the Next.js frontend, and [Computerizer/Backend](https://github.com/Computerizer/Backend) for the Django backend and the template-based first version.

<!-- TODO: Credit the backend team if they're happy to be named. -->
