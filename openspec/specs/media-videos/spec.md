# media-videos Specification

## Purpose

Covers how promotional videos for a movie or TV show are obtained, filtered, and presented on that title's detail page, so that the videos block is part of the page's main data rather than a separate, later request.

## Requirements

### Requirement: Videos arrive with the title details request

The detail page for a movie or a TV show SHALL obtain that title's videos as part of the same request that supplies the title's details. The system SHALL NOT issue a separate request for videos on those pages.

#### Scenario: Movie detail page is opened

- **WHEN** a user opens a movie detail page
- **THEN** the movie's videos are included in the response of the movie details request
- **AND** no additional request for that movie's videos is made

#### Scenario: TV show detail page is opened

- **WHEN** a user opens a TV show detail page
- **THEN** the TV show's videos are included in the response of the TV show details request
- **AND** no additional request for that TV show's videos is made

#### Scenario: Videos follow the details locale

- **WHEN** a title's details are requested for a given locale
- **THEN** the videos returned with them are for that same locale
- **AND** switching locale re-fetches details and videos together

#### Scenario: Requests that do not need videos

- **WHEN** a title's summary is requested for a context other than its detail page (for example, the header of a "similar titles" page)
- **THEN** videos are not requested and are not part of that response

### Requirement: Only embeddable YouTube trailers and clips are shown

The system SHALL present only videos hosted on YouTube whose type is a trailer or a clip. Every presented video SHALL carry its title, its YouTube key, its type, and its publication date.

#### Scenario: Mixed video types are returned

- **WHEN** a title's videos include YouTube trailers, YouTube clips, YouTube featurettes, teasers, behind-the-scenes entries, and videos hosted elsewhere
- **THEN** only the YouTube trailers and YouTube clips are presented
- **AND** each presented video exposes its name, key, type, and publication date

#### Scenario: Order is preserved

- **WHEN** the retained videos are presented
- **THEN** they appear in the order the source returned them

### Requirement: The videos block renders a supplied list

The component that displays videos SHALL receive the list of videos to display from its parent and SHALL NOT fetch, filter, or transform video data itself.

#### Scenario: A list of videos is supplied

- **WHEN** the videos block is given a non-empty list of videos
- **THEN** it renders the "Videos" heading and one video card per supplied video, in the supplied order

#### Scenario: An empty list is supplied

- **WHEN** the videos block is given an empty list
- **THEN** nothing is rendered — neither the heading nor the block container

### Requirement: The videos block appears with the rest of the page

Because videos are part of the main details response, the videos block SHALL be rendered in its final state as soon as the detail page renders, without a loading placeholder of its own.

#### Scenario: Detail page renders

- **WHEN** a movie or TV show detail page renders and the title has matching videos
- **THEN** the videos block is present with its cards, with no intermediate skeleton state

#### Scenario: Title has no matching videos

- **WHEN** a movie or TV show detail page renders and the title has no YouTube trailers or clips
- **THEN** the videos block is absent from the page and the surrounding sections keep their existing order

### Requirement: Details request failures stay unchanged

A failure to load a title's details SHALL be handled exactly as before this change. Videos SHALL NOT introduce a separate failure or empty state on the detail page.

#### Scenario: Details request fails

- **WHEN** the details request for a movie or TV show fails
- **THEN** the page reports the failure the same way it did when videos were fetched separately
- **AND** no partial page is shown in which details succeeded but videos failed
