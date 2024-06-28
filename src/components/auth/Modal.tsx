import { ModalBackdrop, ModalContent, ModalHeader, ModalBody, VStack, Text, Heading, Button, Modal, Box, ButtonIcon } from "@gluestack-ui/themed";
import { router } from "expo-router";
import React from "react";
import { Image, } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';


interface Iprops {
    onClose: () => void,
    isOpen: boolean
}

const SignupModal = ({ onClose, isOpen }: Iprops) => {
    
    const handleYes = async () => {
        router.replace('/auth/confirm');
    };

    return (


        <Modal
            isOpen={isOpen}
            onClose={onClose}
        >
            <ModalBackdrop />
            <ModalContent>
                <ModalHeader justifyContent="flex-end">
                    <Box alignItems="flex-end">
                        <Icon onPress={onClose} name="close" size={24} color="#5A5A5A" />
                    </Box>
                </ModalHeader>
                <ModalBody>
                    <VStack space="md" alignItems="center">
                        <Box alignSelf="center" marginBottom={24}>
                            <Image source={require('../../../assets/images/elipsis.png')} />
                        </Box>
                        <Heading alignSelf="center" lineHeight={28} color="#2A2A2A" fontSize={22} fontWeight={600}>Verify your phone number.</Heading>
                        <Text alignSelf="center" lineHeight={19} color="#5A5A5A" fontSize={14} fontWeight={600}>
                            We will send a confirmation code to
                        </Text>
                        <Text alignSelf="center" lineHeight={19} color="#5A5A5A" fontSize={14} fontWeight={600}>+254 724 53 24 98</Text>
                        <Button
                            backgroundColor="#DB1E36"
                            borderRadius={50}
                            marginTop={24}
                            height={56}
                            width="$full"
                            alignSelf="center"
                            onPress={handleYes}
                        >
                            <Text
                                color={'$white'}
                            >
                                Yes
                            </Text>
                        </Button>
                        <Button
                            backgroundColor="$white"
                            borderRadius={50}
                            borderWidth={1}
                            borderColor="#DB1E36"
                            height={56}
                            width="$full"
                            marginBottom={40}
                            alignSelf="center"
                            onPress={onClose}
                        >
                            <Text
                                color="#DB1E36"
                            >
                                No
                            </Text>
                        </Button>
                    </VStack>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}

export default SignupModal