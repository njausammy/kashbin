import React from 'react';
import { Box, VStack, Text, Button, Card } from "@gluestack-ui/themed";

const ShopDetailsView = () => {
    return (
        <Box flex={1} backgroundColor="$lightGray100" padding={20}>
            <VStack space="md" alignItems="center">
                <Card
                    width="100%"
                    backgroundColor="$white"
                    borderRadius="$xl"
                    padding={20}
                    alignItems="center"
                >
                    <Text fontSize={20} fontWeight="$semibold" textAlign="center" marginBottom={10}>
                        Niyaleo Wholesale Depot
                    </Text>
                    <Text fontSize={14} color="$blueGray400" textAlign="center">
                        Bungoma Road, Kahawa Sukari, Kiambu County.
                    </Text>
                </Card>

                <Button
                    width="100%"
                    backgroundColor="$red500"
                    borderRadius="$full"
                    padding={12}
                >
                    <Text color="$white" fontSize={16} fontWeight="$medium">
                        Redeem Points
                    </Text>
                </Button>

                <Button
                    width="100%"
                    variant="outline"
                    borderColor="$blue500"
                    borderRadius="$full"
                    padding={12}
                >
                    <Text color="$blue500" fontSize={16} fontWeight="$medium">
                        Request Points
                    </Text>
                </Button>
            </VStack>
        </Box>
    );
};

export default ShopDetailsView;