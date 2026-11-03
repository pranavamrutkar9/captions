import { describe, it, expect } from "vitest";
import { MOCK_FIXTURES, transcriptWordSchema } from "@code-mixed-captions/shared";

describe("Mock Provider Fixtures Specification", () => {
  it("includes all 6 required deterministic fixtures across Hinglish, Tanglish, and Benglish", () => {
    expect(MOCK_FIXTURES).toHaveLength(6);

    const hinglish = MOCK_FIXTURES.filter((f) => f.languageMix === "hinglish");
    const tanglish = MOCK_FIXTURES.filter((f) => f.languageMix === "tanglish");
    const benglish = MOCK_FIXTURES.filter((f) => f.languageMix === "benglish");

    expect(hinglish).toHaveLength(2);
    expect(tanglish).toHaveLength(2);
    expect(benglish).toHaveLength(2);
  });

  it("verifies all fixture words have valid integer milliseconds and timing contracts", () => {
    for (const fixture of MOCK_FIXTURES) {
      expect(fixture.words.length).toBeGreaterThan(0);

      let prevEnd = 0;
      fixture.words.forEach((word, idx) => {
        // Must validate with Zod schema
        const parsed = transcriptWordSchema.safeParse(word);
        expect(parsed.success).toBe(true);

        // Check idx sequence
        expect(word.idx).toBe(idx);

        // Check integer millisecond timing
        expect(Number.isInteger(word.startMs)).toBe(true);
        expect(Number.isInteger(word.endMs)).toBe(true);
        expect(word.startMs).toBeGreaterThanOrEqual(0);
        expect(word.endMs).toBeGreaterThan(word.startMs);

        // Non-overlapping or progressive timing
        expect(word.startMs).toBeGreaterThanOrEqual(prevEnd - 100);
        prevEnd = word.endMs;
      });
    }
  });

  it("verifies fixture raw transcripts match the exact text in 04_MOCK_PROVIDER_SPEC.md", () => {
    const rawTexts = MOCK_FIXTURES.map((f) => f.fullRawText);

    expect(rawTexts).toContain(
      "Aaj main aapko batata hoon how to save 10k every month, bas teen simple steps"
    );
    expect(rawTexts).toContain(
      "Yeh wala cafe actually underrated hai, coffee ₹180 ki hai but worth it"
    );
    expect(rawTexts).toContain(
      "Indha video-la naan unga kitta oru simple hack share panren, kandippa try pannunga"
    );
    expect(rawTexts).toContain(
      "Machan, idhu dhaan Chennai-oda best biryani, no doubt"
    );
    expect(rawTexts).toContain(
      "Ei ta amar favourite cafe, the coffee here is just amazing, ekbar try korbe"
    );
    expect(rawTexts).toContain(
      "Kolkata te first time eshe ki ki korbe, let me tell you"
    );
  });
});

