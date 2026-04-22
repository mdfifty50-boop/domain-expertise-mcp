/**
 * Domain Expertise Engine
 * Provides structured professional knowledge frameworks for AI agents.
 */

const domains = {
  accounting: {
    name: 'Accounting',
    category: 'finance',
    description: 'Financial accounting, reporting, bookkeeping, and standards compliance',
    expertise: {
      overview: {
        principles: [
          'Double-entry bookkeeping: every transaction affects at least two accounts',
          'Accrual basis: recognize revenue when earned, expenses when incurred',
          'Matching principle: match expenses to the revenue they help generate',
          'Conservatism: when uncertain, choose the option that understates assets/income',
          'Going concern: assume the business will continue operating indefinitely',
        ],
        key_standards: ['IFRS (international)', 'GAAP (US)', 'SOCPA (Saudi)', 'AAOIFI (Islamic)'],
        common_mistakes: [
          'Confusing cash basis with accrual basis',
          'Misclassifying capital expenditure as operating expense',
          'Not reconciling bank statements monthly',
          'Ignoring the materiality threshold',
        ],
      },
      practitioner: {
        decision_frameworks: [
          {
            name: 'Revenue Recognition (IFRS 15)',
            steps: [
              '1. Identify the contract with the customer',
              '2. Identify separate performance obligations',
              '3. Determine the transaction price',
              '4. Allocate the price to each obligation',
              '5. Recognize revenue as each obligation is satisfied',
            ],
            pitfall: 'Step 2 is where most errors occur — bundled services often have hidden performance obligations',
          },
          {
            name: 'Lease Classification (IFRS 16)',
            steps: [
              '1. Is there an identified asset?',
              '2. Does the lessee control the use of the asset?',
              '3. Calculate right-of-use asset and lease liability',
              '4. Determine discount rate (incremental borrowing rate if implicit rate unknown)',
              '5. Recognize depreciation + interest separately',
            ],
            pitfall: 'Short-term leases (<12 months) and low-value assets can be expensed directly — check before capitalizing everything',
          },
        ],
        gcc_specifics: {
          saudi: 'SOCPA standards align with IFRS but with local interpretations. Zakat calculation differs from income tax — separate computation required.',
          uae: 'IFRS mandatory for listed companies. Corporate Tax (9%) requires separate tax accounting from financial accounting.',
          kuwait: 'KFAS (1% of profit), NLST (2.5%), and Zakat (1%) are separate levies — each has its own calculation base.',
        },
        expert_tips: [
          'Always ask: "What standard governs this transaction?" before recording anything',
          'The most common audit finding is revenue recognition timing — document the basis',
          'Intercompany transactions are the #1 source of consolidation errors',
          'Deferred tax is conceptually simple but practically complex — draw the timing differences',
        ],
      },
      expert: {
        reasoning_patterns: [
          {
            pattern: 'Substance Over Form',
            description: 'The economic substance of a transaction should prevail over its legal form. A "lease" that transfers substantially all risks and rewards is actually a purchase.',
            application: 'When a client structures a transaction to achieve favorable accounting treatment, ask: "What would change if the legal structure were different but the economics were the same?" If nothing changes, the accounting should be the same regardless of legal form.',
          },
          {
            pattern: 'Materiality Judgment',
            description: 'An item is material if omitting or misstating it could influence economic decisions. Materiality is both quantitative (% of revenue/assets) and qualitative (nature of the item).',
            application: 'Common quantitative thresholds: 5% of pre-tax income from continuing operations, 0.5% of total assets, 1% of total revenue. But a SAR 100 related-party transaction can be material even if quantitatively immaterial.',
          },
        ],
        edge_cases: [
          'Crypto assets: no IFRS standard yet — IAS 38 (intangible) or IAS 2 (inventory) depending on business model',
          'SaaS revenue: is it a license (point-in-time) or a service (over-time)? IFRS 15 B54-B63 governs',
          'Government grants: IAS 20 — recognize when reasonable assurance of compliance AND receipt',
          'Hyperinflation accounting: IAS 29 applies when cumulative 3-year inflation exceeds 100%',
        ],
      },
    },
  },

  islamic_finance: {
    name: 'Islamic Finance',
    category: 'finance',
    description: 'Sharia-compliant financial products, sukuk, takaful, and Islamic banking',
    expertise: {
      overview: {
        principles: [
          'Prohibition of Riba (interest/usury) — money cannot generate money without real economic activity',
          'Prohibition of Gharar (excessive uncertainty) — contract terms must be clear and risks disclosed',
          'Prohibition of Maysir (gambling/speculation) — no pure speculation without underlying asset',
          'Asset-backing requirement — financial transactions must be linked to real assets or services',
          'Profit-and-loss sharing — risk must be shared between parties, not transferred entirely',
          'Ethical screening — no investment in haram activities (alcohol, pork, weapons, conventional finance)',
        ],
        key_structures: [
          'Murabaha — cost-plus sale (most common, ~80% of Islamic banking)',
          'Ijara — Islamic lease (equivalent to operating/finance lease)',
          'Musharaka — equity partnership (joint venture)',
          'Mudaraba — profit-sharing (silent partnership)',
          'Sukuk — Islamic bonds (asset-backed certificates)',
          'Takaful — Islamic insurance (cooperative risk-sharing)',
          'Istisna — manufacturing contract (for construction/custom goods)',
          'Salam — forward sale (advance payment for future delivery)',
        ],
        common_mistakes: [
          'Treating Murabaha as a conventional loan with Islamic labeling',
          'Ignoring the requirement for actual asset transfer in sale-based structures',
          'Applying conventional insurance logic to Takaful',
          'Assuming all "Islamic" products are automatically Sharia-compliant',
        ],
      },
      practitioner: {
        decision_frameworks: [
          {
            name: 'Sharia Compliance Check',
            steps: [
              '1. Is riba involved? (any guaranteed return on money lent = riba)',
              '2. Is there excessive gharar? (unclear terms, undefined delivery, ambiguous pricing)',
              '3. Is the underlying activity halal? (screen against exclusion list)',
              '4. Is risk genuinely shared? (one party bearing all risk = impermissible)',
              '5. Is there a real asset or service? (pure financial derivatives often fail this)',
              '6. Has the Sharia Board approved the specific structure?',
            ],
            pitfall: 'Step 4 is where most "Islamic in name only" products fail. If the bank bears zero risk, it\'s conventional lending with Islamic branding.',
          },
          {
            name: 'Sukuk Structure Selection',
            steps: [
              '1. What is the underlying asset? (real estate → Ijara Sukuk, business → Musharaka Sukuk)',
              '2. Who bears the risk? (if issuer guarantees return → not true Sukuk)',
              '3. What jurisdiction? (AAOIFI vs local Sharia board standards differ)',
              '4. Secondary market: is trading at par? (Salam/Istisna Sukuk cannot trade at par)',
              '5. Rating: does the Sukuk need credit rating? (most do for institutional investors)',
            ],
            pitfall: 'AAOIFI Standard 62 (2024) tightened asset-backing requirements. Many pre-2024 Sukuk structures may not comply with new standards.',
          },
        ],
        gcc_specifics: {
          saudi: 'SAMA regulates Islamic banks. AAOIFI standards adopted. Largest Islamic finance market globally (~$600B+ assets).',
          uae: 'CBUAE regulates. Mix of AAOIFI and custom Sharia board standards. Dubai Islamic Bank = largest Islamic bank globally.',
          kuwait: 'KFH and Boubyan Bank dominate. Central Bank of Kuwait has specific Islamic banking regulations. Kuwait Finance House pioneered many modern Islamic finance structures.',
          bahrain: 'AAOIFI headquartered here. Central Bank of Bahrain has the most developed Islamic finance regulatory framework in the world.',
          malaysia: 'Different school of thought (Shafii) vs GCC (Hanbali). More lenient on some structures. Securities Commission Malaysia has its own Sharia screening methodology.',
        },
      },
      expert: {
        reasoning_patterns: [
          {
            pattern: 'Form vs Substance in Islamic Finance',
            description: 'A Murabaha that operates identically to a conventional loan (same cash flows, same risk allocation, mark-up calculated as LIBOR+spread) may be technically compliant but substantively equivalent to riba. The Sharia Board debate centers on: does the form matter if the economic substance is identical?',
            application: 'When assessing Islamic products, apply both the legal/contractual test (does the contract comply?) AND the economic substance test (does the transaction achieve a different economic outcome than its conventional equivalent?). Products that pass only the first test are increasingly challenged by scholars.',
          },
        ],
        edge_cases: [
          'Cryptocurrency: no scholarly consensus. Some argue it fails the "mal" (property) test. Others accept it under the general permissibility principle. No AAOIFI standard yet.',
          'Derivatives: conventional options/futures are generally impermissible. Wa\'ad (promise-based) structures are used as alternatives but controversial.',
          'ESG + Islamic Finance: significant overlap but not identical. Islamic finance prohibits alcohol/pork; ESG focuses on climate/governance. An ESG-compliant investment may not be Sharia-compliant and vice versa.',
        ],
      },
    },
  },

  cybersecurity: {
    name: 'Cybersecurity',
    category: 'technology',
    description: 'Information security, threat management, compliance, and incident response',
    expertise: {
      overview: {
        principles: [
          'CIA Triad: Confidentiality, Integrity, Availability — every security control serves one or more',
          'Defense in depth: multiple layers of security, not a single perimeter',
          'Least privilege: users and systems get minimum access needed',
          'Zero trust: verify explicitly, assume breach, never trust by default',
          'Security is a process, not a product — continuous monitoring, not one-time setup',
        ],
        key_frameworks: ['NIST CSF 2.0', 'ISO 27001/27002', 'CIS Controls v8', 'MITRE ATT&CK', 'NCA ECC (Saudi)', 'NESA (UAE)'],
        common_mistakes: [
          'Treating compliance as security (passing an audit ≠ being secure)',
          'Ignoring the human factor (90%+ of breaches involve social engineering)',
          'Over-investing in prevention, under-investing in detection and response',
          'Not testing backups (a backup that can\'t be restored is not a backup)',
        ],
      },
      practitioner: {
        decision_frameworks: [
          {
            name: 'Incident Response Decision Flow',
            steps: [
              '1. DETECT: Is this a true positive? (eliminate false positives first)',
              '2. TRIAGE: What is the scope? (single host vs network-wide)',
              '3. CONTAIN: Isolate affected systems (network segmentation, account lockout)',
              '4. ERADICATE: Remove the threat (malware, compromised credentials)',
              '5. RECOVER: Restore from known-good state (validated backups)',
              '6. LESSONS: What failed and how to prevent recurrence',
            ],
            pitfall: 'Step 3 — most teams jump to eradication without proper containment. The attacker may have multiple access vectors. Contain first, then investigate the full scope.',
          },
        ],
        gcc_specifics: {
          saudi: 'NCA Essential Cybersecurity Controls (ECC) mandatory for government and critical infrastructure. PDPL (Personal Data Protection Law) effective September 2024 with SDAIA as regulator.',
          uae: 'NESA (National Electronic Security Authority) for federal government. DIFC/ADGM have separate data protection regimes. UAE Cybersecurity Council coordinates national strategy.',
          kuwait: 'CITRA (Communication and Information Technology Regulatory Authority) oversees cybersecurity policy. Central Bank of Kuwait has specific banking cybersecurity requirements.',
        },
      },
      expert: {
        reasoning_patterns: [
          {
            pattern: 'Threat Modeling (STRIDE)',
            description: 'Systematically identify threats by category: Spoofing, Tampering, Repudiation, Information Disclosure, Denial of Service, Elevation of Privilege. Apply to each component of a system architecture.',
            application: 'For each system boundary crossing (API endpoints, database connections, user inputs), ask: "What could an attacker do here in each STRIDE category?" Then prioritize by likelihood × impact.',
          },
        ],
        edge_cases: [
          'AI/ML model attacks: adversarial inputs, model poisoning, prompt injection — traditional security tools don\'t detect these',
          'Supply chain attacks (SolarWinds-class): how do you verify the integrity of every dependency?',
          'Quantum computing threat: RSA/ECC will break. NIST PQC standards published 2024. Migration window is NOW.',
          'OT/ICS security: different rules — availability > confidentiality. Patching can break physical processes.',
        ],
      },
    },
  },

  real_estate_commercial: {
    name: 'Commercial Real Estate',
    category: 'real_estate',
    description: 'Commercial property valuation, leasing, development, and investment analysis',
    expertise: {
      overview: {
        principles: [
          'Location, location, location — but also: tenant quality, lease structure, and cap rate',
          'Cap rate = NOI / Property Value — the fundamental metric',
          'Cash-on-cash return matters more than appreciation for income investors',
          'Due diligence is everything — what you don\'t know will cost you',
          'Leverage amplifies both gains AND losses',
        ],
        key_metrics: ['Cap Rate', 'NOI', 'Cash-on-Cash Return', 'DSCR', 'IRR', 'GRM', 'Occupancy Rate', 'Price per sqft/sqm'],
        common_mistakes: [
          'Using asking rent instead of effective rent in valuation',
          'Ignoring tenant improvement costs in NOI calculation',
          'Not stress-testing vacancy assumptions',
          'Confusing gross and net leasable area',
        ],
      },
      practitioner: {
        decision_frameworks: [
          {
            name: 'Property Valuation Approaches',
            steps: [
              '1. Income Approach: Capitalize NOI at market cap rate (best for income properties)',
              '2. Sales Comparison: Adjust comparable sales for differences (best for land/condos)',
              '3. Cost Approach: Land value + replacement cost - depreciation (best for special-purpose)',
              '4. Reconcile all three approaches, weight by reliability',
              '5. Apply market conditions adjustment (seller\'s market vs buyer\'s market)',
            ],
            pitfall: 'In GCC markets, cap rates for prime assets (Grade A offices in DIFC, KAFD) can be 6-7%, while secondary markets are 9-12%. Using wrong comp set distorts valuation by 30-40%.',
          },
        ],
        gcc_specifics: {
          saudi: 'REGA (Real Estate General Authority) regulates. Ejar for rental contracts. Vision 2030 driving massive construction (NEOM, Red Sea, Qiddiya). Foreign ownership allowed in designated areas.',
          uae: 'Freehold areas for foreign ownership (Dubai Marina, Downtown, etc.). RERA (Real Estate Regulatory Agency) in Dubai. Abu Dhabi Global Market has separate rules. Off-plan sales regulated.',
          kuwait: 'Foreign ownership restricted. Chalets and commercial properties in specific zones. Property prices in KWD. Market cyclical with oil prices.',
        },
      },
    },
  },

  hr_management: {
    name: 'HR Management',
    category: 'people',
    description: 'Human resource management, talent acquisition, employment law, and organizational development',
    expertise: {
      overview: {
        principles: [
          'Hire slowly, fire quickly — but legally and ethically',
          'Document everything — the paper trail is your protection',
          'Compliance first, culture second — you can\'t build culture on legal violations',
          'Total compensation > base salary — benefits, growth, environment matter',
          'Performance management is continuous, not annual',
        ],
        key_areas: ['Recruitment', 'Onboarding', 'Compensation & Benefits', 'Performance Management', 'Learning & Development', 'Employee Relations', 'Compliance', 'Offboarding'],
        common_mistakes: [
          'Not having written employment contracts (especially in GCC — mandatory in most jurisdictions)',
          'Inconsistent application of policies across employees',
          'Ignoring nationalization quotas until audit time',
          'Treating probation period as risk-free termination period (not always true)',
        ],
      },
      practitioner: {
        gcc_specifics: {
          saudi: 'Nitaqat (Saudization): color bands based on % Saudi employees. Green minimum for most sectors. GOSI contributions: employer 12% + employee 10% on basic salary. WPS (Wage Protection System) via Mudad. End-of-service gratuity: 0.5 months for first 5 years, 1 month per year after.',
          uae: 'Emiratisation: 2% annual increase for 50+ employee companies. Penalty AED 72,000/missing Emirati. MOHRE labor cards required. WPS mandatory. End-of-service: 21 days per year (first 5), 30 days per year (after 5). Limited contract (max 3 years, renewable).',
          kuwait: 'Kuwaitization: sector-specific quotas (banking 70%, insurance 60%, etc.). PIFSS social security. Indemnity: 15 days per year (first 5), 1 month per year (after). PAM work permits for expats.',
        },
      },
    },
  },
};

