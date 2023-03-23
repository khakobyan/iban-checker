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
    const ibanRegex = /^ME\d{2}\d{3}\d{15}$/;
    setIsValid(ibanRegex.test(iban));
    setPreviousChecks([{ iban, isValid }, ...previousChecks]);
  };

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
