/*
 * Optredens voor lorenzbaele.be
 *
 * Alle optredens komen uit één bron: het tabblad "Website" van je Google Sheet,
 * gepubliceerd als CSV. Plak die link hieronder bij SHEET_CSV_URL.
 * Zolang die leeg is (of niet bereikbaar), leest de site data/optredens.csv.
 *
 * Kolommen: Date (dd-mm-jjjj), Time (uu:mm), Band, Project, Venue, Location
 * Een optreden staat bij "Binnenkort" tot en met de dag zelf en schuift daarna
 * vanzelf naar "Eerder".
 */
(function () {
  'use strict';

  var SHEET_CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vT6ql9eeunAAc-XCw5Gll8KzgT7UqEOuurBkcigpWr9mu80wfpu3tCT8HxdJNF_pJ3NhY4ikf2C7sfT/pub?gid=293892753&single=true&output=csv';
  var LOCAL_CSV_URL = 'data/optredens.csv';

  var BANDS = {
    'undecided souls': { key: 'us', name: 'Undecided Souls', color: '#ECE4D8' },
    'the logical dreamers': { key: 'ld', name: 'The Logical Dreamers', color: '#4A93CF' },
    'dysphunktional': { key: 'dy', name: 'Dysphunktional', color: '#D9692E' }
  };
  var OTHER = { key: 'andere', name: 'Ander project', color: null };

  var MONTHS = ['jan', 'feb', 'mrt', 'apr', 'mei', 'jun', 'jul', 'aug', 'sep', 'okt', 'nov', 'dec'];
  var DAYS = ['zondag', 'maandag', 'dinsdag', 'woensdag', 'donderdag', 'vrijdag', 'zaterdag'];

  // ---------- CSV ----------

  function parseCsv(text) {
    var rows = [], row = [], field = '', inQuotes = false;
    for (var i = 0; i < text.length; i++) {
      var c = text[i];
      if (inQuotes) {
        if (c === '"' && text[i + 1] === '"') { field += '"'; i++; }
        else if (c === '"') { inQuotes = false; }
        else { field += c; }
      } else if (c === '"') { inQuotes = true; }
      else if (c === ',') { row.push(field); field = ''; }
      else if (c === '\n' || c === '\r') {
        if (c === '\r' && text[i + 1] === '\n') i++;
        row.push(field); rows.push(row); row = []; field = '';
      } else { field += c; }
    }
    if (field !== '' || row.length) { row.push(field); rows.push(row); }
    return rows.filter(function (r) { return r.some(function (f) { return f.trim() !== ''; }); });
  }

  function parseDate(value) {
    var v = (value || '').trim(), m;
    if ((m = v.match(/^(\d{1,2})[-\/.](\d{1,2})[-\/.](\d{4})$/))) return new Date(+m[3], +m[2] - 1, +m[1]);
    if ((m = v.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/))) return new Date(+m[1], +m[2] - 1, +m[3]);
    return null;
  }

  function parseTime(value) {
    var m = (value || '').trim().match(/^(\d{1,2})[:.hu](\d{2})/i);
    return m ? (m[1].length === 1 ? '0' + m[1] : m[1]) + ':' + m[2] : '';
  }

  function pad(n) { return n < 10 ? '0' + n : '' + n; }

  function toGigs(rows) {
    if (!rows.length) return [];
    var head = rows[0].map(function (h) { return h.trim().toLowerCase(); });
    var col = function (name) { return head.indexOf(name); };
    var iDate = col('date'), iTime = col('time'), iBand = col('band'),
        iProject = col('project'), iVenue = col('venue'), iLocation = col('location');

    return rows.slice(1).map(function (r) {
      var get = function (i) { return i >= 0 && r[i] ? r[i].trim() : ''; };
      var date = parseDate(get(iDate));
      if (!date) return null;
      var band = BANDS[get(iBand).toLowerCase()] || OTHER;
      var project = get(iProject);
      var venue = get(iVenue);
      if (venue && venue.toLowerCase() === project.toLowerCase()) venue = '';
      return {
        date: date,
        time: parseTime(get(iTime)),
        band: band,
        event: project,
        place: [venue, get(iLocation)].filter(Boolean).join(', ')
      };
    }).filter(Boolean);
  }

  function load() {
    var tryUrl = function (url) {
      return fetch(url, { cache: 'no-cache' }).then(function (res) {
        if (!res.ok) throw new Error(res.status);
        return res.text();
      });
    };
    var first = SHEET_CSV_URL ? tryUrl(SHEET_CSV_URL).catch(function () { return tryUrl(LOCAL_CSV_URL); })
                              : tryUrl(LOCAL_CSV_URL);
    return first.then(function (text) { return toGigs(parseCsv(text)); });
  }

  // ---------- Opbouw ----------

  function el(tag, cls, text) {
    var node = document.createElement(tag);
    if (cls) node.className = cls;
    if (text != null) node.textContent = text;
    return node;
  }

  function bandTag(band) {
    var p = el('p', 'band-tag' + (band.color ? '' : ' band-tag--other'));
    var sw = el('span', 'sw');
    sw.setAttribute('aria-hidden', 'true');
    if (band.color) sw.style.setProperty('--c', band.color);
    p.appendChild(sw);
    p.appendChild(document.createTextNode(band.name));
    return p;
  }

  function info(gig) {
    var div = el('div', 'gig-info');
    div.appendChild(el('p', 'gig-event', gig.event));
    if (gig.place) div.appendChild(el('p', 'gig-place', gig.place));
    return div;
  }

  function upcomingItem(gig) {
    var li = el('li', 'gig');
    var d = gig.date;
    var stub = el('time', 'stub');
    stub.setAttribute('datetime', d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()) + (gig.time ? 'T' + gig.time : ''));
    stub.appendChild(el('span', 'stub-wd', DAYS[d.getDay()]));
    stub.appendChild(el('span', 'stub-day', pad(d.getDate())));
    stub.appendChild(el('span', 'stub-mon', MONTHS[d.getMonth()]));
    if (gig.time) stub.appendChild(el('span', 'stub-time', gig.time));
    li.appendChild(stub);
    li.appendChild(info(gig));
    li.appendChild(bandTag(gig.band));
    return li;
  }

  function pastItem(gig) {
    var li = el('li', 'past-row');
    var d = gig.date;
    li.appendChild(el('span', 'past-date', pad(d.getDate()) + ' ' + MONTHS[d.getMonth()]));
    li.appendChild(info(gig));
    li.appendChild(bandTag(gig.band));
    return li;
  }

  var CHEVRON = '<svg aria-hidden="true" width="14" height="14" viewBox="0 0 14 14"><path d="M3 5 L7 9 L11 5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"></path></svg>';

  function render(all, filter, closedYears) {
    var today = new Date(); today.setHours(0, 0, 0, 0);
    var keep = function (g) { return filter === 'all' || g.band.key === filter; };
    var upcomingAll = all.filter(function (g) { return g.date >= today; })
                         .sort(function (a, b) { return a.date - b.date || a.time.localeCompare(b.time); });
    var upcoming = upcomingAll.filter(keep);
    var past = all.filter(function (g) { return g.date < today && keep(g); })
                  .sort(function (a, b) { return b.date - a.date; });

    // Lijst met komende optredens (home en agenda)
    var list = document.querySelector('[data-gigs]');
    if (list) {
      var limit = parseInt(list.getAttribute('data-limit'), 10) || Infinity;
      list.textContent = '';
      upcoming.slice(0, limit).forEach(function (g) { list.appendChild(upcomingItem(g)); });
      list.hidden = upcoming.length === 0;

      var none = document.querySelector('[data-empty="none"]');
      var band = document.querySelector('[data-empty="band"]');
      if (none) none.hidden = upcomingAll.length !== 0;
      if (band) band.hidden = !(upcomingAll.length !== 0 && upcoming.length === 0);
      var hand = document.querySelector('[data-when-gigs]');
      if (hand) hand.hidden = upcoming.length === 0;
    }

    // Eerdere optredens per jaar, in- en uitklapbaar (agenda)
    var pastBox = document.querySelector('[data-past]');
    if (pastBox) {
      pastBox.textContent = '';
      var years = [];
      past.forEach(function (g) {
        var y = g.date.getFullYear();
        if (years.indexOf(y) === -1) years.push(y);
      });
      years.forEach(function (y) {
        var items = past.filter(function (g) { return g.date.getFullYear() === y; });
        var open = !closedYears[y];
        var listId = 'jaar-' + y;

        var h3 = el('h3', null);
        h3.style.margin = '0';
        var btn = el('button', 'year-toggle');
        btn.type = 'button';
        btn.setAttribute('aria-expanded', open ? 'true' : 'false');
        btn.setAttribute('aria-controls', listId);
        btn.appendChild(document.createTextNode(y + ' '));
        btn.insertAdjacentHTML('beforeend', CHEVRON);
        btn.appendChild(el('span', 'year-count', items.length + (items.length === 1 ? ' optreden' : ' optredens')));
        h3.appendChild(btn);

        var ul = el('ul', 'past-list');
        ul.id = listId;
        ul.hidden = !open;
        items.forEach(function (g) { ul.appendChild(pastItem(g)); });

        btn.addEventListener('click', function () {
          var nowOpen = btn.getAttribute('aria-expanded') !== 'true';
          btn.setAttribute('aria-expanded', nowOpen ? 'true' : 'false');
          ul.hidden = !nowOpen;
          closedYears[y] = !nowOpen;
        });

        pastBox.appendChild(h3);
        pastBox.appendChild(ul);
      });
    }
  }

  function init() {
    if (!document.querySelector('[data-gigs], [data-past]')) return;
    var state = { filter: 'all', closedYears: {} };

    // Spinner zolang de optredens laden
    var loading = document.querySelector('[data-loading]');
    var setLoading = function (on) { if (loading) loading.hidden = !on; };
    setLoading(true);

    load().then(function (gigs) {
      setLoading(false);
      render(gigs, state.filter, state.closedYears);

      var buttons = document.querySelectorAll('.filter[data-filter]');
      Array.prototype.forEach.call(buttons, function (b) {
        b.addEventListener('click', function () {
          state.filter = b.getAttribute('data-filter');
          Array.prototype.forEach.call(buttons, function (x) {
            x.setAttribute('aria-pressed', x === b ? 'true' : 'false');
          });
          render(gigs, state.filter, state.closedYears);
        });
      });
    }).catch(function () {
      setLoading(false);
      var none = document.querySelector('[data-empty="none"]');
      if (none) none.hidden = false;
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
