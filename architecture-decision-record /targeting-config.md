# Decision record template by Yury.S.

This is the template in [Documenting architecture decisions - Michael Nygard](http://thinkrelevance.com/blog/2011/11/15/documenting-architecture-decisions).
You can use [adr-tools](https://github.com/npryce/adr-tools) for managing the ADR files.

# Targeting properties config
2021/2022

## Status

accepted

## Context

Properties for targeting config. We separate 2 groups of filters, `targeting filters` and `additional targeting filters`.
Config location:
`src/utils/targetingConfig`
## Decision

description for config properties
- field (`string`) - targeting filter key
- withOr (`boolean`) - can we select multiple fields with (`OR`) separator
- label (`label`) - label that we see in select that add filters
- subFields (`subFields`) - fields under `step3[field]`. We should use it only for fields that has subfields on root level(backend restriction).
- androidExcluded (`array[string]`) - fields that we should NOT show in ANDROID campaigns.
- iosExcluded (`array[string]`) - fields that we should NOT show in IOS campaigns.
- defaultValues (`function`) - function that returns default values. (function because of formik validation restriction)
- parseDate (`function`) - function that build targeting object when we get campaign from server.
- getSendDate (`function`) - function that build targeting object that we send to the server.

## Consequences
It makes filters easily configurable.

will be populated later...