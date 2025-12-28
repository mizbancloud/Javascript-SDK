import type { HttpClient } from '../core/client';
import type {
  ApiResponse,
  Server,
  CreateServerRequest,
  ResizeServerRequest,
  OsReloadRequest,
  RescueServerRequest,
  ResetPasswordRequest,
  VncAccess,
  ServerLog,
  ServerChartsRequest,
  MetricDataPoint,
  SecurityGroup,
  CreateSecurityGroupRequest,
  AddSecurityRuleRequest,
  AttachFirewallRequest,
  PrivateNetwork,
  CreatePrivateNetworkRequest,
  AttachNetworkRequest,
  Volume,
  CreateVolumeRequest,
  AttachVolumeRequest,
  Snapshot,
  CreateSnapshotRequest,
  SshKey,
  CreateSshKeyRequest,
  TrafficUsage,
} from '../types';

/**
 * Cloud Module
 * Complete IaaS management: servers, firewall, networks, volumes, snapshots, SSH keys
 */
export class CloudModule {
  constructor(private readonly client: HttpClient) {}

  // ==================== Servers ====================

  /** List all servers */
  async listServers(): Promise<ApiResponse<Server[]>> {
    return this.client.authRequest('GET', '/api/v1/cloud/servers');
  }

  /** Get server details */
  async getServer(serverId: number): Promise<ApiResponse<Server>> {
    return this.client.authRequest('GET', `/api/v1/cloud/servers/${serverId}`);
  }

  /** Long poll for server status changes */
  async pollServer(serverId: number): Promise<ApiResponse<Server>> {
    return this.client.authRequest('GET', `/api/v1/cloud/servers/${serverId}/poll`);
  }

  /** Create a new server */
  async createServer(data: CreateServerRequest): Promise<ApiResponse<Server>> {
    return this.client.authRequest('POST', '/api/v1/cloud/servers', data);
  }

  /** Delete a server */
  async deleteServer(serverId: number): Promise<ApiResponse<void>> {
    return this.client.authRequest('DELETE', `/api/v1/cloud/servers/${serverId}`);
  }

  /** Rename a server */
  async renameServer(serverId: number, name: string): Promise<ApiResponse<Server>> {
    return this.client.authRequest('POST', `/api/v1/cloud/servers/${serverId}/rename`, { name });
  }

  /** Resize server (change CPU/RAM) */
  async resizeServer(serverId: number, data: ResizeServerRequest): Promise<ApiResponse<Server>> {
    return this.client.authRequest('PUT', `/api/v1/cloud/servers/${serverId}/rebuild/hardware`, data);
  }

  /** Reload OS (reinstall) */
  async reloadOs(serverId: number, data: OsReloadRequest): Promise<ApiResponse<void>> {
    return this.client.authRequest('PUT', `/api/v1/cloud/servers/${serverId}/rebuild/software`, data);
  }

  // ==================== Power Management ====================

  /** Power on server */
  async powerOn(serverId: number): Promise<ApiResponse<void>> {
    return this.client.authRequest('PUT', `/api/v1/cloud/servers/${serverId}/power/on`);
  }

  /** Power off server (hard) */
  async powerOff(serverId: number): Promise<ApiResponse<void>> {
    return this.client.authRequest('PUT', `/api/v1/cloud/servers/${serverId}/power/off`);
  }

  /** Reboot server (hard reboot) */
  async reboot(serverId: number): Promise<ApiResponse<void>> {
    return this.client.authRequest('PUT', `/api/v1/cloud/servers/${serverId}/power/reboot`);
  }

  /** Restart server (soft/graceful reboot) */
  async restart(serverId: number): Promise<ApiResponse<void>> {
    return this.client.authRequest('PUT', `/api/v1/cloud/servers/${serverId}/power/restart`);
  }

  // ==================== Access ====================

  /** Get VNC console access */
  async getVnc(serverId: number): Promise<ApiResponse<VncAccess>> {
    return this.client.authRequest('GET', `/api/v1/cloud/servers/${serverId}/access/vnc`);
  }

  /** Reset root password */
  async resetPassword(serverId: number, data: ResetPasswordRequest): Promise<ApiResponse<void>> {
    return this.client.authRequest('PUT', `/api/v1/cloud/servers/${serverId}/reset-password`, data);
  }

  /** Get initial password (for newly created servers) */
  async getInitialPassword(serverId: number): Promise<ApiResponse<{ password: string }>> {
    return this.client.authRequest('POST', `/api/v1/cloud/servers/${serverId}/get-password`);
  }

  // ==================== Rescue Mode ====================

  /** Boot into rescue mode */
  async rescue(serverId: number, data: RescueServerRequest): Promise<ApiResponse<{ password: string }>> {
    return this.client.authRequest('POST', `/api/v1/cloud/servers/${serverId}/rescue`, data);
  }

