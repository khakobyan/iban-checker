/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState } from 'react';
import type { IBANCheckResult } from './App.types';
import { styles } from './App.styles';
import {
  Button,
  SafeAreaView,
  Text,
  TextInput,
  View,
} from 'react-native';

function App(): JSX.Element {
  const [iban, setIBAN] = useState<string>('');
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [previousChecks, setPreviousChecks] = useState<IBANCheckResult[]>([]);

  const checkIban = () => {
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
      setIsValid(ibanIsValid);
      setPreviousChecks([{ iban, isValid }, ...previousChecks].slice(0, 10));
    } 
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

  return (
    <SafeAreaView>
      <View>
        <Text>Montenegro IBAN Checker</Text>
        <TextInput
          placeholder="Enter IBAN"
          value={iban}
          onChangeText={setIBAN}
        />
        <Button  title="Check IBAN" onPress={checkIban} />
        {isValid !== null && (
          <Text style={{ color: isValid ? 'green' : 'red' }}>
            {isValid ? 'Valid IBAN' : 'Invalid IBAN'}
          </Text>
        )}
        <Text>Previous Checks:</Text>
        {previousChecks.map((check, index) => (
          <Text key={index}>
            {check.iban} - {check.isValid ? 'Valid' : 'Invalid'}
          </Text>
        ))}
      </View>
    </SafeAreaView>
  );
}

export default App;
