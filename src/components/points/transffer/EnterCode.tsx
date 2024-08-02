import React, { useState, useRef, useEffect } from 'react';
import { useForm } from "react-hook-form"
import { Box, Button, Card, HStack, Input, InputField, Text, VStack } from "@gluestack-ui/themed";
import { router } from 'expo-router';
import PageHeader from '../../PageHeader';

const EnterCodeView = () => {
  const { handleSubmit, control, getValues, setValue } = useForm()
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [progress, setProgress] = useState(80)
  const inputRefs = useRef([]);

  const handleCodeChange = (index: number, value: string) => {
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Move focus to next input
    if (value !== '' && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const isAllFilled = code.every(digit => digit !== '');

  useEffect(() => {
    if (isAllFilled) {
      setProgress(100)
    }
    else {
      setProgress(80)

    }
  }, [isAllFilled])


  const handleCode = async () => {
    router.push('/points/transffer/shop-details');
  };


  return (
    <VStack backgroundColor="$white" flex={1}>
      <PageHeader value={0} hideProgressBar />
      <Card marginHorizontal={14} marginTop={94} variant="elevated" borderRadius="$xl" >
        <VStack marginTop={24} paddingHorizontal={24} alignItems="center">
          <Text color="#2A2A2A" lineHeight={28} fontSize={22} fontWeight={600}>
            Enter Code
          </Text>
          <Box>
            <HStack space="sm" alignItems="flex-start">
              {code.map((digit, index) => (
                <Input
                  key={index}
                  width={40}
                  height={40}
                  borderColor={digit?.length ? "#DB1E36" : "#B8B8B8"}
                  borderWidth={0}
                  borderBottomWidth={1}

                >
                  <InputField
                    ref={el => inputRefs.current[index] = el}
                    textAlign="center"
                    fontSize="$xl"
                    keyboardType="number-pad"
                    maxLength={1}
                    value={digit}
                    onChangeText={(value) => handleCodeChange(index, value)}
                  />
                </Input>
              ))}
            </HStack>
          </Box>
          <Button
            backgroundColor="#DB1E36"
            borderRadius={50}
            marginTop={200}
            height={56}
            width="$full"
            marginBottom={30}
            onPress={handleCode}
          >
            <Text
              color='#FFFFFF'
            >
              Send
            </Text>
          </Button>
        </VStack>
      </Card>
    </VStack>
  );
};

export default EnterCodeView;