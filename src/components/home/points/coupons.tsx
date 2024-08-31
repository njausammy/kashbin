import React, { useState } from 'react';
import { Text, VStack, HStack, FlatList, Card, Button, Image, Input, InputField } from "@gluestack-ui/themed";
import { router } from 'expo-router';

interface ICoupon {
    image: string;
    name: string;
    discount: string;
    status: string;
    expires: string;
}

interface ICouponItemProps {
    coupon: ICoupon;
}

const CouponsScreen = () => {
    const [selectedTab, setSelectedTab] = useState('Online');

    const handleNavigation = (route: string) => {
        router.push(route);
    };

    const coupons: ICoupon[] = [
        { image: require('../../../../assets/images/points-4.png'), name: 'Car Wash', discount: '50% off', status: 'Use', expires: 'in 4hrs 45min' },
        { image: require('../../../../assets/images/points-1.png'), name: 'Monthly shopping bundle', discount: '30% off', status: 'Used', expires: 'in 1hr 27min' },
        { image: require('../../../../assets/images/points-2.png'), name: 'HeHa Cooking Oil 3L', discount: '20% off', status: 'Completed', expires: 'in 10min' },
        { image: require('../../../../assets/images/points-3.png'), name: 'Ndovu maize Flour 2Kg pack x 2', discount: '10% off', status: 'Use', expires: 'in 13hrs 45min' },
    ];

    const CouponItem = ({ coupon }: ICouponItemProps) => (
        <Card marginBottom={10} height={86} >
            <HStack space="md" alignItems='center'>
                <HStack alignItems="center" height="100%" flex={1}>
                    <Image
                        source={coupon.image}
                        alt="Coupon Image"
                        width={40}
                        height={40}
                    />
                    <VStack marginLeft={10}>
                        <Text color='#414141' fontSize={14} fontWeight={400}>{coupon.name}</Text>
                        <Text color='#888888' fontSize={12}>{coupon.discount}</Text>
                        <Text color='#888888' fontSize={12}>Expires {coupon.expires}</Text>
                    </VStack>
                </HStack>
                <Button
                    borderRadius={20}
                    backgroundColor={coupon.status === 'Completed' ? '#bcbcbc' : (coupon.status === "Use" ? "#DB1E36" : "#43A048")}
                    paddingHorizontal={10}
                    height={27}
                    width={80}
                    variant="solid"
                >
                    <Text fontSize={12} color="#FFFFFF">
                        {coupon.status}
                    </Text>
                </Button>
            </HStack>
        </Card>
    );

    return (
        <VStack flex={1}>
            <Input
                borderWidth={0}
                borderRadius={16}
                height={48}
                backgroundColor='#fff'
                marginHorizontal={15}
                marginBottom={10}
            >
                <InputField
                    type="text"
                    placeholder='Search coupons'
                />
            </Input>

            <HStack paddingHorizontal={15} justifyContent="center" marginBottom={10}>
                <Button
                    borderTopStartRadius={10}
                    borderBottomStartRadius={10}
                    backgroundColor={selectedTab === 'Online' ? '#DB1E36' : '#FFFFFF'}
                    onPress={() => setSelectedTab('Online')}
                    height={40}
                    flex={1}
                >
                    <Text color={selectedTab === 'Online' ? '#FFF' : '#888888'}>Online</Text>
                </Button>
                <Button
                    borderTopEndRadius={10}
                    borderBottomEndRadius={10}
                    backgroundColor={selectedTab === 'In Person' ? '#DB1E36' : '#FFFFFF'}
                    onPress={() => setSelectedTab('In Person')}
                    height={40}
                    flex={1}
                >
                    <Text color={selectedTab === 'In Person' ? '#FFF' : '#888888'}>In Person</Text>
                </Button>
            </HStack>

            <FlatList
                data={coupons} // You can filter coupons here based on the selected tab if needed
                renderItem={({ item }) => <CouponItem coupon={item as ICoupon} />}
                keyExtractor={(item, index) => index.toString()}
                contentContainerStyle={{ paddingHorizontal: 15 }}
            />
        </VStack>
    );
};

export default CouponsScreen;
