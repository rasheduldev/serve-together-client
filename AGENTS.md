<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Project

Single Next.js 16.4.3 App Router app (no monorepo). React 19.3, TypeScript strict, Tailwind CSS v4, shadcn v4. Source lives in `src/`; `@/*` maps to `src/*`. Entry: `src/app/layout.tsx` + `src/app/page.tsx`.

- `reactCompiler: true` in `next.config.ts` — React Compiler is active. Don't add manual `memo`/`useMemo` micro-optimizations and don't disable it.
- Turbopack is the bundler; CSS goes through the `@tailwindcss/turbopack` rule in `next.config.ts`.

## Commands

- `npm run dev` — dev server (Turbopack)
- `npm run lint` — ESLint flat config (`eslint.config.mjs`)
- `npm run build` — production build
- No test or typecheck script exists: verify types with `npx tsc --noEmit`.

## UI stack gotchas

- shadcn style is `base-nova` (`components.json`), built on `@base-ui/react` — **not Radix**. Generated components land in `src/components/ui/` and import primitives from `@base-ui/react`. Don't add Radix packages.
- Tailwind v4 is CSS-first: there is no `tailwind.config`. Theme tokens live in `src/app/globals.css` (`@theme inline` + `:root`/`.dark` oklch variables). Dark mode uses the `.dark` class via `@custom-variant` — not `prefers-color-scheme`.
- `cn` comes from the `cn` npm package, re-exported from `src/lib/utils.ts`. Don't add `clsx`/`tailwind-merge` helpers.
- Add more components with `npx shadcn add <component>` so they match the base-nova style and aliases.
