import type { HttpClient } from '../core/client';
import type {
  ApiResponse,
  Domain,
  CreateDomainRequest,
  DomainUsage,
  WhoisData,
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
  SetFirewallConfigsRequest,
  SetIpConfigsRequest,
  SetCountryConfigsRequest,
  WafSettings,
  WafLayer,
  WafRule,
  PageRulePath,
  CreatePageRulePathRequest,
  CreateRuleRequest,
  Cluster,
  CreateClusterRequest,
  UpdateClusterRequest,
  AddClusterServerRequest,
  LogForwarder,
  CreateLogForwarderRequest,
  CustomPages,
  CdnPlan,
  ReportsRequest,
} from '../types';

/**
 * CDN Module
 * Complete CDN management: domains, DNS, SSL, cache, security, page rules, clusters
 */
export class CdnModule {
  constructor(private readonly client: HttpClient) {}

  // ==================== Domains ====================

  /** List all domains */
  async listDomains(): Promise<ApiResponse<Domain[]>> {
    return this.client.authRequest('GET', '/api/v1/cdn/ng/domains');
  }

  /** Get domain details */
  async getDomain(domainId: number): Promise<ApiResponse<Domain>> {
    return this.client.authRequest('GET', `/api/v1/cdn/ng/domains/${domainId}`);
  }

  /** Add a new domain */
  async addDomain(data: CreateDomainRequest): Promise<ApiResponse<Domain>> {
    return this.client.authRequest('POST', '/api/v1/cdn/ng/domains', data);
  }

  /** Delete a domain (requires confirmation code) */
  async deleteDomain(domainId: number, confirmCode: string): Promise<ApiResponse<void>> {
    return this.client.authRequest('DELETE', `/api/v1/cdn/ng/domains/${domainId}`, {
      confirm_code: confirmCode,
    });
  }

  /** Send delete confirmation code via SMS */
  async sendDeleteConfirmCode(domainId: number): Promise<ApiResponse<void>> {
    return this.client.authRequest('GET', `/api/v1/cdn/ng/domains/${domainId}/send-confirm-code`);
  }

  /** Get domain usage/analytics */
  async getUsage(domainId: number): Promise<ApiResponse<DomainUsage>> {
    return this.client.authRequest('GET', `/api/v1/cdn/ng/domains/${domainId}/usage`);
  }

  /** Get domain WHOIS data */
  async getWhois(domainId: number): Promise<ApiResponse<WhoisData>> {
    return this.client.authRequest('GET', `/api/v1/cdn/ng/domains/${domainId}/whois`);
  }

  /** Get domain reports/analytics */
  async getReports(domainId: number, data?: ReportsRequest): Promise<ApiResponse<unknown>> {
    return this.client.authRequest('POST', `/api/v1/cdn/ng/domains/${domainId}/reports`, data);
  }

  /** Set redirect mode (www to non-www or vice versa) */
  async setRedirectMode(domainId: number, mode: 'www' | 'non-www' | 'none'): Promise<ApiResponse<void>> {
    return this.client.authRequest('POST', `/api/v1/cdn/ng/domains/${domainId}/redirect-mode`, { mode });
  }

  // ==================== DNS ====================

  /** List DNS records */
  async listDnsRecords(domainId: number): Promise<ApiResponse<DnsRecord[]>> {
    return this.client.authRequest('GET', `/api/v1/cdn/ng/domains/${domainId}/dns`);
  }

  /** Get a specific DNS record */
  async getDnsRecord(domainId: number, recordId: number): Promise<ApiResponse<DnsRecord>> {
    return this.client.authRequest('GET', `/api/v1/cdn/ng/domains/${domainId}/dns/${recordId}`);
  }

  /** Add a DNS record */
  async addDnsRecord(domainId: number, data: CreateDnsRecordRequest): Promise<ApiResponse<DnsRecord>> {
    return this.client.authRequest('POST', `/api/v1/cdn/ng/domains/${domainId}/dns`, data);
  }

  /** Update a DNS record */
  async updateDnsRecord(domainId: number, recordId: number, data: UpdateDnsRecordRequest): Promise<ApiResponse<DnsRecord>> {
    return this.client.authRequest('PUT', `/api/v1/cdn/ng/domains/${domainId}/dns/${recordId}`, data);
  }

  /** Delete a DNS record */
  async deleteDnsRecord(domainId: number, recordId: number): Promise<ApiResponse<void>> {
    return this.client.authRequest('DELETE', `/api/v1/cdn/ng/domains/${domainId}/dns/${recordId}`);
  }

