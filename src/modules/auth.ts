import type { HttpClient } from '../core/client';
import type { ApiResponse, Wallet } from '../types';

/**
 * Authentication Module
 * Handles API token authentication and wallet info
 */
export class AuthModule {
  constructor(private readonly client: HttpClient) {}

  /**
   * Set API token for authentication
   * All subsequent requests will include this token
   */
  setApiToken(token: string): void {
    this.client.setToken(token);
  }

  /**
   * Get current API token
   */
  getApiToken(): string | null {
    return this.client.getToken();
  }

  /**
   * Clear API token
   */
  clearApiToken(): void {
    this.client.setToken(null);
  }

  /**
   * Get wallet balance and info
   */
  async getWallet(): Promise<ApiResponse<Wallet>> {
    return this.client.authRequest('GET', '/api/admin-temp-v1/financial/wallet');
  }
}
