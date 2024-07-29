import axios, { AxiosError, AxiosInstance } from 'axios';
import LocalStorage from '../utils/LocalStorage';

export type TApiEndPoints = 'users/signup' | 'login/access-token';

const API_BASE_URL = 'http://102.37.248.224/api/v1';

const axiosInstance: AxiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'accept': 'application/json',
    },
});

const getJWT = async (): Promise<string | null> => {
    try {
        let token = await LocalStorage.getItem('accessToken');

        // Check if token is expired or not present
        if (!token) {
            throw new Error('Token not found in AsyncStorage');
        }

        return token;
    } catch (error) {
        console.error('Error fetching JWT from AsyncStorage:', error);
        throw error; // Optionally, rethrow the error for handling upstream
    }
};

const handleError = (err: AxiosError) => {
    throw err.response?.data;
};

export const getAll = async <TEntity, TEntityQuery>(
    entity: TApiEndPoints,
    query?: TEntityQuery,
) => {
    try {
        const params = query ? { params: { ...query } } : {};
        const response = await axiosInstance.get<{
            limit: number;
            skip: number;
            total: number;
            data: TEntity[];
        }>(`${entity}`, {
            ...params,
            headers: {
                Authorization: `Bearer ${await getJWT()}`,
                apiKey: process.env.NEXT_PUBLIC_CLIENT_APP_API_KEY as string,
            },
        });

        return response.data;
    } catch (err) {
        handleError(err as AxiosError);
    }
};

export const get = async <TEntity, TEntityQuery>(
    entity: TApiEndPoints,
    id: string,
    query?: TEntityQuery,
) => {
    try {
        const params = query ? { params: { ...query } } : {};
        const response = await axiosInstance.get<TEntity>(`${entity}/${id}`, {
            ...params,
            headers: {
                Authorization: `Bearer ${await getJWT()}`,
                apiKey: process.env.NEXT_PUBLIC_CLIENT_APP_API_KEY as string,
                // Add other headers if needed
            },
        });

        return response.data;
    } catch (err) {
        handleError(err as AxiosError);
    }
};

export const create = async <TEntityRead, TEntityWrite>(
    entity: TApiEndPoints,
    payload: Partial<TEntityWrite> | Partial<TEntityWrite>[],
    params?: Record<string, string>,
    requiresToken: boolean = true, // Default to true for operations requiring token
) => {
    try {
        const headers: Record<string, string> = {
            apiKey: process.env.NEXT_PUBLIC_CLIENT_APP_API_KEY as string,
            // Add other headers if needed
        };

        if (requiresToken) {
            const token = await getJWT();
            headers.Authorization = `Bearer ${token}`;
        }

        const response = await axiosInstance.post<TEntityRead>(`${entity}`, payload, {
            params,
            headers,
        });

        return response.data;
    } catch (err) {
        handleError(err as AxiosError);
    }
};

export const update = async <TEntityRead, TEntityWrite>(
    entity: TApiEndPoints,
    id: string,
    payload: Partial<TEntityWrite>,
    params?: Record<string, string>,
) => {
    try {
        const response = await axiosInstance.patch<TEntityRead>(`${entity}/${id}`, payload, {
            params,
            headers: {
                Authorization: `Bearer ${await getJWT()}`,
                apiKey: process.env.NEXT_PUBLIC_CLIENT_APP_API_KEY as string,
                // Add other headers if needed
            },
        });

        return response.data;
    } catch (err) {
        handleError(err as AxiosError);
    }
};

export const remove = async <TEntity>(entity: TApiEndPoints, id: string) => {
    try {
        const response = await axiosInstance.delete<TEntity>(`${entity}/${id}`, {
            headers: {
                Authorization: `Bearer ${await getJWT()}`,
                apiKey: process.env.NEXT_PUBLIC_CLIENT_APP_API_KEY as string,
            },
        });

        return response.data;
    } catch (err) {
        handleError(err as AxiosError);
    }
};
