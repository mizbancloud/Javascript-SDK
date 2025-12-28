# @mizbancloud/sdk

Official MizbanCloud SDK for Node.js - Complete CDN, Cloud, and Authentication APIs.

## Installation

```bash
npm install @mizbancloud/sdk
# or
yarn add @mizbancloud/sdk
# or
pnpm add @mizbancloud/sdk
```

## Quick Start

```typescript
import { MizbanCloud } from '@mizbancloud/sdk';

// Initialize the SDK
const client = new MizbanCloud({
  authBaseUrl: 'http://localhost:8003',  // Auth API
  cdnBaseUrl: 'http://localhost:8000',   // CDN API
  cloudBaseUrl: 'http://localhost:8001', // Cloud API
  language: 'en', // 'en' or 'fa'
});

// Set your API token
client.setToken('your-api-token');

// Now you can make API calls
const domains = await client.cdn.listDomains();
const servers = await client.cloud.listServers();
```

## Modules

### Authentication (`client.auth`)

```typescript
// Set API token
client.setToken('your-api-token');
// or
client.auth.setApiToken('your-api-token');

// Get wallet balance
const wallet = await client.auth.getWallet();
console.log('Balance:', wallet.data.balance);
```

### Statics (`client.statics`)

```typescript
// Get available datacenters
const datacenters = await client.statics.listDatacenters();

// Get available operating systems
const osList = await client.statics.listOperatingSystems();

// Get cache time options
const cacheTimes = await client.statics.getCacheTimes();
```

### CDN (`client.cdn`)

#### Domains

```typescript
// List domains
const domains = await client.cdn.listDomains();

// Add a domain
const newDomain = await client.cdn.addDomain({
  domain: 'example.com',
  plan_id: 1,
});

// Get domain details
const domain = await client.cdn.getDomain(domainId);

// Delete domain (requires confirmation code)
await client.cdn.sendDeleteConfirmCode(domainId);
await client.cdn.deleteDomain(domainId, 'confirm-code');

// Get domain usage/analytics
const usage = await client.cdn.getUsage(domainId);

// Get WHOIS data
const whois = await client.cdn.getWhois(domainId);

// Get reports
const reports = await client.cdn.getReports(domainId, {
  start_date: '2024-01-01',
  end_date: '2024-01-31',
  granularity: 'daily',
  type: 'traffic',
});

// Set redirect mode (www/non-www)
await client.cdn.setRedirectMode(domainId, 'www');
```

#### DNS Records

```typescript
// List DNS records
const records = await client.cdn.listDnsRecords(domainId);

// Add DNS record
await client.cdn.addDnsRecord(domainId, {
  name: 'www',
  type: 'A',
  value: '1.2.3.4',
  ttl: 3600,
  proxied: true,
});

// Update DNS record
await client.cdn.updateDnsRecord(domainId, recordId, {
  value: '5.6.7.8',
  ttl: 1800,
});

// Delete DNS record
await client.cdn.deleteDnsRecord(domainId, recordId);

// Auto-import records from registrar
await client.cdn.fetchRecords(domainId);

// Export DNS zone (BIND format)
const zone = await client.cdn.exportDnsRecords(domainId);

// Import DNS records
await client.cdn.importDnsRecords(domainId, zoneContent);

// Get proxiable records
const proxiable = await client.cdn.getProxiableRecords(domainId);

// Set custom nameservers
await client.cdn.setCustomNameservers(domainId, ['ns1.example.com', 'ns2.example.com']);

// Enable/disable DNSSEC
await client.cdn.setDnssec(domainId, true);
```

#### SSL/HTTPS

