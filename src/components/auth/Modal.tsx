import { formatPhoneNumber } from "@/src/utils/format";
import { ModalBackdrop, ModalContent, ModalHeader, ModalBody, VStack, Text, Heading, Modal, Box } from "@gluestack-ui/themed";
import Button from '@/src/components/form/AnimatedButton';
import { router } from "expo-router";
import React from "react";
import Icon from 'react-native-vector-icons/MaterialIcons';
import Loader from "../Loader";
import VerifyIcon from '../Icons/create-account/verify'


interface Iprops {
    onClose: () => void,
    isOpen: boolean,
    phoneNumber?: string;
}

const SignupModal = ({ onClose, isOpen, phoneNumber }: Iprops) => {

    const handleYes = async () => {
        onClose()
        router.push('/auth/confirm');
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
                    <VStack space="md"  >
                        <Box alignSelf="center" >
                            <Loader disableAnimation iconComp={<VerifyIcon />} />
                        </Box>
                        <Heading alignSelf="center" lineHeight={28} color="#2A2A2A" fontSize={22} fontWeight={600} marginBottom={38} >Verify your phone number.</Heading>
                        <Text alignSelf="center" lineHeight={19} color="#5A5A5A" fontSize={14} fontWeight={600}>
                            We will send a confirmation code to
                        </Text>
                        <Text alignSelf="center" lineHeight={19} color="#5A5A5A" fontSize={14} fontWeight={600}>{formatPhoneNumber(phoneNumber)}</Text>
                        <Button
                            backgroundColor="#DC2626"
                            borderRadius={50}
                            height={56}
                            width="100%"
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
                            borderColor="#DC2626"
                            height={56}
                            width="$full"
                            marginBottom={40}
                            alignSelf="center"
                            onPress={onClose}
                        >
                            <Text
                                color="#DC2626"
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