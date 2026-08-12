## 1. Meta Tag Generator

- [x] 1.1 Implement the meta tag generator form with fields for basic SEO (title, description, keywords), Open Graph (og:title, og:description, og:image, og:url, og:type, og:site_name), and Twitter Card (twitter:card, twitter:title, twitter:description, twitter:image, twitter:site)
- [x] 1.2 Implement live-updating HTML output using `CodeOutput` that generates `<title>`, `<meta>` tags from form state
- [x] 1.3 Wire up the layout using the sidebar controls + output panel pattern (`grid lg:grid-cols-[350px_1fr]`)

## 2. robots.txt Builder

- [x] 2.1 Implement the rule group data model and state management (user-agent blocks with allow/disallow rules, crawl-delay, sitemap URL)
- [x] 2.2 Build the visual rule editor UI with "Add Rule Group" button, per-group agent name input, allow/disallow toggle rows, crawl-delay input, and remove buttons
- [x] 2.3 Implement preset buttons (Allow All, Block All, Block AI Crawlers) that populate the rule editor state
- [x] 2.4 Implement robots.txt text generation from state and display in `CodeOutput` panel

## 3. Favicon Generator

- [x] 3.1 Implement the emoji picker grid with a curated set of commonly used emojis and selection state
- [x] 3.2 Implement the image file upload input accepting PNG, JPG, SVG, and WebP formats
- [x] 3.3 Implement Canvas-based rendering that draws the selected emoji or uploaded image at all five standard sizes (16, 32, 48, 180, 192px)
- [x] 3.4 Implement preview display showing the generated favicons at each size with size labels
- [x] 3.5 Implement individual PNG download via `canvas.toBlob()` with download buttons per size
- [x] 3.6 Implement HTML `<link>` tag generation and display in `CodeOutput`

## 4. Open Graph Preview

- [x] 4.1 Implement the OG metadata input form with fields for og:title, og:description, og:image URL, og:url, og:site_name, and twitter:card type selector
- [x] 4.2 Implement the Facebook card mockup component styled to match Facebook's link preview appearance
- [x] 4.3 Implement the Twitter/X card mockup component supporting both "summary" and "summary_large_image" layouts
- [x] 4.4 Implement the LinkedIn card mockup component styled to match LinkedIn's article preview
- [x] 4.5 Implement the Discord card mockup component with colored left border accent and embed styling
- [x] 4.6 Wire up platform tabs using `Tabs` component to switch between the four platform previews

## 5. Responsive Breakpoint Previewer

- [x] 5.1 Implement the URL input with a "Load" button that sets the iframe src
- [x] 5.2 Implement device preset buttons for Mobile (375px), Tablet (768px), Desktop (1024px), and Wide (1440px) with active state highlighting
- [x] 5.3 Implement the single-breakpoint view with a centered iframe at the selected width, device label, and pixel width display
- [x] 5.4 Implement the "View All" mode rendering multiple iframes stacked vertically, one per breakpoint
- [x] 5.5 Implement iframe error handling with a user-friendly message for sites that block embedding

## 6. JSON-LD Builder

- [x] 6.1 Implement the schema type selector dropdown with options for Article, Product, FAQ, Organization, LocalBusiness, and BreadcrumbList
- [x] 6.2 Implement the Article form fields (headline, author name, datePublished, dateModified, image URL, publisher name, description)
- [x] 6.3 Implement the Product form fields (name, description, image URL, brand, price, currency, availability)
- [x] 6.4 Implement the FAQ form with dynamic add/remove question-answer pairs
- [x] 6.5 Implement the Organization form fields (name, URL, logo URL, description)
- [x] 6.6 Implement the LocalBusiness form fields (name, address components, telephone, opening hours)
- [x] 6.7 Implement the BreadcrumbList form with dynamic add/remove ordered breadcrumb items (name, URL)
- [x] 6.8 Implement JSON-LD generation from form state with proper `@context`, `@type`, and nested objects (Offer, PostalAddress, ListItem, etc.) and display in `CodeOutput` wrapped in `<script>` tag
