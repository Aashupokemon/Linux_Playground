# Linux Playground

A beginner-friendly Linux learning app with 95 lessons across 11 categories. Every lesson includes a plain-language explanation, animated simulation, example commands, pitfalls, and five quiz questions.

## Run locally

Requires a current Node.js version compatible with Vite 8 (Node 22.12+ or 24 recommended).

```sh
npm install
npm run dev
```

Open the local address printed in the terminal. All commands shown in the course are simulated; this application never executes Linux commands on your computer.

## Check and build

```sh
npm run lint
npm run test
npm run build
npm run preview
```

`npm run test` validates the entire catalog and checks saved progress, the mastery threshold, invalid browser storage, and course navigation. The production build is written to `dist`.

## Learning features

- Categories by usage, difficulty filtering, and global command search.
- Animated file cards, directory scenes, text pipelines, process workers, permission cards, and network packets.
- Terminal typing, replay, pause, and step controls.
- Five questions per lesson, immediate feedback, retry, and next lesson.
- Mastery at 4/5 or better; best scores, last lesson, and theme saved in browser storage.
- Progress overview, category completion rings, dark/light themes, and mobile layout.
- Keyboard controls and reduced-motion support.

Progress belongs to the current browser and device. Clearing browser storage removes it. If storage is blocked, the app remains usable but progress lasts only for the current session.

## Content

Lessons are in `src/data`, with types in `src/types.ts`. Use the existing `cmd` and `q` helpers to add lessons. Each lesson needs a unique ID, a category, examples, animation steps, common mistakes, and exactly five questions. Sample output can differ between Linux distributions and machines. Some lessons cover shell syntax or concepts rather than executable programs.

## Browser regression check

`browser-check.mjs` exercises a complete quiz, persistence, search, resume, themes, and mobile overflow using Playwright and Microsoft Edge. Set `PLAYWRIGHT_MODULE_ROOT` to a directory containing a `package.json` whose dependencies include Playwright, or install Playwright locally. Start the dev server first, then run `node browser-check.mjs`. It writes desktop and mobile screenshots.

The interface uses Google Fonts when available and falls back to installed sans-serif fonts.
