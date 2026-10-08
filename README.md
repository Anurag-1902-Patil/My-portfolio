# Anurag Patil — Portfolio

Personal portfolio for Anurag Patil, a second-year B.Tech Information Technology student at Pune Vidyarthi Griha's College of Engineering and Technology (PVG's COET), Pune. Built with React, TypeScript, and Vite; deployed on Vercel.

## Run locally

From the `app` folder:

```bash
npm install
npm run dev
```

Useful checks:

```bash
npm run build
npm run lint
```

## Where to make common changes

Most portfolio content is kept in `src/data/`, separate from the page layouts:

| What you want to change | Where to edit |
| --- | --- |
| Name, headline, college, degree, email, current focus | `src/data/site.ts` |
| Jobs, internships, leadership, hackathons | `src/data/experience.ts` |
| Projects, descriptions, technologies, and links | `src/data/projects.ts` |
| Skills and achievements | `src/data/skills.ts` and `src/data/achievements.ts` |
| Blog posts | `src/data/blogs.ts` |
| Event photos and videos | `src/data/gallery.ts` |
| Home page sections and highlights | `src/sections/home/` |
| Page navigation and routes | `src/components/layout/Navbar.tsx`, `src/components/layout/Footer.tsx`, and `src/App.tsx` |

Edit an existing entry or copy an object in the relevant data file, give the copy a unique `id` (or `slug` for a project), and change its values. Keep entries in the same TypeScript shape so the site can check required fields for you.

### Update education or profile details

Edit the `site` object in `src/data/site.ts`. The home page, About page, and resume summary reuse that information. Page titles and search/social descriptions are in `index.html` and the relevant page's `<Seo>` component.

### Add a job or internship

Add an object to the `experience` array in `src/data/experience.ts`. Set `category: 'WORK'`, then fill in the role title, organization, dates, summary, responsibilities, and tags. The Experience page reads from this list. The small highlight row on the home page is in `src/sections/home/Hero.tsx`.

### Add a blog post

Add an object to the `blogs` array in `src/data/blogs.ts`:

```ts
{
  id: 'first-hackathon-notes',
  date: '2026-10-08',
  title: 'What I learned at my first hackathon',
  excerpt: 'A short introduction shown before the article is expanded.',
  body: ['Write the first paragraph here.', 'Add another paragraph here.'],
  tags: ['Hackathon', 'Learning'],
}
```

Each post appears on `/blog`; visitors can expand it to read the full text.

### Add event photos or videos

Copy your own media files into `public/gallery/`, then add a matching object to the `gallery` array in `src/data/gallery.ts`. Public files use a site path such as `/gallery/hackathon-team.jpg`.

```ts
{
  id: 'college-hackathon-team',
  title: 'Building with the team',
  event: 'College Hackathon',
  date: '2026-10-08',
  caption: 'A short note about this moment.',
  type: 'image',
  src: '/gallery/hackathon-team.jpg',
  alt: 'Our team standing together at the event',
}
```

For a video, use `type: 'video'`, set `src` to an MP4 file path, and provide descriptive `alt` text (used for the accessible player label). An optional `poster: '/gallery/hackathon-video-cover.jpg'` displays a cover before playback. Add your own images only; the gallery starts empty.

### Add a project

Copy a project object in `src/data/projects.ts`, give it a unique `slug`, and update its summary, stack, links, and case study. Project links support the kinds defined in `src/types/index.ts`. The case-study page uses the slug, so the project becomes available at `/projects/your-slug`.

## Project structure

- `src/pages/` — route-level pages, including Blog and Gallery.
- `src/sections/` — reusable sections on the home page.
- `src/components/` — shared UI, navigation, and layout.
- `src/data/` — editable portfolio content.
- `src/types/` — TypeScript shapes for content entries.
- `public/` — static assets served as-is; put gallery media in `public/gallery/`.

After checking the site locally with `npm run dev`, run `npm run build` and `npm run lint`. Push the branch connected to Vercel to publish the changes.
