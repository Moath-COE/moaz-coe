---
name: translate-post
description: Translate a blog post into the blog's other language (Arabic to English, or English to Arabic) and save it under the same file name in the other folder. Use when asked to translate a post, create the Arabic or English version of a post, or bring a translation up to date after the original changed.
---
# Translate a post

Create or update the other-language version of one post. Arabic posts live in `ar/`, English posts in `en/`, and the two versions of a post share the same file name (that's how the site links them).

## 1. Identify the source and target

- The source is the post the user names, or the note open in Obsidian if they don't name one. If it's ambiguous, ask.
- Read its frontmatter: `locale: ar` translates to English, `locale: en` translates to Arabic. If `locale` and the folder disagree, stop and point it out.
- The target is the same file name in the other folder: `ar/hakamony.md` ↔ `en/hakamony.md`.
- **If the target already exists**, don't overwrite it wholesale. Compare the two versions, translate only what's new or changed in the source, keep the target's existing wording where it's still accurate, and summarise what you updated. If the target has content the source lacks, ask before removing it.

## 2. Learn the house style first

Before translating, read one or two published posts that exist in both languages (e.g. `ar/hakamony.md` and `en/hakamony.md`) to match tone, terminology and formatting. Also collect the tags already used in the target folder, so you can reuse them.

## 3. Frontmatter

| Field | What to do |
| --- | --- |
| `title`, `description` | Translate. Keep the description to about 120 to 160 characters in the target language. |
| `locale` | Switch to the target language. |
| `tags` | Use the matching tag already used in the target folder (`Case study` ↔ `دراسة حالة`, `Frontend` ↔ `الواجهات`, `Product` ↔ `منتج`). Names of technologies stay as they are (`Next.js`, `RAG`). Only create a new tag if no existing one fits, and say so. |
| `pubDate`, `updatedDate`, `kind`, `heroImage` | Copy exactly. `kind` is a code value, never translate it. |
| `draft` | Set `draft: true` on a new translation so the user can review it, and say so. When updating an existing translation, keep its current value. |

## 4. Body

Translate the meaning, not the words. The result should read as if it had been written in the target language by the same author: first person, plain, direct and specific. Restructure sentences freely, but keep every fact, number, caveat and section.

Keep these unchanged:

- Code blocks and their language tags, inline code, file paths, commands, URLs and Markdown/HTML structure.
- Comments inside code. They stay as the author wrote them.
- Image paths (`../_assets/...`), footnote labels (`[^1]`), table structure and alignment markers.
- Names of products, libraries, companies, people and GitHub accounts.

Translate these:

- Headings (keep the same levels), paragraphs, list items, table cells, blockquotes, footnote text.
- Image **alt text** and **captions** (the quoted title in `![alt](path "caption")`).
- `<abbr title="…">`, `<summary>`, `<dt>`, `<dd>` text, and link text (not the URL).
- HTML comments, including `<!-- TODO: … -->` notes, so the user can still act on them.

Adjust these:

- Links to the blog's own posts: `/blog/<name>/` (Arabic) ↔ `/en/blog/<name>/` (English). Check the target-language post exists; if it doesn't, keep the link pointing at the source-language post and mention it.
- Project names that have a form in each language: use the one the existing posts use (e.g. «حكموني» ↔ Hakamony). If unsure, keep the original and flag it.
- Units, dates and punctuation, following the rules below.

## 5. Language rules

**Into Arabic**
- Natural Modern Standard Arabic for a technical reader, never a word-for-word rendering of English.
- Use the common Arabic term for technical concepts, adding the English in parentheses the first time when a reader might search for it: «مكونات الخادم (Server Components)». Keep product and library names in Latin script.
- Arabic punctuation: «،» «؛» «؟», and quotation marks «…». Western digits (2024، 40%).
- When a sentence or list item starts with a Latin word, prefix it with an RLM character (U+200F), as in `‏Next.js 13 وTypeScript`. Join و directly to the next word, including Latin ones: «وPrisma».
- Proofread hamzat, ة/ه and ى/ي before saving.

**Into English**
- Plain, idiomatic English with British spelling (organised, colour, centre), sentence-case titles and headings, and no serial comma.
- Expand Arabic rhetorical patterns into direct English sentences; don't carry over doubled synonyms or long chains joined with "and".
- Remove the parenthetical English glosses the Arabic used for technical terms; just use the English term.

## 6. Check before saving

- Frontmatter is valid YAML, `locale` matches the target folder, and every field from the source is present.
- Same number of headings, code blocks, images, tables and footnotes as the source.
- No Obsidian-only syntax (wikilinks, embeds, callouts, `==highlights==`).
- Read the translation once straight through, as a reader would, and fix anything that sounds translated.

## 7. Report

Tell the user, briefly:

- the file written (new or updated) and its `draft` status,
- terms or names you weren't sure about, with the choice you made,
- any tag you created, links you couldn't localize, and TODOs carried over.
