# Chaewan Chun — academic website

Source for [chaewan51.github.io](https://chaewan51.github.io), built with Jekyll and the Academic Pages theme.

## Content map

- `_pages/about.md` — homepage biography, updates, and selected publications
- `_pages/publications.html` — complete publication list
- `_pages/awards.md` — awards and grants
- `_publications/` — one metadata file per publication
- `_data/navigation.yml` — header links
- `_config.yml` — site metadata, profile links, and build settings
- `files/` — CV and paper PDFs
- `images/` — profile image and site icons

Publication metadata is rendered by `_includes/publication-list.html`, so the homepage and Publications page stay consistent automatically.

## Add a publication

Create a file in `_publications/` with front matter like:

```yaml
---
title: "Paper title"
authors: "Author One, Chaewan Chun, and Author Three"
venue: "Conference or journal"
abbr: "VENUE"
date: 2026-01-01
selected: true
pdf: "/files/papers/paper.pdf"
---
```

Set `selected: true` to include it on the homepage. Every publication appears on `/publications/`.

## Preview locally

With Ruby and Bundler installed:

```sh
bundle install
bundle exec jekyll serve --livereload
```

Then open `http://localhost:4000`.

Docker is also supported:

```sh
docker compose up
```

Generated files such as `_site/`, `node_modules/`, and local Bundler dependencies are ignored by Git.
