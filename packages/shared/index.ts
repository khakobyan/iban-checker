
export type IBANCheckResult = {
  iban: string;
  isValid: boolean | null;
};

export const checkIBAN = (iban: string) => {
	const ibanRegex = /^ME\d{2}\d{3}\d{15}$/;
	return ibanRegex.test(iban);
};
