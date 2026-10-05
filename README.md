# Lorenz Baele — website

Static one-page site (Dutch by default, English via the NL/EN switch).

## Files

- `index.html` — the page
- `style.css` — all styling
- `main.js` — texts for both languages, language switch, reviews banner, contact form
- `lorenz.jpg` — portrait in the "Over mij" section
- `CNAME` — custom domain for GitHub Pages

## GitHub Pages

Repository → Settings → Pages → Deploy from a branch → `main` / `(root)`.

## Changing things

- **Texts:** in `main.js`, inside `TEXTS` (`nl` and `en`). Change both languages.
- **Contact form:** checked in `main.js` (`RULES`) and sent through [Web3Forms](https://web3forms.com) to the email address the access key (`WEB3FORMS_KEY` in `main.js`) was created for. The key is public by design. Free plan: 250 submissions per month.

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
