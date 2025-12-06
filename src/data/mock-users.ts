/**
 * Mock Users for P2P Testing
 * These users can receive USDT from you
 */

export interface MockUser {
    id: string;
    phoneNumber: string;
    firstName: string;
    lastName: string;
    isVerified: boolean;
    walletAddress: string;
    avatarUrl?: string;
}

export const mockUsers: MockUser[] = [
    {
        id: 'user1',
        phoneNumber: '712345678',
        firstName: 'John',
        lastName: 'Doe',
        isVerified: true,
        walletAddress: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
    },
    {
        id: 'user2',
        phoneNumber: '723456789',
        firstName: 'Jane',
        lastName: 'Smith',
        isVerified: true,
        walletAddress: '0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199',
    },
    {
        id: 'user3',
        phoneNumber: '734567890',
        firstName: 'Mike',
        lastName: 'Johnson',
        isVerified: false,
        walletAddress: '0xdD2FD4581271e230360230F9337D5c0430Bf44C0',
    },
    {
        id: 'user4',
        phoneNumber: '745678901',
        firstName: 'Sarah',
        lastName: 'Williams',
        isVerified: true,
        walletAddress: '0xbDA5747bFD65F08deb54cb465eB87D40e51B197E',
    },
    {
        id: 'user5',
        phoneNumber: '756789012',
        firstName: 'David',
        lastName: 'Brown',
        isVerified: true,
        walletAddress: '0x2546BcD3c84621e976D8185a91A922aE77ECEc30',
    },
];

/**
 * Mock function to look up user by phone number
 */
export const findUserByPhone = (phoneNumber: string): MockUser | null => {
    // Remove any spaces, dashes, or +254 prefix
    const cleanPhone = phoneNumber.replace(/[\s\-+]/g, '').replace(/^254/, '');

    const user = mockUsers.find(u => u.phoneNumber === cleanPhone);
    return user || null;
};

/**
 * Mock function to check if user exists
 */
export const checkUserExists = (phoneNumber: string): boolean => {
    return findUserByPhone(phoneNumber) !== null;
};
