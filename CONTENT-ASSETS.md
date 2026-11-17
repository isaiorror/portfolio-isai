# Pending portfolio assets

The interface includes clearly marked placeholders for these materials. Add optimized web assets to `public/` and update the paths in `src/app/page.tsx`.

## Showreel
- The Hero **Watch showreel** button opens `public/SENIOR PRODUCER ISAI.mp4` on demand.
- The video is not loaded automatically, protecting initial and mobile performance.
- Optional future improvement: add an optimized poster and a Vimeo or YouTube version.

## CV
- The English CV is available at `public/isai-rodriguez-cv.pdf` and linked from the Hero and Contact sections.
- Its editable source is `scripts/build_cv.py`; regenerate the PDF after any content changes.

## Costa Maya
- Add one lead photograph or compressed B-roll poster image.
- Optional: add an optimized B-roll excerpt or external video embed.
- Replace the placeholders in Selected Work and the Costa Maya case study.

## Tlajtoli 2026
- Selected Work uses `public/FOTO TLAJ.jpg`, as selected by the user.
- The existing case-study video remains in place.

## Production systems
- The section shows six production-system categories. The document-gallery placeholders were removed at the user's request.

## CNP case study
- Uses `public/pantalla tri.jpg` and `public/tri.jpg`, displayed at their natural proportions.

## UGC - Style Ad Formats
- Includes both existing HUBWELL videos and `public/AALATAM V4.mp4`.
- Videos use native controls, inline playback and no automatic preloading or playback.

## Future bilingual version
- Repeatable content is centralized near the top of `src/app/page.tsx`.
- The header reserves the `EN / ES` control. It is currently informational and does not switch languages.
