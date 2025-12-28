// ==================== Domain Types ====================

/**
 * CDN Domain
 */
export interface Domain {
  id: number;
  user_id: number;
  name: string;
  status: 'active' | 'pending' | 'suspended' | 'deleted';
  plan_id: number;
  plan_name?: string;
  ssl_status?: 'active' | 'pending' | 'none';
  ns_status?: 'active' | 'pending';
  created_at: string;
  updated_at: string;
}

/**
 * Create domain request
 */
export interface CreateDomainRequest {
  domain: string;
  plan_id?: number;
}

/**
 * Domain usage/analytics
 */
export interface DomainUsage {
  requests: number;
  bandwidth: number;
  cached_requests: number;
  cached_bandwidth: number;
  threats_blocked: number;
  period: string;
}

/**
 * WHOIS data
 */
export interface WhoisData {
  domain: string;
  registrar: string;
  creation_date: string;
  expiration_date: string;
  name_servers: string[];
  status: string[];
}

// ==================== DNS Types ====================

/**
 * DNS Record types
 */
export type DnsRecordType = 'A' | 'AAAA' | 'CNAME' | 'MX' | 'TXT' | 'NS' | 'SRV' | 'CAA' | 'PTR' | 'TLSA' | 'ALIAS';

/**
 * DNS Record
 */
export interface DnsRecord {
  id: number;
  domain_id: number;
  name: string;
  type: DnsRecordType;
  value: string;
  ttl: number;
  priority?: number;
  proxied: boolean;
  cloud?: boolean;
  upstream_https?: string;
  weight?: number;
  port?: number;
  created_at: string;
  updated_at: string;
}

/**
 * Create DNS record request
 */
export interface CreateDnsRecordRequest {
  name: string;
  type: DnsRecordType;
  value: string;
  ttl?: number;
  priority?: number;
  proxied?: boolean;
  cloud?: boolean;
  upstream_https?: string;
  weight?: number;
  port?: number;
}

/**
 * Update DNS record request
 */
export interface UpdateDnsRecordRequest extends Partial<CreateDnsRecordRequest> {}

// ==================== SSL/HTTPS Types ====================

/**
 * SSL Certificate
 */
export interface SslCertificate {
  id: number;
  domain_id: number;
  type: 'custom' | 'free' | 'default';
  status: 'active' | 'pending' | 'expired' | 'failed';
  issuer?: string;
  expires_at?: string;
  created_at: string;
}

/**
 * SSL Info
 */
export interface SslInfo {
  has_ssl: boolean;
  type?: string;
  issuer?: string;
  expires_at?: string;
  common_name?: string;
  san?: string[];
}

/**
 * SSL Configs
 */
export interface SslConfigs {
  tls_version: '1.0' | '1.1' | '1.2' | '1.3';
  http2_enabled: boolean;
  http3_enabled: boolean;
  https_redirect: boolean;
  hsts_enabled: boolean;
  hsts_max_age?: number;
  hsts_include_subdomains?: boolean;
  backend_protocol: 'http' | 'https' | 'auto';
}

/**
 * Add custom SSL request
 */
export interface AddSslRequest {
  certificate: string;
  private_key: string;
  ca_bundle?: string;
}

/**
 * HSTS settings request
 */
export interface HstsRequest {
  enabled: boolean;
  max_age?: number;
  include_subdomains?: boolean;
  preload?: boolean;
}

// ==================== Cache Types ====================

/**
 * Cache settings
 */
export interface CacheSettings {
  mode: 'off' | 'standard' | 'aggressive' | 'bypass';
  ttl: number;
  browser_mode: string;
  browser_ttl: number;
  developer_mode: boolean;
  always_online: boolean;
  cache_cookies: boolean;
  error_cache_ttl: number;
  minify: {
    html: boolean;
    css: boolean;
    js: boolean;
  };
  image_optimization: boolean;
  image_resize: boolean;
}

/**
 * Purge cache request
 */
export interface PurgeCacheRequest {
  purge_all?: boolean;
  urls?: string[];
  tags?: string[];
  prefixes?: string[];
}

// ==================== DDoS Types ====================

/**
 * DDoS protection settings
 */
export interface DdosSettings {
  mode: 'off' | 'low' | 'medium' | 'high' | 'under_attack';
  captcha_module: 'recaptcha' | 'hcaptcha' | 'turnstile' | 'arcaptcha';
  cookie_challenge_ttl: number;
  js_challenge_ttl: number;
  captcha_challenge_ttl: number;
}

// ==================== Firewall Types ====================

/**
 * Firewall configs
 */
export interface FirewallConfigs {
  enabled: boolean;
  default_action: 'allow' | 'block' | 'challenge';
  ip_rules: IpRule[];
  country_rules: CountryRule[];
}

/**
 * IP Rule
 */
export interface IpRule {
  ip: string;
  action: 'allow' | 'block' | 'challenge';
  note?: string;
}

/**
 * Country Rule
 */
export interface CountryRule {
  country: string;
  action: 'allow' | 'block' | 'challenge';
}

/**
 * Set firewall configs request
 */
export interface SetFirewallConfigsRequest {
  enabled?: boolean;
  default_action?: 'allow' | 'block' | 'challenge';
}

