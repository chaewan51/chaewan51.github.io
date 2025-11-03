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
/* Show only selected on home; comment this line out if you want all */
{% assign pubs = pubs | where: "selected", true %}

<div class="pub-list">
  {% for p in pubs %}
    {% capture authors_html %}
      {{ p.authors | replace: "Chaewan Chun", "<strong>Chaewan Chun</strong>" }}
    {% endcapture %}
    <div class="pub-item">
      <div class="pub-title">
        {% if p.external_url %}
          <a href="{{ p.external_url }}" target="_blank" rel="noopener">{{ p.title }}</a>
        {% else %}
          {{ p.title }}
        {% endif %}
      </div>
      <div class="pub-authors">{{ authors_html }}</div>
      <div class="pub-venue">{{ p.venue }}</div>
      <div class="pub-links">
        {% if p.pdf %}<a class="btn btn-pdf" href="{{ p.pdf | relative_url }}" target="_blank" rel="noopener">PDF</a>{% endif %}
        {% if p.code %}<a class="btn btn-code" href="{{ p.code }}" target="_blank" rel="noopener">Code</a>{% endif %}
      </div>
    </div>
  {% endfor %}
</div>

<style>
/* Layout */
.pub-list{display:flex;flex-direction:column;gap:14px;margin-top:6px}
.pub-item{padding:10px 0;border-top:1px solid rgba(0,0,0,.08)}
.pub-item:first-child{border-top:none}

/* Text */
.pub-title{font-weight:700;line-height:1.35}
.pub-title a{text-decoration:none; color: #2a66ff;} /* <- title color */
.pub-title a:hover{text-decoration:underline}
.pub-authors{opacity:.9;margin-top:2px}
.pub-venue{opacity:.75;margin-top:2px}

/* Buttons */
.btn{display:inline-block;margin-top:6px;margin-right:8px;
  padding:4px 10px;border-radius:999px;border:1px solid rgba(0,0,0,.15);
  font-size:.85rem;text-decoration:none}
.btn-pdf{background:#f7f9ff}
.btn-code{background:#f7fff7}
</style>


## Updates
{% assign news = site.posts | sort: "date" | reverse %}
{% for item in news limit:5 %}
- **{{ item.date | date: "%Y-%m-%d" }}** — [{{ item.title }}]({{ item.url | relative_url }})
{% endfor %}