```typescript
// List SSL certificates
const sslList = await client.cdn.listSsl(domainId);

// Get SSL info
const sslInfo = await client.cdn.getSslInfo(domainId);

// Get SSL configs
const sslConfigs = await client.cdn.getSslConfigs(domainId);

// Request free SSL (Let's Encrypt)
await client.cdn.requestFreeSsl(domainId);

// Add custom SSL certificate
await client.cdn.addCustomSsl(domainId, {
  certificate: '-----BEGIN CERTIFICATE-----...',
  private_key: '-----BEGIN PRIVATE KEY-----...',
  ca_bundle: '-----BEGIN CERTIFICATE-----...',
});

// Remove SSL certificate
await client.cdn.removeSsl(domainId, certId);

// Attach/Detach SSL
await client.cdn.attachSsl(domainId, sslId);
await client.cdn.detachSsl(domainId);

// Default SSL
await client.cdn.attachDefaultSsl(domainId);
await client.cdn.detachDefaultSsl(domainId);

// Set TLS version
await client.cdn.setTlsVersion(domainId, '1.2');

// HSTS settings
await client.cdn.setHsts(domainId, {
  enabled: true,
  max_age: 31536000,
  include_subdomains: true,
  preload: true,
});

// HTTPS redirect
await client.cdn.setHttpsRedirect(domainId, true);

// Backend protocol
await client.cdn.setBackendProtocol(domainId, 'https');

// HTTP/3
await client.cdn.setHttp3(domainId, true);
```

#### Cache

```typescript
// Get cache settings
const cacheSettings = await client.cdn.getCacheSettings(domainId);

// Set cache mode
await client.cdn.setCacheMode(domainId, 'aggressive');

// Set cache TTL
await client.cdn.setCacheTtl(domainId, 86400);

// Developer mode
await client.cdn.setDeveloperMode(domainId, true);

// Always online
await client.cdn.setAlwaysOnline(domainId, true);

// Cache cookies
await client.cdn.setCacheCookies(domainId, false);

// Browser cache
await client.cdn.setBrowserCacheMode(domainId, 'respect');
await client.cdn.setBrowserCacheTtl(domainId, 3600);

// Error cache TTL
await client.cdn.setErrorCacheTtl(domainId, 300);

// Purge cache
await client.cdn.purgeCache(domainId, { purge_all: true });
// or specific URLs/tags/prefixes
await client.cdn.purgeCache(domainId, {
  urls: ['https://example.com/path/to/file.css'],
  tags: ['static'],
  prefixes: ['/images/'],
});
```

#### Acceleration

```typescript
// Minification
await client.cdn.setMinify(domainId, { html: true, css: true, js: true });

// Image optimization
await client.cdn.setImageOptimization(domainId, true);

// Image resize
await client.cdn.setImageResize(domainId, true);
```

#### DDoS Protection

```typescript
// Get DDoS settings
const ddos = await client.cdn.getDdosSettings(domainId);

// Set DDoS settings
await client.cdn.setDdosSettings(domainId, {
  mode: 'medium',
  captcha_module: 'turnstile',
});

// Set captcha module
await client.cdn.setCaptchaModule(domainId, 'hcaptcha');

// Set challenge TTLs
await client.cdn.setCaptchaTtl(domainId, 7200);
await client.cdn.setCookieChallengeTtl(domainId, 3600);
await client.cdn.setJsChallengeTtl(domainId, 1800);
```

#### Firewall

```typescript
// Get firewall configs
const firewall = await client.cdn.getFirewallConfigs(domainId);

// Set firewall configs
await client.cdn.setFirewallConfigs(domainId, {
  enabled: true,
  default_action: 'allow',
});
```

#### WAF (Web Application Firewall)

```typescript
// Get WAF settings
const waf = await client.cdn.getWafSettings(domainId);

// Set WAF settings
await client.cdn.setWafSettings(domainId, {
  enabled: true,
  mode: 'block',
  sensitivity: 'medium',
});

// Get WAF layers (rulesets)
const layers = await client.cdn.getWafLayers(domainId);

// Get WAF rules
const rules = await client.cdn.getWafRules(domainId);

// Get disabled rules
const disabled = await client.cdn.getDisabledWafRules(domainId);

// Toggle WAF layer/group
await client.cdn.switchWafGroup(domainId, groupId, true);

// Toggle WAF rule
await client.cdn.switchWafRule(domainId, ruleId, false);
```

