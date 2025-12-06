import React, { useState } from 'react';
import { Box, Text, VStack, HStack, FlatList, Button, Image, Pressable } from "@gluestack-ui/themed";
import { router } from 'expo-router';

interface IGift {
    image: any;
    name: string;
    priceRange: string;  // For displaying ranges like KES 4000 - 5000 pts
    savings: number;
    status: string;      // e.g., 'Accept', 'Accepted'
    timeLeft: string;    // e.g., '4Hrs 45Min'
}

interface IGiftItemProps {
    gift: IGift;
}

const GiftsScreen = () => {
    const [selectedTab, setSelectedTab] = useState('All');

    const handleTabChange = (tab: string) => {
        setSelectedTab(tab);
    };

    const gifts: IGift[] = [
        { image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTz_URGhVDpp4J1PFGrqpDkuqpDKTL8Nl11CQ&s", name: 'Members-Only Spice Bundle', priceRange: 'KES 4000 - 5000 pts', savings: 350, status: 'Accept', timeLeft: '4Hrs 45Min' },
        { image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSDe659SziIFbihqghjcMTfDwoc4HBIYiHCg&s", name: 'Handcrafted Jewelry', priceRange: 'KES 4000 - 5000 pts', savings: 350, status: 'Accepted', timeLeft: '4Hrs 45Min' },
        { image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSejpcw3wBzRHsRvTDcHQ3ZQKfQ0mugq3eL2Q&s", name: 'Kikuyu Tea Set', priceRange: 'KES 4000 - 5000 pts', savings: 100, status: 'Accept', timeLeft: '4Hrs 45Min' },
        { image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRiETonBSixRr1umuz67DCMK0BNC3gNOJiiYw&s", name: 'Artisan Kanga Set', priceRange: 'KES 4000 - 5000 pts', savings: 350, status: 'Accepted', timeLeft: '4Hrs 45Min' }
    ];

    const GiftItem = ({ gift }: IGiftItemProps) => (
        <VStack marginBottom={10} borderBottomWidth={1} borderBottomColor="#E8E8E8" height={100} paddingVertical={10} flexDirection="row" justifyContent="space-between" alignItems="center">
            <HStack>
                <Image
                    source={gift.image}
                    alt="Gift Image"
                    width={60}
                    height={80}
                />
                <VStack flex={1} marginLeft={10}>
                    <VStack>
                        <Text color='#414141' fontSize={14} fontWeight="bold">{gift.name}</Text>
                        <Text color='#414141' fontSize={14}>{gift.priceRange}</Text>
                    </VStack>
                    <VStack>
                        <Text color='#888888' fontSize={12}>You save KES {gift.savings}</Text>
                        <Text color='#888888' fontSize={12}>Gift expires in: {gift.timeLeft}</Text>
                    </VStack>
                </VStack>
                <VStack alignItems="flex-end" justifyContent="space-between">
                    <Button
                        borderRadius={20}
                        backgroundColor={gift.status === 'Accepted' ? '#bcbcbc' : '#DB1E36'}
                        paddingHorizontal={10}
                        height={27}
                        width={80}
                    >
                        <Text fontSize={12} color="#FFFFFF">
                            {gift.status === 'Accepted' ? 'Accepted' : 'Accept'}
                        </Text>
                    </Button>
                </VStack>
            </HStack>
        </VStack>
    );

    return (
        <VStack flex={1} marginHorizontal={4} paddingHorizontal={4} paddingVertical={4} backgroundColor='#FFFFFF'>
            {/* Tab Navigation */}
            <HStack width="$full" justifyContent="center" marginBottom={4} borderBottomWidth={1} borderBottomColor="#E8E8E8">
                <Pressable flex={1} onPress={() => handleTabChange('All')} style={{ paddingBottom: 10, marginRight: 15, borderBottomWidth: selectedTab === 'All' ? 2 : 0, borderBottomColor: selectedTab === 'All' ? '#000000' : 'transparent' }}>
                    <Text color="#121212" fontSize={16}>All Gifts</Text>
                </Pressable>
                <Pressable flex={1} onPress={() => handleTabChange('Online')} style={{ paddingBottom: 10, borderBottomWidth: selectedTab === 'Online' ? 2 : 0, borderBottomColor: selectedTab === 'Online' ? '#000000' : 'transparent' }}>
                    <Text color="#121212" fontSize={16}>Online</Text>
                </Pressable>
                <Pressable flex={1} onPress={() => handleTabChange('At Kiosks')} style={{ paddingBottom: 10, borderBottomWidth: selectedTab === 'At Kiosks' ? 2 : 0, borderBottomColor: selectedTab === 'At Kiosks' ? '#000000' : 'transparent' }}>
                    <Text color="#121212" fontSize={16}>At Kiosks</Text>
                </Pressable>
            </HStack>

            <FlatList
                data={gifts.filter(gift => selectedTab === 'All' || selectedTab === 'Online' || selectedTab === 'At Kiosks')}
                renderItem={({ item }) => <GiftItem gift={item as IGift} />}
                keyExtractor={(item, index) => index.toString()}
                contentContainerStyle={{ paddingHorizontal: 15 }}
            />
        </VStack>
    );
};

export default GiftsScreen;