  /** Auto-import DNS records from registrar */
  async fetchRecords(domainId: number): Promise<ApiResponse<DnsRecord[]>> {
    return this.client.authRequest('POST', `/api/v1/cdn/ng/domains/${domainId}/dns/fetch-records`);
  }

  /** Export DNS records (BIND format) */
  async exportDnsRecords(domainId: number): Promise<ApiResponse<string>> {
    return this.client.authRequest('GET', `/api/v1/cdn/ng/domains/${domainId}/dns/export`);
  }

  /** Import DNS records from BIND file */
  async importDnsRecords(domainId: number, records: string): Promise<ApiResponse<DnsRecord[]>> {
    return this.client.authRequest('POST', `/api/v1/cdn/ng/domains/${domainId}/dns/import`, { file: records });
  }

  /** Get proxiable records (including trashed) */
  async getProxiableRecords(domainId: number): Promise<ApiResponse<DnsRecord[]>> {
    return this.client.authRequest('GET', `/api/v1/cdn/ng/domains/${domainId}/dns/proxiable`);
  }

  /** Set custom nameservers */
  async setCustomNameservers(domainId: number, nameservers: string[]): Promise<ApiResponse<void>> {
    return this.client.authRequest('POST', `/api/v1/cdn/ng/domains/${domainId}/dns/custom-ns`, { nameservers });
  }

  /** Enable/disable DNSSEC */
  async setDnssec(domainId: number, enabled: boolean): Promise<ApiResponse<void>> {
    return this.client.authRequest('POST', `/api/v1/cdn/ng/domains/${domainId}/dns/dnssec`, { enabled: enabled ? 1 : 0 });
  }

  // ==================== SSL/HTTPS ====================

  /** List SSL certificates */
  async listSsl(domainId: number): Promise<ApiResponse<SslCertificate[]>> {
    return this.client.authRequest('GET', `/api/v1/cdn/ng/domains/${domainId}/https/ssl`);
  }

  /** Get SSL info (current active certificate) */
  async getSslInfo(domainId: number): Promise<ApiResponse<SslInfo>> {
    return this.client.authRequest('GET', `/api/v1/cdn/ng/domains/${domainId}/https/ssl/get-info`);
  }

  /** Get SSL configurations */
  async getSslConfigs(domainId: number): Promise<ApiResponse<SslConfigs>> {
    return this.client.authRequest('GET', `/api/v1/cdn/ng/domains/${domainId}/https/ssl/get-configs`);
  }

  /** Add custom SSL certificate */
  async addCustomSsl(domainId: number, data: AddSslRequest): Promise<ApiResponse<SslCertificate>> {
    return this.client.authRequest('POST', `/api/v1/cdn/ng/domains/${domainId}/https/ssl/add`, data);
  }

  /** Request free SSL certificate (Let's Encrypt) */
  async requestFreeSsl(domainId: number): Promise<ApiResponse<SslCertificate>> {
    return this.client.authRequest('POST', `/api/v1/cdn/ng/domains/${domainId}/https/ssl/free`);
  }

  /** Remove SSL certificate */
  async removeSsl(domainId: number, sslId: number): Promise<ApiResponse<void>> {
    return this.client.authRequest('DELETE', `/api/v1/cdn/ng/domains/${domainId}/https/ssl/${sslId}`);
  }

  /** Attach SSL certificate to domain */
  async attachSsl(domainId: number, sslId: number): Promise<ApiResponse<void>> {
    return this.client.authRequest('POST', `/api/v1/cdn/ng/domains/${domainId}/https/attach`, { ssl_id: sslId });
  }

  /** Detach SSL certificate from domain */
  async detachSsl(domainId: number): Promise<ApiResponse<void>> {
    return this.client.authRequest('POST', `/api/v1/cdn/ng/domains/${domainId}/https/detach`);
  }

  /** Attach default (shared) SSL */
  async attachDefaultSsl(domainId: number): Promise<ApiResponse<void>> {
    return this.client.authRequest('POST', `/api/v1/cdn/ng/domains/${domainId}/https/attach-default`);
  }

  /** Detach default SSL */
  async detachDefaultSsl(domainId: number): Promise<ApiResponse<void>> {
    return this.client.authRequest('POST', `/api/v1/cdn/ng/domains/${domainId}/https/detach-default`);
  }

