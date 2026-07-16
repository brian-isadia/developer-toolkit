## ADDED Requirements

### Requirement: Add user-agent rule groups
The system SHALL allow users to create multiple user-agent rule groups, each with a user-agent name and a list of Allow/Disallow path rules.

#### Scenario: User adds a rule group
- **WHEN** user clicks "Add Rule Group"
- **THEN** a new user-agent block appears with an agent name input and empty rule list

#### Scenario: User adds a path rule
- **WHEN** user clicks "Add Rule" within a group
- **THEN** a new row appears with a toggle for Allow/Disallow and a path input field

### Requirement: Configure sitemap URL
The system SHALL allow users to specify a Sitemap URL that is included in the generated robots.txt output.

#### Scenario: User enters a sitemap URL
- **WHEN** user enters a URL in the Sitemap field
- **THEN** the output includes a `Sitemap: <url>` directive

### Requirement: Configure crawl-delay
The system SHALL allow users to set a Crawl-delay value per user-agent group.

#### Scenario: User sets crawl-delay
- **WHEN** user enters a numeric crawl-delay value for a user-agent group
- **THEN** the output includes a `Crawl-delay: <value>` directive within that group

### Requirement: Apply preset configurations
The system SHALL provide preset configurations (Allow All, Block All, Block AI Crawlers) that populate the rule editor.

#### Scenario: User selects "Block All" preset
- **WHEN** user clicks the "Block All" preset button
- **THEN** the rule editor is populated with a single `User-agent: *` group containing `Disallow: /`

#### Scenario: User selects "Block AI Crawlers" preset
- **WHEN** user clicks the "Block AI Crawlers" preset button
- **THEN** the rule editor is populated with groups for known AI crawler agents (GPTBot, ChatGPT-User, Google-Extended, CCBot, anthropic-ai) each with `Disallow: /`

### Requirement: Generate robots.txt output
The system SHALL display the generated robots.txt content in a copyable code output panel that updates in real-time.

#### Scenario: Rules are configured
- **WHEN** user has configured one or more rule groups
- **THEN** the output panel displays valid robots.txt syntax with proper formatting
