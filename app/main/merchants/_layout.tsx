import React from 'react';
import { Stack } from 'expo-router';
import { Colors } from '@/src/constants/Colors';

export default function MerchantsLayout() {
    return (
        <Stack
            screenOptions={{
                headerShown: false,
            }}
        />
    );
}
