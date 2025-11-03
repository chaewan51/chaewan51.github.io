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



## Selected Publications

{% include base_path %}
{% for post in site.publications reversed %}
  {% include archive-single.html %}
{% endfor %}

## Updates
{% assign news = site.posts | sort: "date" | reverse %}
{% for item in news limit:5 %}
- **{{ item.date | date: "%Y-%m-%d" }}** — [{{ item.title }}]({{ item.url | relative_url }})
{% endfor %}
