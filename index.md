---
layout: home
title: "Chaewan Chun"
permalink: /
author_profile: true
---

## About me
I am a **Ph.D. candidate in Informatics at Penn State** (advisor: **Dongwon Lee**). 
My work focuses on **multimodal misinformation** in **spoken, conversational audio**: building datasets (MAD, MAD2) and designing **audio–text** pipelines for claim detection → retrieval → verification.

## Selected Publications
{% include base_path %}
{% for post in site.publications reversed %}
  {% if post.selected %}{% include archive-single.html %}{% endif %}
{% endfor %}

## Updates
{% assign news = site.posts | sort: "date" | reverse %}
{% for item in news limit:5 %}
- **{{ item.date | date: "%Y-%m-%d" }}** — [{{ item.title }}]({{ item.url | relative_url }})
{% endfor %}
