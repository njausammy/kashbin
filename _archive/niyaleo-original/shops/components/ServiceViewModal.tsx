import React from 'react';
import { Modal, Box, Text, Button, Pressable, Image, HStack } from '@gluestack-ui/themed';
import Icon from '@expo/vector-icons/SimpleLineIcons';
import Entypo from '@expo/vector-icons/Entypo';
import { IService } from './services';

// Define props for the ServiceModal
interface ServiceModalProps {
    isVisible: boolean;
    service: IService | null;
    onClose: () => void;
}

const ServiceModal: React.FC<ServiceModalProps> = ({ isVisible, service, onClose }) => {
    if (!service) return null;

    return (
        <Modal isOpen={isVisible} onClose={onClose}>
            <Modal.Backdrop backgroundColor="rgba(0, 0, 0, 0.5)" />
            <Modal.Content padding="$4" maxWidth="90%" borderRadius="$lg" backgroundColor="$backgroundLight0">

                <Pressable onPress={onClose} style={{ alignSelf: 'flex-end' }}>
                    <Icon name="close" size={16} color="$gray500" />
                </Pressable>


                <Image
                    source={{ uri: service.image }}
                    alt="Service Image"
                    borderRadius={10}
                    marginVertical={20}
                    height={180}
                    width={296}
                />

                <Text  fontSize="$lg" fontWeight="$bold" marginBottom="$2">
                    {service.name}
                </Text>

                <Text fontSize="$sm" color="$gray600" marginBottom="$4">
                    {service.description}
                </Text>

                <Box marginBottom="$6">
                    {/* Provider */}
                    <HStack justifyContent="space-between" marginBottom="$2">
                        <Text fontWeight={600} fontSize="$xs" color="$gray600">
                            Provider
                        </Text>
                        <Text  fontSize="$xs" color="$gray600">
                            {service.provider}
                        </Text>
                    </HStack>

                    {/* Value */}
                    <HStack justifyContent="space-between" marginBottom="$2">
                        <Text fontWeight={600}  fontSize="$xs" color="$gray600">
                            Value
                        </Text>
                        <Text fontSize="$xs" color="$gray600">
                            KES {service.price}
                        </Text>
                    </HStack>

                    {/* Limit */}
                    <HStack  justifyContent="space-between">
                        <Text fontWeight={600}  fontSize="$xs" color="$gray600">
                            Limit:
                        </Text>
                        <Text fontSize="$xs" color="$gray600">
                            {service.limit}
                        </Text>
                    </HStack>
                </Box>


                <Button
                    borderColor='#DB1E36'
                    borderWidth={1}
                    backgroundColor="$white"
                    borderRadius={50}
                    paddingHorizontal={10}
                    marginTop={16}
                    height={56}
                    width="$full"
                    alignSelf="center"
                    marginBottom={16}
                >
                    <Text fontSize="$sm" fontWeight="$medium" color="#DB1E36" textAlign="center">
                        Request
                    </Text>
                </Button>

                <Button
                    borderColor='#DB1E36'
                    borderWidth={1}
                    backgroundColor="$white"
                    borderRadius={50}
                    paddingHorizontal={10}
                    height={56}
                    width="$full"
                    alignSelf="center"
                >
                    <Text fontSize="$sm" fontWeight="$medium" color="#DB1E36" textAlign="center">
                        Refer
                    </Text>
                </Button>
            </Modal.Content>
        </Modal>
    );
};

export default ServiceModal;
