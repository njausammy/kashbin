import LocalStorage from '../utils/LocalStorage';
import { create } from './api';


interface IAuthRequest {
    username: string,
    password: string
}

export class Authentication {

    public async login({ username, password }: IAuthRequest) {
        try {
            const response = await create<{ access_token: string }, IAuthRequest>(
                'login/access-token',
                { username, password },
                undefined,
                false // No token required for login
            );
            if (response) {
                const { access_token } = response;
                await this.storeTokens(access_token);
                return { succes: true }
            }
        } catch (error) {
            console.error('Error logging in:', error);
            throw error; // Optionally, rethrow the error for handling upstream
        }
    }

    public async refreshToken(): Promise<void> {
        try {
            const refreshToken = await LocalStorage.getItem('refreshToken');
            if (!refreshToken) {
                throw new Error('Refresh token not found');
            }

            const response = await create<{ accessToken: string; refreshToken: string }, IAuthRequest>(
                "login/access-token",
                {},
                undefined,
                false // No token required for refresh token
            );

            if (response) {
                const { accessToken } = response;
                await this.storeAccessToken(accessToken);
            }
        } catch (error) {
            console.error('Error refreshing token:', error);
            throw error; // Optionally, rethrow the error for handling upstream
        }
    }

    private async storeTokens(accessToken: string): Promise<void> {
        try {
            await LocalStorage.setItem('accessToken', accessToken);
        } catch (error) {
            console.error('Error storing tokens:', error);
            throw error; // Optionally, rethrow the error for handling upstream
        }
    }

    private async storeAccessToken(accessToken: string): Promise<void> {
        try {
            await LocalStorage.setItem('accessToken', accessToken);
        } catch (error) {
            console.error('Error storing access token:', error);
            throw error; // Optionally, rethrow the error for handling upstream
        }
    }

    public async logout(): Promise<void> {
        try {
            await LocalStorage.removeItem('accessToken');
            await LocalStorage.removeItem('refreshToken');
        } catch (error) {
            console.error('Error clearing tokens:', error);
            throw error; // Optionally, rethrow the error for handling upstream
        }
    }

    public async isAuthenticated(): Promise<boolean> {
        try {
            const accessToken = await LocalStorage.getItem('accessToken');
            return !!accessToken;
        } catch (error) {
            console.error('Error checking authentication:', error);
            return false;
        }
    }
}

// Singleton instance of Authentication class
export const authInstance = new Authentication();
