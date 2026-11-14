# rittwage.com

A single-page version of the old rittwage.com site. All of the personal pages and both
preservation projects now live in **`index.html`**, with the section navigation on the left.

## How it works

- Every section is a `<section class="page" id="...">` inside `index.html`.
- Navigation links use hashes (`#disk-database`, `#c64-registry`, …); JavaScript shows one
  section at a time without loading another page.
- CSS and JavaScript for the page are inline in `index.html`. There are no external
  frameworks or tracking scripts.
- The two databases are loaded on demand from the JSON files in the repository root:
  - `disks.json` — C64PP disk database
  - `c64.json` — Commodore 64 serial registry
- Badge/keyboard pictures used by the C64 registry and entry form are in `assets/img/c64/`.
- In the C64 registry, click a badge, keyboard picture or pre-serial value to filter the
  table; click it again (or use **Clear filters**) to remove that filter.
- The Rapidlok handbooks remain standalone documents in `RL1_Notes_v10/`,
  `RL2_Notes_v11/` and `RL6Handbook_v130/`; the three corresponding sections embed them
  in an iframe, just like the old site did.

## Updating content

Edit the relevant section in `index.html` directly. Searching for the visible heading or the
`id="..."` value is the quickest way to find one.

To update a registry, replace the corresponding `.json` file. No rebuild step is needed.

## Local preview

The registry pages use `fetch()` to load the JSON files, which browsers block when a page
is opened directly from disk. Serve the folder instead:

```sh
python -m http.server 8000
```

Then open <http://localhost:8000/>.

## Assets and downloads

- `assets/img/` — logos, screenshots and registry type pictures
- `archive/` and `files/` — emulator, disk-image and text downloads
- `RL*/` — standalone Rapidlok documentation
