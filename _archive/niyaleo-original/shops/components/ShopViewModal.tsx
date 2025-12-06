import React from 'react';
import { Modal, Box, Text, Button, Pressable } from '@gluestack-ui/themed';
import Icon from '@expo/vector-icons/SimpleLineIcons';
import Entypo from '@expo/vector-icons/Entypo';

import { Shop } from '.';

// Define props for the ShopModal
interface ShopModalProps {
    isVisible: boolean;
    shop: Shop | null;
    onClose: () => void;
}

const ShopModal: React.FC<ShopModalProps> = ({ isVisible, shop, onClose }) => {
    if (!shop) return null;

    return (
        <Modal isOpen={isVisible} onClose={onClose}>
            <Modal.Backdrop backgroundColor="rgba(0, 0, 0, 0.5)" />
            <Modal.Content alignItems="center" padding="$4" maxWidth="90%" borderRadius="$lg" backgroundColor="$backgroundLight0">

                <Pressable onPress={onClose} style={{ alignSelf: 'flex-end' }}>
                    <Icon name="close" size={16} color="$gray500" />
                </Pressable>

                <Box
                    width={60}
                    height={60}
                    borderRadius={30}
                    backgroundColor="#EAEBFF"
                    alignItems="center"
                    justifyContent="center"
                    marginBottom="$4"
                >
                    <Entypo name="shop" size={24} color="#5A5A5A" />
                </Box>

                <Text fontSize="$lg" fontWeight="$bold" textAlign="center" marginBottom="$2">
                    {shop.name}
                </Text>

                <Text fontSize="$sm" color="$gray600" textAlign="center" marginBottom="$4">
                    {shop.address}
                </Text>

                <Text fontSize="$xs" color="$gray600" textAlign="center" marginBottom="$6">
                    Opens: 6:30am, Closes: 8:30pm{'\n'}Closed: on Sundays and public holidays
                </Text>

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
                    marginBottom={40}

                >
                    <Box flexDirection="row" alignItems="center" justifyContent="center">
                        <Icon name="location-pin" size={24} color="#DB1E36" />
                        <Text fontSize="$sm" fontWeight="$medium" color="#DB1E36" marginLeft="$2">
                            View on Google Maps
                        </Text>
                    </Box>

                </Button>
            </Modal.Content>
        </Modal>
    );
};

export default ShopModal;
