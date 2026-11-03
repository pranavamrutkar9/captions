# Gnani Integration Rules

## Current decision
Do not call Gnani APIs during development. Mock providers only.

## Never invent
Do not guess base URLs, endpoint paths, HTTP methods, auth headers, model identifiers, request fields, response fields, timestamp units, supported formats, limits, or pricing.

## Future adapter
Map documented vendor responses into provider-neutral contracts in `03_DATA_MODEL_AND_API.md`. Keep vendor-specific details inside adapter modules.

## Safety switch
A real call is permitted only when:
- `ENABLE_REAL_GNANI_API=true`
- a valid server-side key is configured
- real provider selection is explicit
- the user deliberately starts a clearly labelled real-AI job after seeing a credit-usage warning

Otherwise fail before any network request.

## Prisma
Verify word timestamps, confidence, language tags, audio formats, and limits from official docs and real response examples. If only segment timing is available, estimate and mark `estimated=true`.

## Evon
Do not assume hosted API availability or native tools named `normalise_script`/`translate_lines`. These are application-level operations until documentation proves otherwise.

## Truthful demos
Never describe fixture output as Prisma/Evon output.
