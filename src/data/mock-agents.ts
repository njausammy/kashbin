export interface Agent {
    id: string;
    code: string;              // Short code: "JOHN3"
    name: string;              // "John's Shop"
    type: 'shop' | 'agent' | 'otc';
    location: {
        address: string;
        city: string;
        lat: number;
        lon: number;
    };
    distance: string;          // "0.5 km"
    fees: {
        cashOut: number;       // 1.5% (sell USDT, get cash)
        buyUsdt: number;       // 2% (give cash, get USDT)
    };
    rating: number;            // 4.8
    reviews: number;           // 120
    operatingHours: string;    // "8am - 8pm"
    isOpen: boolean;
    qrCode: string;            // QR code data: kash-chain-agent://CODE
    acceptsCash: boolean;
    acceptsMpesa: boolean;
    cashAvailable: number;     // Amount in KES
}

export const mockAgents: Agent[] = [
    {
        id: 'agent_001',
        code: 'JOHN3',
        name: "John's Shop",
        type: 'shop',
        location: {
            address: 'Muthithi Road',
            city: 'Westlands, Nairobi',
            lat: -1.2667,
            lon: 36.8167
        },
        distance: '0.5 km',
        fees: {
            cashOut: 0.015,    // 1.5%
            buyUsdt: 0.020     // 2%
        },
        rating: 4.8,
        reviews: 120,
        operatingHours: '8am - 8pm',
        isOpen: true,
        qrCode: 'kash-chain-agent://JOHN3',
        acceptsCash: true,
        acceptsMpesa: true,
        cashAvailable: 500000
    },
    {
        id: 'agent_002',
        code: 'QUICK',
        name: 'QuickCash Agent',
        type: 'agent',
        location: {
            address: 'Elgeyo Marakwet Road',
            city: 'Kilimani, Nairobi',
            lat: -1.2833,
            lon: 36.7833
        },
        distance: '1.2 km',
        fees: {
            cashOut: 0.020,    // 2%
            buyUsdt: 0.025     // 2.5%
        },
        rating: 4.5,
        reviews: 85,
        operatingHours: '7am - 10pm',
        isOpen: true,
        qrCode: 'kash-chain-agent://QUICK',
        acceptsCash: true,
        acceptsMpesa: true,
        cashAvailable: 800000
    },
    {
        id: 'agent_003',
        code: 'SAFARI',
        name: 'SafariOTC',
        type: 'otc',
        location: {
            address: 'Kimathi Street',
            city: 'CBD, Nairobi',
            lat: -1.2864,
            lon: 36.8172
        },
        distance: '2.1 km',
        fees: {
            cashOut: 0.010,    // 1%
            buyUsdt: 0.015     // 1.5%
        },
        rating: 4.9,
        reviews: 200,
        operatingHours: '8am - 6pm',
        isOpen: true,
        qrCode: 'kash-chain-agent://SAFARI',
        acceptsCash: true,
        acceptsMpesa: true,
        cashAvailable: 1200000
    },
    {
        id: 'agent_004',
        code: 'MPESA7',
        name: 'M-Pesa Shop Karen',
        type: 'shop',
        location: {
            address: 'Karen Shopping Centre',
            city: 'Karen, Nairobi',
            lat: -1.3167,
            lon: 36.7167
        },
        distance: '3.5 km',
        fees: {
            cashOut: 0.018,    // 1.8%
            buyUsdt: 0.022     // 2.2%
        },
        rating: 4.6,
        reviews: 95,
        operatingHours: '8am - 8pm',
        isOpen: true,
        qrCode: 'kash-chain-agent://MPESA7',
        acceptsCash: true,
        acceptsMpesa: true,
        cashAvailable: 600000
    },
    {
        id: 'agent_005',
        code: 'FOREX1',
        name: 'ForexHub Eastleigh',
        type: 'otc',
        location: {
            address: '1st Avenue',
            city: 'Eastleigh, Nairobi',
            lat: -1.2833,
            lon: 36.8500
        },
        distance: '4.2 km',
        fees: {
            cashOut: 0.012,    // 1.2%
            buyUsdt: 0.018     // 1.8%
        },
        rating: 4.7,
        reviews: 150,
        operatingHours: '9am - 7pm',
        isOpen: true,
        qrCode: 'kash-chain-agent://FOREX1',
        acceptsCash: true,
        acceptsMpesa: false,
        cashAvailable: 900000
    },
    {
        id: 'agent_006',
        code: 'NAKUM8',
        name: 'Nakumatt Junction Agent',
        type: 'agent',
        location: {
            address: 'Ngong Road',
            city: 'Dagoretti, Nairobi',
            lat: -1.3000,
            lon: 36.7500
        },
        distance: '5.0 km',
        fees: {
            cashOut: 0.017,    // 1.7%
            buyUsdt: 0.021     // 2.1%
        },
        rating: 4.4,
        reviews: 70,
        operatingHours: '8am - 9pm',
        isOpen: false,
        qrCode: 'kash-chain-agent://NAKUM8',
        acceptsCash: true,
        acceptsMpesa: true,
        cashAvailable: 400000
    }
];

// Helper functions
export const getAllAgents = (): Agent[] => {
    return mockAgents;
};

export const getAgentById = (id: string): Agent | null => {
    return mockAgents.find(agent => agent.id === id) || null;
};

export const getAgentByCode = (code: string): Agent | null => {
    const upperCode = code.toUpperCase().trim();
    return mockAgents.find(agent => agent.code === upperCode) || null;
};

export const getAgentByQRCode = (qrData: string): Agent | null => {
    // QR format: kash-chain-agent://CODE
    const codeMatch = qrData.match(/kash-chain-agent:\/\/([A-Z0-9]+)/);
    if (codeMatch && codeMatch[1]) {
        return getAgentByCode(codeMatch[1]);
    }
    return null;
};

export const getNearbyAgents = (maxDistance?: number): Agent[] => {
    // Filter by distance if provided
    if (maxDistance) {
        return mockAgents.filter(agent => {
            const distance = parseFloat(agent.distance);
            return distance <= maxDistance;
        });
    }
    return mockAgents;
};

export const getOpenAgents = (): Agent[] => {
    return mockAgents.filter(agent => agent.isOpen);
};

export const sortAgentsByDistance = (agents: Agent[]): Agent[] => {
    return [...agents].sort((a, b) => {
        const distA = parseFloat(a.distance);
        const distB = parseFloat(b.distance);
        return distA - distB;
    });
};

export const sortAgentsByRating = (agents: Agent[]): Agent[] => {
    return [...agents].sort((a, b) => b.rating - a.rating);
};

export const sortAgentsByFee = (agents: Agent[], type: 'cashOut' | 'buyUsdt'): Agent[] => {
    return [...agents].sort((a, b) => {
        const feeA = type === 'cashOut' ? a.fees.cashOut : a.fees.buyUsdt;
        const feeB = type === 'cashOut' ? b.fees.cashOut : b.fees.buyUsdt;
        return feeA - feeB;
    });
};
