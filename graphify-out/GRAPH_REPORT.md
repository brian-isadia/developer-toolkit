# Graph Report - .  (2026-08-13)

## Corpus Check
- 165 files · ~96,910 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 558 nodes · 1196 edges · 39 communities (26 shown, 13 thin omitted)
- Extraction: 96% EXTRACTED · 4% INFERRED · 0% AMBIGUOUS · INFERRED: 47 edges (avg confidence: 0.54)
- Token cost: 148,011 input · 3,862 output

## Community Hubs (Navigation)
- Form & Input UI Primitives
- Layout Components & Action Buttons
- TanStack Router Auto-Generated Routes
- Build & Lint Dev Dependencies
- Core Application Dependencies
- Color Utilities & Color Space Math
- Biome Linter & Formatter Config
- App Tool Route Definitions
- TypeScript Compiler Configuration
- Data Display & Swatch UI Components
- Shadcn Component CLI Config
- Package Manifest & Scripts
- Navigation Tabs & Clipboard Hook
- Dropdown Menu UI Components
- Command Palette & Tool Scaffolding
- Card UI Layout Components
- App Sidebar & Tooltip Layout
- Modal Dialog UI Components
- Web App Manifest Config
- Popover UI Overlay Components
- Root App Layout & Agent Docs
- TanStack Router Initialization
- Favicon Generator Tool & Assets
- Robots.txt Builder Tool Specs
- Graphify Antigravity Plugin Hook
- Px/Rem Unit Converter Tool
- Line Height Calculator Tool
- JSON-LD Builder Tool Specs
- Meta Tag Generator Tool Specs
- Open Graph Preview Tool Specs
- Responsive Breakpoint Previewer Specs
- Claude Memory & Knowledge Graph Docs
- WebToolkit Design & Plan Specs
- Vite Bundler Configuration
- Archived OpenSpec Change Docs
- OpenSpec Workflow Specification
- OpenSpec Engine Configuration

## God Nodes (most connected - your core abstractions)
1. `cn()` - 71 edges
2. `ToolPageLayout()` - 42 edges
3. `FileRoutesByPath` - 42 edges
4. `Label()` - 30 edges
5. `Input()` - 23 edges
6. `Button()` - 20 edges
7. `CodeOutput()` - 19 edges
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
- **Core Documentation** — readme_md, agents_md, claude_md [EXTRACTED 1.00]
- **Graphify Integration** — claude_md, graphify_concept [EXTRACTED 1.00]
- **OpenSpec Agent Skills** — openspec_concept [EXTRACTED 1.00]
- **WebToolkit Core Infrastructure** — src_lib_tool_registry, src_routes_app, src_components_command_palette, src_hooks_use_persisted_state [EXTRACTED 1.00]
- **Complete Coming Soon Tools** — capability_favicon_generator, capability_meta_tag_generator, capability_robots_txt_builder, capability_open_graph_preview, capability_responsive_breakpoint_previewer, capability_json_ld_builder [EXTRACTED 1.00]

## Communities (39 total, 13 thin omitted)

### Community 0 - "Form & Input UI Primitives"
Cohesion: 0.11
Nodes (20): CodeOutput(), Input(), Label(), Select(), SelectContent(), SelectItem(), SelectTrigger(), SelectValue() (+12 more)

### Community 1 - "Layout Components & Action Buttons"
Cohesion: 0.10
Nodes (13): CopyButton(), ToolPageLayout(), Button(), buttonVariants, Textarea(), findGroupByToolPath(), findToolByPath(), Route (+5 more)

### Community 2 - "TanStack Router Auto-Generated Routes"
Cohesion: 0.04
Nodes (46): ColorsColorBlindnessRoute, ColorsColorConverterRoute, ColorsContrastCheckerRoute, ColorsGradientGeneratorRoute, ColorsPaletteGeneratorRoute, ColorsTailwindColorFinderRoute, ConvertersImageFormatConverterRoute, ConvertersImageToBase64Route (+38 more)

### Community 3 - "Build & Lint Dev Dependencies"
Cohesion: 0.05
Nodes (41): babel-plugin-react-compiler, @biomejs/biome, jsdom, marked, devDependencies, babel-plugin-react-compiler, @biomejs/biome, jsdom (+33 more)

### Community 4 - "Core Application Dependencies"
Cohesion: 0.05
Nodes (41): class-variance-authority, clsx, cmdk, cronstrue, dompurify, lucide-react, dependencies, class-variance-authority (+33 more)

### Community 5 - "Color Utilities & Color Space Math"
Cohesion: 0.12
Nodes (31): contrastRatio(), formatHex(), formatHsl(), formatOklch(), formatRgb(), hexToRgb(), HSL, hslToRgb() (+23 more)

### Community 6 - "Biome Linter & Formatter Config"
Cohesion: 0.07
Nodes (28): source, assist, actions, files, ignoreUnknown, includes, formatter, enabled (+20 more)

### Community 7 - "App Tool Route Definitions"
Cohesion: 0.07
Nodes (29): Route, Route, Route, Route, Route, Route, Route, Route (+21 more)

