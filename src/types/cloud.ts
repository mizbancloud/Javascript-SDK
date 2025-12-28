/**
 * Cloud Server
 */
export interface Server {
  id: number;
  user_id: number;
  name: string;
  status: ServerStatus;
  cpu: number;
  ram: number;
  storage: number;
  storage_type: 'SSD' | 'HDD' | 'NVMe';
  os_id: number;
  os_name?: string;
  datacenter_id: number;
  datacenter_name?: string;
  ip_address?: string;
  private_ip?: string;
  is_test: boolean;
  autopilot: boolean;
  created_at: string;
  updated_at: string;
}

/**
 * Server status
 */
export type ServerStatus =
  | 'ACTIVE'
  | 'BUILD'
  | 'REBUILD'
  | 'SUSPENDED'
  | 'PAUSED'
  | 'SHUTOFF'
  | 'DELETED'
  | 'ERROR'
  | 'RESCUE'
  | 'RESIZE'
  | 'REBOOT'
  | 'HARD_REBOOT';

/**
 * Create server request
 */
export interface CreateServerRequest {
  name: string;
  cpu: number;
  ram: number;
  storage: number;
  storage_type: 'SSD' | 'HDD' | 'NVMe';
  os_id: number;
  datacenter_id: number;
  is_test?: 0 | 1;
  snapshot_id?: number;
  ssh_key_id?: number;
  private_network_id?: number;
}

/**
 * Resize server request
 */
export interface ResizeServerRequest {
  cpu: number;
  ram: number;
}

/**
 * OS reload request
 */
export interface OsReloadRequest {
  os_id: number;
}

/**
 * Rescue mode request
 */
export interface RescueServerRequest {
  os_id: number;
}

/**
 * Reset password request
 */
export interface ResetPasswordRequest {
  password: string;
}

/**
 * VNC access response
 */
export interface VncAccess {
  url: string;
  token: string;
  expires_at: string;
}

/**
 * Server logs
 */
export interface ServerLog {
  id: number;
  action: string;
  status: 'success' | 'failed' | 'pending';
  message?: string;
  created_at: string;
}

/**
 * Server charts/metrics request
 */
export interface ServerChartsRequest {
  type: 'cpu' | 'ram' | 'disk' | 'network';
  time: '1h' | '6h' | '24h' | '7d' | '30d';
}

/**
 * Server metrics data point
 */
export interface MetricDataPoint {
  timestamp: string;
  value: number;
}

/**
 * Firewall/Security Group
 */
export interface SecurityGroup {
  id: number;
  user_id: number;
  name: string;
  description?: string;
  rules: SecurityRule[];
  attached_servers: number[];
  created_at: string;
}

/**
 * Security rule
 */
export interface SecurityRule {
  id: number;
  direction: 'ingress' | 'egress';
  protocol: 'tcp' | 'udp' | 'icmp' | 'any';
  port_range_min?: number;
  port_range_max?: number;
  remote_ip_prefix: string;
  description?: string;
}

/**
 * Create security group request
 */
export interface CreateSecurityGroupRequest {
  name: string;
  description?: string;
}

/**
 * Add security rule request
 */
export interface AddSecurityRuleRequest {
  firewall_id: number;
  direction: 'ingress' | 'egress';
  protocol: 'tcp' | 'udp' | 'icmp' | 'any';
  port_range_min?: number;
  port_range_max?: number;
  remote_ip_prefix: string;
  description?: string;
}

/**
 * Attach firewall request
 */
export interface AttachFirewallRequest {
  firewall_id: number;
  server_id: number;
}

/**
 * Private Network
 */
export interface PrivateNetwork {
  id: number;
  user_id: number;
  name: string;
  cidr: string;
  datacenter_id: number;
  attached_servers: number[];
  created_at: string;
}

/**
 * Create private network request
 */
export interface CreatePrivateNetworkRequest {
  name: string;
  cidr: string;
  datacenter_id: number;
}

/**
 * Attach network request
 */
export interface AttachNetworkRequest {
  network_id: number;
  server_id: number;
}

/**
 * Volume
 */
export interface Volume {
  id: number;
  user_id: number;
  name: string;
  size: number;
  type: 'SSD' | 'HDD' | 'NVMe';
  status: 'available' | 'in-use' | 'creating' | 'deleting' | 'error';
  attached_to?: number;
  datacenter_id: number;
  created_at: string;
}

/**
 * Create volume request
 */
export interface CreateVolumeRequest {
  name: string;
  size: number;
  type: 'SSD' | 'HDD' | 'NVMe';
  datacenter_id: number;
}

/**
 * Attach volume request
 */
export interface AttachVolumeRequest {
  volume_id: number;
  server_id: number;
}

/**
 * Snapshot
 */
export interface Snapshot {
  id: number;
  user_id: number;
  server_id: number;
  name: string;
  size: number;
  status: 'active' | 'creating' | 'deleting' | 'error';
  created_at: string;
}

/**
 * Create snapshot request
 */
export interface CreateSnapshotRequest {
  server_id: number;
  name: string;
}

/**
 * SSH Key
 */
export interface SshKey {
  id: number;
  user_id: number;
  name: string;
  public_key: string;
  fingerprint: string;
  created_at: string;
}

/**
 * Create SSH key request
 */
export interface CreateSshKeyRequest {
  name: string;
  public_key: string;
}

/**
 * Traffic usage
 */
export interface TrafficUsage {
  server_id: number;
  inbound: number;
  outbound: number;
  total: number;
  period: string;
}
