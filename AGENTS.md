# AGENTS.md

## Stack

TanStack Start (SSR) + React 19 + TanStack Router (file-based routing) + Tailwind CSS v4 + Biome + Vitest. Bun runtime. React Compiler via Babel.

## Commands

```bash
bun --bun run dev                  # Dev server on http://localhost:3000
bun --bun run build                # Production build
bun --bun run test                 # Run all tests with Vitest
bun --bun vitest run <path/to/test> # Run a single test file
bun --bun run lint                 # Biome linting
bun --bun run format               # Biome formatting
bun --bun run check                # Biome check (lint + format)
bun --bun run generate-routes      # Regenerate route tree (tsr generate)
```

## Code Style & Formatting

- Biome configuration in `biome.json` (tabs for indentation, double quotes for strings).
- Generated/built files excluded from linting: `src/routeTree.gen.ts`, `src/styles.css`.
- Automatic import organization enabled (`organizeImports: on`).

## Path Aliases

- `#/*` → `./src/*` (primary convention, matches `package.json` imports and `components.json`)
- `@/*` → `./src/*` (supported in `tsconfig.json`; prefer `#/*`)

## Routing

- File-based routing in `src/routes/`. Root layout: `src/routes/__root.tsx`.
- After adding or modifying route files, run `bun --bun run generate-routes` to update `src/routeTree.gen.ts`.

## Adding Components (shadcn/ui)

```bash
bunx --bun shadcn@latest add <component>
```
Configuration in `components.json`: `style: new-york`, `baseColor: zinc`, `iconLibrary: lucide`.

## Knowledge Graph (graphify)

This project maintains a knowledge graph at `graphify-out/`.
- For codebase questions when `graphify-out/graph.json` exists, use `graphify query "<question>"`, `graphify path "<A>" "<B>"`, or `graphify explain "<concept>"`.
- If `graphify-out/wiki/index.md` exists, use it for high-level navigation.
- Read `graphify-out/GRAPH_REPORT.md` for broad architecture review.
- After modifying code files, run `graphify update .` to update the knowledge graph.