### Community 8 - "TypeScript Compiler Configuration"
Cohesion: 0.08
Nodes (24): DOM, DOM.Iterable, ES2022, **/*.ts, **/*.tsx, vite/client, compilerOptions, allowImportingTsExtensions (+16 more)

### Community 9 - "Data Display & Swatch UI Components"
Cohesion: 0.17
Nodes (14): ColorSwatch(), Badge(), badgeVariants, ScrollArea(), ScrollBar(), SelectLabel(), SelectScrollDownButton(), SelectScrollUpButton() (+6 more)

### Community 10 - "Shadcn Component CLI Config"
Cohesion: 0.11
Nodes (17): aliases, components, hooks, lib, ui, utils, iconLibrary, rsc (+9 more)

### Community 11 - "Package Manifest & Scripts"
Cohesion: 0.11
Nodes (17): imports, name, pnpm, onlyBuiltDependencies, private, scripts, build, check (+9 more)

### Community 12 - "Navigation Tabs & Clipboard Hook"
Cohesion: 0.19
Nodes (14): Tabs(), TabsContent(), TabsList(), tabsListVariants, TabsTrigger(), useCopyToClipboard(), PaletteDisplay(), Route (+6 more)

### Community 13 - "Dropdown Menu UI Components"
Cohesion: 0.12
Nodes (9): DropdownMenuCheckboxItem(), DropdownMenuContent(), DropdownMenuItem(), DropdownMenuLabel(), DropdownMenuRadioItem(), DropdownMenuSeparator(), DropdownMenuShortcut(), DropdownMenuSubContent() (+1 more)

### Community 14 - "Command Palette & Tool Scaffolding"
Cohesion: 0.19
Nodes (9): CommandPalette(), DialogContent(), DialogTitle(), useRecentTools(), allTools, Tool, ToolGroup, toolGroups (+1 more)

### Community 15 - "Card UI Layout Components"
Cohesion: 0.27
Nodes (8): Card(), CardAction(), CardContent(), CardDescription(), CardFooter(), CardHeader(), CardTitle(), Route

### Community 16 - "App Sidebar & Tooltip Layout"
Cohesion: 0.38
Nodes (6): Sidebar(), Tooltip(), TooltipContent(), TooltipProvider(), TooltipTrigger(), usePersistedState()

### Community 17 - "Modal Dialog UI Components"
Cohesion: 0.22
Nodes (5): Dialog(), DialogDescription(), DialogFooter(), DialogHeader(), DialogOverlay()

### Community 18 - "Web App Manifest Config"
Cohesion: 0.25
Nodes (7): background_color, display, icons, name, short_name, start_url, theme_color

### Community 19 - "Popover UI Overlay Components"
Cohesion: 0.25
Nodes (4): PopoverContent(), PopoverDescription(), PopoverHeader(), PopoverTitle()

### Community 20 - "Root App Layout & Agent Docs"
Cohesion: 0.29
Nodes (3): AppLayout(), Route, FileRoutesById

### Community 21 - "TanStack Router Initialization"
Cohesion: 0.33
Nodes (5): getRouter(), Register, @tanstack/react-router, Register, routeTree

### Community 22 - "Favicon Generator Tool & Assets"
Cohesion: 0.50
Nodes (4): favicon-generator, Favicon Generator Design, React Logo 192px, React Logo 512px

### Community 24 - "Robots.txt Builder Tool Specs"
Cohesion: 0.67
Nodes (3): robots-txt-builder, robots.txt Builder Design, Public robots.txt

## Knowledge Gaps
- **202 isolated node(s):** `$schema`, `enabled`, `clientKind`, `useIgnoreFile`, `ignoreUnknown` (+197 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **13 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn()` connect `Data Display & Swatch UI Components` to `Form & Input UI Primitives`, `Layout Components & Action Buttons`, `Navigation Tabs & Clipboard Hook`, `Dropdown Menu UI Components`, `Command Palette & Tool Scaffolding`, `Card UI Layout Components`, `App Sidebar & Tooltip Layout`, `Modal Dialog UI Components`, `Popover UI Overlay Components`?**
  _High betweenness centrality (0.092) - this node is a cross-community bridge._
- **Why does `dependencies` connect `Core Application Dependencies` to `Package Manifest & Scripts`?**
  _High betweenness centrality (0.020) - this node is a cross-community bridge._
- **Why does `devDependencies` connect `Build & Lint Dev Dependencies` to `Package Manifest & Scripts`?**
  _High betweenness centrality (0.020) - this node is a cross-community bridge._
- **What connects `$schema`, `enabled`, `clientKind` to the rest of the system?**
  _202 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Form & Input UI Primitives` be split into smaller, more focused modules?**
  _Cohesion score 0.11221507890122735 - nodes in this community are weakly interconnected._
- **Should `Layout Components & Action Buttons` be split into smaller, more focused modules?**
  _Cohesion score 0.09528214616096208 - nodes in this community are weakly interconnected._
- **Should `TanStack Router Auto-Generated Routes` be split into smaller, more focused modules?**
  _Cohesion score 0.0425531914893617 - nodes in this community are weakly interconnected._