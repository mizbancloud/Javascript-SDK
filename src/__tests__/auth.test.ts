import { describe, it, expect, beforeEach, vi } from 'vitest';
import { MizbanCloud } from '../index';

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

describe('Auth Module', () => {
  let client: MizbanCloud;

  beforeEach(() => {
    vi.clearAllMocks();
    client = new MizbanCloud({
      baseUrl: 'https://auth.mizbancloud.com',
    });
  });

  describe('Token Management', () => {
    it('should set API token', () => {
      client.auth.setApiToken('test-token-123');
      expect(client.auth.getApiToken()).toBe('test-token-123');
    });

    it('should get API token', () => {
      client.setToken('my-api-token');
      expect(client.auth.getApiToken()).toBe('my-api-token');
    });

    it('should clear API token', () => {
      client.auth.setApiToken('test-token');
      expect(client.auth.getApiToken()).toBe('test-token');

      client.auth.clearApiToken();
      expect(client.auth.getApiToken()).toBeNull();
    });

    it('should return null when no token is set', () => {
      expect(client.auth.getApiToken()).toBeNull();
    });

    it('should sync token between client and auth module', () => {
      client.setToken('main-token');
      expect(client.auth.getApiToken()).toBe('main-token');

      client.auth.setApiToken('auth-token');
      expect(client.getToken()).toBe('auth-token');
    });
  });

  describe('Authentication State', () => {
    it('should not be authenticated initially', () => {
      expect(client.isAuthenticated()).toBe(false);
    });

    it('should be authenticated after setting token', () => {
      client.setToken('valid-token');
      expect(client.isAuthenticated()).toBe(true);
    });

    it('should not be authenticated after clearing token', () => {
      client.setToken('valid-token');
      expect(client.isAuthenticated()).toBe(true);

      client.auth.clearApiToken();
      expect(client.isAuthenticated()).toBe(false);
    });
  });

  describe('getWallet', () => {
    it('should have getWallet method', () => {
      expect(typeof client.auth.getWallet).toBe('function');
    });
  });
});
