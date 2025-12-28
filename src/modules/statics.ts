import type { HttpClient } from '../core/client';
import type {
  ApiResponse,
  Datacenter,
  OperatingSystem,
  CacheTime,
  Slider,
} from '../types';

/**
 * Statics Module
 * Catalog data: datacenters, operating systems, cache times, sliders
 */
export class StaticsModule {
  constructor(private readonly client: HttpClient) {}

  /**
   * List all available datacenters
   * Returns datacenter options for server creation
   */
  async listDatacenters(): Promise<ApiResponse<Datacenter[]>> {
    return this.client.authRequest('GET', '/api/v1/static/datacenters');
  }

  /**
   * List all available operating systems
   * Returns OS options for server creation
   */
  async listOperatingSystems(): Promise<ApiResponse<OperatingSystem[]>> {
    return this.client.authRequest('GET', '/api/v1/static/os-list');
  }

  /**
   * Get cache time options
   * Returns predefined cache TTL options
   */
  async getCacheTimes(): Promise<ApiResponse<CacheTime[]>> {
    return this.client.authRequest('GET', '/api/v1/static/cache-times');
  }

  /**
   * Get promotional sliders/banners
   */
  async getSliders(): Promise<ApiResponse<Slider[]>> {
    return this.client.authRequest('GET', '/api/v1/static/sliders');
  }
}