// Minimal entries for remaining domains
const domainStubs = {
  tax: { name: 'Taxation', category: 'finance', description: 'Corporate tax, VAT, transfer pricing, and international tax planning' },
  audit: { name: 'Audit', category: 'finance', description: 'Financial audit, internal audit, compliance audit, and forensic audit' },
  corporate_law: { name: 'Corporate Law', category: 'legal', description: 'Company formation, governance, M&A, and corporate transactions' },
  contract_law: { name: 'Contract Law', category: 'legal', description: 'Contract drafting, review, negotiation, and dispute resolution' },
  employment_law: { name: 'Employment Law', category: 'legal', description: 'Labor law, employment contracts, termination, and workplace compliance' },
  conventional_banking: { name: 'Conventional Banking', category: 'finance', description: 'Commercial banking, lending, treasury, and regulatory compliance' },
  investment: { name: 'Investment', category: 'finance', description: 'Portfolio management, asset allocation, due diligence, and valuation' },
  real_estate_residential: { name: 'Residential Real Estate', category: 'real_estate', description: 'Residential property sales, leasing, valuation, and management' },
  healthcare_clinical: { name: 'Clinical Healthcare', category: 'healthcare', description: 'Clinical decision-making, patient care protocols, and medical records' },
  healthcare_admin: { name: 'Healthcare Administration', category: 'healthcare', description: 'Hospital management, health insurance, billing, and regulatory compliance' },
  pharmaceutical: { name: 'Pharmaceutical', category: 'healthcare', description: 'Drug development, regulatory affairs, pharmacovigilance, and manufacturing' },
  insurance_underwriting: { name: 'Insurance Underwriting', category: 'finance', description: 'Risk assessment, pricing, policy structuring, and reinsurance' },
  insurance_claims: { name: 'Insurance Claims', category: 'finance', description: 'Claims processing, investigation, adjustment, and settlement' },
  supply_chain: { name: 'Supply Chain', category: 'operations', description: 'Procurement, inventory management, supplier relationships, and logistics' },
  logistics: { name: 'Logistics', category: 'operations', description: 'Transportation, warehousing, distribution, and customs clearance' },
  data_privacy: { name: 'Data Privacy', category: 'technology', description: 'GDPR, PDPL, data protection, privacy impact assessments, and compliance' },
  construction: { name: 'Construction', category: 'operations', description: 'Project management, contracts (FIDIC), safety, and quality management' },
  oil_gas: { name: 'Oil & Gas', category: 'operations', description: 'Upstream, midstream, downstream operations, and OPEC dynamics' },
  education: { name: 'Education', category: 'people', description: 'Curriculum design, accreditation, EdTech, and institutional management' },
};