/**
 * Set IP configs request
 */
export interface SetIpConfigsRequest {
  ips: IpRule[];
}

/**
 * Set country configs request
 */
export interface SetCountryConfigsRequest {
  countries: CountryRule[];
}

// ==================== WAF Types ====================

/**
 * WAF settings
 */
export interface WafSettings {
  enabled: boolean;
  mode: 'off' | 'simulate' | 'block';
  sensitivity: 'low' | 'medium' | 'high' | 'paranoid';
}

/**
 * WAF Layer (ruleset)
 */
export interface WafLayer {
  id: string;
  name: string;
  enabled: boolean;
  rules_count: number;
}

/**
 * WAF Rule
 */
export interface WafRule {
  id: string;
  name: string;
  description?: string;
  enabled: boolean;
  layer_id: string;
}

// ==================== Page Rules Types ====================

/**
 * Page Rule Path
 */
export interface PageRulePath {
  id: number;
  domain_id: number;
  path: string;
  priority: number;
  enabled: boolean;
  rules: PageRuleSettings;
  created_at: string;
}

/**
 * Page Rule Settings
 */
export interface PageRuleSettings {
  cache?: {
    enabled?: boolean;
    mode?: string;
    ttl?: number;
  };
  ddos?: {
    enabled?: boolean;
    mode?: string;
  };
  ratelimit?: {
    enabled?: boolean;
    requests_per_second?: number;
    burst?: number;
  };
  firewall?: {
    enabled?: boolean;
    action?: string;
  };
  waf?: {
    enabled?: boolean;
    mode?: string;
  };
  redirect?: {
    enabled?: boolean;
    url?: string;
    status_code?: number;
  };
  headers?: {
    request_headers?: Record<string, string>;
    response_headers?: Record<string, string>;
  };
  cluster?: {
    pool_id?: number;
  };
}

/**
 * Create page rule path request
 */
export interface CreatePageRulePathRequest {
  path: string;
  priority?: number;
}

/**
 * Create rule request
 */
export interface CreateRuleRequest {
  section: string;
  settings: Record<string, unknown>;
}

// ==================== Cluster Types ====================

/**
 * Cluster/Load balancer pool
 */
export interface Cluster {
  id: number;
  domain_id: number;
  name: string;
  mode: 'round_robin' | 'least_connections' | 'ip_hash';
  servers: ClusterServer[];
  health_check: HealthCheckConfig;
  enabled: boolean;
}

/**
 * Cluster server
 */
export interface ClusterServer {
  id: number;
  address: string;
  port: number;
  weight: number;
  enabled: boolean;
  backup?: boolean;
}

/**
 * Health check configuration
 */
export interface HealthCheckConfig {
  enabled: boolean;
  interval: number;
  timeout: number;
  path: string;
  method: 'GET' | 'HEAD';
  expected_codes: number[];
}

/**
 * Create cluster request
 */
export interface CreateClusterRequest {
  name: string;
  mode?: 'round_robin' | 'least_connections' | 'ip_hash';
}

/**
 * Update cluster request
 */
export interface UpdateClusterRequest {
  name?: string;
  mode?: 'round_robin' | 'least_connections' | 'ip_hash';
  enabled?: boolean;
  health_check?: Partial<HealthCheckConfig>;
}

/**
 * Add server to cluster request
 */
export interface AddClusterServerRequest {
  address: string;
  port: number;
  weight?: number;
  backup?: boolean;
}

// ==================== Log Forwarder Types ====================

/**
 * Log forwarder
 */
export interface LogForwarder {
  id: number;
  domain_id: number;
  name: string;
  type: 'http' | 'syslog' | 's3' | 'datadog' | 'splunk';
  destination: string;
  enabled: boolean;
  format?: string;
  headers?: Record<string, string>;
}

/**
 * Create log forwarder request
 */
export interface CreateLogForwarderRequest {
  name: string;
  type: 'http' | 'syslog' | 's3' | 'datadog' | 'splunk';
  destination: string;
  enabled?: boolean;
  format?: string;
  headers?: Record<string, string>;
}

// ==================== Custom Pages Types ====================

/**
 * Custom error pages
 */
export interface CustomPages {
  e403?: string;
  e403waf?: string;
  e403iprestrict?: string;
  e429?: string;
  e502?: string;
  e504?: string;
  challenge?: string;
  captcha_page?: string;
  maintenance_mode?: string;
}

// ==================== Plan Types ====================

/**
 * CDN Plan
 */
export interface CdnPlan {
  id: number;
  name: string;
  price: number;
  features: string[];
  limits: {
    bandwidth?: number;
    requests?: number;
    domains?: number;
    page_rules?: number;
    firewall_rules?: number;
  };
}

// ==================== Reports Types ====================

/**
 * Reports request
 */
export interface ReportsRequest {
  start_date?: string;
  end_date?: string;
  granularity?: 'minutely' | 'hourly' | 'daily' | 'weekly' | 'monthly';
  type?: 'traffic' | 'requests' | 'threats' | 'cache' | 'status_codes';
}

/**
 * Traffic report data
 */
export interface TrafficReport {
  timestamp: string;
  requests: number;
  bandwidth: number;
  cached_requests: number;
  cached_bandwidth: number;
  threats: number;
}
