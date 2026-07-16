# spec-driven Capability: responsive-breakpoint-previewer

## Purpose
Iframe-based URL previewer at standard device widths.

## Requirements

### Requirement: Input URL for preview
The system SHALL provide a URL input field where users can enter the address of the page to preview.

#### Scenario: User enters a URL
- **WHEN** user types or pastes a URL and confirms
- **THEN** the preview area loads the URL in an iframe at the currently selected breakpoint width

### Requirement: Select device breakpoint presets
The system SHALL provide preset device breakpoint buttons for Mobile (375px), Tablet (768px), Desktop (1024px), and Wide (1440px).

#### Scenario: User selects a breakpoint
- **WHEN** user clicks a device preset button (e.g., "Tablet 768px")
- **THEN** the iframe resizes to the selected width and the button is visually highlighted as active

### Requirement: View all breakpoints simultaneously
The system SHALL provide a "View All" mode that displays the URL at all breakpoints stacked vertically.

#### Scenario: User enables View All mode
- **WHEN** user clicks the "View All" button
- **THEN** multiple iframes are rendered, one per breakpoint, stacked vertically with labels

### Requirement: Display iframe load errors gracefully
The system SHALL show a user-friendly message when an iframe fails to load due to X-Frame-Options or CSP restrictions.

#### Scenario: Iframe blocked by target site
- **WHEN** the target site blocks iframe embedding
- **THEN** a message is displayed explaining that the site blocks embedding and suggesting the tool works best with local development URLs

### Requirement: Show current viewport dimensions
The system SHALL display the current iframe width and a device label alongside the preview.

#### Scenario: Breakpoint is selected
- **WHEN** user has selected a breakpoint and a URL is loaded
- **THEN** a label shows the device name and pixel width (e.g., "Tablet — 768px")
