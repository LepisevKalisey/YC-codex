# YC Codex

This project uses Next.js with TypeScript and MDX to render the translated YC lecture series.

## Setup

Install dependencies and start the development server:

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
npm start
```

## Content

Markdown files live in the `content/` folder. `letter.md` is the introduction and each lecture file (`chapterXX_ru.md`) begins with a heading that has an anchor like `{#lecture-1}`. These anchors are used for linking from the main article.

## Deploying to Coolify

1. Create a new Next.js application in Coolify and link it to this repository.
2. Set the build command to `npm run build` and the start command to `npm start`.
3. Choose a Node.js version supported by Next.js (18 or later).
4. Deploy the application. Coolify will run the build and start commands to serve the production build.
