import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
    Input,
    InputField,
    Text,
    VStack,
} from '@gluestack-ui/themed';
import Button from '@/src/components/form/AnimatedButton';
import PageHeader from '../../PageHeader';

const LocationDetails = ({ onLocationSearch }: { onLocationSearch: () => void }) => {
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

    const isFormValid = street && landmark && apartment;

    const handleContinue = async () => {
        onLocationSearch()
    };


    return (
        <VStack backgroundColor="$white" flex={1}>
            <PageHeader value={100} />
            <VStack marginTop={24} paddingHorizontal={24} space="md">
                <Text color="#2A2A2A" lineHeight={28} fontSize={22} fontWeight={600}>
                    Location
                </Text>
                <Text lineHeight={19} color="#5A5A5A" fontSize={14} fontWeight={400} marginBottom={50}>
                Search your address below.
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
                            <InputField placeholder='Search'  onChangeText={onChange} value={value} />
                        </Input>
                    )}
                />


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



                <Button
                    backgroundColor={isFormValid ? '#DC2626' : '#B8B8B8'}
                    borderRadius={50}
                    marginTop={30}
                    height={56}
                    width="$full"
                    alignSelf="center"
                    marginBottom={30}
                    disabled={!isFormValid}
                    onPress={handleContinue}
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
