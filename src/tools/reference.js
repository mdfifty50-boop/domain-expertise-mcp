/**
 * Reference Tools — Terminology and Regulatory Context
 */

const terminologyDb = {
  accounting: {
    'IFRS': { en: 'International Financial Reporting Standards — global accounting standards issued by IASB', ar: 'المعايير الدولية للتقارير المالية' },
    'GAAP': { en: 'Generally Accepted Accounting Principles — US accounting standards issued by FASB', ar: 'المبادئ المحاسبية المقبولة عموماً' },
    'NOI': { en: 'Net Operating Income — total revenue minus operating expenses (excludes debt service, taxes, depreciation)', ar: 'صافي الدخل التشغيلي' },
    'EBITDA': { en: 'Earnings Before Interest, Taxes, Depreciation, and Amortization — proxy for operating cash flow', ar: 'الأرباح قبل الفوائد والضرائب والإهلاك والاستهلاك' },
    'Accrual': { en: 'Recognizing revenue/expenses when earned/incurred, not when cash changes hands', ar: 'الاستحقاق' },
    'Depreciation': { en: 'Systematic allocation of an asset\'s cost over its useful life', ar: 'الإهلاك' },
    'Amortization': { en: 'Systematic allocation of an intangible asset\'s cost over its useful life', ar: 'الاستهلاك' },
    'Goodwill': { en: 'Excess of purchase price over fair value of net identifiable assets in a business combination', ar: 'الشهرة' },
    'Working Capital': { en: 'Current assets minus current liabilities — measures short-term liquidity', ar: 'رأس المال العامل' },
    'Deferred Tax': { en: 'Tax effect of temporary differences between accounting and tax bases of assets/liabilities', ar: 'الضريبة المؤجلة' },
    'Provision': { en: 'A liability of uncertain timing or amount (IAS 37). Must meet: present obligation, probable outflow, reliable estimate.', ar: 'المخصص' },
    'Impairment': { en: 'Reduction in recoverable amount below carrying amount (IAS 36). Test when indicators exist.', ar: 'انخفاض القيمة' },
    'Fair Value': { en: 'Price that would be received to sell an asset or paid to transfer a liability in an orderly transaction (IFRS 13)', ar: 'القيمة العادلة' },
    'Consolidation': { en: 'Combining financial statements of parent and subsidiaries as if they were a single entity', ar: 'التوحيد' },
    'Transfer Pricing': { en: 'Pricing of transactions between related entities. Must follow arm\'s length principle.', ar: 'تسعير التحويلات' },
  },
  islamic_finance: {
    'Murabaha': { en: 'Cost-plus financing. Bank buys asset, sells to customer at agreed markup. Most common Islamic finance structure (~80%).', ar: 'المرابحة' },
    'Ijara': { en: 'Islamic lease. Lessor retains ownership, lessee pays rent. Can include purchase option (Ijara wa Iqtina).', ar: 'الإجارة' },
    'Musharaka': { en: 'Partnership where all parties contribute capital and share profit/loss. Diminishing Musharaka used for home finance.', ar: 'المشاركة' },
    'Mudaraba': { en: 'Profit-sharing: one party provides capital (rabb al-mal), other provides expertise (mudarib). Loss borne by capital provider only.', ar: 'المضاربة' },
    'Sukuk': { en: 'Islamic certificates — NOT bonds. Must be asset-backed. Certificate holders own a share of the underlying asset.', ar: 'الصكوك' },
    'Takaful': { en: 'Islamic insurance — cooperative risk-sharing. Policyholders contribute to a fund. Surplus distributed back.', ar: 'التكافل' },
    'Riba': { en: 'Interest/usury — strictly prohibited. Any guaranteed return on money lent without real economic activity.', ar: 'الربا' },
    'Gharar': { en: 'Excessive uncertainty in contracts — prohibited. All terms must be clear and risks disclosed.', ar: 'الغرر' },
    'Maysir': { en: 'Gambling/speculation — prohibited. Pure speculation without underlying asset or economic activity.', ar: 'الميسر' },
    'Halal': { en: 'Permissible under Islamic law.', ar: 'حلال' },
    'Haram': { en: 'Prohibited under Islamic law.', ar: 'حرام' },
    'Istisna': { en: 'Manufacturing/construction contract. Buyer orders item to be made/built. Payment can be in installments.', ar: 'الاستصناع' },
    'Salam': { en: 'Forward sale. Full payment upfront, delivery in the future. Used for commodities.', ar: 'السلم' },
    'Wakala': { en: 'Agency contract. Principal appoints agent to act on their behalf for a fee.', ar: 'الوكالة' },
    'AAOIFI': { en: 'Accounting and Auditing Organization for Islamic Financial Institutions — sets Sharia standards.', ar: 'هيئة المحاسبة والمراجعة للمؤسسات المالية الإسلامية' },
  },
  cybersecurity: {
    'CIA Triad': { en: 'Confidentiality, Integrity, Availability — the three pillars of information security', ar: 'ثالوث السرية والنزاهة والتوافر' },
    'Zero Trust': { en: 'Security model: never trust, always verify. No implicit trust based on network location.', ar: 'انعدام الثقة' },
    'SOC': { en: 'Security Operations Center — team/facility that monitors, detects, and responds to security incidents 24/7', ar: 'مركز عمليات الأمن' },
    'SIEM': { en: 'Security Information and Event Management — platform that aggregates and analyzes security logs', ar: 'إدارة معلومات وأحداث الأمان' },
    'XDR': { en: 'Extended Detection and Response — cross-layer threat detection (endpoint + network + cloud + email)', ar: 'الكشف والاستجابة الموسعة' },
    'Penetration Test': { en: 'Authorized simulated attack to identify vulnerabilities. Types: black-box, white-box, gray-box.', ar: 'اختبار الاختراق' },
    'CVE': { en: 'Common Vulnerabilities and Exposures — standardized ID for known security vulnerabilities', ar: 'الثغرات والتعرضات الشائعة' },
    'Ransomware': { en: 'Malware that encrypts victim\'s data and demands payment for decryption key', ar: 'برامج الفدية' },
    'APT': { en: 'Advanced Persistent Threat — sophisticated, long-term targeted attack, often state-sponsored', ar: 'التهديد المتقدم المستمر' },
    'MFA': { en: 'Multi-Factor Authentication — requires 2+ verification factors (something you know + have + are)', ar: 'المصادقة متعددة العوامل' },
  },
};