  /** Exit rescue mode */
  async unrescue(serverId: number): Promise<ApiResponse<void>> {
    return this.client.authRequest('POST', `/api/v1/cloud/servers/${serverId}/unrescue`);
  }

  // ==================== Autopilot (High Availability) ====================

  /** Enable autopilot (HA) */
  async enableAutopilot(serverId: number): Promise<ApiResponse<void>> {
    return this.client.authRequest('POST', `/api/v1/cloud/servers/${serverId}/autopilot/enable`);
  }

  /** Disable autopilot (HA) */
  async disableAutopilot(serverId: number): Promise<ApiResponse<void>> {
    return this.client.authRequest('DELETE', `/api/v1/cloud/servers/${serverId}/autopilot/disable`);
  }

  // ==================== Monitoring ====================

  /** Get server action logs */
  async getLogs(serverId: number): Promise<ApiResponse<ServerLog[]>> {
    return this.client.authRequest('GET', `/api/v1/cloud/servers/${serverId}/logs`);
  }

  /** Get server metrics/charts */
  async getCharts(serverId: number, data: ServerChartsRequest): Promise<ApiResponse<MetricDataPoint[]>> {
    return this.client.authRequest('GET', `/api/v1/cloud/servers/${serverId}/reports`, data);
  }

  /** Get traffic usage for all servers */
  async getTrafficUsage(): Promise<ApiResponse<TrafficUsage[]>> {
    return this.client.authRequest('GET', '/api/v1/cloud/servers/traffics');
  }

  /** Get traffic usage (alternate endpoint) */
  async getTraffics(): Promise<ApiResponse<TrafficUsage[]>> {
    return this.client.authRequest('GET', '/api/v1/cloud/traffics');
  }

  // ==================== Test Servers ====================

  /** Convert test server to permanent */
  async convertToPermanent(serverId: number): Promise<ApiResponse<Server>> {
    return this.client.authRequest('POST', `/api/v1/cloud/servers/${serverId}/permenant`);
  }

  // ==================== Firewall / Security Groups ====================

  /** List security groups */
  async listSecurityGroups(): Promise<ApiResponse<SecurityGroup[]>> {
    return this.client.authRequest('GET', '/api/v1/cloud/firewall');
  }

  /** Create security group */
  async createSecurityGroup(data: CreateSecurityGroupRequest): Promise<ApiResponse<SecurityGroup>> {
    return this.client.authRequest('POST', '/api/v1/cloud/firewall', data);
  }

  /** Delete security group */
  async deleteSecurityGroup(firewallId: number): Promise<ApiResponse<void>> {
    return this.client.authRequest('DELETE', `/api/v1/cloud/firewall/${firewallId}`);
  }

  /** Add security rule */
  async addSecurityRule(data: AddSecurityRuleRequest): Promise<ApiResponse<void>> {
    return this.client.authRequest('POST', '/api/v1/cloud/firewall/rule', data);
  }

  /** Remove security rule */
  async removeSecurityRule(ruleId: number): Promise<ApiResponse<void>> {
    return this.client.authRequest('DELETE', `/api/v1/cloud/firewall/rule/${ruleId}`);
  }

  /** Attach firewall to server */
  async attachFirewall(data: AttachFirewallRequest): Promise<ApiResponse<void>> {
    return this.client.authRequest('POST', '/api/v1/cloud/firewall/attach', data);
  }

  /** Detach firewall from server */
  async detachFirewall(data: AttachFirewallRequest): Promise<ApiResponse<void>> {
    return this.client.authRequest('POST', '/api/v1/cloud/firewall/detach', data);
  }

  // ==================== Private Networks ====================

  /** List private networks */
  async listPrivateNetworks(): Promise<ApiResponse<PrivateNetwork[]>> {
    return this.client.authRequest('GET', '/api/v1/cloud/private-networks');
  }

  /** Create private network */
  async createPrivateNetwork(data: CreatePrivateNetworkRequest): Promise<ApiResponse<PrivateNetwork>> {
    return this.client.authRequest('POST', '/api/v1/cloud/private-networks', data);
  }

  /** Update private network */
  async updatePrivateNetwork(networkId: number, data: Partial<CreatePrivateNetworkRequest>): Promise<ApiResponse<PrivateNetwork>> {
    return this.client.authRequest('PUT', `/api/v1/cloud/private-networks/${networkId}`, data);
  }

  /** Delete private network */
  async deletePrivateNetwork(networkId: number): Promise<ApiResponse<void>> {
    return this.client.authRequest('DELETE', `/api/v1/cloud/private-networks/${networkId}`);
  }

  /** Attach server to private network */
  async attachToPrivateNetwork(data: AttachNetworkRequest): Promise<ApiResponse<void>> {
    return this.client.authRequest('POST', '/api/v1/cloud/private-networks/attach', data);
  }

