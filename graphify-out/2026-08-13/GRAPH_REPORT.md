# Graph Report - webtoolkit  (2026-08-13)

## Corpus Check
- 170 files · ~101,227 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 926 nodes · 1517 edges · 119 communities (79 shown, 40 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 47 edges (avg confidence: 0.54)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `85c030ef`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- tool-page-layout.tsx
- What You Must Do When Invoked
- routeTree.gen.ts
- devDependencies
- dependencies
- color.ts
- biome.json
- FileRoutesByPath
- compilerOptions
- cn
- components.json
- package.json
- popover.tsx
- dropdown-menu.tsx
- tool-registry.ts
- card.tsx
- utils.ts
- What You Must Do When Invoked
- manifest.json
- ADDED Requirements
- theme-provider.tsx
- router.tsx
- favicon-generator
- robots-txt-builder
- graphify.js
- ADDED Requirements
- ADDED Requirements
- json-ld-builder
- meta-tag-generator
- open-graph-preview
- responsive-breakpoint-previewer
- CLAUDE.md
- WebToolkit Implementation Plan
- vite.config.ts
- Archived Change: Complete Coming Soon Tools
- OpenSpec Workflow
- OpenSpec Config
- ADDED Requirements
- ADDED Requirements
- .agents/skills/openspec-explore/SKILL.md
- .claude/skills/openspec-explore/SKILL.md
- .opencode/skills/openspec-explore/SKILL.md
- workflows/opsx-explore.md
- explore.md
- Architectural Design
- commands/opsx-explore.md
- ADDED Requirements
- graphify reference: extra exports and benchmark
- graphify reference: extra exports and benchmark
- scripts
- Global Constraints
- 2026-07-16-complete-coming-soon-tools/proposal.md
- 2026-07-16-complete-coming-soon-tools/tasks.md
- 2026-08-13-fix-code-output-theme/proposal.md
- graphify reference: query, path, explain
- graphify reference: query, path, explain
- Capability: code-output-display
- design.md
- graphify reference: add a URL and watch a folder
- graphify reference: commit hook and native CLAUDE.md integration
- graphify reference: incremental update and cluster-only
- graphify reference: add a URL and watch a folder
- graphify reference: commit hook and native CLAUDE.md integration
- graphify reference: incremental update and cluster-only
- graphify reference: GitHub clone and cross-repo merge
- graphify reference: transcribe video and audio
- graphify reference: GitHub clone and cross-repo merge
- graphify reference: transcribe video and audio
- Requirement: Theme-Responsive Code Output Display
- toggle.tsx
- rules/graphify.md
- .agents/skills/graphify/references/extraction-spec.md
- workflows/graphify.md
- babel-plugin-react-compiler
- .claude/CLAUDE.md
- .claude/skills/graphify/references/extraction-spec.md
- 2026-08-13-fix-code-output-theme/tasks.md
- prism-react-renderer
- @rolldown/plugin-babel
- @tailwindcss/typography
- @tanstack/devtools-vite
- @tanstack/router-cli
- @testing-library/dom
- @testing-library/react
- @types/dompurify
- @types/node
- typescript
- @vitejs/plugin-react
- vitest
- Route
- badge.tsx
- keycode-info.tsx
- markdown-preview.tsx
- @biomejs/biome

## God Nodes (most connected - your core abstractions)
1. `cn()` - 71 edges
2. `ToolPageLayout()` - 42 edges
3. `FileRoutesByPath` - 42 edges
4. `Label()` - 30 edges
5. `Input()` - 23 edges
6. `Button()` - 21 edges
7. `CodeOutput()` - 20 edges
8. `parseColor()` - 18 edges
9. `compilerOptions` - 17 edges
10. `Textarea()` - 16 edges

## Surprising Connections (you probably didn't know these)
- `favicon-generator` --references--> `React Logo 192px`  [INFERRED]
  openspec/specs/favicon-generator/spec.md → public/logo192.png
- `favicon-generator` --references--> `React Logo 512px`  [INFERRED]
  openspec/specs/favicon-generator/spec.md → public/logo512.png
- `robots-txt-builder` --conceptually_related_to--> `Public robots.txt`  [INFERRED]
  openspec/specs/robots-txt-builder/spec.md → public/robots.txt
- `CardAction()` --calls--> `cn()`  [EXTRACTED]
  src/components/ui/card.tsx → src/lib/utils.ts
- `CardFooter()` --calls--> `cn()`  [EXTRACTED]
  src/components/ui/card.tsx → src/lib/utils.ts

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Complete Coming Soon Tools** — capability_favicon_generator, capability_meta_tag_generator, capability_robots_txt_builder, capability_open_graph_preview, capability_responsive_breakpoint_previewer, capability_json_ld_builder [EXTRACTED 1.00]
- **Graphify Integration** — claude_md, graphify_concept [EXTRACTED 1.00]
- **OpenSpec Agent Skills** — openspec_concept [EXTRACTED 1.00]
- **Core Documentation** — readme_md, agents_md, claude_md [EXTRACTED 1.00]
- **WebToolkit Core Infrastructure** — src_lib_tool_registry, src_routes_app, src_components_command_palette, src_hooks_use_persisted_state [EXTRACTED 1.00]

## Communities (119 total, 40 thin omitted)

### Community 0 - "tool-page-layout.tsx"
Cohesion: 0.06
Nodes (46): CodeOutput(), CopyButton(), ToolPageLayout(), Button(), buttonVariants, Input(), Label(), Select() (+38 more)

### Community 1 - "What You Must Do When Invoked"
Cohesion: 0.08
Nodes (24): For /graphify add and --watch, For /graphify query, For the commit hook and native CLAUDE.md integration, For --update and --cluster-only, /graphify, Honesty Rules, Interpreter guard for subcommands, Part A - Structural extraction for code files (+16 more)

### Community 2 - "routeTree.gen.ts"
Cohesion: 0.04
Nodes (46): ColorsColorBlindnessRoute, ColorsColorConverterRoute, ColorsContrastCheckerRoute, ColorsGradientGeneratorRoute, ColorsPaletteGeneratorRoute, ColorsTailwindColorFinderRoute, ConvertersImageFormatConverterRoute, ConvertersImageToBase64Route (+38 more)

### Community 3 - "devDependencies"
Cohesion: 0.15
Nodes (13): jsdom, marked, devDependencies, jsdom, marked, @types/marked, @types/react, @types/react-dom (+5 more)

### Community 4 - "dependencies"
Cohesion: 0.05
Nodes (41): class-variance-authority, clsx, cmdk, cronstrue, dompurify, lucide-react, dependencies, class-variance-authority (+33 more)

### Community 5 - "color.ts"
Cohesion: 0.12
Nodes (32): contrastRatio(), formatHex(), formatHsl(), formatOklch(), formatRgb(), hexToRgb(), HSL, hslToRgb() (+24 more)

### Community 6 - "biome.json"
Cohesion: 0.07
Nodes (28): source, assist, actions, files, ignoreUnknown, includes, formatter, enabled (+20 more)

### Community 7 - "FileRoutesByPath"
Cohesion: 0.07
Nodes (28): Route, Route, Route, Route, Route, Route, Route, Route (+20 more)

### Community 8 - "compilerOptions"
Cohesion: 0.08
Nodes (24): DOM, DOM.Iterable, ES2022, **/*.ts, **/*.tsx, vite/client, compilerOptions, allowImportingTsExtensions (+16 more)

### Community 9 - "cn"
Cohesion: 0.12
Nodes (16): ColorSwatch(), DialogContent(), DialogDescription(), DialogFooter(), DialogHeader(), DialogOverlay(), DialogTitle(), ScrollArea() (+8 more)

### Community 10 - "components.json"
Cohesion: 0.11
Nodes (17): aliases, components, hooks, lib, ui, utils, iconLibrary, rsc (+9 more)

### Community 11 - "package.json"
Cohesion: 0.22
Nodes (8): imports, name, pnpm, onlyBuiltDependencies, private, type, esbuild, lightningcss

### Community 12 - "popover.tsx"
Cohesion: 0.25
Nodes (4): PopoverContent(), PopoverDescription(), PopoverHeader(), PopoverTitle()

### Community 13 - "dropdown-menu.tsx"
Cohesion: 0.15
Nodes (11): DropdownMenu(), DropdownMenuCheckboxItem(), DropdownMenuContent(), DropdownMenuItem(), DropdownMenuLabel(), DropdownMenuRadioItem(), DropdownMenuSeparator(), DropdownMenuShortcut() (+3 more)

### Community 14 - "tool-registry.ts"
Cohesion: 0.19
Nodes (10): CommandPalette(), useTheme(), Dialog(), useRecentTools(), allTools, findToolByPath(), Tool, ToolGroup (+2 more)

### Community 15 - "card.tsx"
Cohesion: 0.27
Nodes (8): Card(), CardAction(), CardContent(), CardDescription(), CardFooter(), CardHeader(), CardTitle(), Route

### Community 16 - "utils.ts"
Cohesion: 0.30
Nodes (7): Header(), Sidebar(), Tooltip(), TooltipContent(), TooltipProvider(), TooltipTrigger(), usePersistedState()

### Community 17 - "What You Must Do When Invoked"
Cohesion: 0.08
Nodes (24): For /graphify add and --watch, For /graphify query, For the commit hook and native CLAUDE.md integration, For --update and --cluster-only, /graphify, Honesty Rules, Interpreter guard for subcommands, Part A - Structural extraction for code files (+16 more)

### Community 18 - "manifest.json"
Cohesion: 0.25
Nodes (7): background_color, display, icons, name, short_name, start_url, theme_color

### Community 19 - "ADDED Requirements"
Cohesion: 0.10
Nodes (20): ADDED Requirements, Requirement: Dynamic form for Article type, Requirement: Dynamic form for BreadcrumbList type, Requirement: Dynamic form for FAQ type, Requirement: Dynamic form for LocalBusiness type, Requirement: Dynamic form for Organization type, Requirement: Dynamic form for Product type, Requirement: Generate valid JSON-LD output (+12 more)

### Community 20 - "theme-provider.tsx"
Cohesion: 0.21
Nodes (6): AppLayout(), Theme, ThemeContext, themeInitScript, ThemeProvider(), ThemeProviderState

### Community 21 - "router.tsx"
Cohesion: 0.33
Nodes (5): getRouter(), Register, @tanstack/react-router, Register, routeTree

### Community 22 - "favicon-generator"
Cohesion: 0.50
Nodes (4): favicon-generator, Favicon Generator Design, React Logo 192px, React Logo 512px

### Community 24 - "robots-txt-builder"
Cohesion: 0.67
Nodes (3): robots-txt-builder, robots.txt Builder Design, Public robots.txt

### Community 26 - "ADDED Requirements"
Cohesion: 0.13
Nodes (14): ADDED Requirements, Requirement: Input OG metadata manually, Requirement: Preview Discord card, Requirement: Preview Facebook card, Requirement: Preview LinkedIn card, Requirement: Preview Twitter/X card, Requirement: Switch between platform previews, Scenario: All fields populated (+6 more)

### Community 27 - "ADDED Requirements"
Cohesion: 0.14
Nodes (13): ADDED Requirements, Requirement: Add user-agent rule groups, Requirement: Apply preset configurations, Requirement: Configure crawl-delay, Requirement: Configure sitemap URL, Requirement: Generate robots.txt output, Scenario: Rules are configured, Scenario: User adds a path rule (+5 more)

### Community 39 - "ADDED Requirements"
Cohesion: 0.17
Nodes (11): ADDED Requirements, Requirement: Copy generated HTML, Requirement: Generate basic SEO meta tags, Requirement: Generate Open Graph meta tags, Requirement: Generate Twitter Card meta tags, Requirement: Live preview of generated HTML, Scenario: User copies output, Scenario: User fills in basic SEO fields (+3 more)

### Community 40 - "ADDED Requirements"
Cohesion: 0.17
Nodes (11): ADDED Requirements, Requirement: Display iframe load errors gracefully, Requirement: Input URL for preview, Requirement: Select device breakpoint presets, Requirement: Show current viewport dimensions, Requirement: View all breakpoints simultaneously, Scenario: Breakpoint is selected, Scenario: Iframe blocked by target site (+3 more)

### Community 41 - ".agents/skills/openspec-explore/SKILL.md"
Cohesion: 0.18
Nodes (10): Check for context, Ending Discovery, Guardrails, Handling Different Entry Points, OpenSpec Awareness, The Stance, What You Don't Have To Do, What You Might Do (+2 more)

### Community 42 - ".claude/skills/openspec-explore/SKILL.md"
Cohesion: 0.18
Nodes (10): Check for context, Ending Discovery, Guardrails, Handling Different Entry Points, OpenSpec Awareness, The Stance, What You Don't Have To Do, What You Might Do (+2 more)

### Community 43 - ".opencode/skills/openspec-explore/SKILL.md"
Cohesion: 0.18
Nodes (10): Check for context, Ending Discovery, Guardrails, Handling Different Entry Points, OpenSpec Awareness, The Stance, What You Don't Have To Do, What You Might Do (+2 more)

### Community 44 - "workflows/opsx-explore.md"
Cohesion: 0.20
Nodes (9): Check for context, Ending Discovery, Guardrails, OpenSpec Awareness, The Stance, What You Don't Have To Do, What You Might Do, When a change exists (+1 more)

### Community 45 - "explore.md"
Cohesion: 0.20
Nodes (9): Check for context, Ending Discovery, Guardrails, OpenSpec Awareness, The Stance, What You Don't Have To Do, What You Might Do, When a change exists (+1 more)

### Community 46 - "Architectural Design"
Cohesion: 0.20
Nodes (9): 1. Styles (`src/styles.css`), 2. Theme Context (`src/components/theme-provider.tsx`), 3. Anti-FOUC Script (`src/routes/__root.tsx`), 4. UI Layout & Components, Architectural Design, Design Spec: Light/Dark/System Theme Toggle, Goal, Requirements (+1 more)

### Community 47 - "commands/opsx-explore.md"
Cohesion: 0.20
Nodes (9): Check for context, Ending Discovery, Guardrails, OpenSpec Awareness, The Stance, What You Don't Have To Do, What You Might Do, When a change exists (+1 more)

### Community 48 - "ADDED Requirements"
Cohesion: 0.20
Nodes (9): ADDED Requirements, Requirement: Download generated favicons, Requirement: Generate favicon from emoji, Requirement: Generate favicon from uploaded image, Requirement: Generate HTML link tags, Scenario: Favicons are generated, Scenario: User downloads a favicon, Scenario: User selects an emoji (+1 more)

### Community 49 - "graphify reference: extra exports and benchmark"
Cohesion: 0.22
Nodes (8): graphify reference: extra exports and benchmark, Step 6b - Wiki (only if --wiki flag), Step 7 - Neo4j export (only if --neo4j or --neo4j-push flag), Step 7a - FalkorDB export (only if --falkordb or --falkordb-push flag), Step 7b - SVG export (only if --svg flag), Step 7c - GraphML export (only if --graphml flag), Step 7d - MCP server (only if --mcp flag), Step 8 - Token reduction benchmark (only if total_words > 5000)

### Community 50 - "graphify reference: extra exports and benchmark"
Cohesion: 0.22
Nodes (8): graphify reference: extra exports and benchmark, Step 6b - Wiki (only if --wiki flag), Step 7 - Neo4j export (only if --neo4j or --neo4j-push flag), Step 7a - FalkorDB export (only if --falkordb or --falkordb-push flag), Step 7b - SVG export (only if --svg flag), Step 7c - GraphML export (only if --graphml flag), Step 7d - MCP server (only if --mcp flag), Step 8 - Token reduction benchmark (only if total_words > 5000)

### Community 51 - "scripts"
Cohesion: 0.22
Nodes (9): scripts, build, check, dev, format, generate-routes, lint, start (+1 more)

### Community 52 - "Global Constraints"
Cohesion: 0.25
Nodes (7): Global Constraints, Light/Dark Theme Toggle Implementation Plan, Task 1: CSS Variables Refactor (`src/styles.css`), Task 2: Theme Context Provider & Anti-FOUC Script, Task 3: Header Component & Theme Toggle UI, Task 4: Command Palette Theme Integration, Task 5: Complete Suite Verification & Build Check

### Community 53 - "2026-07-16-complete-coming-soon-tools/proposal.md"
Cohesion: 0.29
Nodes (6): Capabilities, Impact, Modified Capabilities, New Capabilities, What Changes, Why

### Community 54 - "2026-07-16-complete-coming-soon-tools/tasks.md"
Cohesion: 0.29
Nodes (6): 1. Meta Tag Generator, 2. robots.txt Builder, 3. Favicon Generator, 4. Open Graph Preview, 5. Responsive Breakpoint Previewer, 6. JSON-LD Builder

### Community 55 - "2026-08-13-fix-code-output-theme/proposal.md"
Cohesion: 0.29
Nodes (6): Capabilities, Impact, Modified Capabilities, New Capabilities, What Changes, Why

### Community 56 - "graphify reference: query, path, explain"
Cohesion: 0.33
Nodes (5): For /graphify explain, For /graphify path, graphify reference: query, path, explain, Step 0 — Constrained query expansion (REQUIRED before traversal), Step 1 — Traversal

### Community 57 - "graphify reference: query, path, explain"
Cohesion: 0.33
Nodes (5): For /graphify explain, For /graphify path, graphify reference: query, path, explain, Step 0 — Constrained query expansion (REQUIRED before traversal), Step 1 — Traversal

### Community 58 - "Capability: code-output-display"
Cohesion: 0.29
Nodes (6): Capability: code-output-display, Purpose, Requirement: Theme-Responsive Code Output Display, Requirements, Scenario: Rendering in Dark Theme, Scenario: Rendering in Light Theme

### Community 59 - "design.md"
Cohesion: 0.33
Nodes (5): Context, Decision 1: Use Tailwind Semantic CSS Tokens for Background and Borders, Decisions, Goals / Non-Goals, Risks / Trade-offs

### Community 60 - "graphify reference: add a URL and watch a folder"
Cohesion: 0.50
Nodes (3): For /graphify add, For --watch, graphify reference: add a URL and watch a folder

### Community 61 - "graphify reference: commit hook and native CLAUDE.md integration"
Cohesion: 0.50
Nodes (3): For git commit hook, For native CLAUDE.md integration, graphify reference: commit hook and native CLAUDE.md integration

### Community 62 - "graphify reference: incremental update and cluster-only"
Cohesion: 0.50
Nodes (3): For --cluster-only, For --update (incremental re-extraction), graphify reference: incremental update and cluster-only

### Community 63 - "graphify reference: add a URL and watch a folder"
Cohesion: 0.50
Nodes (3): For /graphify add, For --watch, graphify reference: add a URL and watch a folder

### Community 64 - "graphify reference: commit hook and native CLAUDE.md integration"
Cohesion: 0.50
Nodes (3): For git commit hook, For native CLAUDE.md integration, graphify reference: commit hook and native CLAUDE.md integration

### Community 65 - "graphify reference: incremental update and cluster-only"
Cohesion: 0.50
Nodes (3): For --cluster-only, For --update (incremental re-extraction), graphify reference: incremental update and cluster-only

### Community 70 - "Requirement: Theme-Responsive Code Output Display"
Cohesion: 0.33
Nodes (5): ADDED Requirements, Purpose, Requirement: Theme-Responsive Code Output Display, Scenario: Rendering in Dark Theme, Scenario: Rendering in Light Theme

## Knowledge Gaps
- **419 isolated node(s):** `$schema`, `enabled`, `clientKind`, `useIgnoreFile`, `ignoreUnknown` (+414 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **40 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn()` connect `cn` to `tool-page-layout.tsx`, `toggle.tsx`, `popover.tsx`, `dropdown-menu.tsx`, `card.tsx`, `utils.ts`, `badge.tsx`?**
  _High betweenness centrality (0.033) - this node is a cross-community bridge._
- **Why does `dependencies` connect `dependencies` to `package.json`?**
  _High betweenness centrality (0.007) - this node is a cross-community bridge._
- **Why does `devDependencies` connect `devDependencies` to `babel-plugin-react-compiler`, `package.json`, `prism-react-renderer`, `@rolldown/plugin-babel`, `@tailwindcss/typography`, `@tanstack/devtools-vite`, `@tanstack/router-cli`, `@testing-library/dom`, `@testing-library/react`, `@biomejs/biome`, `@types/dompurify`, `@types/node`, `@vitejs/plugin-react`, `vitest`, `typescript`?**
  _High betweenness centrality (0.007) - this node is a cross-community bridge._
- **What connects `$schema`, `enabled`, `clientKind` to the rest of the system?**
  _419 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `tool-page-layout.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.057566220823498555 - nodes in this community are weakly interconnected._
- **Should `What You Must Do When Invoked` be split into smaller, more focused modules?**
  _Cohesion score 0.08 - nodes in this community are weakly interconnected._
- **Should `routeTree.gen.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.0425531914893617 - nodes in this community are weakly interconnected._