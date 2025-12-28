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

describe('CDN Module', () => {
  let client: MizbanCloud;

  beforeEach(() => {
    vi.clearAllMocks();
    client = new MizbanCloud({
      baseUrl: 'https://auth.mizbancloud.com',
    });
  });

  describe('Module Existence', () => {
    it('should have cdn module defined', () => {
      expect(client.cdn).toBeDefined();
    });
  });

  // ==================== Domain Methods ====================
  describe('Domain Methods', () => {
    it('should have listDomains method', () => {
      expect(typeof client.cdn.listDomains).toBe('function');
    });

    it('should have getDomain method', () => {
      expect(typeof client.cdn.getDomain).toBe('function');
    });

    it('should have addDomain method', () => {
      expect(typeof client.cdn.addDomain).toBe('function');
    });

    it('should have deleteDomain method', () => {
      expect(typeof client.cdn.deleteDomain).toBe('function');
    });

    it('should have sendDeleteConfirmCode method', () => {
      expect(typeof client.cdn.sendDeleteConfirmCode).toBe('function');
    });

    it('should have getUsage method', () => {
      expect(typeof client.cdn.getUsage).toBe('function');
    });

    it('should have getWhois method', () => {
      expect(typeof client.cdn.getWhois).toBe('function');
    });

    it('should have getReports method', () => {
      expect(typeof client.cdn.getReports).toBe('function');
    });

    it('should have setRedirectMode method', () => {
      expect(typeof client.cdn.setRedirectMode).toBe('function');
    });
  });

  // ==================== DNS Methods ====================
  describe('DNS Methods', () => {
    it('should have listDnsRecords method', () => {
      expect(typeof client.cdn.listDnsRecords).toBe('function');
    });

    it('should have getDnsRecord method', () => {
      expect(typeof client.cdn.getDnsRecord).toBe('function');
    });

    it('should have addDnsRecord method', () => {
      expect(typeof client.cdn.addDnsRecord).toBe('function');
    });

    it('should have updateDnsRecord method', () => {
      expect(typeof client.cdn.updateDnsRecord).toBe('function');
    });

    it('should have deleteDnsRecord method', () => {
      expect(typeof client.cdn.deleteDnsRecord).toBe('function');
    });

    it('should have fetchRecords method', () => {
      expect(typeof client.cdn.fetchRecords).toBe('function');
    });

    it('should have exportDnsRecords method', () => {
      expect(typeof client.cdn.exportDnsRecords).toBe('function');
    });

    it('should have importDnsRecords method', () => {
      expect(typeof client.cdn.importDnsRecords).toBe('function');
    });

    it('should have getProxiableRecords method', () => {
      expect(typeof client.cdn.getProxiableRecords).toBe('function');
    });

    it('should have setCustomNameservers method', () => {
      expect(typeof client.cdn.setCustomNameservers).toBe('function');
    });

    it('should have setDnssec method', () => {
      expect(typeof client.cdn.setDnssec).toBe('function');
    });
  });

  // ==================== SSL/HTTPS Methods ====================
  describe('SSL/HTTPS Methods', () => {
    it('should have listSsl method', () => {
      expect(typeof client.cdn.listSsl).toBe('function');
    });

    it('should have getSslInfo method', () => {
      expect(typeof client.cdn.getSslInfo).toBe('function');
    });

    it('should have getSslConfigs method', () => {
      expect(typeof client.cdn.getSslConfigs).toBe('function');
    });

    it('should have addCustomSsl method', () => {
      expect(typeof client.cdn.addCustomSsl).toBe('function');
    });

    it('should have requestFreeSsl method', () => {
      expect(typeof client.cdn.requestFreeSsl).toBe('function');
    });

    it('should have removeSsl method', () => {
      expect(typeof client.cdn.removeSsl).toBe('function');
    });

    it('should have attachSsl method', () => {
      expect(typeof client.cdn.attachSsl).toBe('function');
    });

    it('should have detachSsl method', () => {
      expect(typeof client.cdn.detachSsl).toBe('function');
    });

    it('should have attachDefaultSsl method', () => {
      expect(typeof client.cdn.attachDefaultSsl).toBe('function');
    });

    it('should have detachDefaultSsl method', () => {
      expect(typeof client.cdn.detachDefaultSsl).toBe('function');
    });

    it('should have setTlsVersion method', () => {
      expect(typeof client.cdn.setTlsVersion).toBe('function');
    });

    it('should have setHsts method', () => {
      expect(typeof client.cdn.setHsts).toBe('function');
    });

    it('should have setHttpsRedirect method', () => {
      expect(typeof client.cdn.setHttpsRedirect).toBe('function');
    });

    it('should have setCspOverride method', () => {
      expect(typeof client.cdn.setCspOverride).toBe('function');
    });

    it('should have setBackendProtocol method', () => {
      expect(typeof client.cdn.setBackendProtocol).toBe('function');
    });

    it('should have setHttp3 method', () => {
      expect(typeof client.cdn.setHttp3).toBe('function');
    });
  });

  // ==================== Cache Methods ====================
  describe('Cache Methods', () => {
    it('should have getCacheSettings method', () => {
      expect(typeof client.cdn.getCacheSettings).toBe('function');
    });

    it('should have setCacheMode method', () => {
      expect(typeof client.cdn.setCacheMode).toBe('function');
    });

    it('should have setCacheTtl method', () => {
      expect(typeof client.cdn.setCacheTtl).toBe('function');
    });

    it('should have setDeveloperMode method', () => {
      expect(typeof client.cdn.setDeveloperMode).toBe('function');
    });

    it('should have setAlwaysOnline method', () => {
      expect(typeof client.cdn.setAlwaysOnline).toBe('function');
    });

    it('should have setCacheCookies method', () => {
      expect(typeof client.cdn.setCacheCookies).toBe('function');
    });

    it('should have setBrowserCacheMode method', () => {
      expect(typeof client.cdn.setBrowserCacheMode).toBe('function');
    });

    it('should have setBrowserCacheTtl method', () => {
      expect(typeof client.cdn.setBrowserCacheTtl).toBe('function');
    });

    it('should have setErrorCacheTtl method', () => {
      expect(typeof client.cdn.setErrorCacheTtl).toBe('function');
    });

    it('should have purgeCache method', () => {
      expect(typeof client.cdn.purgeCache).toBe('function');
    });
  });

  // ==================== Acceleration Methods ====================
  describe('Acceleration Methods', () => {
    it('should have setMinify method', () => {
      expect(typeof client.cdn.setMinify).toBe('function');
    });

    it('should have setImageOptimization method', () => {
      expect(typeof client.cdn.setImageOptimization).toBe('function');
    });

    it('should have setImageResize method', () => {
      expect(typeof client.cdn.setImageResize).toBe('function');
    });
  });

  // ==================== DDoS Methods ====================
  describe('DDoS Methods', () => {
    it('should have getDdosSettings method', () => {
      expect(typeof client.cdn.getDdosSettings).toBe('function');
    });

    it('should have setDdosSettings method', () => {
      expect(typeof client.cdn.setDdosSettings).toBe('function');
    });

    it('should have setCaptchaModule method', () => {
      expect(typeof client.cdn.setCaptchaModule).toBe('function');
    });

    it('should have setCaptchaTtl method', () => {
      expect(typeof client.cdn.setCaptchaTtl).toBe('function');
    });

    it('should have setCookieChallengeTtl method', () => {
      expect(typeof client.cdn.setCookieChallengeTtl).toBe('function');
    });

    it('should have setJsChallengeTtl method', () => {
      expect(typeof client.cdn.setJsChallengeTtl).toBe('function');
    });
  });

  // ==================== Firewall Methods ====================
  describe('Firewall Methods', () => {
    it('should have getFirewallConfigs method', () => {
      expect(typeof client.cdn.getFirewallConfigs).toBe('function');
    });

    it('should have setFirewallConfigs method', () => {
      expect(typeof client.cdn.setFirewallConfigs).toBe('function');
    });
  });

  // ==================== WAF Methods ====================
  describe('WAF Methods', () => {
    it('should have getWafSettings method', () => {
      expect(typeof client.cdn.getWafSettings).toBe('function');
    });

    it('should have setWafSettings method', () => {
      expect(typeof client.cdn.setWafSettings).toBe('function');
    });

    it('should have getWafLayers method', () => {
      expect(typeof client.cdn.getWafLayers).toBe('function');
    });

    it('should have getWafRules method', () => {
      expect(typeof client.cdn.getWafRules).toBe('function');
    });

    it('should have getDisabledWafRules method', () => {
      expect(typeof client.cdn.getDisabledWafRules).toBe('function');
    });

    it('should have switchWafGroup method', () => {
      expect(typeof client.cdn.switchWafGroup).toBe('function');
    });

    it('should have switchWafRule method', () => {
      expect(typeof client.cdn.switchWafRule).toBe('function');
    });
  });

  // ==================== Page Rules Methods ====================
  describe('Page Rules Methods', () => {
    it('should have getPageRules method', () => {
      expect(typeof client.cdn.getPageRules).toBe('function');
    });

    it('should have getPageRulesWaf method', () => {
      expect(typeof client.cdn.getPageRulesWaf).toBe('function');
    });

    it('should have getPageRulesRatelimit method', () => {
      expect(typeof client.cdn.getPageRulesRatelimit).toBe('function');
    });

    it('should have getPageRulesDdos method', () => {
      expect(typeof client.cdn.getPageRulesDdos).toBe('function');
    });

    it('should have getPageRulesFirewall method', () => {
      expect(typeof client.cdn.getPageRulesFirewall).toBe('function');
    });

    it('should have createPageRulePath method', () => {
      expect(typeof client.cdn.createPageRulePath).toBe('function');
    });

    it('should have setPageRulePriority method', () => {
      expect(typeof client.cdn.setPageRulePriority).toBe('function');
    });

    it('should have deletePageRulePath method', () => {
      expect(typeof client.cdn.deletePageRulePath).toBe('function');
    });

    it('should have createRule method', () => {
      expect(typeof client.cdn.createRule).toBe('function');
    });

    it('should have deleteRule method', () => {
      expect(typeof client.cdn.deleteRule).toBe('function');
    });

    it('should have setDirectRule method', () => {
      expect(typeof client.cdn.setDirectRule).toBe('function');
    });
  });

  // ==================== Cluster Methods ====================
  describe('Cluster Methods', () => {
    it('should have getClusters method', () => {
      expect(typeof client.cdn.getClusters).toBe('function');
    });

    it('should have getClusterAssignments method', () => {
      expect(typeof client.cdn.getClusterAssignments).toBe('function');
    });

    it('should have addCluster method', () => {
      expect(typeof client.cdn.addCluster).toBe('function');
    });

    it('should have updateCluster method', () => {
      expect(typeof client.cdn.updateCluster).toBe('function');
    });

    it('should have deleteCluster method', () => {
      expect(typeof client.cdn.deleteCluster).toBe('function');
    });

    it('should have addServerToCluster method', () => {
      expect(typeof client.cdn.addServerToCluster).toBe('function');
    });

    it('should have removeServerFromCluster method', () => {
      expect(typeof client.cdn.removeServerFromCluster).toBe('function');
    });
  });

  // ==================== Log Forwarder Methods ====================
  describe('Log Forwarder Methods', () => {
    it('should have getLogForwarders method', () => {
      expect(typeof client.cdn.getLogForwarders).toBe('function');
    });

    it('should have addLogForwarder method', () => {
      expect(typeof client.cdn.addLogForwarder).toBe('function');
    });

    it('should have updateLogForwarder method', () => {
      expect(typeof client.cdn.updateLogForwarder).toBe('function');
    });

    it('should have deleteLogForwarder method', () => {
      expect(typeof client.cdn.deleteLogForwarder).toBe('function');
    });
  });

  // ==================== Custom Pages Methods ====================
  describe('Custom Pages Methods', () => {
    it('should have getCustomPages method', () => {
      expect(typeof client.cdn.getCustomPages).toBe('function');
    });

    it('should have setCustomPages method', () => {
      expect(typeof client.cdn.setCustomPages).toBe('function');
    });

    it('should have deleteCustomPages method', () => {
      expect(typeof client.cdn.deleteCustomPages).toBe('function');
    });
  });

  // ==================== Plan Methods ====================
  describe('Plan Methods', () => {
    it('should have getPlans method', () => {
      expect(typeof client.cdn.getPlans).toBe('function');
    });

    it('should have changePlan method', () => {
      expect(typeof client.cdn.changePlan).toBe('function');
    });
  });
});
