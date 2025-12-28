import { describe, it, expect, beforeEach, vi } from 'vitest';
import { MizbanCloud, MizbanCloudError } from '../index';

// Mock axios
vi.mock('axios', () => {
  const mockAxiosInstance = {
    request: vi.fn(),
    interceptors: {
      request: {
        use: vi.fn(),
      },
    },
  };

  return {
    default: {
      create: vi.fn(() => mockAxiosInstance),
    },
  };
});

describe('MizbanCloud SDK', () => {
  let client: MizbanCloud;

  beforeEach(() => {
    vi.clearAllMocks();
    client = new MizbanCloud({
      authBaseUrl: 'http://localhost:8003',
      cdnBaseUrl: 'http://localhost:8000',
      cloudBaseUrl: 'http://localhost:8001',
    });
  });

  describe('Initialization', () => {
    it('should create client with default config', () => {
      const defaultClient = new MizbanCloud();
      expect(defaultClient).toBeDefined();
      expect(defaultClient.auth).toBeDefined();
      expect(defaultClient.cdn).toBeDefined();
      expect(defaultClient.cloud).toBeDefined();
      expect(defaultClient.statics).toBeDefined();
    });

    it('should create client with custom config', () => {
      expect(client).toBeDefined();
    });

    it('should have all modules defined', () => {
      expect(client.auth).toBeDefined();
      expect(client.cdn).toBeDefined();
      expect(client.cloud).toBeDefined();
      expect(client.statics).toBeDefined();
    });

    it('should accept custom timeout', () => {
      const customClient = new MizbanCloud({
        timeout: 60000,
      });
      expect(customClient).toBeDefined();
    });

    it('should accept custom headers', () => {
      const customClient = new MizbanCloud({
        headers: {
          'X-Custom-Header': 'test-value',
        },
      });
      expect(customClient).toBeDefined();
    });
  });

  describe('Authentication State', () => {
    it('should not be authenticated initially', () => {
      expect(client.isAuthenticated()).toBe(false);
      expect(client.getToken()).toBeNull();
    });

    it('should set and get token', () => {
      client.setToken('test-token');
      expect(client.isAuthenticated()).toBe(true);
      expect(client.getToken()).toBe('test-token');
    });

    it('should handle null token', () => {
      client.setToken('test-token');
      expect(client.isAuthenticated()).toBe(true);

      client.auth.clearApiToken();
      expect(client.isAuthenticated()).toBe(false);
      expect(client.getToken()).toBeNull();
    });
  });

  describe('Language Settings', () => {
    it('should get default language (en)', () => {
      expect(client.getLanguage()).toBe('en');
    });

    it('should set language to fa', () => {
      client.setLanguage('fa');
      expect(client.getLanguage()).toBe('fa');
    });

    it('should set language to en', () => {
      client.setLanguage('fa');
      client.setLanguage('en');
      expect(client.getLanguage()).toBe('en');
    });

    it('should initialize with custom language', () => {
      const faClient = new MizbanCloud({ language: 'fa' });
      expect(faClient.getLanguage()).toBe('fa');
    });
  });

  describe('MizbanCloudError', () => {
    it('should create error with all properties', () => {
      const error = new MizbanCloudError(
        'Test error',
        400,
        {
          success: false,
          message: 'Test error',
          fields: ['email'],
          invalidFields: ['password'],
          missing_fields: ['name'],
        }
      );

      expect(error.message).toBe('Test error');
      expect(error.statusCode).toBe(400);
      expect(error.fields).toEqual(['email']);
      expect(error.invalidFields).toEqual(['password']);
      expect(error.missingFields).toEqual(['name']);
    });

    it('should be instanceof Error', () => {
      const error = new MizbanCloudError('Test', 500, {
        success: false,
        message: 'Test',
      });

      expect(error instanceof Error).toBe(true);
      expect(error instanceof MizbanCloudError).toBe(true);
    });

    it('should have name property set to MizbanCloudError', () => {
      const error = new MizbanCloudError('Test', 500, {
        success: false,
        message: 'Test',
      });

      expect(error.name).toBe('MizbanCloudError');
    });
  });

  describe('Module Integration', () => {
    it('should share token between modules', () => {
      client.setToken('shared-token');

      expect(client.getToken()).toBe('shared-token');
      expect(client.auth.getApiToken()).toBe('shared-token');
    });

    it('should share language between modules', () => {
      client.setLanguage('fa');
      expect(client.getLanguage()).toBe('fa');
    });
  });
});
