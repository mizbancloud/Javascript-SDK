import { describe, it, expect } from 'vitest';
import type {
  // Common types
  ApiResponse,
  ApiError,
  MizbanCloudConfig,
  RequestOptions,

  // Auth types
  Wallet,

  // Statics types
  Datacenter,
  OperatingSystem,
  CacheTime,
  Slider,

  // CDN types
  Domain,
  CreateDomainRequest,
  DomainUsage,
  WhoisData,
  DnsRecordType,
  DnsRecord,
  CreateDnsRecordRequest,
  UpdateDnsRecordRequest,
  SslCertificate,
  SslInfo,
  SslConfigs,
  AddSslRequest,
  HstsRequest,
  CacheSettings,
  PurgeCacheRequest,
  DdosSettings,
  FirewallConfigs,
  IpRule,
  CountryRule,
  SetFirewallConfigsRequest,
  SetIpConfigsRequest,
  SetCountryConfigsRequest,
  WafSettings,
  WafLayer,
  WafRule,
  PageRulePath,
  PageRuleSettings,
  CreatePageRulePathRequest,
  CreateRuleRequest,
  Cluster,
  ClusterServer,
  HealthCheckConfig,
  CreateClusterRequest,
  UpdateClusterRequest,
  AddClusterServerRequest,
  LogForwarder,
  CreateLogForwarderRequest,
  CustomPages,
  CdnPlan,
  ReportsRequest,
  TrafficReport,

  // Cloud types
  Server,
  ServerStatus,
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
  SecurityRule,
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

describe('Type Exports', () => {
  describe('Common Types', () => {
    it('should export ApiResponse type', () => {
      const response: ApiResponse<string> = {
        success: true,
        message: 'OK',
        data: 'test',
      };
      expect(response.success).toBe(true);
    });

    it('should export ApiError type', () => {
      const error: ApiError = {
        success: false,
        message: 'Error',
        fields: ['field1'],
      };
      expect(error.success).toBe(false);
    });

    it('should export MizbanCloudConfig type', () => {
      const config: MizbanCloudConfig = {
        authBaseUrl: 'http://localhost:8003',
        cdnBaseUrl: 'http://localhost:8000',
        cloudBaseUrl: 'http://localhost:8001',
        timeout: 30000,
        language: 'en',
      };
      expect(config.language).toBe('en');
    });

    it('should export RequestOptions type', () => {
      const options: RequestOptions = {
        timeout: 5000,
        headers: { 'X-Custom': 'value' },
      };
      expect(options.timeout).toBe(5000);
    });
  });

  describe('Auth Types', () => {
    it('should export Wallet type', () => {
      const wallet: Wallet = {
        balance: 100.50,
        currency: 'USD',
      };
      expect(wallet.balance).toBe(100.50);
    });
  });

  describe('Statics Types', () => {
    it('should export Datacenter type', () => {
      const dc: Datacenter = {
        id: 1,
        name: 'Tehran',
        location: 'IR',
        country: 'Iran',
        status: 'active',
        available_storage_types: ['SSD', 'NVMe'],
        allowed_actions: ['create', 'delete'],
        features: ['ipv6'],
      };
      expect(dc.status).toBe('active');
    });

    it('should export OperatingSystem type', () => {
      const os: OperatingSystem = {
        id: 1,
        name: 'Ubuntu',
        version: '22.04',
        family: 'linux',
        min_ram: 1024,
        min_storage: 10,
      };
      expect(os.family).toBe('linux');
    });
  });

  describe('CDN Types', () => {
    it('should export Domain type', () => {
      const domain: Domain = {
        id: 1,
        user_id: 1,
        name: 'example.com',
        status: 'active',
        plan_id: 1,
        created_at: '2024-01-01',
        updated_at: '2024-01-01',
      };
      expect(domain.status).toBe('active');
    });

    it('should export DnsRecord type', () => {
      const record: DnsRecord = {
        id: 1,
        domain_id: 1,
        name: 'www',
        type: 'A',
        value: '1.2.3.4',
        ttl: 3600,
        proxied: true,
        created_at: '2024-01-01',
        updated_at: '2024-01-01',
      };
      expect(record.type).toBe('A');
    });

    it('should export DnsRecordType union', () => {
      const types: DnsRecordType[] = ['A', 'AAAA', 'CNAME', 'MX', 'TXT', 'NS', 'SRV', 'CAA', 'PTR', 'TLSA', 'ALIAS'];
      expect(types.length).toBe(11);
    });

    it('should export SslConfigs type', () => {
      const configs: SslConfigs = {
        tls_version: '1.2',
        http2_enabled: true,
        http3_enabled: true,
        https_redirect: true,
        hsts_enabled: true,
        backend_protocol: 'https',
      };
      expect(configs.tls_version).toBe('1.2');
    });

    it('should export CacheSettings type', () => {
      const cache: CacheSettings = {
        mode: 'aggressive',
        ttl: 86400,
        browser_mode: 'respect',
        browser_ttl: 3600,
        developer_mode: false,
        always_online: true,
        cache_cookies: false,
        error_cache_ttl: 300,
        minify: { html: true, css: true, js: true },
        image_optimization: true,
        image_resize: true,
      };
      expect(cache.mode).toBe('aggressive');
    });

    it('should export DdosSettings type', () => {
      const ddos: DdosSettings = {
        mode: 'medium',
        captcha_module: 'turnstile',
        cookie_challenge_ttl: 3600,
        js_challenge_ttl: 1800,
        captcha_challenge_ttl: 7200,
      };
      expect(ddos.mode).toBe('medium');
    });

    it('should export WafSettings type', () => {
      const waf: WafSettings = {
        enabled: true,
        mode: 'block',
        sensitivity: 'medium',
      };
      expect(waf.mode).toBe('block');
    });

    it('should export Cluster type', () => {
      const cluster: Cluster = {
        id: 1,
        domain_id: 1,
        name: 'backend-pool',
        mode: 'round_robin',
        servers: [],
        health_check: {
          enabled: true,
          interval: 30,
          timeout: 10,
          path: '/health',
          method: 'GET',
          expected_codes: [200],
        },
        enabled: true,
      };
      expect(cluster.mode).toBe('round_robin');
    });

    it('should export LogForwarder type', () => {
      const forwarder: LogForwarder = {
        id: 1,
        domain_id: 1,
        name: 'datadog',
        type: 'datadog',
        destination: 'https://intake.logs.datadoghq.com',
        enabled: true,
      };
      expect(forwarder.type).toBe('datadog');
    });
  });

  describe('Cloud Types', () => {
    it('should export Server type', () => {
      const server: Server = {
        id: 1,
        user_id: 1,
        name: 'my-server',
        status: 'ACTIVE',
        cpu: 2,
        ram: 4096,
        storage: 50,
        storage_type: 'SSD',
        os_id: 1,
        datacenter_id: 1,
        is_test: false,
        autopilot: false,
        created_at: '2024-01-01',
        updated_at: '2024-01-01',
      };
      expect(server.status).toBe('ACTIVE');
    });

    it('should export ServerStatus union', () => {
      const statuses: ServerStatus[] = [
        'ACTIVE', 'BUILD', 'REBUILD', 'SUSPENDED', 'PAUSED',
        'SHUTOFF', 'DELETED', 'ERROR', 'RESCUE', 'RESIZE',
        'REBOOT', 'HARD_REBOOT',
      ];
      expect(statuses.length).toBe(12);
    });

    it('should export CreateServerRequest type', () => {
      const request: CreateServerRequest = {
        name: 'test-server',
        cpu: 2,
        ram: 4096,
        storage: 50,
        storage_type: 'SSD',
        os_id: 1,
        datacenter_id: 1,
      };
      expect(request.storage_type).toBe('SSD');
    });

    it('should export SecurityGroup type', () => {
      const sg: SecurityGroup = {
        id: 1,
        user_id: 1,
        name: 'web-server',
        rules: [],
        attached_servers: [1, 2],
        created_at: '2024-01-01',
      };
      expect(sg.name).toBe('web-server');
    });

    it('should export SecurityRule type', () => {
      const rule: SecurityRule = {
        id: 1,
        direction: 'ingress',
        protocol: 'tcp',
        port_range_min: 80,
        port_range_max: 80,
        remote_ip_prefix: '0.0.0.0/0',
      };
      expect(rule.direction).toBe('ingress');
    });

    it('should export PrivateNetwork type', () => {
      const network: PrivateNetwork = {
        id: 1,
        user_id: 1,
        name: 'internal',
        cidr: '10.0.0.0/24',
        datacenter_id: 1,
        attached_servers: [1],
        created_at: '2024-01-01',
      };
      expect(network.cidr).toBe('10.0.0.0/24');
    });

    it('should export Volume type', () => {
      const volume: Volume = {
        id: 1,
        user_id: 1,
        name: 'data-disk',
        size: 100,
        type: 'SSD',
        status: 'available',
        datacenter_id: 1,
        created_at: '2024-01-01',
      };
      expect(volume.status).toBe('available');
    });

    it('should export Snapshot type', () => {
      const snapshot: Snapshot = {
        id: 1,
        user_id: 1,
        server_id: 1,
        name: 'backup',
        size: 50,
        status: 'active',
        created_at: '2024-01-01',
      };
      expect(snapshot.status).toBe('active');
    });

    it('should export SshKey type', () => {
      const key: SshKey = {
        id: 1,
        user_id: 1,
        name: 'my-laptop',
        public_key: 'ssh-rsa AAAA...',
        fingerprint: 'ab:cd:ef:...',
        created_at: '2024-01-01',
      };
      expect(key.name).toBe('my-laptop');
    });

    it('should export VncAccess type', () => {
      const vnc: VncAccess = {
        url: 'wss://vnc.example.com',
        token: 'token123',
        expires_at: '2024-01-01T12:00:00Z',
      };
      expect(vnc.url).toContain('wss://');
    });
  });
});
