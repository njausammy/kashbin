/**
 * Kash Chain Brand Theme
 *
 * Centralized color system for the entire application.
 * Deep Blue + Gold branding with functional colors.
 *
 * USAGE:
 * import { colors, spacing, fonts } from '@/src/constants/theme';
 *
 * <Box backgroundColor={colors.primary.main} padding={spacing.md}>
 *   <Text color={colors.text.primary} fontSize={fonts.sizes.lg}>
 *     Hello
 *   </Text>
 * </Box>
 */

// ============================================================================
// COLORS
// ============================================================================

export const colors = {
  // Primary Brand Color (Deep Blue)
  primary: {
    main: '#1E40AF',      // Deep Blue - Main brand color
    light: '#3B82F6',     // Lighter blue for hover states
    dark: '#1E3A8A',      // Darker blue for pressed states
    50: '#EFF6FF',
    100: '#DBEAFE',
    200: '#BFDBFE',
    300: '#93C5FD',
    400: '#60A5FA',
    500: '#1E40AF',
    600: '#1E3A8A',
    700: '#1E3A8A',
    800: '#1E40AF',
    900: '#1E3A8A',
    950: '#172554',
  },

  // Secondary Brand Color (Gold)
  secondary: {
    main: '#F59E0B',      // Gold - Secondary accent
    light: '#FBBF24',     // Lighter gold
    dark: '#D97706',      // Darker gold
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
    950: '#451A03',
  },

  // Functional Colors
  success: {
    main: '#22C55E',      // Success Green (completed, verified, positive)
    light: '#4ADE80',
    dark: '#16A34A',
    bg: '#F0FDF4',        // Light green background
  },

  warning: {
    main: '#F97316',      // Warning Orange (pending, low balance, in progress)
    light: '#FB923C',
    dark: '#EA580C',
    bg: '#FFF7ED',        // Light orange background
  },

  error: {
    main: '#DC2626',      // Error Red (failed, errors, destructive)
    light: '#EF4444',
    dark: '#B91C1C',
    bg: '#FEF2F2',        // Light red background
  },

  info: {
    main: '#3B82F6',      // Info Blue (tips, information, help)
    light: '#60A5FA',
    dark: '#2563EB',
    bg: '#EFF6FF',        // Light blue background
  },

  // Neutral Colors (Elephant Identity)
  neutral: {
    charcoal: '#1C1C1E',       // Primary text, dark sections
    elephantGrey: '#8E8E93',   // Secondary text, borders, icons
    lightGrey: '#E5E7EB',      // Dividers, subtle backgrounds
    white: '#FFFFFF',          // Cards, surfaces, main background
    black: '#000000',          // Pure black for shadows
  },

  // Text Colors
  text: {
    primary: '#1C1C1E',        // Main text color
    secondary: '#8E8E93',      // Secondary text, labels
    tertiary: '#C7C7CC',       // Disabled text, placeholders
    inverse: '#FFFFFF',        // White text on dark backgrounds
    link: '#1E40AF',           // Link text (primary blue)
    error: '#DC2626',          // Error messages
    success: '#22C55E',        // Success messages
  },

  // Background Colors
  background: {
    primary: '#FFFFFF',        // Main app background
    secondary: '#F9FAFB',      // Secondary background
    tertiary: '#F3F4F6',       // Card backgrounds
    dark: '#1C1C1E',           // Dark mode background
    overlay: 'rgba(0, 0, 0, 0.5)',  // Modal overlays
  },

  // Border Colors
  border: {
    light: '#E5E7EB',          // Light borders
    medium: '#D1D5DB',         // Medium borders
    dark: '#9CA3AF',           // Dark borders
    focus: '#1E40AF',          // Focused input borders
    error: '#DC2626',          // Error borders
  },

  // Special Colors
  shadow: {
    light: 'rgba(0, 0, 0, 0.05)',
    medium: 'rgba(0, 0, 0, 0.1)',
    dark: 'rgba(0, 0, 0, 0.25)',
  },

  // Transaction Type Colors
  transaction: {
    send: '#DC2626',           // Sent money (red)
    receive: '#22C55E',        // Received money (green)
    buy: '#22C55E',            // Bought USDT (green)
    cashOut: '#F97316',        // Cashed out (orange)
    merchant: '#F59E0B',       // Merchant payment (gold)
  },

  // Status Colors
  status: {
    completed: '#22C55E',      // Completed status
    pending: '#F97316',        // Pending status
    failed: '#DC2626',         // Failed status
    processing: '#3B82F6',     // Processing status
  },

  // KYC Status Colors
  kyc: {
    none: '#8E8E93',           // Not started
    pending: '#F97316',        // Under review
    approved: '#22C55E',       // Verified
    rejected: '#DC2626',       // Rejected
  },
};

