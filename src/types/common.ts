/**
 * Base API response structure
 */
export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data: T;
  id?: number;
  count?: number;
  total?: number;
  page?: number;
}

/**
 * Paginated response
 */
export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  count: number;
  total: number;
  page: number;
}

/**
 * SDK Configuration
 */
export interface MizbanCloudConfig {
  /** Base URL for Auth/Main API (default: http://localhost:8003) */
  authBaseUrl?: string;
  /** Base URL for CDN API (default: http://localhost:8000) */
  cdnBaseUrl?: string;
  /** Base URL for Cloud API (default: http://localhost:8001) */
  cloudBaseUrl?: string;
  /** Request timeout in milliseconds (default: 30000) */
  timeout?: number;
  /** Language for API responses: 'en' or 'fa' (default: 'en') */
  language?: 'en' | 'fa';
  /** Custom headers to include in all requests */
  headers?: Record<string, string>;
}

/**
 * Authentication token info
 */
export interface TokenInfo {
  token: string;
  expiresAt?: string;
  type?: 'USER' | 'ADMIN' | 'API_KEY';
}

/**
 * Error response from API
 */
export interface ApiError {
  success: false;
  message: string;
  data?: unknown;
  fields?: string[];
  invalidFields?: string[];
  missing_fields?: string[];
}

/**
 * Request options
 */
export interface RequestOptions {
  headers?: Record<string, string>;
  timeout?: number;
  params?: Record<string, unknown>;
}
