import React, { useState } from 'react';
import { Controller } from 'react-hook-form';
import CountryPicker from 'react-native-country-picker-modal';
import { CountryCode, Country } from 'react-native-country-picker-modal';
import { Box, HStack, VStack, Text, Input, InputField } from '@gluestack-ui/themed';

const PhoneNumberInput = ({ control }: {control:any}) => {
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
          render={({ field: { onChange, value } }) => (
            <Input
              borderWidth={1}
              borderRadius={8}
              height={48}
              flex={1}
            >
              <InputField 
                placeholder="Mobile number" 
                onChangeText={onChange}
                value={value}
              />
            </Input>
          )}
        />
      </HStack>
    </VStack>
  );
};

export default PhoneNumberInput;