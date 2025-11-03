---
layout: home
title: "Chaewan Chun"
permalink: /
author_profile: true
---

I am a **Ph.D. candidate in Informatics at Penn State** (advisor: **Dongwon Lee**).
My research focuses on **multimodal misinformation**, especially **fact-checking in spoken, conversational audio**.
I build datasets (e.g., **MAD**, **MAD2**) and design **audio–text** pipelines for claim detection, retrieval, and verification across turns.

My work studies how **temporal context** (claim-only, past-only, ±K windows, full dialogue) affects verification and fairness.

---

### Selected Publications

{% include base_path %}
{% for post in site.publications reversed %}
  {% include archive-single.html %}
{% endfor %}
