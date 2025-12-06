import { Colors } from '@/src/constants/Colors';

export type FlowType = 'p2p' | 'external' | 'mpesa' | 'merchant' | 'cash' | 'pesa-link';

/**
 * Get the appropriate color for a transaction flow
 *
 * BLUE flows (Trust & Security):
 * - P2P, M-Pesa, Merchant, Pesa Link
 *
 * GOLD flows (Value & External):
 * - External wallets, Cash agents
 */
export const getFlowColor = (flowType: FlowType): string => {
  switch (flowType) {
    case 'p2p':
    case 'mpesa':
    case 'merchant':
    case 'pesa-link':
      return Colors.primary.DEFAULT; // Blue - Trust
    case 'external':
    case 'cash':
      return Colors.secondary.DEFAULT; // Gold - Value
    default:
      return Colors.primary.DEFAULT;
  }
};
