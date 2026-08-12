# AGENTS.md

## Stack

TanStack Start (SSR) + React 19 + TanStack Router (file-based routing) + Tailwind CSS v4 + Biome + Vitest. Bun runtime. React Compiler via Babel.

## Commands

```bash
bun --bun run dev          # dev server on :3000
bun --bun run build        # production build
bun --bun run test         # vitest run
bun --bun run lint         # biome lint
bun --bun run format       # biome format
bun --bun run check        # biome check (lint + format)
bun --bun run generate-routes  # regenerate route tree
```

## Code style

- Biome: tabs, double quotes, recommended rules.
- Generated files excluded from lint: `src/routeTree.gen.ts`, `src/styles.css`.
- Imports organized automatically by Biome (`organizeImports: on`).

## Path aliases

- `#/*` → `./src/*` (primary, used by shadcn and codebase)
- `@/*` → `./src/*` (also configured, use `#/*` to match existing convention)

## Routing

File-based routing in `src/routes/`. Add a file there → TanStack generates the route. Root layout: `src/routes/__root.tsx`.

After adding/changing routes, run `bun --bun run generate-routes` to update `src/routeTree.gen.ts`.

## Adding shadcn components

```bash
bunx --bun shadcn@latest add <component>
```

Style: `new-york`, base color: `zinc`, icons: `lucide`. Config in `components.json`.

## graphify

This project has a knowledge graph at graphify-out/ with god nodes, community structure, and cross-file relationships.

When the user types `/graphify`, use the installed graphify skill or instructions before doing anything else.

Rules:

- For codebase questions, first run `graphify query "<question>"` when graphify-out/graph.json exists. Use `graphify path "<A>" "<B>"` for relationships and `graphify explain "<concept>"` for focused concepts. These return a scoped subgraph, usually much smaller than GRAPH_REPORT.md or raw grep output.
- Dirty graphify-out/ files are expected after hooks or incremental updates; dirty graph files are not a reason to skip graphify. Only skip graphify if the task is about stale or incorrect graph output, or the user explicitly says not to use it.
- If graphify-out/wiki/index.md exists, use it for broad navigation instead of raw source browsing.
- Read graphify-out/GRAPH_REPORT.md only for broad architecture review or when query/path/explain do not surface enough context.
- After modifying code, run `graphify update .` to keep the graph current (AST-only, no API cost).