#### Page Rules

```typescript
// Get all page rules
const rules = await client.cdn.getPageRules(domainId);

// Get page rules by section
const wafRules = await client.cdn.getPageRulesWaf(domainId);
const ratelimitRules = await client.cdn.getPageRulesRatelimit(domainId);
const ddosRules = await client.cdn.getPageRulesDdos(domainId);
const firewallRules = await client.cdn.getPageRulesFirewall(domainId);

// Create page rule path
const path = await client.cdn.createPageRulePath(domainId, {
  path: '/api/*',
  priority: 10,
});

// Set path priority
await client.cdn.setPageRulePriority(domainId, pathId, 5);

// Delete page rule path
await client.cdn.deletePageRulePath(domainId, pathId);

// Create rule for path
await client.cdn.createRule(domainId, pathId, {
  section: 'cache',
  settings: { enabled: true, mode: 'aggressive', ttl: 86400 },
});

// Delete rule
await client.cdn.deleteRule(domainId, pathId, 'cache');

// Set direct rule (without path)
await client.cdn.setDirectRule(domainId, 'cache', { mode: 'aggressive' });
```

#### Load Balancing (Clusters)

```typescript
// Get clusters
const clusters = await client.cdn.getClusters(domainId);

// Get cluster assignments
const assignments = await client.cdn.getClusterAssignments(domainId);

// Add cluster
const cluster = await client.cdn.addCluster(domainId, {
  name: 'backend-pool',
  mode: 'round_robin',
});

// Update cluster
await client.cdn.updateCluster(domainId, clusterId, {
  mode: 'least_connections',
  health_check: { enabled: true, interval: 30, path: '/health' },
});

// Delete cluster
await client.cdn.deleteCluster(domainId, clusterId);

// Add server to cluster
await client.cdn.addServerToCluster(domainId, clusterId, {
  address: '10.0.0.1',
  port: 8080,
  weight: 10,
});

// Remove server from cluster
await client.cdn.removeServerFromCluster(domainId, clusterId, serverId);
```

#### Log Forwarders

```typescript
// Get log forwarders
const forwarders = await client.cdn.getLogForwarders(domainId);

// Add log forwarder
await client.cdn.addLogForwarder(domainId, {
  name: 'datadog-logs',
  type: 'datadog',
  destination: 'https://http-intake.logs.datadoghq.com',
  enabled: true,
  headers: { 'DD-API-KEY': 'your-api-key' },
});

// Update log forwarder
await client.cdn.updateLogForwarder(domainId, forwarderId, {
  enabled: false,
});

// Delete log forwarder
await client.cdn.deleteLogForwarder(domainId, forwarderId);
```

#### Custom Error Pages

```typescript
// Get custom pages
const pages = await client.cdn.getCustomPages(domainId);

// Set custom pages
await client.cdn.setCustomPages(domainId, {
  e403: '<html>Access Denied</html>',
  e502: '<html>Bad Gateway</html>',
  maintenance_mode: '<html>Under Maintenance</html>',
});

// Delete custom pages (reset to default)
await client.cdn.deleteCustomPages(domainId);
```

#### Plans

```typescript
// Get available plans
const plans = await client.cdn.getPlans(domainId);

// Change domain plan
await client.cdn.changePlan(domainId, 2);
```

### Cloud (`client.cloud`)

#### Servers

