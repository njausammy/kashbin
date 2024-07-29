import React, { useState } from 'react';
import { Box, VStack, Text, Button, HStack, Input, InputField, Pressable } from "@gluestack-ui/themed";
import Icon from '@expo/vector-icons/Ionicons';

const EnterCodeView = () => {
  const [code, setCode] = useState('');

  return (
    <Box flex={1} backgroundColor="$white" padding={20}>
      <VStack space="md" alignItems="center">
        <HStack width="100%" justifyContent="space-between" alignItems="center">
          <Text fontSize={18} fontWeight="$medium">Enter Code</Text>
          <Pressable onPress={() => {/* Handle close */ }}>
            <Icon name="close" size={24} color="#000" />
          </Pressable>
        </HStack>

        <Box
          width={60}
          height={60}
          borderRadius={30}
          backgroundColor="$green500"
          justifyContent="center"
          alignItems="center"
        >
          <Text fontSize={24} fontWeight="$bold" color="$white">K</Text>
        </Box>

        <Input
          width="100%"
          variant="underlined"
          size="xl"
        >
          <InputField
            placeholder="000036"
            keyboardType="numeric"
            textAlign="center"
            fontSize={24}
            value={code}
            onChangeText={setCode}
          />
        </Input>

        <Button
          width="100%"
          backgroundColor="$red500"
          borderRadius="$full"
          padding={12}
        >
          <Text color="$white" fontSize={16} fontWeight="$medium">
            Send
          </Text>
        </Button>

        <Button
          width="100%"
          variant="outline"
          borderColor="$red500"
          borderRadius="$full"
          padding={12}
        >
          <Text color="$red500" fontSize={16} fontWeight="$medium">
            Scan QR Code
          </Text>
        </Button>
      </VStack>
    </Box>
  );
};

export default EnterCodeView;