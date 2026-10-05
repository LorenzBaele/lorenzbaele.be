# Lorenz Baele — website

Static one-page site (Dutch by default, English via the NL/EN switch).

## Files

- `index.html` — the page
- `style.css` — all styling
- `main.js` — texts for both languages, language switch, reviews banner, contact form
- `lorenz.jpg` — portrait in the "Over mij" section
- `CNAME` — custom domain for GitHub Pages. Temporarily removed while the lorenzbaele.be DNS is being set up; the site is at https://lorenzbaele.github.io/lorenzbaele.be/ until then.

## GitHub Pages

Repository → Settings → Pages → Deploy from a branch → `main` / `(root)`.

## Changing things

- **Texts:** in `main.js`, inside `TEXTS` (`nl` and `en`). Change both languages.
- **Contact form:** see below.

## Contact form (Web3Forms)

The site has no server of its own, so the booking form is sent through [Web3Forms](https://web3forms.com). It forwards every submission as an email to lorenzbaele.booking@gmail.com.

**How it works**

1. The visitor fills in the form. `main.js` checks the fields first (see *Validation* below).
2. `main.js` sends the data to `https://api.web3forms.com/submit` together with the access key.
3. Web3Forms emails it to the address the key belongs to. The visitor sees a thank-you message, or an error message with the booking email address as a fallback.

**The access key**

- Stored as `WEB3FORMS_KEY` at the top of `main.js`.
- It is meant to be public: it only lets someone send a form *to* you, not read anything. It is fine in the code and on GitHub.
- The key decides where the emails go. To receive them at another address, request a new key at web3forms.com with that address and replace `WEB3FORMS_KEY`.

**The email you receive**

- From: `lorenzbaele.be`
- Subject: `Boekingsaanvraag – <soort event> – <datum>`, e.g. `Boekingsaanvraag – Receptie – 12/06/2027`
- Fields with Dutch labels: Naam, E-mail, Datum, Soort event, Locatie, Bericht and the visitor's language. Empty optional fields say "Niet opgegeven". The event type is in the visitor's language.
- Replying goes straight to the visitor (Web3Forms sets reply-to to their email address).

**Spam**

A hidden `botcheck` checkbox in `index.html` acts as a trap: people never see it, bots tick it, and Web3Forms drops those submissions.

**Validation**

Rules live in `RULES` in `main.js`; error texts are the `err…` keys in `TEXTS` (both languages).

| Field | Rule |
|---|---|
| Naam * | at least 2 characters, max 100 |
| E-mail * | must look like an email address, max 254 |
| Datum * | today up to 3 years ahead (`MAX_YEARS_AHEAD`) |
| Soort event * | an option must be chosen |
| Locatie | optional, max 150 |
| Bericht | optional, max 2000 |

Maximum lengths are the `maxlength` attributes in `index.html`. Required fields have `required` and `class="is-required"` on their label, which adds the `*`.

**Adding a field**

1. Add it to the form in `index.html`, with a label using `data-i18n`.
2. Add the label text to `TEXTS` in `main.js` (`nl` and `en`).
3. Add it to `data` in the submit handler in `main.js`; the name you use there becomes its label in the email.
4. Required? Add a rule to `RULES`, an `err…` text in both languages, and a `<p class="field-error" id="err-NAME" hidden></p>` under the field.

**Free plan limits**

250 submissions per month, which is plenty for booking requests. Check web3forms.com for the current limits.

**Testing**

Every test submission sends a real email, also when running the site locally. If emails don't arrive, check the spam folder first and mark the first one as "Not spam".

## Hidden until there is media

The banner video, the videos section and the reviews section are hidden with the `hidden` attribute, so the markup stays ready to bring back.

**Banner video** — in `index.html`, remove `hidden` from `<div class="hero-media">` and put this inside `<div class="hero-video">` (replace `VIDEO_ID` twice):

```html
<iframe
  src="https://www.youtube-nocookie.com/embed/VIDEO_ID?autoplay=1&amp;mute=1&amp;loop=1&amp;playlist=VIDEO_ID&amp;controls=0&amp;playsinline=1&amp;rel=0&amp;modestbranding=1"
  title="Lorenz Baele speelt saxofoon"
  allow="autoplay; encrypted-media; picture-in-picture"
  tabindex="-1"></iframe>
```

**Videos section** — in `index.html`, remove `hidden` from three places: `<section id="videos">`, the "Video's" link in the menu and the "Bekijk video's" button in the hero. Then replace a `<div class="video-ph">…</div>` block with

```html
<div class="video-ph"><iframe src="https://www.youtube-nocookie.com/embed/VIDEO_ID" title="…" allow="encrypted-media; picture-in-picture" allowfullscreen></iframe></div>
```

and remove the matching "Video volgt binnenkort" label. Also update `vidLead` in `main.js` (both languages), which still says the videos are on their way.

**Reviews** — in `index.html`, remove `hidden` from `<section id="reviews">` and from the "Reviews" link in the menu. Then fill `reviews` in `main.js`, in both `nl` and `en`:

```js
"reviews": [
  { "quote": "“What the client said.”", "who": "Name · Type of event" },
  { "quote": "“…”", "who": "…" }
],
```

The reviews scroll by in a loop, so add at least four or five.
