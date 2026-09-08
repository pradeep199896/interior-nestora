# Managing the portfolio

Edit `lib/projects.ts`. Listing, homepage preview, detail routes and sitemap share this data.

The supplied `Interior_3D_Designs.pdf` identifies one residence with eight designs. “A Residence in Warm Neutrals” is a descriptive editorial title, not an invented client/project name. It is presented as Ongoing / Design Phase based on the request to showcase these designs. No execution progress, location, completion date or client requirement has been inferred. Fill in `name`, `location`, `projectType`, and `clientRequirement` when available. Palette, finishes, lighting and design notes come from the PDF.

For ongoing entries, use `status: 'Ongoing'`, a `phase`, `coverImage` and `designImages`. Each image has `src`, `label`, `alt`, and optional category. Categories apply to the project as a whole, so this one residence appears under all relevant room filters.

For completed entries, use `status: 'Completed'`, an actual finished `coverImage`, `galleryImages`, `videoUrl` (local browser-playable video path under /videos/, not a YouTube page; external hosts require updating the media-src security policy), and `videoDescription`. Optional `captionsUrl` accepts WebVTT. Videos are click-to-play, with `preload="none"`; use optimized H.264 MP4 with fast-start. Completed cards and the video-first detail layout activate automatically. Never assign reference media or 3D renders as completed photography. No completed entries are currently published because the existing source documentation calls the WhatsApp videos references. Optional designImages can be retained with a completed entry for future verified comparisons.

Regenerate render WebPs with `node scripts/prepare-project-media.mjs` (requires Poppler/pdfimages). Deployment uses committed WebPs and does not require Poppler or the PDF.

# Public site name

The app, package and linked Vercel project use Nestora Interiors / `nestora-interiors`. The header/footer use an emblem derived from the supplied Nestora logo, with a matching favicon. Production deployment targets `https://nestora-interiors.vercel.app`, with `NEXT_PUBLIC_SITE_URL` set to the same address.
