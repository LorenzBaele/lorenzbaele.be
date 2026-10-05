/* ===== Lorenz Baele — website =====
   All texts for both languages live in TEXTS below (nl = Dutch, en = English).
   Change a text in both languages to keep them in sync. */
(function () {
  var TEXTS = {
  "nl": {
    "aboutP1": "Ik ben een muzikant uit Gent en speel al meer dan 15 jaar. Het brengt me enorm veel plezier om saxofoon te spelen op de achtergrond van verschillende evenementen. Ik vul graag de ruimte met de prachtige klanken van een saxofoon, zodat gesprekken vlot op gang komen. Naast saxofoon spelen op evenementen speel ik ook in verschillende andere bands, elk met hun eigen stijl en karakter.",
    "aboutTitle": "Hoi, ik ben Lorenz.",
    "contactLead": "Vertel me de datum en het soort event en ik laat je snel iets weten.",
    "contactTitleA": "Laten we je",
    "contactTitleB": "avond plannen.",
    "ctaPrimary": "Check je datum",
    "ctaSecondary": "Bekijk video's",
    "fDate": "Datum van het event",
    "datePlaceholder": "Kies een datum",
    "fEmail": "E-mail",
    "fLoc": "Locatie",
    "fMsg": "Nog iets dat ik moet weten?",
    "fName": "Naam",
    "fSend": "Verstuur aanvraag",
    "fType": "Soort event",
    "footer": "Live saxofoon voor events in Gent en omstreken",
    "vatLabel": "BTW",
    "heroLead": "Live saxofoon als achtergrond voor elk moment. Warme muziek die zich aanpast aan jouw evenement, van de eerste gast tot het laatste glas.",
    "langLabel": "Taal",
    "lblEmail": "E-mail",
    "lblRegion": "Regio",
    "lblSound": "Geluid",
    "logoSub": "Saxofoon",
    "navAbout": "Over mij",
    "navBook": "Boek een datum",
    "navOcc": "Gelegenheden",
    "navRev": "Reviews",
    "navVid": "Video's",
    "o1d": "Ceremonie, receptie, diner en de openingsdans.",
    "o1t": "Huwelijken",
    "o2d": "Warme, ontspannen sax terwijl je gasten bijpraten.",
    "o2t": "Recepties",
    "o3d": "Openingen, awards, personeelsfeesten en lanceringen.",
    "o3t": "Bedrijfsevents",
    "o4d": "Ontspannen, jazzy sets voor bars, terrassen en diners.",
    "o4t": "Hotels & lounges",
    "o5d": "Verjaardagen, jubilea — alles wat het vieren waard is.",
    "o5t": "Privéfeesten",
    "occLead": "Elke gelegenheid vraagt iets anders en dat bespreken we vooraf samen.",
    "occTitle": "Voor elke gelegenheid",
    "options": [
      {
        "label": "Huwelijk"
      },
      {
        "label": "Receptie"
      },
      {
        "label": "Bedrijfsevent"
      },
      {
        "label": "Hotel of lounge"
      },
      {
        "label": "Privéfeest"
      },
      {
        "label": "Iets anders"
      }
    ],
    "portraitAlt": "Lorenz Baele speelt saxofoon op een podium",
    "photoCredit": "Foto",
    "priceLabel": "Prijs",
    "priceText": "Vanaf €200",
    "regionText": "Gent en omstreken",
    "revTitle": "Reviews",
    "reviews": [],
    "soundText": "Eigen geluidsinstallatie",
    "v1": "Huwelijk — receptie",
    "v2": "Bedrijfsevent",
    "v3": "Hotel lounge",
    "vMeta": "Video volgt binnenkort",
    "vidLead": "De eerste video's zijn in de maak. Benieuwd hoe het klinkt?",
    "vidLink": "Stuur me een bericht →",
    "vidTitleA": "Bekijk me",
    "vidTitleB": "live",
    "pageTitle": "Lorenz Baele — Live saxofoon",
    "selectPlaceholder": "Kies een soort event",
    "errName": "Vul je naam in.",
    "errEmail": "Vul een geldig e-mailadres in.",
    "errDate": "Kies de datum van je event.",
    "errDatePast": "Deze datum ligt in het verleden.",
    "errDateFar": "Kies een datum binnen de komende 3 jaar.",
    "notGiven": "Niet opgegeven",
    "formNote": "Velden met * zijn verplicht.",
    "errType": "Kies het soort event.",
    "errLocation": "Vul de locatie van je event in.",
    "mailSubject": "Boekingsaanvraag",
    "fSending": "Versturen…",
    "formSuccess": "Bedankt! Je aanvraag is verstuurd. Ik laat je snel iets weten.",
    "formFailed": "Er ging iets mis bij het versturen. Probeer het opnieuw of mail me op lorenzbaele.booking@gmail.com."
  },
  "en": {
    "aboutP1": "I'm a musician from Ghent and I've been playing for more than 15 years. Playing saxophone in the background at all kinds of events brings me a great deal of joy. I love filling the room with the beautiful sound of a saxophone, so conversations get going easily. Besides playing saxophone at events, I also play in several other bands, each with its own style and character.",
    "aboutTitle": "Hi, I'm Lorenz.",
    "contactLead": "Tell me the date and the kind of event, and I'll get back to you soon.",
    "contactTitleA": "Let's plan your",
    "contactTitleB": "evening.",
    "ctaPrimary": "Check your date",
    "ctaSecondary": "Watch videos",
    "fDate": "Event date",
    "datePlaceholder": "Choose a date",
    "fEmail": "Email",
    "fLoc": "Location",
    "fMsg": "Anything else I should know?",
    "fName": "Name",
    "fSend": "Send request",
    "fType": "Type of event",
    "footer": "Live saxophone for events in Ghent and surroundings",
    "vatLabel": "VAT",
    "heroLead": "Live background saxophone for every moment. Warm music that adapts to your event, from the first guest to the last glass.",
    "langLabel": "Language",
    "lblEmail": "Email",
    "lblRegion": "Area",
    "lblSound": "Sound",
    "logoSub": "Saxophone",
    "navAbout": "About",
    "navBook": "Book a date",
    "navOcc": "Occasions",
    "navRev": "Reviews",
    "navVid": "Videos",
    "o1d": "Ceremony, cocktail hour, dinner and the first dance.",
    "o1t": "Weddings",
    "o2d": "Warm, easy-going sax while your guests mingle.",
    "o2t": "Receptions",
    "o3d": "Openings, award nights, staff parties and launches.",
    "o3t": "Corporate events",
    "o4d": "Relaxed, jazzy sets for bars, terraces and dinner service.",
    "o4t": "Hotels & lounges",
    "o5d": "Birthdays, anniversaries — anything worth celebrating.",
    "o5t": "Private parties",
    "occLead": "Every occasion calls for something different, and we'll talk it through together beforehand.",
    "occTitle": "For every occasion",
    "options": [
      {
        "label": "Wedding"
      },
      {
        "label": "Reception"
      },
      {
        "label": "Corporate event"
      },
      {
        "label": "Hotel or lounge"
      },
      {
        "label": "Private party"
      },
      {
        "label": "Something else"
      }
    ],
    "portraitAlt": "Lorenz Baele playing saxophone on stage",
    "photoCredit": "Photo",
    "priceLabel": "Price",
    "priceText": "From €200",
    "regionText": "Ghent and surroundings",
    "revTitle": "Reviews",
    "reviews": [],
    "soundText": "Own sound system",
    "v1": "Wedding — reception",
    "v2": "Corporate event",
    "v3": "Hotel lounge",
    "vMeta": "Video coming soon",
    "vidLead": "The first videos are on their way. Curious what it sounds like?",
    "vidLink": "Send me a message →",
    "vidTitleA": "Watch me",
    "vidTitleB": "live",
    "pageTitle": "Lorenz Baele — Live saxophone",
    "selectPlaceholder": "Choose a type of event",
    "errName": "Please fill in your name.",
    "errEmail": "Please enter a valid email address.",
    "errDate": "Please choose the date of your event.",
    "errDatePast": "This date is in the past.",
    "errDateFar": "Please choose a date within the next 3 years.",
    "notGiven": "Not given",
    "formNote": "Fields marked * are required.",
    "errType": "Please choose the type of event.",
    "errLocation": "Please fill in the location of your event.",
    "mailSubject": "Booking request",
    "fSending": "Sending…",
    "formSuccess": "Thank you! Your request has been sent. I'll get back to you soon.",
    "formFailed": "Something went wrong while sending. Please try again or email me at lorenzbaele.booking@gmail.com."
  }
};

  // Web3Forms access key: sends form submissions to lorenzbaele.booking@gmail.com.
  // It is meant to be public, so it is fine in this file.
  var WEB3FORMS_KEY = '390736ed-cded-4464-9c2a-9718f4844fd9';
  var STAR = '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>';
  var current = 'nl';

  function renderReviews(list) {
    var track = document.getElementById('reviews-track');
    if (!track) return;
    track.innerHTML = '';
    [0, 1].forEach(function (copy) {
      list.forEach(function (r) {
        var wrap = document.createElement('div');
        wrap.className = 'review';
        if (copy) wrap.setAttribute('aria-hidden', 'true');
        var fig = document.createElement('figure');
        var stars = document.createElement('div');
        stars.className = 'stars';
        stars.setAttribute('aria-hidden', 'true');
        stars.innerHTML = STAR + STAR + STAR + STAR + STAR;
        var quote = document.createElement('blockquote');
        quote.textContent = r.quote;
        var who = document.createElement('figcaption');
        who.textContent = r.who;
        fig.appendChild(stars);
        fig.appendChild(quote);
        fig.appendChild(who);
        wrap.appendChild(fig);
        track.appendChild(wrap);
      });
    });
  }

  function fillSelects(t) {
    document.querySelectorAll('select[data-options]').forEach(function (sel) {
      var list = t[sel.getAttribute('data-options')] || [];
      var idx = sel.selectedIndex;
      sel.innerHTML = '';
      // Empty first option, so the visitor has to make a choice
      var placeholder = document.createElement('option');
      placeholder.value = '';
      placeholder.textContent = t.selectPlaceholder;
      placeholder.disabled = true;
      placeholder.defaultSelected = true;
      sel.appendChild(placeholder);
      list.forEach(function (o) {
        var opt = document.createElement('option');
        opt.textContent = o.label;
        sel.appendChild(opt);
      });
      sel.selectedIndex = idx > 0 && idx <= list.length ? idx : 0;
    });
  }

  function setLang(lang) {
    var t = TEXTS[lang] || TEXTS.nl;
    current = TEXTS[lang] ? lang : 'nl';
    document.documentElement.lang = current;
    if (t.pageTitle) document.title = t.pageTitle;

    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      if (t[key] != null) el.textContent = t[key];
    });
    document.querySelectorAll('[data-i18n-attr]').forEach(function (el) {
      el.getAttribute('data-i18n-attr').split(';').forEach(function (pair) {
        var parts = pair.split(':');
        if (parts.length === 2 && t[parts[1]] != null) el.setAttribute(parts[0], t[parts[1]]);
      });
    });
    fillSelects(t);
    renderReviews(t.reviews || []);

    document.querySelectorAll('.lang-toggle button').forEach(function (b) {
      b.setAttribute('aria-pressed', String(b.getAttribute('data-lang') === current));
    });
    try { localStorage.setItem('lang', current); } catch (e) { /* storage unavailable */ }
  }

  document.querySelectorAll('.lang-toggle button').forEach(function (b) {
    b.addEventListener('click', function () { setLang(b.getAttribute('data-lang')); });
  });

  /* ----- Booking form: validated here, sent through Web3Forms ----- */
  function formatDate(value) {
    var m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value || '');
    return m ? m[3] + '/' + m[2] + '/' + m[1] : (value || '');
  }

  // Local date as YYYY-MM-DD, the format of <input type="date">
  function isoDate(d) {
    return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
  }

  var MAX_YEARS_AHEAD = 3;

  function dateRange() {
    var today = new Date();
    var max = new Date(today.getFullYear() + MAX_YEARS_AHEAD, today.getMonth(), today.getDate());
    return { min: isoDate(today), max: isoDate(max) };
  }

  // Each rule returns the TEXTS key of the error message, or null when the value is fine
  var RULES = {
    name: function (v) { return v.trim().length >= 2 ? null : 'errName'; },
    email: function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) ? null : 'errEmail'; },
    date: function (v) {
      if (!/^\d{4}-\d{2}-\d{2}$/.test(v)) return 'errDate';
      var range = dateRange();
      if (v < range.min) return 'errDatePast';
      if (v > range.max) return 'errDateFar';
      return null;
    },
    type: function (v) { return v ? null : 'errType'; },
    location: function (v) { return v.trim().length >= 2 ? null : 'errLocation'; }
  };

  // Shows or clears the message under a field. The message carries data-i18n,
  // so switching language translates it along with the rest of the page.
  function checkField(el) {
    var key = RULES[el.name](el.value);
    var msg = document.getElementById('err-' + el.name);
    el.setAttribute('aria-invalid', String(!!key));
    if (key) {
      msg.setAttribute('data-i18n', key);
      msg.textContent = TEXTS[current][key];
      msg.hidden = false;
    } else {
      msg.removeAttribute('data-i18n');
      msg.textContent = '';
      msg.hidden = true;
    }
    return !key;
  }

  var form = document.getElementById('booking-form');
  if (form) {
    var range = dateRange();
    form.elements.date.min = range.min;
    form.elements.date.max = range.max;

    // The browser's own empty date text (like "dd/mm/yyyy") depends on the visitor's
    // settings, so it is covered by our own placeholder while the field is empty
    var dateInput = form.elements.date;
    function updateDatePlaceholder() {
      dateInput.parentNode.classList.toggle('is-empty', !dateInput.value);
    }
    dateInput.addEventListener('input', updateDatePlaceholder);
    dateInput.addEventListener('change', updateDatePlaceholder);
    // Open the calendar when clicking anywhere in the field, not just on the icon
    dateInput.addEventListener('click', function () {
      try { dateInput.showPicker(); } catch (e) { /* not supported: the browser's default behaviour applies */ }
    });

    Object.keys(RULES).forEach(function (fieldName) {
      var el = form.elements[fieldName];
      // Check when leaving a filled-in field; once marked invalid, re-check while correcting
      el.addEventListener('blur', function () { if (el.value) checkField(el); });
      el.addEventListener(el.tagName === 'SELECT' ? 'change' : 'input', function () {
        if (el.getAttribute('aria-invalid') === 'true') checkField(el);
      });
    });

    var sendButton = form.querySelector('button[type="submit"]');
    var status = document.getElementById('form-status');
    var sending = false;

    // Shows a translated message; data-i18n keeps it in sync when switching language
    function showText(el, key) {
      el.setAttribute('data-i18n', key);
      el.textContent = TEXTS[current][key];
    }

    function showStatus(key, isError) {
      showText(status, key);
      status.classList.toggle('form-status-error', isError);
      status.hidden = false;
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (sending) return;
      status.hidden = true;

      var invalid = Object.keys(RULES)
        .map(function (fieldName) { return form.elements[fieldName]; })
        .filter(function (el) { return !checkField(el); });
      if (invalid.length) {
        invalid[0].focus();
        return;
      }

      var f = form.elements;
      var type = f.type.value;
      var when = formatDate(f.date.value);
      // Field names become the labels in the email, so they are in Dutch
      var data = {
        access_key: WEB3FORMS_KEY,
        subject: TEXTS.nl.mailSubject + ' – ' + type + ' – ' + when,
        from_name: 'lorenzbaele.be',
        replyto: f.email.value.trim(),
        botcheck: f.botcheck.checked,
        'Naam': f.name.value.trim(),
        'E-mail': f.email.value.trim(),
        'Datum': when,
        'Soort event': type,
        'Locatie': f.location.value.trim(),
        'Bericht': f.message.value.trim() || TEXTS.nl.notGiven,
        'Taal van de bezoeker': current === 'en' ? 'Engels' : 'Nederlands'
      };

      sending = true;
      sendButton.disabled = true;
      showText(sendButton, 'fSending');

      fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(data)
      })
        .then(function (res) { return res.json(); })
        .then(function (json) {
          if (!json.success) throw new Error(json.message);
          form.reset();
          updateDatePlaceholder();
          fillSelects(TEXTS[current]);
          showStatus('formSuccess', false);
        })
        .catch(function () {
          showStatus('formFailed', true);
        })
        .then(function () {
          sending = false;
          sendButton.disabled = false;
          showText(sendButton, 'fSend');
        });
    });
  }

  /* ----- Fade in .reveal elements when they scroll into view ----- */
  if ('IntersectionObserver' in window) {
    document.documentElement.classList.add('reveal-on');
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
    document.querySelectorAll('.reveal').forEach(function (el) { observer.observe(el); });
  }

  var saved = null;
  try { saved = localStorage.getItem('lang'); } catch (e) { /* storage unavailable */ }
  setLang(saved === 'en' ? 'en' : 'nl');
})();
