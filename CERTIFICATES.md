# Adding a certificate

The certificates page lives at **`/certificates`** and is linked from the **Certificates** tab in the top navigation.
It is driven entirely by one data file, so adding a certificate never needs any layout or styling changes.

> **For AI agents:** follow the steps below exactly. Only touch the files named here. Do not change
> `src/pages/CertificatesPage.tsx`, the nav, or any styles unless the user explicitly asks.

## Files involved

| File | What it holds |
| --- | --- |
| `public/certificates/<slug>.webp` | The certificate image shown on the page |
| `src/data/certificates.ts` | The list of certificates (title, issuer, date, link, …) |

## Steps

### 1. Pick a slug

A short, lowercase, hyphenated id, unique in the list, usually `issuer-course`.
Examples: `nptel-cyber-security`, `100xdevs-cohort-3`, `aws-cloud-practitioner`.

### 2. Add the image

Convert the certificate to **WebP, 1600 px wide**, and save it as `public/certificates/<slug>.webp`.
Keep the original full-size file outside the repo (the owner keeps originals in `../portfolio-originals/`).

With [sharp](https://sharp.pixelplumbing.com/) (Node):

```bash
node -e "require('sharp')('path/to/original.jpg').rotate().resize({width:1600,withoutEnlargement:true}).webp({quality:82}).toFile('public/certificates/<slug>.webp').then(i=>console.log(i.width,i.height))"
```

It prints the final `width height`. You need them for `ratio` in the next step.
Any other tool works too (Squoosh, ImageMagick `magick in.jpg -resize 1600x out.webp`).
Aim for an image under about 200 KB.

### 3. Add an entry to `src/data/certificates.ts`

Add an object to the `certificates` array. **Newest first:** put it at the top, unless the user asks otherwise.

```ts
{
  slug: "aws-cloud-practitioner",
  title: "AWS Certified Cloud Practitioner",   // as written on the certificate
  issuer: "Amazon Web Services",               // e.g. "NPTEL · IIT Madras", "Coursera · Google"
  date: "Dec 2026",                            // display text: "Dec 2026" or "Jul–Oct 2026"
  detail: "Foundational",                      // optional: duration, credits, level…
  badge: "Elite",                              // optional: short tag shown as a navy pill
  verifyUrl: "https://…",                      // optional: public verification link
  image: "/certificates/aws-cloud-practitioner.webp",
  ratio: 1600 / 1236,                          // width / height of the WebP from step 2
  category: "Engineering",                     // "Engineering" | "Business" | "Security" | "Other"
},
```

Field rules:

- `title`, `issuer`, `date`, `image`, `ratio` and `category` are **required**.
- `detail`, `badge` and `verifyUrl` are **optional**. Leave them out rather than using empty strings.
- Don't include scores or percentages unless the user asks for them.
- Don't invent a `verifyUrl`. Only use a link printed on the certificate or given by the user.
- A new category needs two changes: add it to the `category` union type at the top of the file, then use it.
  The filter tabs on the page pick it up automatically.

### 4. Check it

```bash
npm run build      # must pass (type-checks the data file)
npm run dev        # then open http://localhost:5173/certificates
```

Confirm the new card shows, its image loads, and clicking it opens the full-size view.

### 5. Commit

```bash
git add public/certificates/<slug>.webp src/data/certificates.ts
git commit -m "Add <title> certificate"
```

The owner's preference: **commits and pushes are authored by the owner only. Do not add co-author or
"Generated with" lines.** Push only when asked.

## Removing or reordering

- **Remove:** delete the entry from `src/data/certificates.ts` and its file in `public/certificates/`.
- **Reorder:** move entries within the array. The page shows them in array order.