/**
 * Get domain expertise at the requested depth
 */
export async function getDomainExpertise({ domain, depth, region, focus_area }) {
  const fullDomain = domains[domain];
  const stub = domainStubs[domain];

  if (!fullDomain && !stub) {
    return {
      content: [{ type: 'text', text: JSON.stringify({ error: `Unknown domain: ${domain}. Use list_available_domains to see options.` }) }],
    };
  }

  if (!fullDomain) {
    return {
      content: [{
        type: 'text',
        text: JSON.stringify({
          domain: stub.name,
          category: stub.category,
          description: stub.description,
          depth,
          region,
          note: `Detailed expertise for ${stub.name} is available at the practitioner and expert levels in upcoming releases. Current version provides overview-level knowledge.`,
          available_now: ['accounting', 'islamic_finance', 'cybersecurity', 'real_estate_commercial', 'hr_management'],
        }, null, 2),
      }],
    };
  }

  const expertise = fullDomain.expertise;
  let result = {
    domain: fullDomain.name,
    category: fullDomain.category,
    description: fullDomain.description,
    depth,
    region,
    focus_area: focus_area || 'general',
  };

  // Build response based on depth
  if (depth === 'overview') {
    result.expertise = expertise.overview;
  } else if (depth === 'practitioner') {
    result.expertise = {
      ...expertise.overview,
      ...expertise.practitioner,
    };
    // Add regional specifics if available and requested
    if (expertise.practitioner?.gcc_specifics && ['gcc', 'mena'].includes(region)) {
      result.regional_context = expertise.practitioner.gcc_specifics;
    }
  } else if (depth === 'expert') {
    result.expertise = {
      ...expertise.overview,
      ...expertise.practitioner,
      ...expertise.expert,
    };
    if (expertise.practitioner?.gcc_specifics && ['gcc', 'mena'].includes(region)) {
      result.regional_context = expertise.practitioner.gcc_specifics;
    }
  }

  return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
}

