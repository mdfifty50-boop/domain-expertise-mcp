#!/usr/bin/env node

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';
import { getDomainExpertise, listDomains, getDomainDecisionTree } from './tools/expertise.js';
import { getRegulatory, getTerminology } from './tools/reference.js';
import { assessComplexity, getWorkflow } from './tools/workflow.js';

const server = new McpServer({
  name: 'domain-expertise-mcp',
  version: '0.1.0',
  description: 'Inject structured professional domain expertise into AI agents — decision frameworks, terminology, workflows, and regulatory knowledge across 15+ industries',
});

// ═══════════════════════════════════════════
// DOMAIN EXPERTISE TOOLS
// ═══════════════════════════════════════════

server.tool(
  'get_domain_expertise',
  'Get structured professional expertise for a specific domain. Returns decision frameworks, key principles, common pitfalls, and expert-level reasoning patterns that transform a generalist AI agent into a domain specialist.',
  {
    domain: z.enum([
      'accounting', 'tax', 'audit',
      'corporate_law', 'contract_law', 'employment_law',
      'islamic_finance', 'conventional_banking', 'investment',
      'real_estate_commercial', 'real_estate_residential',
      'healthcare_clinical', 'healthcare_admin', 'pharmaceutical',
      'insurance_underwriting', 'insurance_claims',
      'supply_chain', 'logistics',
      'cybersecurity', 'data_privacy',
      'construction', 'oil_gas',
      'education', 'hr_management',
    ]).describe('Professional domain to get expertise for'),
    depth: z.enum(['overview', 'practitioner', 'expert']).default('practitioner').describe('Depth of expertise: overview (5min briefing), practitioner (working knowledge), expert (deep specialist)'),
    region: z.enum(['global', 'gcc', 'mena', 'eu', 'us', 'uk', 'asia']).default('global').describe('Regional context for jurisdiction-specific knowledge'),
    focus_area: z.string().optional().describe('Specific sub-area to focus on (e.g., "transfer pricing" within tax, "sharia compliance" within islamic_finance)'),
  },
  async (params) => getDomainExpertise(params)
);

server.tool(
  'list_available_domains',
  'List all available professional domains with descriptions and coverage depth.',
  {},
  async () => listDomains()
);

server.tool(
  'get_decision_tree',
  'Get a structured decision tree for a specific professional scenario. Returns step-by-step decision logic that an expert would follow.',
  {
    domain: z.string().describe('Professional domain'),
    scenario: z.string().describe('The specific scenario or question to get a decision tree for (e.g., "Should I register for VAT?", "Is this transaction Sharia-compliant?", "How to classify this lease?")'),
    jurisdiction: z.string().optional().describe('Jurisdiction for regulatory decisions'),
  },
  async (params) => getDomainDecisionTree(params)
);

// ═══════════════════════════════════════════
// REFERENCE TOOLS
// ═══════════════════════════════════════════

server.tool(
  'get_terminology',
  'Get professional terminology and definitions for a domain. Returns terms with definitions, usage context, and common misunderstandings.',
  {
    domain: z.string().describe('Professional domain'),
    terms: z.array(z.string()).optional().describe('Specific terms to define. If empty, returns the top 20 essential terms for the domain.'),
    language: z.enum(['en', 'ar', 'both']).default('en').describe('Language for definitions'),
  },
  async (params) => getTerminology(params)
);

server.tool(
  'get_regulatory_context',
  'Get regulatory context for a domain in a specific jurisdiction. Returns applicable laws, regulatory bodies, compliance requirements, and recent changes.',
  {
    domain: z.string().describe('Professional domain'),
    jurisdiction: z.string().describe('Country or region code (e.g., SA, AE, KW, US, UK, EU)'),
    topic: z.string().optional().describe('Specific regulatory topic (e.g., "anti-money laundering", "data protection", "employment contracts")'),
  },
  async (params) => getRegulatory(params)
);

// ═══════════════════════════════════════════
// WORKFLOW TOOLS
// ═══════════════════════════════════════════

server.tool(
  'assess_complexity',
  'Assess the complexity of a professional task and recommend whether it needs a generalist or specialist agent. Returns complexity score, required expertise level, and risk factors.',
  {
    domain: z.string().describe('Professional domain'),
    task_description: z.string().describe('Description of the task to assess'),
    stakes: z.enum(['low', 'medium', 'high', 'critical']).default('medium').describe('What is at stake if the task is done incorrectly'),
  },
  async (params) => assessComplexity(params)
);

server.tool(
  'get_professional_workflow',
  'Get the standard professional workflow for a task. Returns the steps an experienced professional would follow, including quality checkpoints and common shortcuts that cause problems.',
  {
    domain: z.string().describe('Professional domain'),
    task: z.string().describe('The professional task (e.g., "financial audit", "contract review", "clinical diagnosis", "property valuation")'),
    experience_level: z.enum(['junior', 'mid', 'senior', 'partner']).default('senior').describe('Experience level to calibrate the workflow for'),
  },
  async (params) => getWorkflow(params)
);

// ═══════════════════════════════════════════
// RESOURCES
// ═══════════════════════════════════════════

server.resource(
  'domains-catalog',
  'expertise://domains',
  async () => ({
    contents: [{
      uri: 'expertise://domains',
      mimeType: 'application/json',
      text: JSON.stringify({
        last_updated: '2026-04-22',
        total_domains: 24,
        categories: {
          finance: ['accounting', 'tax', 'audit', 'islamic_finance', 'conventional_banking', 'investment', 'insurance_underwriting', 'insurance_claims'],
          legal: ['corporate_law', 'contract_law', 'employment_law'],
          healthcare: ['healthcare_clinical', 'healthcare_admin', 'pharmaceutical'],
          real_estate: ['real_estate_commercial', 'real_estate_residential'],
          technology: ['cybersecurity', 'data_privacy'],
          operations: ['supply_chain', 'logistics', 'construction', 'oil_gas'],
          people: ['education', 'hr_management'],
        },
        regional_coverage: ['global', 'gcc', 'mena', 'eu', 'us', 'uk', 'asia'],
        depth_levels: {
          overview: 'High-level briefing suitable for initial context. ~500 words.',
          practitioner: 'Working knowledge for day-to-day tasks. ~1500 words. Includes decision frameworks.',
          expert: 'Deep specialist knowledge with edge cases and nuances. ~3000 words. Includes reasoning patterns.',
        },
      }, null, 2),
    }],
  })
);

// ═══════════════════════════════════════════
// START SERVER
// ═══════════════════════════════════════════

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('Domain Expertise MCP Server running on stdio');
}

main().catch(console.error);
