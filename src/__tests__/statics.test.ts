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

describe('Statics Module', () => {
  let client: MizbanCloud;

  beforeEach(() => {
    vi.clearAllMocks();
    client = new MizbanCloud({
      baseUrl: 'https://auth.mizbancloud.com',
    });
  });

  describe('Module Existence', () => {
    it('should have statics module defined', () => {
      expect(client.statics).toBeDefined();
    });
  });

  describe('Datacenter Methods', () => {
    it('should have listDatacenters method', () => {
      expect(typeof client.statics.listDatacenters).toBe('function');
    });
  });

  describe('Operating System Methods', () => {
    it('should have listOperatingSystems method', () => {
      expect(typeof client.statics.listOperatingSystems).toBe('function');
    });
  });

  describe('Cache Times Methods', () => {
    it('should have getCacheTimes method', () => {
      expect(typeof client.statics.getCacheTimes).toBe('function');
    });
  });

  describe('Sliders Methods', () => {
    it('should have getSliders method', () => {
      expect(typeof client.statics.getSliders).toBe('function');
    });
  });
});