  /** Set minimum TLS version */
  async setTlsVersion(domainId: number, version: '1.0' | '1.1' | '1.2' | '1.3'): Promise<ApiResponse<void>> {
    return this.client.authRequest('POST', `/api/v1/cdn/ng/domains/${domainId}/https/ssl/tls-version`, { version });
  }

  /** Configure HSTS */
  async setHsts(domainId: number, data: HstsRequest): Promise<ApiResponse<void>> {
    return this.client.authRequest('POST', `/api/v1/cdn/ng/domains/${domainId}/https/hsts`, data);
  }

  /** Enable/disable HTTPS redirect */
  async setHttpsRedirect(domainId: number, enabled: boolean): Promise<ApiResponse<void>> {
    return this.client.authRequest('POST', `/api/v1/cdn/ng/domains/${domainId}/https/redirect`, { enabled: enabled ? 1 : 0 });
  }

  /** Set Content Security Policy override */
  async setCspOverride(domainId: number, csp: string): Promise<ApiResponse<void>> {
    return this.client.authRequest('POST', `/api/v1/cdn/ng/domains/${domainId}/https/csp-override`, { csp });
  }

  /** Set backend protocol (origin) */
  async setBackendProtocol(domainId: number, protocol: 'http' | 'https' | 'auto'): Promise<ApiResponse<void>> {
    return this.client.authRequest('POST', `/api/v1/cdn/ng/domains/${domainId}/https/backend-protocol`, { protocol });
  }

  /** Enable/disable HTTP/3 */
  async setHttp3(domainId: number, enabled: boolean): Promise<ApiResponse<void>> {
    return this.client.authRequest('POST', `/api/v1/cdn/ng/domains/${domainId}/https/h3`, { enabled: enabled ? 1 : 0 });
  }

  // ==================== Cache ====================

  /** Get cache settings */
  async getCacheSettings(domainId: number): Promise<ApiResponse<CacheSettings>> {
    return this.client.authRequest('GET', `/api/v1/cdn/ng/domains/${domainId}/cache`);
  }

  /** Set cache mode */
  async setCacheMode(domainId: number, mode: 'off' | 'standard' | 'aggressive' | 'bypass'): Promise<ApiResponse<void>> {
    return this.client.authRequest('POST', `/api/v1/cdn/ng/domains/${domainId}/cache/edge/change-mode`, { mode });
  }

  /** Set cache TTL */
  async setCacheTtl(domainId: number, ttl: number): Promise<ApiResponse<void>> {
    return this.client.authRequest('POST', `/api/v1/cdn/ng/domains/${domainId}/cache/edge/change-ttl`, { ttl });
  }

  /** Enable/disable developer mode (bypass cache) */
  async setDeveloperMode(domainId: number, enabled: boolean): Promise<ApiResponse<void>> {
    return this.client.authRequest('POST', `/api/v1/cdn/ng/domains/${domainId}/cache/edge/developer-mode`, { enabled: enabled ? 1 : 0 });
  }

  /** Enable/disable always online mode */
  async setAlwaysOnline(domainId: number, enabled: boolean): Promise<ApiResponse<void>> {
    return this.client.authRequest('POST', `/api/v1/cdn/ng/domains/${domainId}/cache/edge/always-online`, { enabled: enabled ? 1 : 0 });
  }

  /** Enable/disable cookie caching */
  async setCacheCookies(domainId: number, enabled: boolean): Promise<ApiResponse<void>> {
    return this.client.authRequest('POST', `/api/v1/cdn/ng/domains/${domainId}/cache/edge/cache-cookies`, { enabled: enabled ? 1 : 0 });
  }

  /** Set browser cache mode */
  async setBrowserCacheMode(domainId: number, mode: string): Promise<ApiResponse<void>> {
    return this.client.authRequest('POST', `/api/v1/cdn/ng/domains/${domainId}/cache/browser/change-mode`, { mode });
  }

  /** Set browser cache TTL */
  async setBrowserCacheTtl(domainId: number, ttl: number): Promise<ApiResponse<void>> {
    return this.client.authRequest('POST', `/api/v1/cdn/ng/domains/${domainId}/cache/browser/change-ttl`, { ttl });
  }

  /** Set error response cache TTL */
  async setErrorCacheTtl(domainId: number, ttl: number): Promise<ApiResponse<void>> {
    return this.client.authRequest('POST', `/api/v1/cdn/ng/domains/${domainId}/cache/errors/cache-ttl`, { ttl });
  }

