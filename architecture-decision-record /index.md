# Architecture Decision record template by Yury.S.

This is the template in [Documenting architecture decisions - Michael Nygard](http://thinkrelevance.com/blog/2011/11/15/documenting-architecture-decisions).
You can use [adr-tools](https://github.com/npryce/adr-tools) for managing the ADR files.

# Implement Multi page InApp campaigns 
september, 2022

## Status

accepted

## Context

We had simple InApp campaigns with HTML builder. The task is to allow creating campaign with more than 1 page.
## Decision

We decided to make multi pages as a simple screen with offset. For example, we have 3 pages. Changes: our layout (`react-grid-layout`) consist of 16*3 = 48 columns. 1 page = 100vw, then our screen width should be 300wv, but in viewport we will see only 100vw. To get to 2 page we should do offset left: 100vw.

Changes in structure: 
- added pages array (name, index = offset in screens (how much px should we offset to get this page), uuid - unique id to record page statistic).
- All widgets (button, feedback, title) now will have pageId (uuid of page).
- Added new event (open page), to go to another page (and animation using `setTimeout` and `opacity`).
- we use left offset on preview and on mobile device. Open page event just change left prop in css without reload.
- we add `display:none` to widgets that not in current page in preview, to not see the parts of pages that not currently active.

## Consequences

It's became easier to manage all pages using same layout(react-grid-layout), to handle old campaigns without migrations, manage statistic, add animations, keep old structure, handle preview, submit form values.