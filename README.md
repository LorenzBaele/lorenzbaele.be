# lorenzbaele.be

Static site for GitHub Pages: Home (`index.html`) and Agenda (`agenda.html`). Bands, Bio and the band pages stay offline for now.

## Going live

1. Create a repo on GitHub (for example `lorenzbaele.be`) and push the contents of this folder to `main`.
2. In the repo: Settings > Pages > Source "Deploy from a branch", branch `main`, folder `/ (root)`.
3. Custom domain: `lorenzbaele.be` (the `CNAME` file is already there).
4. DNS at Hoasted for lorenzbaele.be:
   - A records for `@`: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - AAAA records for `@`: `2606:50c0:8000::153`, `2606:50c0:8001::153`, `2606:50c0:8002::153`, `2606:50c0:8003::153`
   - CNAME for `www`: `lorenzbaele.github.io`
5. Once the domain shows green in Pages: tick "Enforce HTTPS".

## Gigs

All gigs are read from one source, in `js/optredens.js`:

- Paste the CSV link of your published "Website" tab into `SHEET_CSV_URL`.
- As long as that's empty, the site reads `data/optredens.csv`.

Columns: `Date, Time, Band, Project, Venue, Location` (date as dd-mm-yyyy, time as hh:mm).
A gig stays under "Binnenkort" up to and including its date, then moves to "Eerder" by itself. Bands other than your three main bands are shown as "Ander project".
