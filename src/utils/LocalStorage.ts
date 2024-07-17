import AsyncStorage from '@react-native-async-storage/async-storage';

class LocalStorage {
    static async setItem(key: string, value: string): Promise<void> {
        try {
            await AsyncStorage.setItem(key, value);
        } catch (error) {
            console.error('AsyncStorage Error: ', error);
        }
    }

    static async getItem(key: string): Promise<string | null> {
        try {
            const value = await AsyncStorage.getItem(key);
            return value;
        } catch (error) {
            console.error('AsyncStorage Error: ', error);
        }
        return null;
    }

    static async removeItem(key: string): Promise<void> {
        try {
            await AsyncStorage.removeItem(key);
        } catch (error) {
            console.error('AsyncStorage Error: ', error);
            throw error;
        }
    }
}


export default LocalStorage;