const regulatoryDb = {
  accounting: {
    SA: {
      authority: 'SOCPA (Saudi Organization for Chartered and Professional Accountants)',
      standards: 'IFRS as endorsed by SOCPA',
      key_laws: ['Companies Law', 'ZATCA Tax Regulations', 'Capital Market Authority Regulations'],
      recent_changes: ['ZATCA Wave 24 (June 2026) — lowest threshold yet for e-invoicing', 'Transfer pricing documentation requirements strengthened 2025'],
    },
    AE: {
      authority: 'IAASB standards applied. No local accounting standard setter.',
      standards: 'IFRS (mandatory for listed companies)',
      key_laws: ['Corporate Tax Law (2022)', 'VAT Law (2017)', 'Free Zone specific regulations'],
      recent_changes: ['Corporate Tax effective June 2023 — 9% rate', 'E-invoicing pilot July 2026 (Peppol-based)', 'Small Business Relief expires Dec 2026'],
    },
    KW: {
      authority: 'Kuwait Association of Accountants and Auditors',
      standards: 'IFRS (mandatory for listed companies)',
      key_laws: ['Companies Law', 'KFAS Law', 'NLST Law'],
      recent_changes: ['VAT legislation still pending (expected 2027)', 'Central Bank of Kuwait enhanced governance requirements 2025'],
    },
  },
  islamic_finance: {
    SA: {
      authority: 'SAMA (Saudi Central Bank) + individual bank Sharia Boards',
      standards: 'AAOIFI Sharia Standards (adopted)',
      key_laws: ['Banking Control Law', 'Capital Market Law', 'Anti-Money Laundering Law'],
      recent_changes: ['AAOIFI Standard 62 (2024) — tighter asset-backing for Sukuk', 'Vision 2030 Islamic finance growth targets'],
    },
    BH: {
      authority: 'Central Bank of Bahrain (CBB)',
      standards: 'AAOIFI (headquartered in Bahrain)',
      key_laws: ['CBB Rulebook Volume 2 (Islamic Banks)', 'Financial Institutions Law'],
      recent_changes: ['Digital Sukuk regulations 2025', 'CBB sandbox for Islamic fintech'],
    },
  },
  cybersecurity: {
    SA: {
      authority: 'NCA (National Cybersecurity Authority)',
      standards: 'NCA ECC (Essential Cybersecurity Controls), NCA CCC (Critical Cybersecurity Controls)',
      key_laws: ['Anti-Cyber Crime Law', 'Personal Data Protection Law (PDPL)', 'NCA Regulations'],
      recent_changes: ['PDPL full enforcement September 2026', 'NCA Tier 2 MSOC requirements for critical sectors'],
    },
    AE: {
      authority: 'UAE Cybersecurity Council + TDRA',
      standards: 'NESA (National Electronic Security Authority) controls',
      key_laws: ['Cybercrime Law (Federal Law No. 34/2021)', 'Data Protection Law (Federal Decree-Law No. 45/2021)'],
      recent_changes: ['DIFC Data Protection Law aligned with GDPR', 'ADGM data protection framework'],
    },
  },
};

