import React, { useState } from 'react';
import { Controller } from 'react-hook-form';
import CountryPicker from 'react-native-country-picker-modal';
import { CountryCode, Country } from 'react-native-country-picker-modal';
import { Box, HStack, VStack, Text, Input, InputField } from '@gluestack-ui/themed';
import { Keyboard } from 'react-native';

const PhoneNumberInput = ({ control, onSubmitEditing }: {control:any, onSubmitEditing?: () => void}) => {
  const [countryCode, setCountryCode] = useState<CountryCode>('KE');
  const [callingCode, setCallingCode] = useState<string>('+254');

  const onSelect = (country: Country) => {
    setCountryCode(country.cca2);
    setCallingCode(`+${country.callingCode[0]}`);
  };

  return (
    <VStack space='xs' width="$full">
      <Text fontSize={16} color='#414141' >Phone</Text>
      <HStack space="md" alignItems="center" width="$full">
        <Box
          borderWidth={1}
          borderRadius={8}
          height={48}
          alignItems="center"
          borderColor="#B8B8B8"
          paddingHorizontal={2}
          flexDirection="row"
        >
          <CountryPicker
            countryCode={countryCode}
            onSelect={onSelect}
          />
          <Text>{callingCode}</Text>
        </Box>
        <Controller
          name="phone"
          control={control}
          defaultValue=""
          render={({ field: { onChange, value } }) => (
            <Input
              borderWidth={1}
              borderColor={value && value.length >= 9 ? "#1E40AF" : "#B8B8B8"}
              borderRadius={8}
              height={48}
              flex={1}
              backgroundColor="$white"
            >
              <InputField
                placeholder="712345678"
                onChangeText={onChange}
                value={value || ''}
                keyboardType="numeric"
                autoComplete="tel"
                color="#2A2A2A"
                fontSize={16}
                returnKeyType="done"
                onSubmitEditing={() => {
                  Keyboard.dismiss();
                  if (onSubmitEditing) {
                    onSubmitEditing();
                  }
                }}
              />
            </Input>
          )}
        />
      </HStack>
    </VStack>
  );
};

export default PhoneNumberInput;