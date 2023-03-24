
export type IBANCheckResult = {
  iban: string;
  isValid: boolean | null;
};

export const checkIBAN = (iban: string) => {
  const formattedIban = iban.replace(/\s/g, '');
  const countryCode = formattedIban.slice(0, 2);
  const checkDigits = formattedIban.slice(2, 4);
  
  if (countryCode === 'ME' && checkDigits === '25') {
    const reorderedIban = `${formattedIban.slice(4)}${formattedIban.slice(0, 4)}`;
    
    const numericIban = reorderedIban
    .split('')
    .map((c: string) => (isNaN(parseInt(c)) ? c.charCodeAt(0) - 55 : c))
    .join('');
    
    const remainder = mod97(numericIban);
    
    const ibanIsValid = remainder === 1;
    return ibanIsValid;
  } 
 
  return false;
};

const mod97 = (iban: string) => {
  let remainder: any = iban.slice(0, 2);
  let piece = '';

  for (let offset = 2; offset < iban.length; offset += 7) {
    piece = remainder + iban.substring(offset, offset + 7);
    remainder = parseInt(piece, 10) % 97;
  }

  return remainder;
}
