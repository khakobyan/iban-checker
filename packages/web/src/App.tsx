import React, { useState, useEffect } from 'react';
import { checkIBAN, IBANCheckResult } from '@iban_test/shared';

function App() {
  const [iban, setIBAN] = useState('');
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [previousChecks, setPreviousChecks] = useState<IBANCheckResult[]>([]);

  useEffect(() => {
    const loadPreviousChecks = async () => {
      try {
        const previousChecksJSON = await localStorage.getItem('previousChecks');
        if (previousChecksJSON) {
          const parsedPreviousChecks = JSON.parse(previousChecksJSON);
          setPreviousChecks(parsedPreviousChecks.slice(0, 10));
        }
      } catch (error) {
        console.error('Error loading previous checks:', error);
      }
    };
    loadPreviousChecks();
  }, []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const isValid = checkIBAN(iban);
    setIsValid(isValid);
    setPreviousChecks([{ iban, isValid }, ...previousChecks.slice(0, 9)]);
    try {
      localStorage.setItem('previousChecks', JSON.stringify(previousChecks));
    } catch (error) {
      console.error('Error saving previous checks:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          IBAN:
          <input type="text" value={iban} onChange={(e) => setIBAN(e.target.value)} />
        </label>
        <button type="submit">Check</button>
      </form>
      {isValid !== null && (
        <p>{isValid ? 'The IBAN is valid.' : 'The IBAN is invalid.'}</p>
      )}
      <h2>Previous Checks</h2>
      {previousChecks.map(({ iban, isValid }: IBANCheckResult, index: number) => (
        <div key={index}>
          <span>{iban}</span>
          <span>{isValid ? ' - valid' : ' - invalid'}</span>
        </div>
      ))}
    </div>
  );
};

export default App;
