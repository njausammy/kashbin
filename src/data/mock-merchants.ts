/**
 * Mock Merchants for payment testing
 * These are stores/businesses that accept USDT payments
 */

export interface MockMerchant {
    id: string;
    name: string;
    category: string;
    location: string;
    merchantCode: string; // 6-digit code for manual entry
    qrCode: string; // QR code data
    isVerified: boolean;
    logo?: string; // Optional logo URL
}

export const mockMerchants: MockMerchant[] = [
    {
        id: 'merch1',
        name: 'SuperMart Westlands',
        category: 'Supermarket',
        location: 'Westlands, Nairobi',
        merchantCode: '100001',
        qrCode: 'KASH_MERCHANT_100001',
        isVerified: true,
    },
    {
        id: 'merch2',
        name: 'Java House Kilimani',
        category: 'Restaurant',
        location: 'Kilimani, Nairobi',
        merchantCode: '100002',
        qrCode: 'KASH_MERCHANT_100002',
        isVerified: true,
    },
    {
        id: 'merch3',
        name: 'Nakumatt Junction',
        category: 'Shopping Mall',
        location: 'Dagoretti, Nairobi',
        merchantCode: '100003',
        qrCode: 'KASH_MERCHANT_100003',
        isVerified: true,
    },
    {
        id: 'merch4',
        name: 'Tusky\'s Supermarket',
        category: 'Supermarket',
        location: 'Karen, Nairobi',
        merchantCode: '100004',
        qrCode: 'KASH_MERCHANT_100004',
        isVerified: true,
    },
    {
        id: 'merch5',
        name: 'KFC Sarit Centre',
        category: 'Fast Food',
        location: 'Westlands, Nairobi',
        merchantCode: '100005',
        qrCode: 'KASH_MERCHANT_100005',
        isVerified: true,
    },
    {
        id: 'merch6',
        name: 'Carrefour Two Rivers',
        category: 'Supermarket',
        location: 'Runda, Nairobi',
        merchantCode: '100006',
        qrCode: 'KASH_MERCHANT_100006',
        isVerified: true,
    },
];

/**
 * Get all merchants
 */
export const getAllMerchants = (): MockMerchant[] => {
    return mockMerchants;
};

/**
 * Get merchant by ID
 */
export const getMerchantById = (id: string): MockMerchant | null => {
    return mockMerchants.find(m => m.id === id) || null;
};

/**
 * Find merchant by code
 */
export const findMerchantByCode = (code: string): MockMerchant | null => {
    return mockMerchants.find(m => m.merchantCode === code) || null;
};

/**
 * Find merchant by QR code data
 */
export const findMerchantByQR = (qrData: string): MockMerchant | null => {
    return mockMerchants.find(m => m.qrCode === qrData) || null;
};

/**
 * Get merchants by category
 */
export const getMerchantsByCategory = (category: string): MockMerchant[] => {
    return mockMerchants.filter(m => m.category === category);
};

/**
 * Get all unique categories
 */
export const getCategories = (): string[] => {
    const categories = mockMerchants.map(m => m.category);
    return Array.from(new Set(categories));
};
