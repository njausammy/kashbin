import React, { useState } from 'react';
import { Box, Text, VStack, HStack, FlatList, Button, Image } from "@gluestack-ui/themed";
import ServiceModal from './ServiceViewModal';

export interface IService {
    image: string;
    name: string;
    price: number;
    limit: number;
    provider: string;
    description: string; // New field for service description
}


interface IServiceItemProps {
    service: IService;
    onView: (service: IService) => void;
}

const ServicesScreen = () => {
    const [selectedService, setSelectedService] = useState<IService | null>(null);
    const [isModalVisible, setModalVisible] = useState(false);

    const services: IService[] = [
        {
            image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            name: 'Nyama Choma Experience',
            price: 150,
            limit: 1,
            provider: 'The Grill House',
            description: 'Enjoy a traditional Kenyan barbecue featuring succulent nyama choma (grilled meat) served with ugali and kachumbari. Perfect for family gatherings or casual outings.'
        },
        {
            image: "https://images.unsplash.com/photo-1665332195309-9d75071138f0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            name: 'Jollof & Juice Combo',
            price: 150,
            limit: 1,
            provider: 'Jollof Delight',
            description: 'Indulge in a delicious combo of spicy jollof rice and refreshing juice. A perfect treat for a quick lunch or casual dining.'
        },
        {
            image: "https://plus.unsplash.com/premium_photo-1669675936121-6d3d42244ab5?q=80&w=1976&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            name: 'Soko Salon Package',
            price: 150,
            limit: 1,
            provider: 'Nairobi Style',
            description: 'Pamper yourself with a luxurious salon package at Soko, including a haircut, facial treatment, and manicure services.'
        },
        {
            image: "https://images.unsplash.com/photo-1531299244174-d247dd4e5a66?q=80&w=1929&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            name: 'Spa Day Retreat',
            price: 150,
            limit: 1,
            provider: 'Oasis Spa',
            description: 'Escape the hustle and bustle of daily life with a serene and relaxing spa day at Oasis, including massages and rejuvenating treatments.'
        }
    ];


    const handleViewService = (service: IService) => {
        setSelectedService(service);
        setModalVisible(true);
    };

    const ServiceItem = ({ service, onView }: IServiceItemProps) => (
        <VStack marginBottom={10} borderBottomWidth={1} borderBottomColor="#E8E8E8" height={100} paddingVertical={10} flexDirection="row" justifyContent="space-between" alignItems="center">
            <HStack alignItems="center">
                <Image
                    source={{ uri: service.image }}
                    alt="Service Image"
                    width={64}
                    height={80}
                    alignSelf='center'
                />
                <VStack height="$full" marginLeft={10} justifyContent="space-between" >
                    <VStack>
                        <Text color='#414141' fontSize={14} fontWeight={400}>{service.provider}</Text>
                        <Text color='#888888' fontSize={12}>KES {service.price} • Limit: {service.limit}</Text>
                    </VStack>
                    <Text color='#414141' fontSize={14} fontWeight={600}>{service.name}</Text>
                </VStack>
            </HStack>

            <Button
                borderColor='#DB1E36'
                borderWidth={1}
                backgroundColor="$white"
                borderRadius={50}
                paddingHorizontal={10}
                width={71}
                height={32}
                alignSelf="center"
                onPress={() => onView(service)}
            >
                <Text fontSize="$sm" fontWeight="$medium" color="#DB1E36" marginLeft="$2">
                    View
                </Text>
            </Button>
        </VStack>
    );

    return (
        <VStack backgroundColor='#fff' flex={1}>
            <FlatList
                data={services}
                renderItem={({ item }) => <ServiceItem service={item as IService} onView={handleViewService} />}
                keyExtractor={(item, index) => index.toString()}
                contentContainerStyle={{ paddingHorizontal: 15 }}
                borderTopWidth={1} borderTopColor="#E8E8E8"
            />

            {selectedService && (
                <ServiceModal
                    isVisible={isModalVisible}
                    service={selectedService}
                    onClose={() => setModalVisible(false)}
                />
            )}
        </VStack>
    );
};

export default ServicesScreen;
