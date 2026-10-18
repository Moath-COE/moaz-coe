---
title: "Mock post: shipping a support assistant with RAG"
description: "A sample case study that uses every element a post can contain, so you can see how the design handles each one."
locale: en
pubDate: 2026-10-14
updatedDate: 2026-10-16
heroImage: "/images/mock/hero.jpg"
kind: project
tags: ["RAG", "Case study", "Mock"]
draft: true
---

This is a **mock post**. It exists to show how every element looks on the page, so the content is realistic but invented. It covers _emphasis_, [links](https://docs.astro.build), `inline code`, ~~struck text~~, a <mark>highlighted phrase</mark>, a keyboard shortcut like <kbd>Ctrl</kbd> + <kbd>K</kbd>, and an abbreviation such as <abbr title="Retrieval-augmented generation">RAG</abbr>.

The client wanted one thing: answer customer questions in Arabic and English from their own help centre, without making things up. Here is how we got there.

## The problem

Support tickets had grown 40% in a year while the team stayed the same size. Most questions were already answered somewhere in 600 help articles, but customers could not find them.

### What success looked like

We agreed on three measurable goals before writing any code:

1. Deflect at least 30% of incoming tickets
2. Keep wrong answers under 2% on a fixed evaluation set
3. Respond in under three seconds at the 95th percentile

### Constraints

- Arabic and English, often mixed in one message
- No customer data leaves the client's cloud region
- A budget ceiling per conversation
  - Including retrieval and model calls
  - Excluding human escalation

## Architecture

<figure>
  <img src="/images/mock/pipeline.svg" alt="Pipeline: query to retriever to reranker to LLM to answer, with a vector store feeding the retriever and an eval set checking the reranker and LLM" />
  <figcaption>Figure 1. The request path. The evaluation set checks both the reranker and the final answer.</figcaption>
</figure>

Retrieval is hybrid: keyword search catches product names and error codes, while embeddings catch paraphrases. A reranker then keeps the five best passages out of fifty.

#### A note on chunking

Help articles were split on headings rather than fixed token windows. This kept each chunk about one task, which made citations far more useful.

```python
def recall_at_k(results: list[Doc], expected: set[str], k: int = 5) -> float:
    """Share of expected sources found in the top k results."""
    hits = sum(1 for doc in results[:k] if doc.id in expected)
    return hits / len(expected)
```

The indexing job runs nightly:

```bash
uv run python -m pipeline.index --source help-centre --locale ar,en --rebuild
```

And each answer is logged with its sources so we can audit it later:

```json
{
  "question": "How do I reset my password?",
  "sources": ["kb-112", "kb-087"],
  "latency_ms": 1840,
  "grounded": true
}
```

> The model was never the hard part. Deciding what "a correct answer" means, and measuring it every day, was.
>
> — Note from the project retrospective

## Results

After six weeks in production:

| Metric                   | Before |  After |       Change |
| ------------------------ | -----: | -----: | -----------: |
| Tickets per week         |  2,400 |  1,560 |         −35% |
| Median first response    |    4 h |  2.1 s |            — |
| Wrong answers (eval set) |      — |   1.4% | under target |
| Cost per conversation    |      — | $0.018 | under budget |

The business case came down to one line: the assistant cost less per month than a single additional support hire, and it answered at night.[^1]

![The cover image again, shown here as a standard Markdown image inside the text column.](/images/mock/hero.jpg)

---

## What I would do differently

- [x] Build the evaluation set before choosing a model
- [x] Log every answer with its sources from day one
- [ ] Involve the support team in writing test questions earlier
- [ ] Budget time for Arabic dialect handling, not just Modern Standard Arabic

<details>
  <summary>Why not fine-tune instead?</summary>
  <p>The help centre changes weekly. Retrieval picks up new articles overnight, while fine-tuning would need a new training run for every change, and it would still not cite its sources.</p>
</details>

### Glossary

<dl>
  <dt>Deflection rate</dt>
  <dd>The share of conversations resolved without a human agent.</dd>
  <dt>Grounded answer</dt>
  <dd>An answer whose claims can all be traced to a retrieved source.</dd>
</dl>

That's every element. Delete this post (`src/content/blog/en/mock-post.md`) or set `draft: true` before you publish the site.[^2]

[^1]: Monthly cost comparison based on the client's own figures, not general market rates.

[^2]: The Arabic version lives at `src/content/blog/ar/mock-post.md`.
