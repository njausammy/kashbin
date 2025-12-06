/**
 * useCurrentUser Hook
 *
 * Access the currently logged-in user from anywhere in the app.
 * This hook fetches the user from local storage and provides methods to update or logout.
 */

import { useState, useEffect } from 'react';
import localDB, { User } from '@/src/utils/LocalDatabase';

export const useCurrentUser = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load current user on mount
  useEffect(() => {
    loadCurrentUser();
  }, []);

  const loadCurrentUser = async () => {
    try {
      setLoading(true);
      setError(null);
      const currentUser = await localDB.getCurrentUser();
      setUser(currentUser);
    } catch (err: any) {
      console.error('Error loading current user:', err);
      setError(err.message || 'Failed to load user');
    } finally {
      setLoading(false);
    }
  };

  /**
   * Update current user data
   */
  const updateUser = async (updates: Partial<User>) => {
    if (!user) return null;

    try {
      const updatedUser = await localDB.updateUser(user.id, updates);
      if (updatedUser) {
        setUser(updatedUser);
      }
      return updatedUser;
    } catch (err: any) {
      console.error('Error updating user:', err);
      setError(err.message || 'Failed to update user');
      return null;
    }
  };

  /**
   * Logout current user
   */
  const logout = async () => {
    try {
      await localDB.logout();
      setUser(null);
    } catch (err: any) {
      console.error('Error logging out:', err);
      setError(err.message || 'Failed to logout');
    }
  };

  /**
   * Refresh user data from storage
   */
  const refresh = async () => {
    await loadCurrentUser();
  };

  return {
    user,
    loading,
    error,
    updateUser,
    logout,
    refresh,
    isLoggedIn: !!user,
  };
};

export default useCurrentUser;
