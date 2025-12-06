/**
 * Mock Liquidity Providers for M-Pesa transactions
 * These are the agents/providers that facilitate USDT ↔ KES exchanges
 */

export interface LiquidityProvider {
    id: string;
    name: string;
    mpesaNumber: string;
    mpesaName: string;
    rating: number;
    totalTransactions: number;
    processingTime: string; // e.g., "2-5 minutes"
    isVerified: boolean;
}

export const mockProviders: LiquidityProvider[] = [
    {
        id: 'prov1',
        name: 'FastPay Kenya',
        mpesaNumber: '0712345678',
        mpesaName: 'FASTPAY KENYA LTD',
        rating: 4.8,
        totalTransactions: 15234,
        processingTime: '2-5 min',
        isVerified: true,
    },
    {
        id: 'prov2',
        name: 'QuickCash',
        mpesaNumber: '0723456789',
        mpesaName: 'QUICKCASH SERVICES',
        rating: 4.7,
        totalTransactions: 12890,
        processingTime: '3-7 min',
        isVerified: true,
    },
    {
        id: 'prov3',
        name: 'SafeExchange',
        mpesaNumber: '0734567890',
        mpesaName: 'SAFE EXCHANGE LTD',
        rating: 4.9,
        totalTransactions: 18456,
        processingTime: '1-3 min',
        isVerified: true,
    },
];

/**
 * Get all providers
 */
export const getAllProviders = (): LiquidityProvider[] => {
    return mockProviders;
};

/**
 * Get provider by ID
 */
export const getProviderById = (id: string): LiquidityProvider | null => {
    return mockProviders.find(p => p.id === id) || null;
};

/**
 * Get best provider (highest rating)
 */
export const getBestProvider = (): LiquidityProvider => {
    return mockProviders.reduce((best, current) =>
        current.rating > best.rating ? current : best
    );
};