// ============================================================================
// TYPOGRAPHY
// ============================================================================

export const fonts = {
  // Font Families
  family: {
    regular: 'System',
    medium: 'System',
    semibold: 'System',
    bold: 'System',
  },

  // Font Sizes
  sizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 30,
    '4xl': 36,
    '5xl': 48,
  },

  // Font Weights
  weights: {
    light: '300' as const,
    regular: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
    extrabold: '800' as const,
  },

  // Line Heights
  lineHeights: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.75,
    loose: 2,
  },
};

// ============================================================================
// SPACING
// ============================================================================

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  '2xl': 40,
  '3xl': 48,
  '4xl': 64,
};

// ============================================================================
// BORDER RADIUS
// ============================================================================

export const borderRadius = {
  none: 0,
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  '2xl': 20,
  '3xl': 24,
  full: 9999,
  circle: '50%' as const,
};

// ============================================================================
// SHADOWS
// ============================================================================

export const shadows = {
  none: {
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  sm: {
    shadowColor: colors.shadow.light,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  md: {
    shadowColor: colors.shadow.medium,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  lg: {
    shadowColor: colors.shadow.medium,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
  },
  xl: {
    shadowColor: colors.shadow.dark,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 12,
  },
};

// ============================================================================
// BUTTON STYLES
// ============================================================================

export const buttonStyles = {
  primary: {
    backgroundColor: colors.primary.main,
    color: colors.text.inverse,
    borderColor: colors.primary.main,
  },
  primaryOutline: {
    backgroundColor: 'transparent',
    color: colors.primary.main,
    borderColor: colors.primary.main,
  },
  secondary: {
    backgroundColor: colors.secondary.main,
    color: colors.text.inverse,
    borderColor: colors.secondary.main,
  },
  secondaryOutline: {
    backgroundColor: 'transparent',
    color: colors.secondary.main,
    borderColor: colors.secondary.main,
  },
  success: {
    backgroundColor: colors.success.main,
    color: colors.text.inverse,
    borderColor: colors.success.main,
  },
  error: {
    backgroundColor: colors.error.main,
    color: colors.text.inverse,
    borderColor: colors.error.main,
  },
  ghost: {
    backgroundColor: 'transparent',
    color: colors.text.primary,
    borderColor: 'transparent',
  },
  disabled: {
    backgroundColor: colors.neutral.lightGrey,
    color: colors.text.tertiary,
    borderColor: colors.neutral.lightGrey,
  },
};

// ============================================================================
// INPUT STYLES
// ============================================================================

export const inputStyles = {
  default: {
    borderColor: colors.border.light,
    backgroundColor: colors.background.primary,
    color: colors.text.primary,
  },
  focus: {
    borderColor: colors.border.focus,
    backgroundColor: colors.background.primary,
    color: colors.text.primary,
  },
  error: {
    borderColor: colors.border.error,
    backgroundColor: colors.error.bg,
    color: colors.text.primary,
  },
  disabled: {
    borderColor: colors.border.light,
    backgroundColor: colors.background.secondary,
    color: colors.text.tertiary,
  },
};

// ============================================================================
// COMMON STYLES
// ============================================================================

export const commonStyles = {
  // Card style
  card: {
    backgroundColor: colors.background.primary,
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    ...shadows.md,
  },

  // Input style
  input: {
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    borderWidth: 1,
    fontSize: fonts.sizes.md,
    ...inputStyles.default,
  },

  // Button style
  button: {
    borderRadius: borderRadius.lg,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    ...shadows.sm,
  },
};

// ============================================================================
// EXPORT DEFAULT
// ============================================================================

export default {
  colors,
  fonts,
  spacing,
  borderRadius,
  shadows,
  buttonStyles,
  inputStyles,
  commonStyles,
};