  /** Purge cache */
  async purgeCache(domainId: number, data?: PurgeCacheRequest): Promise<ApiResponse<void>> {
    return this.client.authRequest('POST', `/api/v1/cdn/ng/domains/${domainId}/cache/edge/purge-cache`, {
      purge_all: data?.purge_all ? 1 : 0,
      urls: data?.urls,
      tags: data?.tags,
      prefixes: data?.prefixes,
    });
  }

  // ==================== Acceleration ====================

  /** Set minification settings */
  async setMinify(domainId: number, settings: { html?: boolean; css?: boolean; js?: boolean }): Promise<ApiResponse<void>> {
    return this.client.authRequest('POST', `/api/v1/cdn/ng/domains/${domainId}/acceleration/assets/minify`, {
      html: settings.html ? 1 : 0,
      css: settings.css ? 1 : 0,
      js: settings.js ? 1 : 0,
    });
  }

  /** Enable/disable image optimization (WebP conversion) */
  async setImageOptimization(domainId: number, enabled: boolean): Promise<ApiResponse<void>> {
    return this.client.authRequest('POST', `/api/v1/cdn/ng/domains/${domainId}/acceleration/images/optimize`, { enabled: enabled ? 1 : 0 });
  }

  /** Enable/disable image resize */
  async setImageResize(domainId: number, enabled: boolean): Promise<ApiResponse<void>> {
    return this.client.authRequest('POST', `/api/v1/cdn/ng/domains/${domainId}/acceleration/images/resize`, { enabled: enabled ? 1 : 0 });
  }

  // ==================== DDoS Protection ====================

  /** Get DDoS protection settings */
  async getDdosSettings(domainId: number): Promise<ApiResponse<DdosSettings>> {
    return this.client.authRequest('GET', `/api/v1/cdn/ng/domains/${domainId}/ddos`);
  }

  /** Set DDoS protection settings */
  async setDdosSettings(domainId: number, settings: Partial<DdosSettings>): Promise<ApiResponse<void>> {
    return this.client.authRequest('POST', `/api/v1/cdn/ng/domains/${domainId}/ddos`, settings);
  }

  /** Set captcha module */
  async setCaptchaModule(domainId: number, module: 'recaptcha' | 'hcaptcha' | 'turnstile' | 'arcaptcha'): Promise<ApiResponse<void>> {
    return this.client.authRequest('POST', `/api/v1/cdn/ng/domains/${domainId}/ddos/captcha-module`, { module });
  }

  /** Set captcha challenge TTL */
  async setCaptchaTtl(domainId: number, ttl: number): Promise<ApiResponse<void>> {
    return this.client.authRequest('POST', `/api/v1/cdn/ng/domains/${domainId}/ddos/set-ttl/captcha`, { ttl });
  }

  /** Set cookie challenge TTL */
  async setCookieChallengeTtl(domainId: number, ttl: number): Promise<ApiResponse<void>> {
    return this.client.authRequest('POST', `/api/v1/cdn/ng/domains/${domainId}/ddos/set-ttl/cookie`, { ttl });
  }

  /** Set JS challenge TTL */
  async setJsChallengeTtl(domainId: number, ttl: number): Promise<ApiResponse<void>> {
    return this.client.authRequest('POST', `/api/v1/cdn/ng/domains/${domainId}/ddos/set-ttl/js`, { ttl });
  }

  // ==================== Firewall ====================

  /** Get firewall configs */
  async getFirewallConfigs(domainId: number): Promise<ApiResponse<FirewallConfigs>> {
    return this.client.authRequest('GET', `/api/v1/cdn/ng/domains/${domainId}/firewall`);
  }

  /** Set firewall configs */
  async setFirewallConfigs(domainId: number, data: SetFirewallConfigsRequest): Promise<ApiResponse<void>> {
    return this.client.authRequest('POST', `/api/v1/cdn/ng/domains/${domainId}/firewall`, data);
  }

  // ==================== WAF ====================

  /** Get WAF settings */
  async getWafSettings(domainId: number): Promise<ApiResponse<WafSettings>> {
    return this.client.authRequest('GET', `/api/v1/cdn/ng/domains/${domainId}/waf`);
  }

  /** Set WAF settings */
  async setWafSettings(domainId: number, settings: Partial<WafSettings>): Promise<ApiResponse<void>> {
    return this.client.authRequest('PUT', `/api/v1/cdn/ng/domains/${domainId}/waf`, settings);
  }

  /** Get WAF layers (rulesets) */
  async getWafLayers(domainId: number): Promise<ApiResponse<WafLayer[]>> {
    return this.client.authRequest('GET', `/api/v1/cdn/ng/domains/${domainId}/waf/layers`);
  }

