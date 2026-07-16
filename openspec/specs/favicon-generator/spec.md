# spec-driven Capability: favicon-generator

## Purpose
Canvas-based favicon generation from image upload or emoji input with multi-size output and download.

## Requirements

### Requirement: Generate favicon from emoji
The system SHALL allow users to select an emoji and render it as a favicon image at multiple standard sizes (16×16, 32×32, 48×48, 180×180, 192×192).

#### Scenario: User selects an emoji
- **WHEN** user clicks on an emoji from the picker grid
- **THEN** the tool renders the emoji on canvas at all five standard sizes and displays previews

### Requirement: Generate favicon from uploaded image
The system SHALL allow users to upload an image file (PNG, JPG, SVG, WebP) and resize it to standard favicon dimensions.

#### Scenario: User uploads an image
- **WHEN** user selects an image file via the file input
- **THEN** the tool renders the image on canvas at all five standard sizes and displays previews

### Requirement: Download generated favicons
The system SHALL allow users to download individual favicon PNGs for each generated size.

#### Scenario: User downloads a favicon
- **WHEN** user clicks a download button for a specific size
- **THEN** the browser downloads a PNG file named with the size (e.g., `favicon-32x32.png`)

### Requirement: Generate HTML link tags
The system SHALL display the HTML `<link>` tags needed to include the generated favicons in a webpage.

#### Scenario: Favicons are generated
- **WHEN** favicons have been generated from an emoji or image
- **THEN** the tool displays copyable HTML markup with `<link rel="icon">` and `<link rel="apple-touch-icon">` tags