/**
 * Get terminology for a domain
 */
export async function getTerminology({ domain, terms, language }) {
  const domainTerms = terminologyDb[domain];
  if (!domainTerms) {
    return {
      content: [{
        type: 'text',
        text: JSON.stringify({
          domain,
          note: `Terminology database for ${domain} is being built. Available: ${Object.keys(terminologyDb).join(', ')}`,
        }, null, 2),
      }],
    };
  }

  let result;
  if (terms && terms.length > 0) {
    result = {};
    for (const term of terms) {
      const found = domainTerms[term] || domainTerms[term.toUpperCase()] || domainTerms[term.toLowerCase()];
      if (found) {
        result[term] = language === 'both' ? found : { definition: found[language] || found.en };
      } else {
        result[term] = { definition: 'Not found in database. Try a different spelling or use get_domain_expertise for broader knowledge.' };
      }
    }
  } else {
    // Return top 20 essential terms
    const entries = Object.entries(domainTerms).slice(0, 20);
    result = {};
    for (const [term, def] of entries) {
      result[term] = language === 'both' ? def : { definition: def[language] || def.en };
    }
  }

  return {
    content: [{
      type: 'text',
      text: JSON.stringify({
        domain,
        language,
        term_count: Object.keys(result).length,
        terms: result,
      }, null, 2),
    }],
  };
}

/**
 * Get regulatory context
 */
export async function getRegulatory({ domain, jurisdiction, topic }) {
  const domainReg = regulatoryDb[domain];
  if (!domainReg) {
    return {
      content: [{
        type: 'text',
        text: JSON.stringify({
          domain,
          jurisdiction,
          note: `Regulatory database for ${domain} is being built. Available: ${Object.keys(regulatoryDb).join(', ')}`,
        }, null, 2),
      }],
    };
  }

  const jurisdictionReg = domainReg[jurisdiction.toUpperCase()];
  if (!jurisdictionReg) {
    return {
      content: [{
        type: 'text',
        text: JSON.stringify({
          domain,
          jurisdiction,
          available_jurisdictions: Object.keys(domainReg),
          note: `No regulatory data for ${jurisdiction} in ${domain}. Available jurisdictions listed above.`,
        }, null, 2),
      }],
    };
  }

  return {
    content: [{
      type: 'text',
      text: JSON.stringify({
        domain,
        jurisdiction: jurisdiction.toUpperCase(),
        topic: topic || 'general',
        ...jurisdictionReg,
      }, null, 2),
    }],
  };
}
