## Why

Six tools listed in the tool registry currently show "coming soon" placeholders instead of functional implementations. This creates a poor user experience — users click through from the homepage expecting a working tool and get a dead end. Completing these tools brings the toolkit to full parity with its advertised feature set.

## What Changes

- **Favicon Generator**: Implement a tool that lets users upload an image or pick an emoji, renders it at standard favicon sizes (16×16, 32×32, 48×48, 180×180, 192×192), previews all sizes, and provides download of individual PNGs plus generated `<link>` tag markup.
- **Meta Tag Generator**: Implement a form-driven tool for generating SEO meta tags, Open Graph tags, and Twitter Card tags with live HTML `<head>` output and copy support.
- **robots.txt Builder**: Implement a visual rule builder with user-agent / allow / disallow / crawl-delay / sitemap controls, presets for common configurations, and text output.
- **Open Graph Preview**: Implement a tool where users input OG metadata (title, description, image URL, URL) and see platform-specific card previews for Facebook, Twitter/X, LinkedIn, and Discord.
- **Responsive Breakpoint Previewer**: Implement an iframe-based tool that renders a user-provided URL at standard device breakpoints (mobile 375px, tablet 768px, desktop 1440px) with resizable frames.
- **JSON-LD Builder**: Implement a form-based structured data builder supporting common schema.org types (Article, Product, FAQ, Organization, LocalBusiness, BreadcrumbList) with JSON-LD output and copy support.

## Capabilities

### New Capabilities
- `favicon-generator`: Canvas-based favicon generation from image upload or emoji input with multi-size output and download
- `meta-tag-generator`: Form-driven SEO, Open Graph, and Twitter Card meta tag generation with live HTML preview
- `robots-txt-builder`: Visual robots.txt rule editor with presets, user-agent management, and text output
- `open-graph-preview`: Platform-specific social card preview from manual OG metadata input
- `responsive-breakpoint-previewer`: Iframe-based URL previewer at standard device widths
- `json-ld-builder`: Form-based schema.org structured data builder for common types with JSON-LD output

### Modified Capabilities
_None — all six tools are new implementations replacing empty placeholders._

## Impact

- **Routes affected**: 6 files in `src/routes/generators/` and `src/routes/preview/` that currently contain placeholder markup
- **No new dependencies**: All tools use browser-native APIs (Canvas, Blob, iframe) and existing UI components (shadcn)
- **No API changes**: All tools run entirely client-side; no server functions needed
- **No breaking changes**: Existing route paths and tool registry entries remain unchanged
