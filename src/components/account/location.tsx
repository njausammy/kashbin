import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
    Box,
    Button,
    Input,
    InputField,
    Progress,
    ProgressFilledTrack,
    Text,
    VStack,
} from '@gluestack-ui/themed';
import { Image, } from 'react-native';

const LocationDetails = () => {
    const { control, handleSubmit, watch } = useForm({
        defaultValues: {
            street: '',
            landmark: '',
            apartment: '',
            neighborhood: '',
            townCity: '',
        },
    });

    const onSubmit = (data: any) => {
        console.log(data);
        // Handle form submission
    };

    const street = watch('street');
    const landmark = watch('landmark');
    const apartment = watch('apartment');
    const neighborhood = watch('neighborhood');
    const townCity = watch('townCity');

    const isFormValid = street && landmark && apartment && neighborhood && townCity;

    return (
        <VStack paddingTop={68} backgroundColor="$white" flex={1}>
                        <Box width="$full" justifyContent="flex-start" alignItems="flex-start" padding={5}>
                <Image source={require('../../../assets/images/caret-back.png')} />
            </Box>
            <Box>
                <Progress value={100} width="$full" height={4} size="md" backgroundColor="#F7F7F7">
                    <ProgressFilledTrack backgroundColor="#DB1E36" />
                </Progress>
            </Box>
            <VStack marginTop={24} paddingHorizontal={24}>
                <Text color="#2A2A2A" lineHeight={28} fontSize={22} fontWeight={600}>
                    Location
                </Text>
                <Text lineHeight={19} color="#5A5A5A" fontSize={14} fontWeight={400} marginBottom={10}>
                Enter your address below or select Geo-Locate and we will use current location.
                </Text>

                <VStack space="xs" >
                    <Text fontSize={16} color="#414141">
                        Street
                    </Text>
                    <Controller
                        name="street"
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <Input
                                borderColor="#B8B8B8"
                                borderWidth={1}
                                borderRadius={8}
                                height={48}
                                width="$full"
                            >
                                <InputField onChangeText={onChange} value={value} />
                            </Input>
                        )}
                    />
                </VStack>

                <VStack space="xs" >
                    <Text fontSize={16} color="#414141">
                        Landmark/Close to
                    </Text>
                    <Controller
                        name="landmark"
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <Input
                                borderColor="#B8B8B8"
                                borderWidth={1}
                                borderRadius={8}
                                height={48}
                                width="$full"
                            >
                                <InputField onChangeText={onChange} value={value} />
                            </Input>
                        )}
                    />
                </VStack>

                <VStack space="xs" >
                    <Text fontSize={16} color="#414141">
                        Apartment/House
                    </Text>
                    <Controller
                        name="apartment"
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <Input
                                borderColor="#B8B8B8"
                                borderWidth={1}
                                borderRadius={8}
                                height={48}
                                width="$full"
                            >
                                <InputField onChangeText={onChange} value={value} />
                            </Input>
                        )}
                    />
                </VStack>

                <VStack space="xs" >
                    <Text fontSize={16} color="#414141">
                        Select Neighborhood
                    </Text>
                    <Controller
                        name="neighborhood"
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <Input
                                borderColor="#B8B8B8"
                                borderWidth={1}
                                borderRadius={8}
                                height={48}
                                width="$full"
                            >
                                <InputField onChangeText={onChange} value={value} />
                            </Input>
                        )}
                    />
                </VStack>

                <VStack space="xs" >
                    <Text fontSize={16} color="#414141">
                        Select Town/City
                    </Text>
                    <Controller
                        name="townCity"
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <Input
                                borderColor="#B8B8B8"
                                borderWidth={1}
                                borderRadius={8}
                                height={48}
                                width="$full"
                            >
                                <InputField onChangeText={onChange} value={value} />
                            </Input>
                        )}
                    />
                </VStack>

                <Button
                    backgroundColor={isFormValid ? '#DB1E36' : '#B8B8B8'}
                    borderRadius={50}
                    marginTop={30}
                    height={56}
                    width="$full"
                    alignSelf="center"
                    marginBottom={30}
                    disabled={!isFormValid}
                    onPress={handleSubmit(onSubmit)}
                >
                    <Text color={isFormValid ? '$white' : '#5A5A5A'}>Continue</Text>
                </Button>

                <Text color="#5A5A5A" marginBottom={24} alignSelf="center" onPress={() => { }}>
                    Skip
                </Text>
            </VStack>
        </VStack>
    );
};

export default LocationDetails;
