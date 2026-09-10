# Jesus in Africa (JIA) — React Rebuild

A from-scratch React + Tailwind CSS recreation of the jesusinafrica.org
structure and layout: sticky header with a "Connect" dropdown, animated
mobile menu, hero, mission cards, welcome/about section, media/video
section, autoplay testimonial slider, events grid, CTA section, newsletter
signup, and footer — plus dedicated pages for About, Posts, Events, Connect,
Testimonies, Prayer, Contact, and Donate.

All copy, testimonials, events, and posts are **original placeholder
content** meant to be replaced with the ministry's real material.

## Getting started

```bash
npm install
npm run dev
```

Then open the local URL Vite prints (usually `http://localhost:5173`).

To build for production:

```bash
npm run build
npm run preview
```

## Project structure

```
src/
├── assets/          # local images/icons/videos you add during development
├── components/
│   ├── common/      # Button, Container, SectionHeading, PageHero, etc.
│   ├── layout/      # Header, Navbar, MobileMenu, Footer, PageLayout
│   ├── home/        # Hero, MissionCards, WelcomeSection, MediaSection, ...
│   ├── testimonials/
│   ├── events/
│   └── forms/       # NewsletterForm, ContactForm, PrayerForm
├── pages/           # One file per route
├── data/            # navigation.js, testimonials.js, events.js, posts.js
├── hooks/           # useScrollAnimation, useMediaQuery
└── utils/           # helpers.js
```

## Replacing images

Public-facing images are referenced from `/public/images/...` (e.g.
`/images/hero.jpg`). Drop real files into `public/images/` using the
filenames listed in `public/images/README.md`, or update the `image` /
`src` paths in the relevant component or data file.

## Updating testimonials

Edit `src/data/testimonials.js`. Each entry is:

```js
{ id, name, location, image, quote }
```

Add, remove, or edit entries — the `TestimonialSlider` and `Testimonies`
page both read from this same array, so you only edit content in one place.

## Updating events

Edit `src/data/events.js`. Each entry is:

```js
{ id, title, description, date, image }
```

Both the homepage `EventsSection` and the `/events` page pull from this
array via the shared `EventGrid` / `EventCard` components.

## Updating posts

Edit `src/data/posts.js` the same way — `{ id, title, excerpt, image, date, category }`.

## Connecting forms to a real backend

`NewsletterForm.jsx`, `ContactForm.jsx`, and `PrayerForm.jsx` each contain a
small mock submit function near the top of the file, e.g.:

```js
async function mockSubscribe(values) {
  await new Promise((resolve) => setTimeout(resolve, 1200))
  if (!values.email) throw new Error('Email is required')
  return { ok: true }
}
```

Replace the body of that function with a real API call, for example:

```js
async function mockSubscribe(values) {
  const response = await fetch('/api/newsletter', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(values),
  })
  if (!response.ok) throw new Error('Subscription failed')
  return response.json()
}
```

The surrounding validation, loading, success, and error states will keep
working unchanged.

## Adding a real video

Open `src/components/home/MediaSection.jsx` and set:

```js
const VIDEO_EMBED_URL = 'https://www.youtube.com/embed/VIDEO_ID?autoplay=1'
```

## Deploying to Vercel

1. Push this project to a GitHub repository.
2. Go to [vercel.com/new](https://vercel.com/new) and import the repository.
3. Vercel auto-detects a Vite project — leave the build command as
   `npm run build` and the output directory as `dist`.
4. Click **Deploy**. Vercel will give you a live URL, and future pushes to
   your main branch will redeploy automatically.

You can also deploy from the CLI:

```bash
npm install -g vercel
vercel
```
