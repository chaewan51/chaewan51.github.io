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

## Travel journal

The map is visible on arrival. The full journal sits inside a native `details`
toggle, collapsed by default; its open/closed state survives language and filter
changes during the visit. The toggle also works without JavaScript.

The EN | KR switch translates location and country/region names, including
map popup names and flag labels, plus the journal heading (여행 기록).
Event titles and other interface text stay in English;
US state abbreviations remain unchanged. Korean names live in `assets/js/travel-locations.js`.
The preference is saved locally when browser storage is available. Map base tiles
retain their provider's labels; language changes preserve filters and map position.

The `/travel/` page reads `_data/travel.json`. Add one record per visit, including
repeat visits to the same city. Each record has a unique `id`, `city`, `country`,
city-center `lat` and `lng`, `year`, and `type` (`work` or `personal`).
An optional `title` names a work event. Personal stops show their city or town,
not an attraction; resolve landmarks to their locality before adding them, unless
a recognizable attraction label is explicitly preferred (such as Six Flags, NJ).
When only a national park or broad area is known, use its actual name instead of
inferring a town visit. The legacy `city` field holds the location label; optional
`location_type` distinguishes `city`, `park`, or `area`. Counters refer to places.
Use `region` only for US states (two-letter abbreviations). Outside the US, show
the place and country without provinces, counties, or other regional labels.
The place and US state display in bold; the country stays in smaller text.
For an island-level territory entry such as Guam, omit the redundant state/territory
abbreviation and use a territory label beneath the place name.
Optional `country_label` supplies a more specific display label, such as SAR of China for Hong Kong.
The optional `month` (1–12) and `day` (1–31) control order within each year;
years and trips appear newest first. Unknown months or days sort last in their group.
For stops sharing a date (or a month/year when dates are unknown), use `sequence`
values starting at 1 in visit order. Later stops appear higher in the journal.
Use `sequence_estimated: true` when order is reconstructed rather than confirmed,
and retain the original landmarks in `landmarks` for later review.
Journal entries show location and optional event name, with work/personal indicated
by colored timeline dots and screen-reader text. A flag sits to the left of the dot
at each country or region's earliest chronological visit within the year. The list
stays newest first. Flags appear once per year, using the earliest visit remaining
under the active filter; year headings have no flag row.
Optional `summary_region` gives a region its own flag and accessible flag label
(such as Hong Kong), without changing the record's country or location label.
Map popups retain the category label. Dates, stored notes, and paper paths are not displayed.
Country flags are local SVGs from flag-icons 7.2.3 (MIT); the license is included in
`assets/images/travel-flags/`. Add the matching code in `countryCodes` in `assets/js/travel.js`
and a flag asset when introducing another country; names still display without a flag.
Use the same city name and coordinates for repeat visits so their pins group
together. Add completed visits only; conference acceptance alone does not establish
attendance. The map uses Leaflet and OpenStreetMap tiles; the journal remains usable
if the map cannot load.

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
