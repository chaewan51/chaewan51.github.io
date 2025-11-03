---
permalink: /
title: ""
author_profile: true
redirect_from:
  - /about/
  - /about.html
---

## About me

Hello! My name is Chaewan Chun (Just call me Chae!).

My research interest is anything that has positive impact on society.

I am a **Ph.D. candidate in Informatics** at [The Pennsylvania State University](https://www.psu.edu/), advised by [Dr. Dongwon Lee](https://pike.psu.edu/dongwon/).  
My research focuses on **multimodal misinformation detection**—particularly **fact-checking in spoken, conversational audio**.  
I build datasets such as **MAD** and **MAD2**, and design **audio–text fusion pipelines** that jointly model conversational speech and language for claim verification.

Broadly, my work examines how **temporal context** (claim-only, causal, or full-dialogue) affects model accuracy, fairness, and interpretability in verifying spoken claims.

Before my Ph.D., I completed dual bachelor’s degrees in **Computer Science** (Magna Cum Laude) and **Mathematics** (Cum Laude) at Penn State, where I was a [Schreyer Honors College](https://www.shc.psu.edu/) scholar.

I am broadly interested in **speech and language understanding**, **multimodal learning**, **AI for social good**, and **dataset creation for responsible AI research**.



## Publications

{% assign pubs = site.publications | sort: "date" | reverse | where: "selected", true %}

<div class="pubs2">
  {% for p in pubs %}
  {% capture authors_html %}
    {{ p.authors | replace: "Chaewan Chun", "<strong>Chaewan Chun</strong>" }}
  {% endcapture %}

  <article class="pub2">
    <div class="pub2-left">
      <abbr class="abbr-badge">{{ p.abbr | default: "VENUE" }}</abbr>
    </div>

    <div class="pub2-right">
      <h3 class="pub-title">
        {% if p.pdf %}
          <a href="{{ p.pdf | relative_url }}" target="_blank" rel="noopener">{{ p.title }}</a>
        {% else %}
          {{ p.title }}
        {% endif %}
      </h3>

      <div class="pub-authors">{{ authors_html }}</div>

      {% assign y = p.year %}
      {% if y == nil and p.date %}{% assign y = p.date | date: "%Y" %}{% endif %}
      <div class="pub-venue">
        {{ p.venue }}{% if p.status %}, {{ p.status }}{% endif %}{% if y %}, {{ y }}{% endif %}
      </div>


      <div class="pub-links">
        {% if p.code %}<a class="btn" href="{{ p.code }}" target="_blank" rel="noopener">Code</a>{% endif %}
      </div>
    </div>
  </article>
  {% endfor %}
</div>


<style>
/* ===== Compact Option B (same scale as Option A) ===== */
:root{
  --badge-col: 84px;      /* width of the left badge column (tweak if your abbr is long) */
  --badge-fs: 12px;       /* badge font size (Option A used ~12px) */
  --badge-pad-y: 4px;     /* vertical padding */
  --badge-pad-x: 8px;     /* horizontal padding */
  --badge-radius: 6px;    /* rounded corners (≈ .375rem) */
}

.pubs2{display:flex;flex-direction:column;gap:12px;margin-top:8px}
.pub2{
  display:grid;
  grid-template-columns: var(--badge-col) 1fr;
  gap:10px;
  align-items:start;
  border-top:1px solid rgba(0,0,0,.08);
  padding-top:10px;
}
.pub2:first-child{border-top:none}

.pub2-left{display:flex;justify-content:center;align-items:flex-start;margin-top:2px}

/* Badge scaled like Option A */
.abbr-badge{
  display:inline-block;
  width:100%;               /* fills the left column for clean vertical alignment */
  text-align:center;
  font-size:var(--badge-fs);
  line-height:1.05;
  font-weight:700;
  letter-spacing:.2px;
  padding:var(--badge-pad-y) var(--badge-pad-x);
  border-radius:var(--badge-radius);
  background:#3f51b5;       /* single color for all (your preference) */
  color:#fff;
  white-space:nowrap;        /* prevent awkward wrapping; increase --badge-col if needed */
  user-select:none;
}
.abbr-badge a{color:#fff;text-decoration:none}

/* Content scale (keep titles from dwarfing the badge) */
.pub-title{margin:0;line-height:1.35;font-size:1rem}
.pub-title a{text-decoration:none;color:#2a66ff}
.pub-title a:hover{text-decoration:underline}
.pub-authors{opacity:.9;margin-top:2px;font-size:.95rem}
.pub-venue{opacity:.75;margin-top:2px;font-size:.95rem}

.pub-links .btn{
  display:inline-block;margin-top:6px;margin-right:8px;
  padding:4px 10px;border-radius:999px;border:1px solid rgba(0,0,0,.15);
  font-size:.85rem;text-decoration:none
}

/* Mobile tweaks */
@media (max-width:640px){
  :root{ --badge-col: 72px; --badge-fs: 11px; --badge-pad-y: 3px; --badge-pad-x: 6px; }
}
</style>