  /** Get WAF rules list */
  async getWafRules(domainId: number): Promise<ApiResponse<WafRule[]>> {
    return this.client.authRequest('GET', `/api/v1/cdn/ng/domains/${domainId}/waf/rules`);
  }

  /** Get disabled WAF rules */
  async getDisabledWafRules(domainId: number): Promise<ApiResponse<WafRule[]>> {
    return this.client.authRequest('GET', `/api/v1/cdn/ng/domains/${domainId}/waf/disabled-rules`);
  }

  /** Enable/disable WAF rule group */
  async switchWafGroup(domainId: number, groupId: string, enabled: boolean): Promise<ApiResponse<void>> {
    return this.client.authRequest('PUT', `/api/v1/cdn/ng/domains/${domainId}/waf/switch-group`, { group_id: groupId, enabled: enabled ? 1 : 0 });
  }

  /** Enable/disable individual WAF rule */
  async switchWafRule(domainId: number, ruleId: string, enabled: boolean): Promise<ApiResponse<void>> {
    return this.client.authRequest('PUT', `/api/v1/cdn/ng/domains/${domainId}/waf/switch-rule`, { rule_id: ruleId, enabled: enabled ? 1 : 0 });
  }

  // ==================== Page Rules ====================

  /** Get all page rules */
  async getPageRules(domainId: number): Promise<ApiResponse<PageRulePath[]>> {
    return this.client.authRequest('GET', `/api/v1/cdn/ng/domains/${domainId}/paths`);
  }

  /** Get page rules for WAF section */
  async getPageRulesWaf(domainId: number): Promise<ApiResponse<PageRulePath[]>> {
    return this.client.authRequest('GET', `/api/v1/cdn/ng/domains/${domainId}/paths/waf`);
  }

  /** Get page rules for Rate Limit section */
  async getPageRulesRatelimit(domainId: number): Promise<ApiResponse<PageRulePath[]>> {
    return this.client.authRequest('GET', `/api/v1/cdn/ng/domains/${domainId}/paths/ratelimit`);
  }

  /** Get page rules for DDoS section */
  async getPageRulesDdos(domainId: number): Promise<ApiResponse<PageRulePath[]>> {
    return this.client.authRequest('GET', `/api/v1/cdn/ng/domains/${domainId}/paths/ddos`);
  }

  /** Get page rules for Firewall section */
  async getPageRulesFirewall(domainId: number): Promise<ApiResponse<PageRulePath[]>> {
    return this.client.authRequest('GET', `/api/v1/cdn/ng/domains/${domainId}/paths/firewall`);
  }

  /** Create a page rule path */
  async createPageRulePath(domainId: number, data: CreatePageRulePathRequest): Promise<ApiResponse<PageRulePath>> {
    return this.client.authRequest('POST', `/api/v1/cdn/ng/domains/${domainId}/paths`, data);
  }

  /** Update page rule priority */
  async setPageRulePriority(domainId: number, pathId: number, priority: number): Promise<ApiResponse<void>> {
    return this.client.authRequest('PUT', `/api/v1/cdn/ng/domains/${domainId}/paths/${pathId}`, { priority });
  }

  /** Delete a page rule path */
  async deletePageRulePath(domainId: number, pathId: number): Promise<ApiResponse<void>> {
    return this.client.authRequest('DELETE', `/api/v1/cdn/ng/domains/${domainId}/paths/${pathId}`);
  }

  /** Create/set rule for a page rule path */
  async createRule(domainId: number, pathId: number, data: CreateRuleRequest): Promise<ApiResponse<void>> {
    return this.client.authRequest('POST', `/api/v1/cdn/ng/domains/${domainId}/paths/${pathId}/rules`, data);
  }

  /** Delete rule from a page rule path */
  async deleteRule(domainId: number, pathId: number, ruleType: string): Promise<ApiResponse<void>> {
    return this.client.authRequest('DELETE', `/api/v1/cdn/ng/domains/${domainId}/paths/${pathId}/rules/${ruleType}`);
  }

  /** Set rule directly (without path) */
  async setDirectRule(domainId: number, section: string, settings: Record<string, unknown>): Promise<ApiResponse<void>> {
    return this.client.authRequest('POST', `/api/v1/cdn/ng/domains/${domainId}/paths/direct-rule/${section}`, settings);
  }

  // ==================== Clusters (Load Balancing) ====================

