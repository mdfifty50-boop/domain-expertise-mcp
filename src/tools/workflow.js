/**
 * Workflow Tools — Complexity Assessment and Professional Workflows
 */

const workflows = {
  accounting: {
    'financial audit': {
      steps: [
        { phase: 'Planning', actions: ['Understand the entity and its environment', 'Assess risks of material misstatement', 'Determine materiality thresholds', 'Develop audit plan and team assignments'] },
        { phase: 'Risk Assessment', actions: ['Evaluate internal controls', 'Identify significant accounts and assertions', 'Design audit procedures (substantive + controls testing)', 'Document risk assessment in working papers'] },
        { phase: 'Fieldwork', actions: ['Test controls (walk-throughs + sample testing)', 'Perform substantive procedures (vouching, tracing, recalculation)', 'Confirm external balances (banks, debtors, creditors)', 'Review journal entries for unusual patterns'] },
        { phase: 'Completion', actions: ['Evaluate misstatements found', 'Obtain management representations', 'Review subsequent events', 'Form audit opinion'] },
        { phase: 'Reporting', actions: ['Draft audit report (unmodified/modified/adverse/disclaimer)', 'Communicate key audit matters (KAM)', 'Management letter with control deficiencies', 'Present to audit committee'] },
      ],
      quality_checkpoints: [
        'After planning: Does the materiality threshold make sense given the entity?',
        'After risk assessment: Have we identified all significant risks? (fraud risk is ALWAYS significant)',
        'During fieldwork: Are we testing the RIGHT assertions? (existence for assets, completeness for liabilities)',
        'Before opinion: Have we resolved ALL findings above materiality?',
      ],
      common_shortcuts_that_cause_problems: [
        'Copying last year\'s working papers without updating for changes',
        'Setting materiality too high to reduce testing scope',
        'Not properly evaluating management overrides of controls',
        'Skipping bank confirmations because "we trust the client"',
      ],
    },
    'month-end close': {
      steps: [
        { phase: 'Pre-Close', actions: ['Cut off: ensure all transactions are in correct period', 'Complete bank reconciliations', 'Review outstanding purchase orders'] },
        { phase: 'Accruals & Adjustments', actions: ['Accrue unbilled revenue', 'Accrue expenses incurred but not invoiced', 'Calculate depreciation/amortization', 'Review prepaid expense schedules'] },
        { phase: 'Reconciliation', actions: ['Reconcile all balance sheet accounts', 'Investigate and clear reconciling items', 'Verify intercompany balances match'] },
        { phase: 'Review & Report', actions: ['Run trial balance', 'Prepare financial statements', 'Variance analysis vs budget/prior period', 'Management review and sign-off'] },
      ],
      quality_checkpoints: [
        'Are all reconciliations completed and signed off?',
        'Do intercompany balances net to zero?',
        'Are all accrual estimates reasonable and documented?',
      ],
    },
  },
  cybersecurity: {
    'penetration test': {
      steps: [
        { phase: 'Scoping', actions: ['Define rules of engagement', 'Identify in-scope systems and networks', 'Agree on testing window', 'Obtain written authorization'] },
        { phase: 'Reconnaissance', actions: ['Passive information gathering (OSINT)', 'DNS enumeration', 'Port scanning and service identification', 'Identify technologies and versions'] },
        { phase: 'Vulnerability Assessment', actions: ['Automated vulnerability scanning', 'Manual vulnerability verification', 'Prioritize vulnerabilities by exploitability'] },
        { phase: 'Exploitation', actions: ['Attempt exploitation of identified vulnerabilities', 'Document successful exploits with evidence', 'Attempt privilege escalation', 'Attempt lateral movement'] },
        { phase: 'Reporting', actions: ['Executive summary for management', 'Technical findings with CVSS scores', 'Remediation recommendations prioritized', 'Retest timeline agreement'] },
      ],
      quality_checkpoints: [
        'Authorization letter signed BEFORE any testing begins',
        'All critical findings communicated immediately (not in final report)',
        'Screenshots/evidence for every finding',
        'Remediation recommendations are actionable, not generic',
      ],
    },
    'incident response': {
      steps: [
        { phase: 'Detection', actions: ['Confirm the alert is a true positive', 'Classify severity (P1-P4)', 'Notify incident commander'] },
        { phase: 'Containment', actions: ['Isolate affected systems', 'Preserve evidence (forensic image)', 'Block attacker IPs/domains', 'Reset compromised credentials'] },
        { phase: 'Eradication', actions: ['Identify root cause', 'Remove malware/backdoors', 'Patch exploited vulnerabilities', 'Scan for persistence mechanisms'] },
        { phase: 'Recovery', actions: ['Restore from validated backups', 'Monitor for reinfection', 'Gradually restore services', 'Verify integrity of restored systems'] },
        { phase: 'Post-Incident', actions: ['Timeline reconstruction', 'Root cause analysis document', 'Lessons learned meeting', 'Update detection rules and playbooks'] },
      ],
    },
  },
  islamic_finance: {
    'sharia audit': {
      steps: [
        { phase: 'Planning', actions: ['Review Sharia Board resolutions and fatwas', 'Understand product structures offered', 'Identify high-risk areas for Sharia non-compliance', 'Design audit program'] },
        { phase: 'Testing', actions: ['Verify contracts match approved structures', 'Check that underlying assets exist and are halal', 'Verify profit distribution follows agreed ratios', 'Test that late payment penalties go to charity (not income)'] },
        { phase: 'Reporting', actions: ['Report to Sharia Board (not management)', 'Classify findings: non-compliant income, structural issues, documentation gaps', 'Calculate purification amount (non-compliant income that must be donated)'] },
      ],
      quality_checkpoints: [
        'Is the auditor independent of management AND the Sharia Board?',
        'Have all new products been tested against the original fatwa?',
        'Is non-compliant income properly quantified and purified?',
      ],
    },
  },
};

