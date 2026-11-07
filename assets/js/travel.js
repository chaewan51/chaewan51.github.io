(function () {
  'use strict';
  var root = document.querySelector('.travel-page');
  if (!root) return;
  var trips = JSON.parse(document.getElementById('travel-data').textContent);
  var list = document.getElementById('travel-trip-list');
  var count = document.getElementById('travel-count');
  var empty = document.getElementById('travel-empty');
  var error = document.getElementById('travel-map-error');
  var filters = Array.from(root.querySelectorAll('[data-filter]'));
  var languages = Array.from(root.querySelectorAll('[data-language]'));
  var koreanNames = window.travelKoreanLocations || {places: {}, countries: {}};
  var language = 'en';
  try {
    if (window.localStorage.getItem('travel-location-language') === 'ko' && window.travelKoreanLocations) language = 'ko';
  } catch (storageError) { /* The switch also works when storage is unavailable. */ }
  var visible = trips.slice();
  var map, pins, expanded;
  var groups = new Map();
  var countryCodes = {'United States': 'us', 'Guam': 'gu', 'Hungary': 'hu', 'China': 'cn', 'Hong Kong': 'hk', 'Cambodia': 'kh', 'South Korea': 'kr', 'France': 'fr', 'Belgium': 'be', 'Japan': 'jp', 'Mexico': 'mx', 'Romania': 'ro', 'Philippines': 'ph', 'Czech Republic': 'cz', 'Austria': 'at'};

  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }
  function cityKey(trip) { return trip.city + '|' + (trip.region || '') + '|' + trip.country; }
  function translated(name, names) { return language === 'ko' ? (names[name] || name) : name; }
  function locationLabel(trip) { return translated(trip.city, koreanNames.places) + (trip.region ? ', ' + trip.region : ''); }
  function countryLabel(trip) { return translated(trip.country_label || trip.country, koreanNames.countries); }
  function locationText(tag, text) {
    var node = el(tag, '', text);
    node.lang = language;
    return node;
  }
  function typeLabel(trip) { return trip.type === 'work' ? 'Work' : 'Personal'; }
  function countryFlag(name) {
    var flag = el('img', 'travel-country-flag');
    flag.src = root.dataset.flagPath + countryCodes[name] + '.svg';
    flag.alt = translated(name, koreanNames.countries);
    flag.title = flag.alt;
    flag.lang = language;
    flag.width = 24;
    flag.height = 18;
    flag.loading = 'lazy';
    return flag;
  }
  function popup(trip) {
    var content = el('div', 'travel-popup');
    var metadata = el('p', 'travel-popup-label');
    var year = el('time', '', String(trip.year));
    year.setAttribute('datetime', String(trip.year));
    metadata.append(year);
    content.append(metadata);
    content.append(locationText('h3', locationLabel(trip)), locationText('small', countryLabel(trip)));
    if (trip.title) content.append(el('p', '', trip.title));
    return content;
  }
  function icon(type, label) {
    return L.divIcon({className: 'travel-pin-icon', html: '<div class="travel-pin travel-pin--' + type + '"><span>' + label + '</span></div>', iconSize: [30, 36], iconAnchor: [15, 34], popupAnchor: [0, -32]});
  }
  function tripMarker(trip, position, target, number) {
    return L.marker(position, {icon: icon(trip.type, number || '•'), title: locationLabel(trip) + (trip.title ? ': ' + trip.title : ''), alt: locationLabel(trip) + ', ' + typeLabel(trip) + (trip.title ? ', ' + trip.title : ''), keyboard: true}).bindPopup(popup(trip), {maxWidth: 280}).addTo(target);
  }
  function clearExpansion() {
    if (expanded) expanded.clearLayers();
    if (pins) pins.eachLayer(function (pin) { pin.setOpacity(1); });
  }
  function expand(group, groupMarker) {
    clearExpansion();
    var origin = L.latLng(group[0].lat, group[0].lng);
    var center = map.latLngToLayerPoint(origin);
    var radius = Math.max(52, group.length * 10);
    groupMarker.setOpacity(0);
    group.forEach(function (trip, index) {
      var angle = index * Math.PI * 2 / group.length - Math.PI / 2;
      var position = map.layerPointToLatLng(center.add(L.point(Math.cos(angle) * radius, Math.sin(angle) * radius)));
      L.polyline([origin, position], {color: '#89939e', weight: 1, dashArray: '3 4', interactive: false}).addTo(expanded);
      tripMarker(trip, position, expanded, String(index + 1));
    });
  }
  function drawPins() {
    if (!map) return;
    clearExpansion();
    pins.clearLayers();
    groups = new Map();
    visible.forEach(function (trip) {
      var key = cityKey(trip);
      if (!groups.has(key)) groups.set(key, {trips: []});
      groups.get(key).trips.push(trip);
    });
    groups.forEach(function (group) {
      var first = group.trips[0];
      if (group.trips.length === 1) {
        group.marker = tripMarker(first, [first.lat, first.lng], pins);
      } else {
        var types = new Set(group.trips.map(function (trip) { return trip.type; }));
        group.marker = L.marker([first.lat, first.lng], {icon: icon(types.size > 1 ? 'mixed' : first.type, String(group.trips.length)), title: locationLabel(first) + ': ' + group.trips.length + ' visits. Click to expand.', alt: locationLabel(first) + ', ' + group.trips.length + ' visits', keyboard: true}).addTo(pins);
        group.marker.on('click', function () { expand(group.trips, group.marker); });
      }
    });
  }
  function fitMap() {
    if (!map) return;
    clearExpansion();
    map.closePopup();
    if (!visible.length) map.setView([25, 0], 2, {animate: false});
    else map.fitBounds(visible.map(function (trip) { return [trip.lat, trip.lng]; }), {padding: [65, 65], maxZoom: visible.length === 1 ? 5 : 3, animate: false});
  }
  function drawJournal() {
    list.replaceChildren();
    var years = new Map();
    visible.slice().sort(function (a, b) { return b.year - a.year || (b.month || 0) - (a.month || 0) || (b.day || 0) - (a.day || 0) || (b.sequence || 0) - (a.sequence || 0); }).forEach(function (trip) {
      if (!years.has(trip.year)) years.set(trip.year, []);
      years.get(trip.year).push(trip);
    });
    years.forEach(function (yearTrips, year) {
      var section = el('section', 'travel-year');
      var header = el('header', 'travel-year-header');
      var heading = el('h3', '', String(year));
      heading.id = 'travel-year-' + year;
      section.setAttribute('aria-labelledby', heading.id);
      header.append(heading);
      var entries = el('div', 'travel-year-trips');
      var earliestVisits = new Map();
      yearTrips.forEach(function (trip) {
        earliestVisits.set(trip.summary_region || trip.country, trip);
      });
      yearTrips.forEach(function (trip) {
        var article = el('article', 'travel-trip');
        article.dataset.type = trip.type;
        var country = trip.summary_region || trip.country;
        if (earliestVisits.get(country) === trip) {
          if (countryCodes[country]) article.append(countryFlag(country));
        }
        var top = el('div', 'travel-trip-top');
        var city = locationText('h4', locationLabel(trip));
        city.append(el('span', '', countryLabel(trip)));
        top.append(city);
        article.append(el('span', 'travel-sr-only', typeLabel(trip) + ' trip. '), top);
        if (trip.title) article.append(el('p', 'travel-trip-title', trip.title));
        entries.append(article);
      });
      section.append(header, entries);
      list.append(section);
    });
    empty.hidden = visible.length !== 0;
    var cities = new Set(visible.map(cityKey)).size;
    count.textContent = visible.length + (visible.length === 1 ? ' trip' : ' trips') + ' · ' + cities + (cities === 1 ? ' place' : ' places');
  }

  if (typeof L !== 'undefined') {
    map = L.map('travel-map', {scrollWheelZoom: false, zoomControl: false, minZoom: 2, maxZoom: 16, worldCopyJump: true});
    L.control.zoom({position: 'bottomright'}).addTo(map);
    var tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {maxZoom: 19, attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'}).addTo(map);
    tiles.on('tileerror', function () { error.hidden = false; });
    tiles.on('tileload', function () { error.hidden = true; });
    pins = L.layerGroup().addTo(map);
    expanded = L.layerGroup().addTo(map);
    map.on('zoomstart movestart', clearExpansion);
    map.on('click', clearExpansion);
  } else {
    error.hidden = false;
    document.getElementById('travel-reset').hidden = true;
  }
  filters.forEach(function (button) {
    button.addEventListener('click', function () {
      filters.forEach(function (other) { other.setAttribute('aria-pressed', String(other === button)); });
      visible = trips.filter(function (trip) { return button.dataset.filter === 'all' || trip.type === button.dataset.filter; });
      drawPins();
      drawJournal();
      fitMap();
    });
  });
  document.getElementById('travel-reset').addEventListener('click', fitMap);
  function updateLanguageButtons() {
    languages.forEach(function (button) { button.setAttribute('aria-pressed', String(button.dataset.language === language)); });
    var journalTitle = document.getElementById('travel-journal-title');
    journalTitle.textContent = language === 'ko' ? '여행 기록' : 'Travel Log';
    journalTitle.lang = language;
  }
  languages.forEach(function (button) {
    button.addEventListener('click', function () {
      if (button.dataset.language === language) return;
      language = button.dataset.language;
      try { window.localStorage.setItem('travel-location-language', language); } catch (storageError) { /* Optional preference storage. */ }
      updateLanguageButtons();
      if (map) map.closePopup();
      drawPins();
      drawJournal();
    });
  });
  if (window.travelKoreanLocations) root.querySelector('.travel-languages').hidden = false;
  updateLanguageButtons();
  drawPins();
  drawJournal();
  fitMap();
}());