  /** Get clusters (origin pools) */
  async getClusters(domainId: number): Promise<ApiResponse<Cluster[]>> {
    return this.client.authRequest('GET', `/api/v1/cdn/ng/domains/${domainId}/cluster`);
  }

  /** Get cluster assignments (which paths use which clusters) */
  async getClusterAssignments(domainId: number): Promise<ApiResponse<unknown[]>> {
    return this.client.authRequest('GET', `/api/v1/cdn/ng/domains/${domainId}/cluster/assignments`);
  }

  /** Add a cluster */
  async addCluster(domainId: number, data: CreateClusterRequest): Promise<ApiResponse<Cluster>> {
    return this.client.authRequest('POST', `/api/v1/cdn/ng/domains/${domainId}/cluster`, data);
  }

  /** Update a cluster */
  async updateCluster(domainId: number, clusterId: number, data: UpdateClusterRequest): Promise<ApiResponse<Cluster>> {
    return this.client.authRequest('PUT', `/api/v1/cdn/ng/domains/${domainId}/cluster/${clusterId}`, data);
  }

  /** Delete a cluster */
  async deleteCluster(domainId: number, clusterId: number): Promise<ApiResponse<void>> {
    return this.client.authRequest('DELETE', `/api/v1/cdn/ng/domains/${domainId}/cluster/${clusterId}`);
  }

  /** Add server to cluster */
  async addServerToCluster(domainId: number, clusterId: number, data: AddClusterServerRequest): Promise<ApiResponse<void>> {
    return this.client.authRequest('POST', `/api/v1/cdn/ng/domains/${domainId}/cluster/${clusterId}/servers`, data);
  }

  /** Remove server from cluster */
  async removeServerFromCluster(domainId: number, clusterId: number, serverId: number): Promise<ApiResponse<void>> {
    return this.client.authRequest('DELETE', `/api/v1/cdn/ng/domains/${domainId}/cluster/${clusterId}/servers/${serverId}`);
  }

  // ==================== Log Forwarders ====================

  /** Get log forwarders */
  async getLogForwarders(domainId: number): Promise<ApiResponse<LogForwarder[]>> {
    return this.client.authRequest('GET', `/api/v1/cdn/ng/domains/${domainId}/log-forwarders`);
  }

  /** Add log forwarder */
  async addLogForwarder(domainId: number, data: CreateLogForwarderRequest): Promise<ApiResponse<LogForwarder>> {
    return this.client.authRequest('POST', `/api/v1/cdn/ng/domains/${domainId}/log-forwarders`, data);
  }

  /** Update log forwarder */
  async updateLogForwarder(domainId: number, loggerId: number, data: Partial<CreateLogForwarderRequest>): Promise<ApiResponse<LogForwarder>> {
    return this.client.authRequest('PUT', `/api/v1/cdn/ng/domains/${domainId}/log-forwarders/${loggerId}`, data);
  }

  /** Delete log forwarder */
  async deleteLogForwarder(domainId: number, loggerId: number): Promise<ApiResponse<void>> {
    return this.client.authRequest('DELETE', `/api/v1/cdn/ng/domains/${domainId}/log-forwarders/${loggerId}`);
  }

  // ==================== Custom Pages ====================

  /** Get custom error pages */
  async getCustomPages(domainId: number): Promise<ApiResponse<CustomPages>> {
    return this.client.authRequest('GET', `/api/v1/cdn/ng/domains/${domainId}/custom-pages`);
  }

  /** Set custom error pages */
  async setCustomPages(domainId: number, pages: CustomPages): Promise<ApiResponse<void>> {
    return this.client.authRequest('PUT', `/api/v1/cdn/ng/domains/${domainId}/custom-pages`, pages);
  }

  /** Delete custom pages (reset to default) */
  async deleteCustomPages(domainId: number): Promise<ApiResponse<void>> {
    return this.client.authRequest('DELETE', `/api/v1/cdn/ng/domains/${domainId}/custom-pages`);
  }

  // ==================== Plans ====================

  /** Get available CDN plans */
  async getPlans(domainId?: number): Promise<ApiResponse<CdnPlan[]>> {
    return this.client.authRequest('GET', '/api/v1/cdn/ng/plans', domainId ? { domain_id: domainId } : undefined);
  }

  /** Change domain plan */
  async changePlan(domainId: number, planId: number): Promise<ApiResponse<void>> {
    return this.client.authRequest('POST', '/api/v1/cdn/ng/plans', { domain_id: domainId, plan_id: planId });
  }
}