const complexityFactors = {
  domain_depth: {
    accounting: { base: 40, factors: ['number of entities', 'international operations', 'complex instruments', 'regulatory filings'] },
    islamic_finance: { base: 55, factors: ['product complexity', 'Sharia Board requirements', 'cross-border structures'] },
    cybersecurity: { base: 45, factors: ['attack surface size', 'regulatory requirements', 'threat actor sophistication'] },
    real_estate_commercial: { base: 35, factors: ['deal size', 'multi-party transactions', 'zoning complexity'] },
    hr_management: { base: 30, factors: ['employee count', 'multi-jurisdiction', 'nationalization quotas'] },
  },
  stakes_multiplier: {
    low: 1.0,
    medium: 1.3,
    high: 1.7,
    critical: 2.2,
  },
};

/**
 * Assess task complexity
 */
export async function assessComplexity({ domain, task_description, stakes }) {
  const domainFactors = complexityFactors.domain_depth[domain] || { base: 50, factors: ['general complexity'] };
  const multiplier = complexityFactors.stakes_multiplier[stakes];

  // Simple heuristic-based complexity scoring
  const taskWords = task_description.toLowerCase();
  let complexity = domainFactors.base;

  // Increase for complexity indicators
  if (taskWords.includes('multi') || taskWords.includes('cross-border') || taskWords.includes('international')) complexity += 15;
  if (taskWords.includes('audit') || taskWords.includes('compliance') || taskWords.includes('regulatory')) complexity += 10;
  if (taskWords.includes('dispute') || taskWords.includes('litigation') || taskWords.includes('investigation')) complexity += 20;
  if (taskWords.includes('complex') || taskWords.includes('unusual') || taskWords.includes('unprecedented')) complexity += 15;

  // Decrease for simplicity indicators
  if (taskWords.includes('simple') || taskWords.includes('basic') || taskWords.includes('standard')) complexity -= 15;
  if (taskWords.includes('single') || taskWords.includes('straightforward')) complexity -= 10;

  complexity = Math.min(100, Math.max(10, Math.round(complexity * multiplier)));

  let level, recommendation;
  if (complexity <= 30) {
    level = 'LOW';
    recommendation = 'A generalist agent can handle this with domain expertise injection (overview depth).';
  } else if (complexity <= 55) {
    level = 'MEDIUM';
    recommendation = 'A generalist agent needs practitioner-level domain expertise. Consider using get_domain_expertise with depth=practitioner.';
  } else if (complexity <= 75) {
    level = 'HIGH';
    recommendation = 'Specialist agent recommended. Use get_domain_expertise with depth=expert. Human review of output strongly advised.';
  } else {
    level = 'CRITICAL';
    recommendation = 'Human expert required. Agent can assist with research, drafting, and analysis, but final decisions must be made by a qualified professional.';
  }

  return {
    content: [{
      type: 'text',
      text: JSON.stringify({
        domain,
        task: task_description,
        stakes,
        complexity_score: complexity,
        complexity_level: level,
        recommendation,
        risk_factors: domainFactors.factors,
        suggested_depth: complexity <= 30 ? 'overview' : complexity <= 55 ? 'practitioner' : 'expert',
        human_review_needed: complexity > 55,
      }, null, 2),
    }],
  };
}

/**
 * Get professional workflow for a task
 */
export async function getWorkflow({ domain, task, experience_level }) {
  const domainWorkflows = workflows[domain];
  if (!domainWorkflows) {
    return {
      content: [{
        type: 'text',
        text: JSON.stringify({
          domain,
          task,
          note: `Workflows for ${domain} are being built. Available: ${Object.keys(workflows).join(', ')}`,
        }, null, 2),
      }],
    };
  }

  // Find closest matching workflow
  const taskLower = task.toLowerCase();
  let matchedWorkflow = null;
  let matchedKey = null;

  for (const [key, wf] of Object.entries(domainWorkflows)) {
    if (taskLower.includes(key) || key.includes(taskLower)) {
      matchedWorkflow = wf;
      matchedKey = key;
      break;
    }
  }

  if (!matchedWorkflow) {
    return {
      content: [{
        type: 'text',
        text: JSON.stringify({
          domain,
          task,
          available_workflows: Object.keys(domainWorkflows),
          note: 'No exact match. Available workflows listed above.',
        }, null, 2),
      }],
    };
  }

  // Adjust for experience level
  let levelNote;
  switch (experience_level) {
    case 'junior':
      levelNote = 'Follow each step exactly. Do not skip steps. Ask for review at every quality checkpoint. Document extensively.';
      break;
    case 'mid':
      levelNote = 'Follow the workflow but use judgment on routine items. Flag unusual situations for senior review.';
      break;
    case 'senior':
      levelNote = 'Use the workflow as a framework. Focus effort on high-risk areas. Mentor juniors through quality checkpoints.';
      break;
    case 'partner':
      levelNote = 'Own the overall quality. Review key judgments. Focus on client relationship and strategic issues. Delegate execution.';
      break;
  }

  return {
    content: [{
      type: 'text',
      text: JSON.stringify({
        domain,
        workflow: matchedKey,
        experience_level,
        level_guidance: levelNote,
        ...matchedWorkflow,
      }, null, 2),
    }],
  };
}
