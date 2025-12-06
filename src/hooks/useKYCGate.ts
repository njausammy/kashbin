/**
 * useKYCGate Hook
 *
 * Provides KYC checking functionality to gate transactions and actions.
 * Use this hook to check if user can perform KYC-required actions.
 *
 * Usage:
 * const { canPerformAction, checkKYC, showBlocker, kycStatus } = useKYCGate();
 *
 * // Check before action
 * if (!canPerformAction()) {
 *   checkKYC('send money'); // Shows blocker if needed
 *   return;
 * }
 *
 * // Perform action
 * sendMoney();
 */

import { useState } from 'react';
import { useCurrentUser } from './useCurrentUser';

export const useKYCGate = () => {
  const { user } = useCurrentUser();
  const [showBlocker, setShowBlocker] = useState(false);
  const [blockedAction, setBlockedAction] = useState('');

  const kycStatus = user?.kycStatus || 'none';

  /**
   * Check if user can perform KYC-required actions
   */
  const canPerformAction = (): boolean => {
    return kycStatus === 'approved';
  };

  /**
   * Check KYC and show blocker if needed
   * @param action - The action user is trying to perform
   * @returns true if can proceed, false if blocked
   */
  const checkKYC = (action: string): boolean => {
    if (canPerformAction()) {
      return true;
    }

    // Show blocker
    setBlockedAction(action);
    setShowBlocker(true);
    return false;
  };

  /**
   * Close the blocker modal
   */
  const closeBlocker = () => {
    setShowBlocker(false);
    setBlockedAction('');
  };

  /**
   * Check if specific actions are allowed
   */
  const canSendMoney = () => kycStatus === 'approved';
  const canBuyUSDT = () => kycStatus === 'approved';
  const canCashOut = () => kycStatus === 'approved';
  const canViewWallet = () => true; // Always allowed

  /**
   * Get user-friendly KYC status message
   */
  const getStatusMessage = (): string => {
    switch (kycStatus) {
      case 'none':
        return 'Complete verification to unlock all features';
      case 'pending':
        return 'Your verification is being reviewed';
      case 'approved':
        return 'Verified';
      case 'rejected':
        return 'Verification failed - Contact support';
      default:
        return 'Not verified';
    }
  };

  /**
   * Get status badge color
   */
  const getStatusColor = (): string => {
    switch (kycStatus) {
      case 'approved':
        return '#1B7B4E'; // Green
      case 'pending':
        return '#F5A623'; // Gold
      case 'rejected':
        return '#DB1E36'; // Red
      default:
        return '#5A5A5A'; // Gray
    }
  };

  /**
   * Check if user needs to complete KYC
   */
  const needsKYC = () => kycStatus === 'none';

  /**
   * Check if KYC is in progress
   */
  const kycInProgress = () => kycStatus === 'pending';

  /**
   * Check if KYC is approved
   */
  const isKYCApproved = () => kycStatus === 'approved';

  return {
    // Status
    kycStatus,
    needsKYC: needsKYC(),
    kycInProgress: kycInProgress(),
    isKYCApproved: isKYCApproved(),

    // Actions
    canPerformAction,
    checkKYC,

    // Specific checks
    canSendMoney: canSendMoney(),
    canBuyUSDT: canBuyUSDT(),
    canCashOut: canCashOut(),
    canViewWallet: canViewWallet(),

    // Blocker
    showBlocker,
    closeBlocker,
    blockedAction,

    // UI Helpers
    statusMessage: getStatusMessage(),
    statusColor: getStatusColor(),
  };
};

export default useKYCGate;