  /** Detach server from private network */
  async detachFromPrivateNetwork(data: AttachNetworkRequest): Promise<ApiResponse<void>> {
    return this.client.authRequest('POST', '/api/v1/cloud/private-networks/detach', data);
  }

  /** Purge all attachments from a network */
  async purgeNetworkAttachments(networkId: number): Promise<ApiResponse<void>> {
    return this.client.authRequest('POST', `/api/v1/cloud/private-networks/${networkId}/purge-attachments`);
  }

  // ==================== Public Networks ====================

  /** Attach public network to server */
  async attachPublicNetwork(serverId: number): Promise<ApiResponse<void>> {
    return this.client.authRequest('POST', '/api/v1/cloud/public-networks/attach', { server_id: serverId });
  }

  /** Detach public network from server */
  async detachPublicNetwork(serverId: number): Promise<ApiResponse<void>> {
    return this.client.authRequest('POST', '/api/v1/cloud/public-networks/detach', { server_id: serverId });
  }

  // ==================== Volumes ====================

  /** List volumes */
  async listVolumes(): Promise<ApiResponse<Volume[]>> {
    return this.client.authRequest('GET', '/api/v1/cloud/volumes');
  }

  /** Get volume details */
  async getVolume(volumeId: number): Promise<ApiResponse<Volume>> {
    return this.client.authRequest('GET', `/api/v1/cloud/volumes/${volumeId}`);
  }

  /** Create volume */
  async createVolume(data: CreateVolumeRequest): Promise<ApiResponse<Volume>> {
    return this.client.authRequest('POST', '/api/v1/cloud/volumes', data);
  }

  /** Update/resize volume */
  async updateVolume(volumeId: number, data: { size?: number; name?: string }): Promise<ApiResponse<Volume>> {
    return this.client.authRequest('PUT', `/api/v1/cloud/volumes/${volumeId}`, data);
  }

  /** Delete volume */
  async deleteVolume(volumeId: number): Promise<ApiResponse<void>> {
    return this.client.authRequest('DELETE', `/api/v1/cloud/volumes/${volumeId}`);
  }

  /** Attach volume to server */
  async attachVolume(data: AttachVolumeRequest): Promise<ApiResponse<void>> {
    return this.client.authRequest('POST', '/api/v1/cloud/volumes/attach', data);
  }

  /** Detach volume from server */
  async detachVolume(volumeId: number): Promise<ApiResponse<void>> {
    return this.client.authRequest('POST', '/api/v1/cloud/volumes/detach', { volume_id: volumeId });
  }

  /** Sync volumes with OpenStack */
  async syncVolumes(): Promise<ApiResponse<void>> {
    return this.client.authRequest('POST', '/api/v1/cloud/volumes/sync');
  }

  // ==================== Snapshots ====================

  /** List snapshots */
  async listSnapshots(): Promise<ApiResponse<Snapshot[]>> {
    return this.client.authRequest('GET', '/api/v1/cloud/snapshots');
  }

  /** Get snapshot details */
  async getSnapshot(snapshotId: number): Promise<ApiResponse<Snapshot>> {
    return this.client.authRequest('GET', `/api/v1/cloud/snapshots/${snapshotId}`);
  }

  /** Create snapshot */
  async createSnapshot(data: CreateSnapshotRequest): Promise<ApiResponse<Snapshot>> {
    return this.client.authRequest('POST', '/api/v1/cloud/snapshots', data);
  }

  /** Delete snapshot */
  async deleteSnapshot(snapshotId: number): Promise<ApiResponse<void>> {
    return this.client.authRequest('DELETE', `/api/v1/cloud/snapshots/${snapshotId}`);
  }

  /** Sync snapshots with OpenStack */
  async syncSnapshots(): Promise<ApiResponse<void>> {
    return this.client.authRequest('POST', '/api/v1/cloud/snapshots/sync');
  }

  // ==================== SSH Keys ====================

  /** List SSH keys */
  async listSshKeys(): Promise<ApiResponse<SshKey[]>> {
    return this.client.authRequest('GET', '/api/v1/cloud/ssh');
  }

  /** Get SSH key details */
  async getSshKey(keyId: number): Promise<ApiResponse<SshKey>> {
    return this.client.authRequest('GET', `/api/v1/cloud/ssh/${keyId}`);
  }

  /** Create SSH key */
  async createSshKey(data: CreateSshKeyRequest): Promise<ApiResponse<SshKey>> {
    return this.client.authRequest('POST', '/api/v1/cloud/ssh', data);
  }

  /** Delete SSH key */
  async deleteSshKey(keyId: number): Promise<ApiResponse<void>> {
    return this.client.authRequest('DELETE', `/api/v1/cloud/ssh/${keyId}`);
  }

  /** Generate random SSH key pair */
  async generateRandomSshKey(): Promise<ApiResponse<{ public_key: string; private_key: string }>> {
    return this.client.authRequest('GET', '/api/v1/cloud/ssh/random');
  }
}
