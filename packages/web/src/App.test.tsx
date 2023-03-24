import { checkIBAN } from "@iban_test/shared";

describe("validateIBAN", () => {
  it("should return true for a valid IBAN", () => {
    const validIBAN = "ME25505000012345678951";
    expect(checkIBAN(validIBAN)).toBe(true);
  });

  it("should return true for a valid IBAN which have written with spaces", () => {
    const validIBAN = "ME  255050000123   4567  8951";
    expect(checkIBAN(validIBAN)).toBe(true);
  });

  it("should return false for an invalid IBAN (last digit changed)", () => {
    const invalidIBAN = "ME25505000012345678952";
    expect(checkIBAN(invalidIBAN)).toBe(false);
  });

  it("should return false for an invalid IBAN (one extra digit at end)", () => {
    const invalidIBAN = "ME255050000123456789511";
    expect(checkIBAN(invalidIBAN)).toBe(false);
  });

  it("should return false for an invalid IBAN (missing two digits at end)", () => {
    const invalidIBAN = "ME255050000123456789";
    expect(checkIBAN(invalidIBAN)).toBe(false);
  });
});