```typescript
// List servers
const servers = await client.cloud.listServers();

// Get server details
const server = await client.cloud.getServer(serverId);

// Poll server (long polling for status changes)
const updated = await client.cloud.pollServer(serverId);

// Create server
const newServer = await client.cloud.createServer({
  name: 'my-server',
  cpu: 2,
  ram: 4096,
  storage: 50,
  storage_type: 'SSD',
  os_id: 1,
  datacenter_id: 1,
  ssh_key_id: 1, // optional
  snapshot_id: 1, // optional, create from snapshot
  private_network_id: 1, // optional
});

// Delete server
await client.cloud.deleteServer(serverId);

// Rename server
await client.cloud.renameServer(serverId, 'new-name');

// Resize server (CPU/RAM)
await client.cloud.resizeServer(serverId, { cpu: 4, ram: 8192 });

// Reload OS
await client.cloud.reloadOs(serverId, { os_id: 2 });

// Convert test server to permanent
await client.cloud.convertToPermanent(serverId);
```

#### Power Management

```typescript
// Power on
await client.cloud.powerOn(serverId);

// Power off (hard)
await client.cloud.powerOff(serverId);

// Reboot (hard)
await client.cloud.reboot(serverId);

// Restart (soft/graceful)
await client.cloud.restart(serverId);
```

#### Access

```typescript
// Get VNC console access
const vnc = await client.cloud.getVnc(serverId);
console.log('VNC URL:', vnc.data.url);

// Get initial password (for newly created servers)
const password = await client.cloud.getInitialPassword(serverId);

// Reset root password
await client.cloud.resetPassword(serverId, { password: 'new-secure-password' });
```

#### Rescue Mode

```typescript
// Boot into rescue mode
const rescue = await client.cloud.rescue(serverId, { os_id: 1 });
console.log('Rescue password:', rescue.data.password);

// Exit rescue mode
await client.cloud.unrescue(serverId);
```

#### High Availability (Autopilot)

```typescript
// Enable autopilot
await client.cloud.enableAutopilot(serverId);

// Disable autopilot
await client.cloud.disableAutopilot(serverId);
```

#### Monitoring

```typescript
// Get server logs
const logs = await client.cloud.getLogs(serverId);

// Get server metrics/charts
const charts = await client.cloud.getCharts(serverId, {
  type: 'cpu', // 'cpu' | 'ram' | 'disk' | 'network'
  time: '24h', // '1h' | '6h' | '24h' | '7d' | '30d'
});

// Get traffic usage for all servers
const traffic = await client.cloud.getTrafficUsage();

// Alternate traffic endpoint
const traffics = await client.cloud.getTraffics();
```

#### Security Groups (Firewall)

```typescript
// List security groups
const groups = await client.cloud.listSecurityGroups();

// Create security group
const sg = await client.cloud.createSecurityGroup({
  name: 'web-server',
  description: 'Web server firewall rules',
});

// Delete security group
await client.cloud.deleteSecurityGroup(firewallId);

// Add security rule
await client.cloud.addSecurityRule({
  firewall_id: sg.data.id,
  direction: 'ingress',
  protocol: 'tcp',
  port_range_min: 80,
  port_range_max: 80,
  remote_ip_prefix: '0.0.0.0/0',
});

// Remove security rule
await client.cloud.removeSecurityRule(ruleId);

// Attach firewall to server
await client.cloud.attachFirewall({ firewall_id: 1, server_id: 1 });

// Detach firewall from server
await client.cloud.detachFirewall({ firewall_id: 1, server_id: 1 });
```

#### Private Networks

```typescript
// List private networks
const networks = await client.cloud.listPrivateNetworks();

// Create private network
await client.cloud.createPrivateNetwork({
  name: 'internal',
  cidr: '10.0.0.0/24',
  datacenter_id: 1,
});

// Update private network
await client.cloud.updatePrivateNetwork(networkId, { name: 'new-name' });

// Delete private network
await client.cloud.deletePrivateNetwork(networkId);

// Attach server to private network
await client.cloud.attachToPrivateNetwork({ network_id: 1, server_id: 1 });

// Detach server from private network
await client.cloud.detachFromPrivateNetwork({ network_id: 1, server_id: 1 });

// Purge all attachments
await client.cloud.purgeNetworkAttachments(networkId);
```

#### Public Networks