/**
 * List all available domains
 */
export async function listDomains() {
  const allDomains = {};

  for (const [key, domain] of Object.entries(domains)) {
    allDomains[key] = {
      name: domain.name,
      category: domain.category,
      description: domain.description,
      depth_available: ['overview', 'practitioner', 'expert'],
      full_expertise: true,
    };
  }

  for (const [key, stub] of Object.entries(domainStubs)) {
    if (!allDomains[key]) {
      allDomains[key] = {
        name: stub.name,
        category: stub.category,
        description: stub.description,
        depth_available: ['overview'],
        full_expertise: false,
      };
    }
  }

  return {
    content: [{
      type: 'text',
      text: JSON.stringify({
        total_domains: Object.keys(allDomains).length,
        full_expertise_domains: Object.values(allDomains).filter(d => d.full_expertise).length,
        domains: allDomains,
      }, null, 2),
    }],
  };
}

/**
 * Get a decision tree for a specific scenario
 */
export async function getDomainDecisionTree({ domain, scenario, jurisdiction }) {
  // Generic decision tree builder based on domain
  const trees = {
    accounting: {
      'revenue recognition': {
        question: 'Is there a contract with a customer?',
        yes: {
          question: 'Are there multiple performance obligations?',
          yes: { action: 'Allocate transaction price using standalone selling prices. Recognize as each obligation is satisfied.' },
          no: {
            question: 'Is the obligation satisfied over time or at a point in time?',
            over_time: { action: 'Recognize revenue over time using progress measurement (output or input method).' },
            point_in_time: { action: 'Recognize revenue at the point control transfers to the customer.' },
          },
        },
        no: { action: 'Cannot recognize revenue under IFRS 15. Wait for contract existence or apply IAS 20 if government grant.' },
      },
    },
    islamic_finance: {
      'sharia compliance': {
        question: 'Does the transaction involve interest (riba)?',
        yes: { action: 'NOT COMPLIANT. Restructure using Murabaha (cost-plus sale), Ijara (lease), or Musharaka (partnership) structure.' },
        no: {
          question: 'Is there excessive uncertainty (gharar)?',
          yes: { action: 'NOT COMPLIANT. Clarify all terms — price, delivery, quantity, quality must be deterministic.' },
          no: {
            question: 'Is the underlying activity halal?',
            yes: {
              question: 'Is risk genuinely shared between parties?',
              yes: { action: 'LIKELY COMPLIANT. Submit to Sharia Board for formal fatwa.' },
              no: { action: 'REVIEW NEEDED. Risk must be shared — restructure to ensure both parties bear risk.' },
            },
            no: { action: 'NOT COMPLIANT. Cannot invest in haram activities regardless of structure.' },
          },
        },
      },
    },
  };

  const domainTrees = trees[domain];
  if (!domainTrees) {
    return {
      content: [{
        type: 'text',
        text: JSON.stringify({
          domain,
          scenario,
          note: `Decision trees for ${domain} are being built. Use get_domain_expertise for structured frameworks instead.`,
          available_domains: Object.keys(trees),
        }, null, 2),
      }],
    };
  }

  // Find closest matching tree
  const scenarioLower = scenario.toLowerCase();
  let matchedTree = null;
  let matchedKey = null;

  for (const [key, tree] of Object.entries(domainTrees)) {
    if (scenarioLower.includes(key)) {
      matchedTree = tree;
      matchedKey = key;
      break;
    }
  }

  if (!matchedTree) {
    return {
      content: [{
        type: 'text',
        text: JSON.stringify({
          domain,
          scenario,
          available_scenarios: Object.keys(domainTrees),
          note: 'No exact match. Available scenarios listed above. Use get_domain_expertise for general frameworks.',
        }, null, 2),
      }],
    };
  }

  return {
    content: [{
      type: 'text',
      text: JSON.stringify({
        domain,
        scenario: matchedKey,
        jurisdiction: jurisdiction || 'global',
        decision_tree: matchedTree,
        note: 'Follow the decision tree step by step. Each branch leads to a specific action or further question.',
      }, null, 2),
    }],
  };
}
