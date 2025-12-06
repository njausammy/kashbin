/**
 * Local User Database
 *
 * Stores user data locally on the device using AsyncStorage.
 * This creates a real in-memory database that persists across app sessions.
 *
 * Data stored:
 * - users: Array of all registered users
 * - currentUser: Currently logged-in user
 */

import LocalStorage from './LocalStorage';

export interface User {
  id: string;
  phoneNumber: string;
  pin?: string; // Optional PIN (for future use when we add it back)
  firstName: string;
  lastName: string;
  kycStatus: 'none' | 'pending' | 'approved' | 'rejected';
  walletAddress: string;
  createdAt: string;
  lastLogin?: string;
}

const USERS_KEY = 'local_users_db';
const CURRENT_USER_KEY = 'current_user';

class LocalDatabase {
  /**
   * Get all users from local storage
   */
  async getAllUsers(): Promise<User[]> {
    const usersJson = await LocalStorage.getItem(USERS_KEY);
    if (!usersJson) return [];

    try {
      return JSON.parse(usersJson);
    } catch (error) {
      console.error('Error parsing users from storage:', error);
      return [];
    }
  }

  /**
   * Save users array to local storage
   */
  private async saveUsers(users: User[]): Promise<void> {
    await LocalStorage.setItem(USERS_KEY, JSON.stringify(users));
  }

  /**
   * Generate a unique user ID
   */
  private generateUserId(): string {
    return `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Generate a mock wallet address
   */
  private generateWalletAddress(): string {
    const chars = '0123456789abcdef';
    let address = '0x';
    for (let i = 0; i < 40; i++) {
      address += chars[Math.floor(Math.random() * chars.length)];
    }
    return address;
  }

  /**
   * Check if a user exists by phone number
   */
  async userExists(phoneNumber: string): Promise<boolean> {
    const users = await this.getAllUsers();
    return users.some(user => user.phoneNumber === phoneNumber);
  }

  /**
   * Get user by phone number
   */
  async getUserByPhone(phoneNumber: string): Promise<User | null> {
    const users = await this.getAllUsers();
    return users.find(user => user.phoneNumber === phoneNumber) || null;
  }

  /**
   * Create a new user
   */
  async createUser(data: {
    phoneNumber: string;
    pin?: string; // Optional PIN
    firstName: string;
    lastName: string;
  }): Promise<User> {
    // Check if user already exists
    const exists = await this.userExists(data.phoneNumber);
    if (exists) {
      throw new Error('User with this phone number already exists');
    }

    const newUser: User = {
      id: this.generateUserId(),
      phoneNumber: data.phoneNumber,
      pin: data.pin, // TODO: Hash this in production
      firstName: data.firstName,
      lastName: data.lastName,
      kycStatus: 'none',
      walletAddress: this.generateWalletAddress(),
      createdAt: new Date().toISOString(),
    };

    const users = await this.getAllUsers();
    users.push(newUser);
    await this.saveUsers(users);

    return newUser;
  }

  /**
   * Verify user credentials (phone + PIN)
   */
  async verifyCredentials(phoneNumber: string, pin: string): Promise<User | null> {
    const user = await this.getUserByPhone(phoneNumber);

    if (!user) {
      return null; // User not found
    }

    // In production, compare hashed PINs
    if (user.pin !== pin) {
      return null; // Incorrect PIN
    }

    return user;
  }

  /**
   * Set current logged-in user
   */
  async setCurrentUser(user: User): Promise<void> {
    // Update last login time
    const users = await this.getAllUsers();
    const userIndex = users.findIndex(u => u.id === user.id);

    if (userIndex !== -1) {
      users[userIndex].lastLogin = new Date().toISOString();
      await this.saveUsers(users);
    }

    // Store current user
    await LocalStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
  }

  /**
   * Get current logged-in user
   */
  async getCurrentUser(): Promise<User | null> {
    const userJson = await LocalStorage.getItem(CURRENT_USER_KEY);
    if (!userJson) return null;

    try {
      return JSON.parse(userJson);
    } catch (error) {
      console.error('Error parsing current user:', error);
      return null;
    }
  }

  /**
   * Update user data
   */
  async updateUser(userId: string, updates: Partial<User>): Promise<User | null> {
    const users = await this.getAllUsers();
    const userIndex = users.findIndex(u => u.id === userId);

    if (userIndex === -1) {
      return null; // User not found
    }

    users[userIndex] = { ...users[userIndex], ...updates };
    await this.saveUsers(users);

    // Update current user if it's the same user
    const currentUser = await this.getCurrentUser();
    if (currentUser && currentUser.id === userId) {
      await this.setCurrentUser(users[userIndex]);
    }

    return users[userIndex];
  }

  /**
   * Logout current user
   */
  async logout(): Promise<void> {
    await LocalStorage.removeItem(CURRENT_USER_KEY);
  }

  /**
   * Delete user account
   */
  async deleteUser(userId: string): Promise<boolean> {
    const users = await this.getAllUsers();
    const filteredUsers = users.filter(u => u.id !== userId);

    if (filteredUsers.length === users.length) {
      return false; // User not found
    }

    await this.saveUsers(filteredUsers);

    // Clear current user if it was deleted
    const currentUser = await this.getCurrentUser();
    if (currentUser && currentUser.id === userId) {
      await this.logout();
    }

    return true;
  }

  /**
   * Clear all users (for testing/development)
   */
  async clearAllUsers(): Promise<void> {
    await LocalStorage.removeItem(USERS_KEY);
    await LocalStorage.removeItem(CURRENT_USER_KEY);
  }

  /**
   * Get total user count
   */
  async getUserCount(): Promise<number> {
    const users = await this.getAllUsers();
    return users.length;
  }
}

// Export singleton instance
export const localDB = new LocalDatabase();
export default localDB;
