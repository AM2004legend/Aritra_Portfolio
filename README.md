# Aritra Maity — Portfolio

My personal portfolio: a single-page site with a poster-style intro, a short profile, selected projects, hackathons, travel and contact.

Built with **React**, **TypeScript**, **Vite**, **Tailwind CSS v4**, **Framer Motion**, **Lenis** (smooth scroll) and **React Three Fiber** (the dotted sphere in the contact section).

## Getting started

Requires Node.js 20 or newer.

```bash
npm install
npm run dev       # start the dev server at http://localhost:5173
npm run build     # type-check and build to dist/
npm run preview   # serve the production build locally
```

## Project structure

```
public/
  photos/                 Web-optimised images used on the site
  certificates/           Certificate images (WebP, 1600px wide)
  Aritra_Maity_Resume.pdf Résumé (download link)
  resume-page-1.webp      Résumé preview shown in the pop-up
  favicon.svg
src/
  main.tsx                Entry point
  App.tsx                 Page layout: sections in order
  index.css               Theme tokens, fonts and shared styles
  lib/
    router.ts             Tiny two-page router ("/" and "/certificates")
  pages/
    CertificatesPage.tsx  Certificates page
  data/
    content.ts            All text and photo lists (edit this to update the site)
    certificates.ts       Certificate list (see CERTIFICATES.md)
  components/
    sections/             One file per page section
      Intro.tsx           "Hello / Meet / Aritra" poster intro
      Hero.tsx            Profile, arch portrait and "At a glance" card
      About.tsx           About text and group-photo grid
      Work.tsx            Project postcards
      LoveMarquee.tsx     Scroll-linked "LOVE ..." marquee
      Hackathons.tsx      Horizontal photo gallery and milestones
      Travel.tsx          Polaroid travel board
      Contact.tsx         Contact links, 3D sphere, footer skyline
    layout/
      Nav.tsx             Top navigation and scroll progress bar
      SmoothScroll.tsx    Lenis setup and scroll helpers
      ResumeModal.tsx     Résumé pop-up with download
    decor/
      Ornaments.tsx       SVG decorations (Greek key, skylines, bridge)
      InkSphere.tsx       Three.js dotted sphere
    ui/
      motion.tsx          Reusable animation helpers
```

## Updating content

Most changes only need [`src/data/content.ts`](src/data/content.ts):

- **Projects**: edit the `projects` array (name, one-line description, tags, links).
- **Skills, education, highlights**: the arrays near the top of the file.
- **Photos**: put the image in `public/photos/` and add it to `moments` (about grid), `photos` (hackathon gallery) or `travel` (polaroid board).
- **Certificates**: follow [`CERTIFICATES.md`](CERTIFICATES.md). One image plus one entry in `src/data/certificates.ts`.
- **Résumé**: replace `public/Aritra_Maity_Resume.pdf` and `public/resume-page-1.webp`.

## Deploying

The site is static. On Vercel or Netlify, import the repository and use the defaults for a Vite project (build command `npm run build`, output directory `dist`).
