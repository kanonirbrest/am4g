# Decision record template by Yury.S.

This is the template in [Documenting architecture decisions - Michael Nygard](http://thinkrelevance.com/blog/2011/11/15/documenting-architecture-decisions).
You can use [adr-tools](https://github.com/npryce/adr-tools) for managing the ADR files.

# Implement Multi page InApp campaigns
2022

## Status

accepted

## Context

We should pass some data to html templates, for ex. pages array, element uuid or id to track it as statistic.
## Decision

- decided to pass it using data-props.
- data-currentpage - index of current page (add for all elements)
- data-destinations - uuid of open page target (add for all buttons with open page/submit open page actions)
- data-ignore-submit for duplicated (added duplicated textarea to handle expanded textarea) textarea (to not submit it twice);
- data-element - to select outputs
- data-key - id of current field(widget) uuid-type. (add for all elements)
- data-input - true for all form controls (for divs and elements)
key and index - check duplication
## Consequences

we can define it directly in react, and pass as string without http requests