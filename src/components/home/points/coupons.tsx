import React, { useState } from 'react';
import { Text, VStack, HStack, FlatList, Button, Image, Input, InputField, Pressable, Icon } from "@gluestack-ui/themed";


interface ICoupon {
    image: string;
    name: string;
    price: number;
    limit: string;
    hashtag: string;
    status: string;
    expires: string;
}

interface ICouponItemProps {
    coupon: ICoupon;
}

const CouponsScreen = () => {
    const [selectedTab, setSelectedTab] = useState('All coupons');

    const coupons: ICoupon[] = [
        { image: require('../../../../assets/images/points-4.png'), name: 'Car Wash', price: 150, limit: 'Limit: 1', hashtag: '#Isimame', status: 'Use', expires: '4Hrs 45min' },
        { image: require('../../../../assets/images/points-1.png'), name: 'Marafiki shopping bundle', price: 700, limit: 'Limit: 2', hashtag: '#Marafiki', status: 'Used', expires: '4Hrs 45min' },
        { image: require('../../../../assets/images/points-2.png'), name: 'Halisi Cooking oil 20L', price: 3360, limit: 'Limit: 1', hashtag: '#WikiHalisi', status: 'Completed', expires: '00Hrs 00min' },
        { image: require('../../../../assets/images/points-3.png'), name: 'Ndovu maize flour 2Kgs pack x 2', price: 120, limit: 'Limit: 1', hashtag: '#NdovuKuu', status: 'Use', expires: '4Hrs 45min' },
    ];

    const CouponItem = ({ coupon }: ICouponItemProps) => (
        <VStack marginBottom={10} borderBottomWidth={1} borderBottomColor="#E8E8E8" height={100} paddingVertical={10} flexDirection="row" justifyContent="space-between" alignItems="center">
            <HStack alignItems="center">
                <Image
                    source={coupon.image}
                    alt="Coupon Image"
                    width={60}
                    height={80}
                    alignSelf='center'
                />
                <VStack marginLeft={10}>
                    <Text color='#414141' fontSize={14} fontWeight="bold">{coupon.name}</Text>
                    <Text color='#414141' fontSize={14}>KES {coupon.price} • {coupon.limit}</Text>
                    <Text color='#888888' fontSize={12}>{coupon.hashtag}</Text>
                    <Text color='#FF5C5C' fontSize={12}>Expires in: {coupon.expires}</Text>
                </VStack>
            </HStack>

            <Button
                borderRadius={20}
                borderWidth={1}
                borderColor={coupon.status === 'Completed' ? '#bcbcbc' : (coupon.status === 'Used' ? 'transparent' : '#DB1E36')}
                backgroundColor={coupon.status === 'Completed' ? '#f0f0f0' : (coupon.status === 'Used' ? 'transparent' : '#FFF')}
                paddingHorizontal={10}
                height={30}
                width={90}
            >
                {coupon.status === 'Use' ? (
                    <HStack>
                        <Text fontSize={12} color='#DB1E36'>
                            Use
                        </Text>
                    </HStack>
                ) : coupon.status === 'Used' ? (
                    <Text fontSize={12} color='#43A048'>
                        Used ✓
                    </Text>
                ) : (
                    <Text fontSize={12} color='#bcbcbc'>
                        Completed
                    </Text>
                )}
            </Button>
        </VStack>
    );

    return (
        <VStack flex={1} padding={4} backgroundColor='#fff'>

            <HStack paddingHorizontal={15} justifyContent="center" marginBottom={10}>
                <Pressable flex={1} onPress={() => setSelectedTab('All coupons')} style={{ paddingBottom: 10, marginRight: 10, borderBottomWidth: selectedTab === 'All coupons' ? 2 : 0, borderBottomColor: selectedTab === 'All coupons' ? '#DB1E36' : 'transparent' }}>
                    <Text color={selectedTab === 'All coupons' ? '#DB1E36' : '#888888'} fontSize={16}>All coupons</Text>
                </Pressable>
                <Pressable flex={1} onPress={() => setSelectedTab('Online')} style={{ paddingBottom: 10, marginRight: 10, borderBottomWidth: selectedTab === 'Online' ? 2 : 0, borderBottomColor: selectedTab === 'Online' ? '#DB1E36' : 'transparent' }}>
                    <Text color={selectedTab === 'Online' ? '#DB1E36' : '#888888'} fontSize={16}>Online</Text>
                </Pressable>
                <Pressable flex={1} onPress={() => setSelectedTab('At Kiosks')} style={{ paddingBottom: 10, borderBottomWidth: selectedTab === 'At Kiosks' ? 2 : 0, borderBottomColor: selectedTab === 'At Kiosks' ? '#DB1E36' : 'transparent' }}>
                    <Text color={selectedTab === 'At Kiosks' ? '#DB1E36' : '#888888'} fontSize={16}>At Kiosks</Text>
                </Pressable>
            </HStack>

            <FlatList
                data={coupons}
                renderItem={({ item }) => <CouponItem coupon={item as ICoupon} />}
                keyExtractor={(item, index) => index.toString()}
                contentContainerStyle={{ paddingHorizontal: 15 }}
            />
        </VStack>
    );
};

export default CouponsScreen;
