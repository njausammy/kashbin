/**
 * Kash Chain Brand Colors - Complete System
 *
 * COLOR STRATEGY:
 * - BLUE (#1E40AF) = Trust & Security (P2P, M-Pesa, Merchants)
 * - GOLD (#F59E0B) = Value & External (External wallets, Cash agents)
 * - GREEN (#22C55E) = Success
 * - RED (#DC2626) = Errors
 * - ORANGE (#F97316) = Pending/Warnings
 */

export const Colors = {
  // Primary - Deep Blue (Trust & Security)
  primary: {
    DEFAULT: '#1E40AF',
    50: '#EFF6FF',
    100: '#DBEAFE',
    200: '#BFDBFE',
    300: '#93C5FD',
    400: '#60A5FA',
    500: '#3B82F6',
    600: '#2563EB',
    700: '#1E40AF',
    800: '#1E3A8A',
    900: '#1E3A8A',
  },

  // Secondary - Gold (Value & External)
  secondary: {
    DEFAULT: '#F59E0B',
    50: '#FFFBEB',
    100: '#FEF3C7',
    200: '#FDE68A',
    300: '#FCD34D',
    400: '#FBBF24',
    500: '#F59E0B',
    600: '#D97706',
    700: '#B45309',
    800: '#92400E',
    900: '#78350F',
  },

  // Status Colors
  success: '#22C55E',
  error: '#DC2626',
  warning: '#F97316',
  info: '#3B82F6',

  // Neutrals
  dark: '#1C1C1E',
  grey: '#8E8E93',
  lightGrey: '#E5E7EB',
  white: '#FFFFFF',
  black: '#000000',
  background: '#F5F5F7',

  // Legacy support (for gradual migration)
  light: {
    text: '#11181C',
    background: '#fff',
    tint: '#1E40AF',
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: '#1E40AF',
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: '#F59E0B',
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: '#F59E0B',
  },
} as const;

// Helper type
export type ColorScheme = keyof typeof Colors;
