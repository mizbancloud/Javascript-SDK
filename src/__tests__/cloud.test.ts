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

describe('Cloud Module', () => {
  let client: MizbanCloud;

  beforeEach(() => {
    vi.clearAllMocks();
    client = new MizbanCloud({
      authBaseUrl: 'http://localhost:8003',
      cdnBaseUrl: 'http://localhost:8000',
      cloudBaseUrl: 'http://localhost:8001',
    });
  });

  describe('Module Existence', () => {
    it('should have cloud module defined', () => {
      expect(client.cloud).toBeDefined();
    });
  });

  // ==================== Server Methods ====================
  describe('Server Methods', () => {
    it('should have listServers method', () => {
      expect(typeof client.cloud.listServers).toBe('function');
    });

    it('should have getServer method', () => {
      expect(typeof client.cloud.getServer).toBe('function');
    });

    it('should have pollServer method', () => {
      expect(typeof client.cloud.pollServer).toBe('function');
    });

    it('should have createServer method', () => {
      expect(typeof client.cloud.createServer).toBe('function');
    });

    it('should have deleteServer method', () => {
      expect(typeof client.cloud.deleteServer).toBe('function');
    });

    it('should have renameServer method', () => {
      expect(typeof client.cloud.renameServer).toBe('function');
    });

    it('should have resizeServer method', () => {
      expect(typeof client.cloud.resizeServer).toBe('function');
    });

    it('should have reloadOs method', () => {
      expect(typeof client.cloud.reloadOs).toBe('function');
    });

    it('should have convertToPermanent method', () => {
      expect(typeof client.cloud.convertToPermanent).toBe('function');
    });
  });

  // ==================== Power Management Methods ====================
  describe('Power Management Methods', () => {
    it('should have powerOn method', () => {
      expect(typeof client.cloud.powerOn).toBe('function');
    });

    it('should have powerOff method', () => {
      expect(typeof client.cloud.powerOff).toBe('function');
    });

    it('should have reboot method', () => {
      expect(typeof client.cloud.reboot).toBe('function');
    });

    it('should have restart method', () => {
      expect(typeof client.cloud.restart).toBe('function');
    });
  });

  // ==================== Access Methods ====================
  describe('Access Methods', () => {
    it('should have getVnc method', () => {
      expect(typeof client.cloud.getVnc).toBe('function');
    });

    it('should have resetPassword method', () => {
      expect(typeof client.cloud.resetPassword).toBe('function');
    });

    it('should have getInitialPassword method', () => {
      expect(typeof client.cloud.getInitialPassword).toBe('function');
    });
  });

  // ==================== Rescue Mode Methods ====================
  describe('Rescue Mode Methods', () => {
    it('should have rescue method', () => {
      expect(typeof client.cloud.rescue).toBe('function');
    });

    it('should have unrescue method', () => {
      expect(typeof client.cloud.unrescue).toBe('function');
    });
  });

  // ==================== Autopilot Methods ====================
  describe('Autopilot (HA) Methods', () => {
    it('should have enableAutopilot method', () => {
      expect(typeof client.cloud.enableAutopilot).toBe('function');
    });

    it('should have disableAutopilot method', () => {
      expect(typeof client.cloud.disableAutopilot).toBe('function');
    });
  });

  // ==================== Monitoring Methods ====================
  describe('Monitoring Methods', () => {
    it('should have getLogs method', () => {
      expect(typeof client.cloud.getLogs).toBe('function');
    });

    it('should have getCharts method', () => {
      expect(typeof client.cloud.getCharts).toBe('function');
    });

    it('should have getTrafficUsage method', () => {
      expect(typeof client.cloud.getTrafficUsage).toBe('function');
    });

    it('should have getTraffics method', () => {
      expect(typeof client.cloud.getTraffics).toBe('function');
    });
  });

  // ==================== Firewall/Security Group Methods ====================
  describe('Security Group Methods', () => {
    it('should have listSecurityGroups method', () => {
      expect(typeof client.cloud.listSecurityGroups).toBe('function');
    });

    it('should have createSecurityGroup method', () => {
      expect(typeof client.cloud.createSecurityGroup).toBe('function');
    });

    it('should have deleteSecurityGroup method', () => {
      expect(typeof client.cloud.deleteSecurityGroup).toBe('function');
    });

    it('should have addSecurityRule method', () => {
      expect(typeof client.cloud.addSecurityRule).toBe('function');
    });

    it('should have removeSecurityRule method', () => {
      expect(typeof client.cloud.removeSecurityRule).toBe('function');
    });

    it('should have attachFirewall method', () => {
      expect(typeof client.cloud.attachFirewall).toBe('function');
    });

    it('should have detachFirewall method', () => {
      expect(typeof client.cloud.detachFirewall).toBe('function');
    });
  });

  // ==================== Private Network Methods ====================
  describe('Private Network Methods', () => {
    it('should have listPrivateNetworks method', () => {
      expect(typeof client.cloud.listPrivateNetworks).toBe('function');
    });

    it('should have createPrivateNetwork method', () => {
      expect(typeof client.cloud.createPrivateNetwork).toBe('function');
    });

    it('should have updatePrivateNetwork method', () => {
      expect(typeof client.cloud.updatePrivateNetwork).toBe('function');
    });

    it('should have deletePrivateNetwork method', () => {
      expect(typeof client.cloud.deletePrivateNetwork).toBe('function');
    });

    it('should have attachToPrivateNetwork method', () => {
      expect(typeof client.cloud.attachToPrivateNetwork).toBe('function');
    });

    it('should have detachFromPrivateNetwork method', () => {
      expect(typeof client.cloud.detachFromPrivateNetwork).toBe('function');
    });

    it('should have purgeNetworkAttachments method', () => {
      expect(typeof client.cloud.purgeNetworkAttachments).toBe('function');
    });
  });

  // ==================== Public Network Methods ====================
  describe('Public Network Methods', () => {
    it('should have attachPublicNetwork method', () => {
      expect(typeof client.cloud.attachPublicNetwork).toBe('function');
    });

    it('should have detachPublicNetwork method', () => {
      expect(typeof client.cloud.detachPublicNetwork).toBe('function');
    });
  });

  // ==================== Volume Methods ====================
  describe('Volume Methods', () => {
    it('should have listVolumes method', () => {
      expect(typeof client.cloud.listVolumes).toBe('function');
    });

    it('should have getVolume method', () => {
      expect(typeof client.cloud.getVolume).toBe('function');
    });

    it('should have createVolume method', () => {
      expect(typeof client.cloud.createVolume).toBe('function');
    });

    it('should have updateVolume method', () => {
      expect(typeof client.cloud.updateVolume).toBe('function');
    });

    it('should have deleteVolume method', () => {
      expect(typeof client.cloud.deleteVolume).toBe('function');
    });

    it('should have attachVolume method', () => {
      expect(typeof client.cloud.attachVolume).toBe('function');
    });

    it('should have detachVolume method', () => {
      expect(typeof client.cloud.detachVolume).toBe('function');
    });

    it('should have syncVolumes method', () => {
      expect(typeof client.cloud.syncVolumes).toBe('function');
    });
  });

  // ==================== Snapshot Methods ====================
  describe('Snapshot Methods', () => {
    it('should have listSnapshots method', () => {
      expect(typeof client.cloud.listSnapshots).toBe('function');
    });

    it('should have getSnapshot method', () => {
      expect(typeof client.cloud.getSnapshot).toBe('function');
    });

    it('should have createSnapshot method', () => {
      expect(typeof client.cloud.createSnapshot).toBe('function');
    });

    it('should have deleteSnapshot method', () => {
      expect(typeof client.cloud.deleteSnapshot).toBe('function');
    });

    it('should have syncSnapshots method', () => {
      expect(typeof client.cloud.syncSnapshots).toBe('function');
    });
  });

  // ==================== SSH Key Methods ====================
  describe('SSH Key Methods', () => {
    it('should have listSshKeys method', () => {
      expect(typeof client.cloud.listSshKeys).toBe('function');
    });

    it('should have getSshKey method', () => {
      expect(typeof client.cloud.getSshKey).toBe('function');
    });

    it('should have createSshKey method', () => {
      expect(typeof client.cloud.createSshKey).toBe('function');
    });

    it('should have deleteSshKey method', () => {
      expect(typeof client.cloud.deleteSshKey).toBe('function');
    });

    it('should have generateRandomSshKey method', () => {
      expect(typeof client.cloud.generateRandomSshKey).toBe('function');
    });
  });
});
