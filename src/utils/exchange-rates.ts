/**
 * Exchange Rate System
 * Handles USDT ↔ KES conversions with buy/sell spreads
 */

export interface ExchangeRate {
    buyRate: number;  // Rate when user buys USDT (KES → USDT)
    sellRate: number; // Rate when user sells USDT (USDT → KES)
    lastUpdated: Date;
}

export interface ConversionResult {
    fromAmount: number;
    toAmount: number;
    rate: number;
    fee: number;
    feePercentage: number;
    total: number;
    currency: 'USDT' | 'KES';
}

// Mock exchange rates (in production, fetch from API)
const MOCK_RATES: ExchangeRate = {
    buyRate: 134.50,   // User pays 134.50 KES per 1 USDT
    sellRate: 132.00,  // User receives 132.00 KES per 1 USDT
    lastUpdated: new Date(),
};

// Fee percentages
const BUY_FEE_PERCENT = 1.5;  // 1.5% fee when buying USDT
const SELL_FEE_PERCENT = 1.0; // 1.0% fee when selling USDT

/**
 * Get current exchange rates
 */
export const getCurrentRates = (): ExchangeRate => {
    return {
        ...MOCK_RATES,
        lastUpdated: new Date(),
    };
};

/**
 * Calculate KES → USDT (User buying USDT with KES)
 */
export const calculateBuyUSDT = (kesAmount: number): ConversionResult => {
    const rate = MOCK_RATES.buyRate;
    const usdtBeforeFee = kesAmount / rate;
    const fee = usdtBeforeFee * (BUY_FEE_PERCENT / 100);
    const usdtAfterFee = usdtBeforeFee - fee;

    return {
        fromAmount: kesAmount,
        toAmount: usdtAfterFee,
        rate,
        fee,
        feePercentage: BUY_FEE_PERCENT,
        total: usdtAfterFee,
        currency: 'USDT',
    };
};

/**
 * Calculate USDT → KES (User selling USDT for KES)
 */
export const calculateSellUSDT = (usdtAmount: number): ConversionResult => {
    const rate = MOCK_RATES.sellRate;
    const kesBeforeFee = usdtAmount * rate;
    const fee = kesBeforeFee * (SELL_FEE_PERCENT / 100);
    const kesAfterFee = kesBeforeFee - fee;

    return {
        fromAmount: usdtAmount,
        toAmount: kesAfterFee,
        rate,
        fee,
        feePercentage: SELL_FEE_PERCENT,
        total: kesAfterFee,
        currency: 'KES',
    };
};

/**
 * Format currency amount
 */
export const formatCurrency = (amount: number, currency: 'USDT' | 'KES'): string => {
    if (currency === 'USDT') {
        return `${amount.toFixed(2)} USDT`;
    } else {
        return `KES ${amount.toLocaleString('en-KE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }
};

/**
 * Get time since last update
 */
export const getTimeSinceUpdate = (lastUpdated: Date): string => {
    const now = new Date();
    const diffMs = now.getTime() - lastUpdated.getTime();
    const diffSecs = Math.floor(diffMs / 1000);

    if (diffSecs < 60) return `${diffSecs}s ago`;
    const diffMins = Math.floor(diffSecs / 60);
    if (diffMins < 60) return `${diffMins}m ago`;
    const diffHours = Math.floor(diffMins / 60);
    return `${diffHours}h ago`;
};
