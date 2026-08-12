## ADDED Requirements

### Requirement: Input OG metadata manually
The system SHALL provide input fields for og:title, og:description, og:image (URL), og:url, og:site_name, and twitter:card type.

#### Scenario: User fills in OG fields
- **WHEN** user enters values in the metadata input fields
- **THEN** the preview cards update in real-time to reflect the entered values

### Requirement: Preview Facebook card
The system SHALL render a Facebook-style link preview card showing the image, title, description, and domain.

#### Scenario: All fields populated
- **WHEN** user has entered title, description, image URL, and page URL
- **THEN** a Facebook-style card is rendered with the image at the top, title below, description below that, and the domain name at the bottom

### Requirement: Preview Twitter/X card
The system SHALL render a Twitter/X-style card preview in both "summary" and "summary_large_image" formats.

#### Scenario: Summary large image card
- **WHEN** user selects "summary_large_image" as twitter:card type
- **THEN** a Twitter-style card is rendered with a large image taking the full width, and title/description below

#### Scenario: Summary card
- **WHEN** user selects "summary" as twitter:card type
- **THEN** a Twitter-style card is rendered with a small square image on the left and title/description on the right

### Requirement: Preview LinkedIn card
The system SHALL render a LinkedIn-style article preview card.

#### Scenario: LinkedIn preview rendered
- **WHEN** user has entered the required metadata fields
- **THEN** a LinkedIn-style card is rendered with image, title, and domain

### Requirement: Preview Discord card
The system SHALL render a Discord-style embed preview card with the characteristic left-border accent.

#### Scenario: Discord preview rendered
- **WHEN** user has entered the required metadata fields
- **THEN** a Discord-style embed is rendered with a colored left border, site name, title, description, and image

### Requirement: Switch between platform previews
The system SHALL provide tabs or a selector to switch between platform-specific previews.

#### Scenario: User switches platform
- **WHEN** user clicks on a different platform tab
- **THEN** the preview area updates to show the card mockup for the selected platform
