# spec-driven Capability: meta-tag-generator

## Purpose
Form-driven SEO, Open Graph, and Twitter Card meta tag generation with live HTML preview.

## Requirements

### Requirement: Generate basic SEO meta tags
The system SHALL generate HTML `<meta>` tags for title, description, and keywords based on user input.

#### Scenario: User fills in basic SEO fields
- **WHEN** user enters a page title, description, and keywords
- **THEN** the output panel displays `<title>`, `<meta name="description">`, and `<meta name="keywords">` tags

### Requirement: Generate Open Graph meta tags
The system SHALL generate Open Graph (`og:`) meta tags including og:title, og:description, og:image, og:url, og:type, and og:site_name.

#### Scenario: User fills in OG fields
- **WHEN** user enters Open Graph metadata (title, description, image URL, page URL, type, site name)
- **THEN** the output panel displays corresponding `<meta property="og:*">` tags

### Requirement: Generate Twitter Card meta tags
The system SHALL generate Twitter Card meta tags including twitter:card, twitter:title, twitter:description, twitter:image, and twitter:site.

#### Scenario: User fills in Twitter Card fields
- **WHEN** user enters Twitter Card metadata (card type, title, description, image, site handle)
- **THEN** the output panel displays corresponding `<meta name="twitter:*">` tags

### Requirement: Live preview of generated HTML
The system SHALL update the generated HTML output in real-time as the user types in form fields.

#### Scenario: User modifies a field
- **WHEN** user changes any input field value
- **THEN** the HTML output updates immediately without requiring a manual "generate" action

### Requirement: Copy generated HTML
The system SHALL provide a copy-to-clipboard button for the generated HTML output.

#### Scenario: User copies output
- **WHEN** user clicks the copy button on the output panel
- **THEN** the full generated HTML markup is copied to the clipboard