```typescript
// Attach public network to server
await client.cloud.attachPublicNetwork(serverId);

// Detach public network from server
await client.cloud.detachPublicNetwork(serverId);
```

#### Volumes

```typescript
// List volumes
const volumes = await client.cloud.listVolumes();

// Get volume details
const volume = await client.cloud.getVolume(volumeId);

// Create volume
await client.cloud.createVolume({
  name: 'data-disk',
  size: 100,
  type: 'SSD',
  datacenter_id: 1,
});

// Update/resize volume
await client.cloud.updateVolume(volumeId, { size: 200, name: 'new-name' });

// Delete volume
await client.cloud.deleteVolume(volumeId);

// Attach volume to server
await client.cloud.attachVolume({ volume_id: 1, server_id: 1 });

// Detach volume from server
await client.cloud.detachVolume(volumeId);

// Sync volumes with OpenStack
await client.cloud.syncVolumes();
```

#### Snapshots

```typescript
// List snapshots
const snapshots = await client.cloud.listSnapshots();

// Get snapshot details
const snapshot = await client.cloud.getSnapshot(snapshotId);

// Create snapshot
await client.cloud.createSnapshot({
  server_id: 1,
  name: 'backup-2024-01-01',
});

// Delete snapshot
await client.cloud.deleteSnapshot(snapshotId);

// Sync snapshots with OpenStack
await client.cloud.syncSnapshots();
```

#### SSH Keys

```typescript
// List SSH keys
const keys = await client.cloud.listSshKeys();

// Get SSH key details
const key = await client.cloud.getSshKey(keyId);

// Create SSH key
await client.cloud.createSshKey({
  name: 'my-laptop',
  public_key: 'ssh-rsa AAAAB3NzaC1yc2E...',
});

// Delete SSH key
await client.cloud.deleteSshKey(keyId);

// Generate random SSH key pair
const keyPair = await client.cloud.generateRandomSshKey();
console.log('Public key:', keyPair.data.public_key);
console.log('Private key:', keyPair.data.private_key);
```

## Error Handling

```typescript
import { MizbanCloud, MizbanCloudError } from '@mizbancloud/sdk';

try {
  await client.cdn.getDomain(999);
} catch (error) {
  if (error instanceof MizbanCloudError) {
    console.error('API Error:', error.message);
    console.error('Status Code:', error.statusCode);
    console.error('Invalid Fields:', error.invalidFields);
    console.error('Missing Fields:', error.missingFields);
    console.error('Fields:', error.fields);
  }
}
```

## Configuration

```typescript
const client = new MizbanCloud({
  // API endpoints
  authBaseUrl: 'http://localhost:8003',
  cdnBaseUrl: 'http://localhost:8000',
  cloudBaseUrl: 'http://localhost:8001',

  // Request timeout (default: 30000ms)
  timeout: 60000,

  // Response language: 'en' or 'fa'
  language: 'fa',

  // Custom headers
  headers: {
    'X-Custom-Header': 'value',
  },
});

// Set API token
client.setToken('your-api-token');

// Change language at runtime
client.setLanguage('fa');
```

## TypeScript Support

This SDK is written in TypeScript and includes full type definitions:

```typescript
import type {
  // Common
  ApiResponse,
  MizbanCloudConfig,

  // CDN Types
  Domain,
  DnsRecord,
  SslCertificate,
  SslInfo,
  SslConfigs,
  CacheSettings,
  DdosSettings,
  FirewallConfigs,
  WafSettings,
  PageRulePath,
  Cluster,
  LogForwarder,
  CustomPages,
  CdnPlan,

  // Cloud Types
  Server,
  SecurityGroup,
  PrivateNetwork,
  Volume,
  Snapshot,
  SshKey,
  CreateServerRequest,
  VncAccess,

  // Statics Types
  Datacenter,
  OperatingSystem,
} from '@mizbancloud/sdk';

// Full autocomplete and type checking
const server: Server = (await client.cloud.getServer(1)).data;
```

## License

MIT
