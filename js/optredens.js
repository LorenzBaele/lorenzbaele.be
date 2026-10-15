/*
 * Optredens voor lorenzbaele.be
 *
 * Alle optredens komen uit één bron: het tabblad "Website" van je Google Sheet,
 * gepubliceerd als CSV. Plak die link hieronder bij SHEET_CSV_URL.
 * Zolang die leeg is (of niet bereikbaar), leest de site data/optredens.csv.
 *
 * Kolommen: Date (dd-mm-jjjj), Time (uu:mm), Band, Project, Venue, Location,
 * en optioneel Private (TRUE bij een privéfeest), Tickets (link naar de ticketverkoop)
 * en Maps (link naar de locatie).
 * Zonder Maps-link maakt de site zelf een Google Maps-link uit Venue en Location.
 * Bij komende optredens (home en agenda) staat de band boven de titel (andere bands met hun
 * eigen naam) en linkt de plaats, met een speldje, naar de kaart (niet bij een privéfeest).
 * Rechts staat de ticketknop, "Privéfeest" of, zonder ticketlink, "Gratis inkom".
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
  // Andere bands staan met hun eigen naam op de site, zonder kleur, en vallen onder de filter "Andere projecten"
  function otherBand(name) { return { key: 'andere', name: name || 'Ander project', color: null }; }

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

  // Alleen echte webadressen; "www.site.be" of "site.be/tickets" krijgt https:// ervoor
  function parseUrl(value) {
    var v = (value || '').trim();
    if (/^https?:\/\/\S+$/i.test(v)) return v;
    if (/^[a-z0-9-]+(\.[a-z0-9-]+)+(\/\S*)?$/i.test(v)) return 'https://' + v;
    return '';
  }

  function toGigs(rows) {
    if (!rows.length) return [];
    var head = rows[0].map(function (h) { return h.trim().toLowerCase(); });
    var col = function (name) { return head.indexOf(name); };
    var iDate = col('date'), iTime = col('time'), iBand = col('band'),
        iProject = col('project'), iVenue = col('venue'), iLocation = col('location'),
        iTickets = col('tickets'), iMaps = col('maps'), iPrivate = col('private');

    return rows.slice(1).map(function (r) {
      var get = function (i) { return i >= 0 && r[i] ? r[i].trim() : ''; };
      var date = parseDate(get(iDate));
      if (!date) return null;
      var band = BANDS[get(iBand).toLowerCase()] || otherBand(get(iBand));
      var project = get(iProject);
      var venue = get(iVenue);
      var location = get(iLocation);
      // Zonder zaal (bv. een trouwfeest met alleen een gemeente) geen kaartlink
      var map = parseUrl(get(iMaps)) || (venue ? 'https://www.google.com/maps/search/?api=1&query=' +
                encodeURIComponent([venue, location].filter(Boolean).join(', ')) : '');
      if (venue && venue.toLowerCase() === project.toLowerCase()) venue = '';
      var isPrivate = /^(true|waar|ja|yes|x|1)$/i.test(get(iPrivate));
      var tickets = isPrivate ? '' : parseUrl(get(iTickets));
      return {
        date: date,
        time: parseTime(get(iTime)),
        band: band,
        event: project,
        place: [venue, location].filter(Boolean).join(', '),
        // Een privéfeest krijgt geen kaartlink: daar ga je niet zomaar naartoe
        map: isPrivate ? '' : map,
        tickets: tickets,
        isPrivate: isPrivate,
        // Gratis inkom alleen als de sheet een Tickets-kolom heeft en die leeg is
        free: !isPrivate && iTickets >= 0 && !tickets
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

  var ARROW = '<svg aria-hidden="true" width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M4.5 2H10v5.5"></path><path d="M10 2L2.5 9.5"></path></svg>';

  function button(cls, href, text, label) {
    var a = el('a', 'gig-btn ' + cls, text);
    a.href = href;
    a.setAttribute('aria-label', label);
    a.insertAdjacentHTML('beforeend', ARROW);
    return a;
  }

  var PIN = '<svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z"></path><circle cx="12" cy="9.5" r="2.5"></circle></svg>';

  // Bij komende optredens staat de band boven de titel (andere bands zonder kleurblokje)
  // en is de plaats, met een speldje ervoor, de link naar de kaart
  function info(gig, upcoming) {
    var div = el('div', 'gig-info');
    if (upcoming) div.appendChild(bandTag(gig.band));
    div.appendChild(el('p', 'gig-event', gig.event));
    if (upcoming && gig.map) {
      var place = el('p', 'gig-place');
      var a = el('a', 'gig-place-link');
      a.href = gig.map;
      a.setAttribute('aria-label', (gig.place || 'Locatie van ' + gig.event) + ' op de kaart');
      a.insertAdjacentHTML('beforeend', PIN);
      a.appendChild(el('span', null, gig.place || 'Locatie'));
      place.appendChild(a);
      div.appendChild(place);
    } else if (gig.place) {
      div.appendChild(el('p', 'gig-place', gig.place));
    }
    return div;
  }

  // Rechts op de kaart: de ticketknop, of een label voor privéfeest of gratis inkom
  function action(gig) {
    var p = el('p', 'gig-action');
    if (gig.tickets) {
      p.appendChild(button('gig-btn--ticket', gig.tickets, 'Tickets', 'Tickets voor ' + gig.event + (gig.place ? ', ' + gig.place : '')));
    } else if (gig.isPrivate) {
      p.appendChild(el('span', 'gig-note', 'Privéfeest'));
    } else if (gig.free) {
      p.appendChild(el('span', 'gig-note gig-note--free', 'Gratis inkom'));
    } else {
      return null;
    }
    return p;
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
    li.appendChild(info(gig, true));
    var act = action(gig);
    if (act) li.appendChild(act);
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
