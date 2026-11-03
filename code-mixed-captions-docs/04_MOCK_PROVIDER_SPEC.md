# Mock Provider Specification

## Purpose
Develop and test the complete app without spending Gnani API credits.

## Environment
```env
TRANSCRIPTION_PROVIDER=mock
NORMALISATION_PROVIDER=mock
ENABLE_REAL_GNANI_API=false
```

Mock is the default. Real provider mode must fail fast if credentials/config are missing. Never silently fall back from a real provider to mock.

## Mock transcription
Create deterministic fixtures for:
1. Hinglish: `Aaj main aapko batata hoon how to save 10k every month, bas teen simple steps`
2. Hinglish: `Yeh wala cafe actually underrated hai, coffee ₹180 ki hai but worth it`
3. Tanglish: `Indha video-la naan unga kitta oru simple hack share panren, kandippa try pannunga`
4. Tanglish: `Machan, idhu dhaan Chennai-oda best biryani, no doubt`
5. Benglish: `Ei ta amar favourite cafe, the coffee here is just amazing, ekbar try korbe`
6. Benglish: `Kolkata te first time eshe ki ki korbe, let me tell you`

For arbitrary uploads, require explicit fixture selection or label the output clearly as a sample transcript. Do not pretend the mock provider listened to the uploaded audio. Fixture timestamps are synthetic test data.

## Mock normalisation
Use deterministic fixture mappings and custom vocabulary. Preserve indices and token count. Do not guess corrections for unknown words. Label the provider `Mock normalisation`.

## UI disclosure
Show `Demo mode — AI providers are mocked`. When using a fixture with an uploaded video, also show `Sample transcript — not generated from uploaded audio`.
