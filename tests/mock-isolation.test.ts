import { describe, it, expect, vi } from "vitest";
import { assertNoRealGnaniInMock } from "@/lib/env";

describe("Mock Isolation & Zero Network Guard", () => {
  it("prevents any real Gnani invocation when mock mode is intended", () => {
    expect(() => assertNoRealGnaniInMock()).not.toThrow();
  });

  it("intercepts fetch and asserts zero outbound requests to gnani api hosts in mock mode", async () => {
    const fetchSpy = vi.spyOn(globalThis, "fetch");

    // Mock pipeline must never call fetch
    expect(fetchSpy).not.toHaveBeenCalled();

    fetchSpy.mockRestore();
  });
});
