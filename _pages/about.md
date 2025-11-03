#---
#permalink: /about/
#title: "About"
#author_profile: true
#redirect_from: 
#  - /about/
#  - /about.html
#---

---
layout: page        # or 'home' if you want the home widgets style
title: "Chaewan Chun"
permalink: /        # <-- this makes About render at the site root
author_profile: true
---

## About

Hello! My name is Chaewan Chun (Just call me Chae!).

I'm a Ph.D. candidate at College of Information Sciences and Technology, Pennsylvania State University surpervised by Prof. Dongwon Lee.
My research interest is anything that has positive impact on society.
My current research focuses on multimodal misinformation, especially fact-checking in audio platforms.

Keywords: 


### Selected Publications

{% include base_path %}
{% for post in site.publications reversed %}
  {% include archive-single.html %}
{% endfor %}

{% for post in site.publications reversed %}
  {% if post.selected %}{% include archive-single.html %}{% endif %}
{% endfor %}

## Updates
{% assign news = site.posts | sort: "date" | reverse %}
{% for item in news limit:5 %}
- **{{ item.date | date: "%Y-%m-%d" }}** — [{{ item.title }}]({{ item.url | relative_url }})
{% endfor %}
