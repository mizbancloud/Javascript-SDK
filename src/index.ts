import { HttpClient, MizbanCloudError } from './core/client';
import { AuthModule } from './modules/auth';
import { CdnModule } from './modules/cdn';
import { CloudModule } from './modules/cloud';
import { StaticsModule } from './modules/statics';
import type { MizbanCloudConfig } from './types';

/**
 * MizbanCloud SDK
 *
 * Official SDK for interacting with MizbanCloud CDN and Cloud APIs.
 *
 * @example
 * ```typescript
 * import { MizbanCloud } from '@mizbancloud/sdk';
 *
 * const client = new MizbanCloud({
 *   authBaseUrl: 'http://localhost:8003',
 *   cdnBaseUrl: 'http://localhost:8000',
 *   cloudBaseUrl: 'http://localhost:8001',
 * });
 *
 * // Set API token
 * client.setToken('your-api-token');
 *
 * // List domains
 * const domains = await client.cdn.listDomains();
 *
 * // List servers
 * const servers = await client.cloud.listServers();
 * ```
 */
export class MizbanCloud {
  private readonly httpClient: HttpClient;

  /** Authentication module - API token management, wallet */
  public readonly auth: AuthModule;

  /** CDN module - domains, DNS, SSL, cache, security */
  public readonly cdn: CdnModule;

  /** Cloud module - servers, firewall, networks, volumes */
  public readonly cloud: CloudModule;

  /** Statics module - datacenters, OS list, catalog data */
  public readonly statics: StaticsModule;

  constructor(config: MizbanCloudConfig = {}) {
    this.httpClient = new HttpClient(config);

    this.auth = new AuthModule(this.httpClient);
    this.cdn = new CdnModule(this.httpClient);
    this.cloud = new CloudModule(this.httpClient);
    this.statics = new StaticsModule(this.httpClient);
  }

  /**
   * Set API token for authentication
   * All subsequent requests will include this token
   */
  setToken(token: string): void {
    this.httpClient.setToken(token);
  }

  /**
   * Get current API token
   */
  getToken(): string | null {
    return this.httpClient.getToken();
  }

  /**
   * Set language for API responses
   */
  setLanguage(language: 'en' | 'fa'): void {
    this.httpClient.setLanguage(language);
  }

  /**
   * Get current language setting
   */
  getLanguage(): 'en' | 'fa' {
    return this.httpClient.getLanguage();
  }

  /**
   * Check if API token is set
   */
  isAuthenticated(): boolean {
    return this.httpClient.getToken() !== null;
  }
}

// Export main class as default
export default MizbanCloud;

// Export error class
export { MizbanCloudError };

// Export all types
export * from './types';

// Export modules for advanced usage
export { AuthModule, CdnModule, CloudModule, StaticsModule };

// Export HTTP client for custom implementations
export { HttpClient } from './core/client';
