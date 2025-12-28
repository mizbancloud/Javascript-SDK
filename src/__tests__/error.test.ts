import { describe, it, expect } from 'vitest';
import { MizbanCloudError } from '../index';

describe('MizbanCloudError', () => {
  describe('Constructor', () => {
    it('should create error with message and status code', () => {
      const error = new MizbanCloudError('Test error', 400, {
        success: false,
        message: 'Test error',
      });

      expect(error.message).toBe('Test error');
      expect(error.statusCode).toBe(400);
      expect(error.name).toBe('MizbanCloudError');
    });

    it('should be instanceof Error', () => {
      const error = new MizbanCloudError('Test', 500, {
        success: false,
        message: 'Test',
      });

      expect(error instanceof Error).toBe(true);
      expect(error instanceof MizbanCloudError).toBe(true);
    });
  });

  describe('Field Errors', () => {
    it('should expose fields property', () => {
      const error = new MizbanCloudError('Validation error', 422, {
        success: false,
        message: 'Validation error',
        fields: ['email', 'password'],
      });

      expect(error.fields).toEqual(['email', 'password']);
    });

    it('should expose invalidFields property', () => {
      const error = new MizbanCloudError('Invalid fields', 422, {
        success: false,
        message: 'Invalid fields',
        invalidFields: ['username', 'phone'],
      });

      expect(error.invalidFields).toEqual(['username', 'phone']);
    });

    it('should expose missingFields property', () => {
      const error = new MizbanCloudError('Missing fields', 422, {
        success: false,
        message: 'Missing fields',
        missing_fields: ['name', 'address'],
      });

      expect(error.missingFields).toEqual(['name', 'address']);
    });

    it('should handle undefined field arrays', () => {
      const error = new MizbanCloudError('Simple error', 400, {
        success: false,
        message: 'Simple error',
      });

      expect(error.fields).toBeUndefined();
      expect(error.invalidFields).toBeUndefined();
      expect(error.missingFields).toBeUndefined();
    });
  });

  describe('Response Object', () => {
    it('should store full response object', () => {
      const response = {
        success: false,
        message: 'Full response test',
        fields: ['field1'],
        invalidFields: ['field2'],
        missing_fields: ['field3'],
      };

      const error = new MizbanCloudError('Error', 400, response);

      expect(error.response).toEqual(response);
    });
  });

  describe('Status Codes', () => {
    it('should handle 400 Bad Request', () => {
      const error = new MizbanCloudError('Bad request', 400, {
        success: false,
        message: 'Bad request',
      });
      expect(error.statusCode).toBe(400);
    });

    it('should handle 401 Unauthorized', () => {
      const error = new MizbanCloudError('Unauthorized', 401, {
        success: false,
        message: 'Unauthorized',
      });
      expect(error.statusCode).toBe(401);
    });

    it('should handle 403 Forbidden', () => {
      const error = new MizbanCloudError('Forbidden', 403, {
        success: false,
        message: 'Forbidden',
      });
      expect(error.statusCode).toBe(403);
    });

    it('should handle 404 Not Found', () => {
      const error = new MizbanCloudError('Not found', 404, {
        success: false,
        message: 'Not found',
      });
      expect(error.statusCode).toBe(404);
    });

    it('should handle 422 Validation Error', () => {
      const error = new MizbanCloudError('Validation failed', 422, {
        success: false,
        message: 'Validation failed',
        fields: ['email'],
      });
      expect(error.statusCode).toBe(422);
    });

    it('should handle 429 Too Many Requests', () => {
      const error = new MizbanCloudError('Rate limit exceeded', 429, {
        success: false,
        message: 'Rate limit exceeded',
      });
      expect(error.statusCode).toBe(429);
    });

    it('should handle 500 Internal Server Error', () => {
      const error = new MizbanCloudError('Server error', 500, {
        success: false,
        message: 'Server error',
      });
      expect(error.statusCode).toBe(500);
    });

    it('should handle 502 Bad Gateway', () => {
      const error = new MizbanCloudError('Bad gateway', 502, {
        success: false,
        message: 'Bad gateway',
      });
      expect(error.statusCode).toBe(502);
    });

    it('should handle 503 Service Unavailable', () => {
      const error = new MizbanCloudError('Service unavailable', 503, {
        success: false,
        message: 'Service unavailable',
      });
      expect(error.statusCode).toBe(503);
    });

    it('should handle 0 for network errors', () => {
      const error = new MizbanCloudError('Network error', 0, {
        success: false,
        message: 'Network error',
      });
      expect(error.statusCode).toBe(0);
    });

    it('should handle 408 for timeout errors', () => {
      const error = new MizbanCloudError('Request timeout', 408, {
        success: false,
        message: 'Request timeout',
      });
      expect(error.statusCode).toBe(408);
    });
  });
});
