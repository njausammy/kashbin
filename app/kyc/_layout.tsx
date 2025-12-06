
import { Stack } from 'expo-router';
import { Colors } from '@/src/constants/Colors';
export default function KYCLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="prompt" />
      <Stack.Screen name="upload-id" />
      <Stack.Screen name="selfie" />
      <Stack.Screen name="details" />
      <Stack.Screen name="submitting" />
      <Stack.Screen name="pending" />
    </Stack>
  );
}
