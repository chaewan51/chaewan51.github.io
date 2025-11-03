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

Before my Ph.D., I completed dual bachelor’s degrees in **Computer Science** (Magna Cum Laude) and **Mathematics** (Cum Laude) at Penn State, where I was a [Schreyer Honors College](https://www.shc.psu.edu/) scholar and conducted my undergraduate honors thesis,  
[_Robust Image Classification based on Pixel Importance_](https://honors.libraries.psu.edu/catalog/7983czc5884), advised by [Dr. Jia Li](https://science.psu.edu/stat/people/jol2).

I am broadly interested in **speech and language understanding**, **multimodal learning**, **AI for social good**, and **dataset creation for responsible AI research**.



## Publications

{% assign pubs = site.publications | sort: "date" | reverse %}
{% comment %} On home, show a curated subset {% endcomment %}
{% assign pubs = pubs | where: "selected", true %}

<div class="pubs">
  {% for p in pubs %}
    {% capture authors_html %}
      {{ p.authors | replace: "Chaewan Chun", "<strong>Chaewan Chun</strong>" }}
    {% endcapture %}
    <article class="pub">
      <div class="venue-badge">{{ p.abbr | default: "PAPER" }}</div>
      <div class="pub-body">
        <h3 class="pub-title">
          {% if p.external_url %}
            <a href="{{ p.external_url }}" target="_blank" rel="noopener">{{ p.title }}</a>
          {% else %}
            {{ p.title }}
          {% endif %}
        </h3>
        <div class="pub-authors">{{ authors_html }}</div>
        <div class="pub-venue">{{ p.venue }}</div>
        <div class="pub-links">
          {% if p.pdf %}<a class="btn btn-pdf" href="{{ p.pdf | relative_url }}" target="_blank" rel="noopener">PDF</a>{% endif %}
          {% if p.code %}<a class="btn btn-code" href="{{ p.code }}" target="_blank" rel="noopener">Code</a>{% endif %}
        </div>
      </div>
    </article>
  {% endfor %}
</div>

<style>
.pubs{display:flex;flex-direction:column;gap:16px;margin-top:8px}
.pub{display:flex;gap:12px;align-items:flex-start;border-top:1px solid rgba(0,0,0,.08);padding-top:12px}
.pub:first-child{border-top:none}

/* Single-style badge (same color for all, like Jooyoung’s) */
.venue-badge{
  flex:0 0 64px; width:64px; height:28px;
  display:flex; align-items:center; justify-content:center;
  border-radius:6px; font-size:12px; font-weight:700; letter-spacing:.3px;
  background:#e8f0ff; border:1px solid #b7c7ff; color:#2a50d8;
}

/* content */
.pub-body{flex:1; min-width:0}
.pub-title{margin:0; line-height:1.35}
.pub-title a{text-decoration:none;color:#2a66ff}
.pub-title a:hover{text-decoration:underline}
.pub-authors{opacity:.9;margin-top:2px}
.pub-venue{opacity:.75;margin-top:2px}
.btn{display:inline-block;margin-top:6px;margin-right:8px;padding:4px 10px;
  border-radius:999px;border:1px solid rgba(0,0,0,.15);font-size:.85rem;text-decoration:none}
.btn-pdf{background:#f7f9ff}
.btn-code{background:#f7fff7}
</style>





## Updates
{% assign news = site.posts | sort: "date" | reverse %}
{% for item in news limit:5 %}
- **{{ item.date | date: "%Y-%m-%d" }}** — [{{ item.title }}]({{ item.url | relative_url }})
{% endfor %}
