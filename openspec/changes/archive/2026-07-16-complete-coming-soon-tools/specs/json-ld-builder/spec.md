## ADDED Requirements

### Requirement: Select schema.org type
The system SHALL provide a dropdown to select from supported schema.org types: Article, Product, FAQ, Organization, LocalBusiness, and BreadcrumbList.

#### Scenario: User selects a schema type
- **WHEN** user selects "FAQ" from the type dropdown
- **THEN** the form updates to show fields specific to the FAQ schema (question/answer pairs)

### Requirement: Dynamic form for Article type
The system SHALL render form fields for Article type including headline, author name, datePublished, dateModified, image URL, publisher name, and description.

#### Scenario: User fills Article fields
- **WHEN** user enters headline, author, and publish date
- **THEN** the JSON-LD output includes a valid Article object with the entered values

### Requirement: Dynamic form for Product type
The system SHALL render form fields for Product type including name, description, image URL, brand, price, currency, and availability.

#### Scenario: User fills Product fields
- **WHEN** user enters product name, price, and currency
- **THEN** the JSON-LD output includes a valid Product object with an Offer sub-object

### Requirement: Dynamic form for FAQ type
The system SHALL allow users to add multiple question/answer pairs for the FAQPage schema type.

#### Scenario: User adds FAQ items
- **WHEN** user clicks "Add Question" and fills in question and answer fields
- **THEN** the JSON-LD output includes a FAQPage with mainEntity array containing Question items

#### Scenario: User removes a FAQ item
- **WHEN** user clicks the remove button on a question/answer pair
- **THEN** the item is removed from the form and the JSON-LD output updates

### Requirement: Dynamic form for Organization type
The system SHALL render form fields for Organization type including name, URL, logo URL, and description.

#### Scenario: User fills Organization fields
- **WHEN** user enters organization name and URL
- **THEN** the JSON-LD output includes a valid Organization object

### Requirement: Dynamic form for LocalBusiness type
The system SHALL render form fields for LocalBusiness type including name, address (street, city, state, zip, country), telephone, and opening hours.

#### Scenario: User fills LocalBusiness fields
- **WHEN** user enters business name and address fields
- **THEN** the JSON-LD output includes a valid LocalBusiness object with a PostalAddress sub-object

### Requirement: Dynamic form for BreadcrumbList type
The system SHALL allow users to add ordered breadcrumb items, each with a name and URL.

#### Scenario: User adds breadcrumb items
- **WHEN** user clicks "Add Item" and fills in name and URL
- **THEN** the JSON-LD output includes a BreadcrumbList with ListItem entries in position order

### Requirement: Generate valid JSON-LD output
The system SHALL display the generated JSON-LD wrapped in a `<script type="application/ld+json">` tag in a copyable code output panel.

#### Scenario: Form has valid data
- **WHEN** user has filled in the required fields for the selected type
- **THEN** the output shows valid, properly formatted JSON-LD with @context and @type fields

### Requirement: Live-updating output
The system SHALL update the JSON-LD output in real-time as the user modifies form fields.

#### Scenario: User edits a field
- **WHEN** user changes any form field value
- **THEN** the JSON-LD output updates immediately
