import axios, { AxiosInstance, AxiosError, AxiosRequestConfig } from 'axios';
import type { ApiResponse, ApiError, MizbanCloudConfig, RequestOptions } from '../types';

/**
 * MizbanCloud SDK Error
 */
export class MizbanCloudError extends Error {
  public readonly statusCode: number;
  public readonly response: ApiError;

  constructor(message: string, statusCode: number, response: ApiError) {
    super(message);
    this.name = 'MizbanCloudError';
    this.statusCode = statusCode;
    this.response = response;
  }

  get fields(): string[] | undefined {
    return this.response.fields;
  }

  get invalidFields(): string[] | undefined {
    return this.response.invalidFields;
  }

  get missingFields(): string[] | undefined {
    return this.response.missing_fields;
  }
}

/**
 * HTTP Client for MizbanCloud API
 */
export class HttpClient {
  private authClient: AxiosInstance;
  private cdnClient: AxiosInstance;
  private cloudClient: AxiosInstance;
  private token: string | null = null;
  private language: 'en' | 'fa';

  constructor(config: MizbanCloudConfig = {}) {
    const timeout = config.timeout ?? 30000;
    this.language = config.language ?? 'en';

    const defaultHeaders = {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept': 'application/json',
      'Accept-Language': this.language,
      ...config.headers,
    };

    this.authClient = axios.create({
      baseURL: config.authBaseUrl ?? 'http://localhost:8003',
      timeout,
      headers: defaultHeaders,
    });

    this.cdnClient = axios.create({
      baseURL: config.cdnBaseUrl ?? 'http://localhost:8000',
      timeout,
      headers: defaultHeaders,
    });

    this.cloudClient = axios.create({
      baseURL: config.cloudBaseUrl ?? 'http://localhost:8001',
      timeout,
      headers: defaultHeaders,
    });

    // Add request interceptors
    [this.authClient, this.cdnClient, this.cloudClient].forEach((client) => {
      client.interceptors.request.use((config) => {
        if (this.token) {
          config.headers['Authorization'] = `Bearer ${this.token}`;
        }
        config.headers['Accept-Language'] = this.language;
        return config;
      });
    });
  }

  /**
   * Set authentication token
   */
  setToken(token: string | null): void {
    this.token = token;
  }

  /**
   * Get current token
   */
  getToken(): string | null {
    return this.token;
  }

  /**
   * Set language for API responses
   */
  setLanguage(language: 'en' | 'fa'): void {
    this.language = language;
  }

  /**
   * Get current language
   */
  getLanguage(): 'en' | 'fa' {
    return this.language;
  }

  /**
   * Convert object to form data
   */
  private toFormData(data: Record<string, unknown>): URLSearchParams {
    const params = new URLSearchParams();
    for (const [key, value] of Object.entries(data)) {
      if (value !== undefined && value !== null) {
        if (Array.isArray(value)) {
          value.forEach((v, i) => {
            if (typeof v === 'object') {
              Object.entries(v).forEach(([k, val]) => {
                params.append(`${key}[${i}][${k}]`, String(val));
              });
            } else {
              params.append(`${key}[]`, String(v));
            }
          });
        } else if (typeof value === 'object') {
          Object.entries(value).forEach(([k, v]) => {
            params.append(`${key}[${k}]`, String(v));
          });
        } else {
          params.append(key, String(value));
        }
      }
    }
    return params;
  }

  /**
   * Handle API error
   */
  private handleError(error: AxiosError<ApiError>): never {
    if (error.response) {
      const { status, data } = error.response;
      throw new MizbanCloudError(
        data?.message ?? 'An error occurred',
        status,
        data ?? { success: false, message: 'Unknown error' }
      );
    }
    if (error.code === 'ECONNABORTED') {
      throw new MizbanCloudError('Request timeout', 408, {
        success: false,
        message: 'Request timeout',
      });
    }
    throw new MizbanCloudError(
      error.message ?? 'Network error',
      0,
      { success: false, message: error.message ?? 'Network error' }
    );
  }

  /**
   * Make request to Auth API
   */
  async authRequest<T, D extends object = Record<string, unknown>>(
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    path: string,
    data?: D,
    options?: RequestOptions
  ): Promise<ApiResponse<T>> {
    return this.request(this.authClient, method, path, data as Record<string, unknown>, options);
  }

  /**
   * Make request to CDN API
   */
  async cdnRequest<T, D extends object = Record<string, unknown>>(
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    path: string,
    data?: D,
    options?: RequestOptions
  ): Promise<ApiResponse<T>> {
    return this.request(this.cdnClient, method, path, data as Record<string, unknown>, options);
  }

  /**
   * Make request to Cloud API
   */
  async cloudRequest<T, D extends object = Record<string, unknown>>(
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    path: string,
    data?: D,
    options?: RequestOptions
  ): Promise<ApiResponse<T>> {
    return this.request(this.cloudClient, method, path, data as Record<string, unknown>, options);
  }

  /**
   * Internal request method
   */
  private async request<T>(
    client: AxiosInstance,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    path: string,
    data?: Record<string, unknown>,
    options?: RequestOptions
  ): Promise<ApiResponse<T>> {
    try {
      const config: AxiosRequestConfig = {
        method,
        url: path,
        headers: options?.headers,
        timeout: options?.timeout,
        params: options?.params,
      };

      if (method !== 'GET' && data) {
        config.data = this.toFormData(data);
      } else if (method === 'GET' && data) {
        config.params = { ...config.params, ...data };
      }

      const response = await client.request<ApiResponse<T>>(config);

      // Check for API-level errors (success: false with 2xx status)
      if (response.data && response.data.success === false) {
        throw new MizbanCloudError(
          response.data.message ?? 'Operation failed',
          response.status,
          response.data as unknown as ApiError
        );
      }

      return response.data;
    } catch (error) {
      if (error instanceof MizbanCloudError) {
        throw error;
      }
      this.handleError(error as AxiosError<ApiError>);
    }
  }
}
