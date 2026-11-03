# Code-Mixed Captions

Mock-first MVP for editable Hinglish, Tanglish, and Benglish captions.

## Files
- `01_PRODUCT_SPEC.md`: scope and requirements.
- `02_TECHNICAL_ARCHITECTURE.md`: stack, modules, pipeline.
- `03_DATA_MODEL_AND_API.md`: internal types, data model, app routes.
- `04_MOCK_PROVIDER_SPEC.md`: no-credit mock behaviour.
- `05_IMPLEMENTATION_PLAN.md`: phases and test gates.
- `06_GNANI_INTEGRATION_RULES.md`: safe future API integration.
- `07_UI_UX_SPEC.md`: screens and editor behaviour.
- `08_TEST_PLAN.md`: fixtures and tests.
- `AGENT_EXECUTION_PROMPT.md`: coding-agent instructions.

## Non-negotiables
1. No Gnani API calls during development.
2. No invented API endpoints, headers, model IDs, parameters, or response fields.
3. Never present mock output as real AI output.
4. Preserve raw transcript, word indices, and timestamps.
5. Build one phase at a time and stop for user approval.
