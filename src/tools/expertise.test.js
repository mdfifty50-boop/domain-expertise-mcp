/**
 * Tests for expertise.js — getDomainExpertise, listDomains, getDomainDecisionTree
 */
import { test, describe } from 'node:test';
import assert from 'node:assert/strict';

import { getDomainExpertise, listDomains, getDomainDecisionTree } from './expertise.js';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function parseText(result) {
  assert.ok(result.content, 'result must have content');
  assert.ok(Array.isArray(result.content), 'content must be an array');
  assert.ok(result.content.length > 0, 'content must not be empty');
  assert.equal(result.content[0].type, 'text', 'first content item must have type "text"');
  return JSON.parse(result.content[0].text);
}

// ---------------------------------------------------------------------------
// listDomains
// ---------------------------------------------------------------------------

describe('listDomains', () => {
  test('returns content[0].text with valid JSON', async () => {
    const result = await listDomains();
    const data = parseText(result);
    assert.ok(data, 'parsed data must be truthy');
  });

  test('returns total_domains count', async () => {
    const result = await listDomains();
    const data = parseText(result);
    assert.ok(typeof data.total_domains === 'number', 'total_domains must be a number');
    assert.ok(data.total_domains > 0, 'total_domains must be > 0');
  });

  test('returns full_expertise_domains count', async () => {
    const result = await listDomains();
    const data = parseText(result);
    assert.ok(typeof data.full_expertise_domains === 'number', 'full_expertise_domains must be a number');
    assert.ok(data.full_expertise_domains > 0, 'full_expertise_domains must be > 0');
  });

  test('full_expertise_domains <= total_domains', async () => {
    const result = await listDomains();
    const data = parseText(result);
    assert.ok(data.full_expertise_domains <= data.total_domains, 'full expertise count must not exceed total');
  });

  test('returns domains map', async () => {
    const result = await listDomains();
    const data = parseText(result);
    assert.ok(typeof data.domains === 'object', 'domains must be an object');
  });

  test('each domain entry has required fields', async () => {
    const result = await listDomains();
    const data = parseText(result);
    for (const [key, domain] of Object.entries(data.domains)) {
      assert.ok(typeof domain.name === 'string', `${key}.name must be a string`);
      assert.ok(typeof domain.category === 'string', `${key}.category must be a string`);
      assert.ok(typeof domain.description === 'string', `${key}.description must be a string`);
      assert.ok(Array.isArray(domain.depth_available), `${key}.depth_available must be an array`);
      assert.ok(typeof domain.full_expertise === 'boolean', `${key}.full_expertise must be a boolean`);
    }
  });

  test('known full-expertise domains are present', async () => {
    const result = await listDomains();
    const data = parseText(result);
    const fullDomains = ['accounting', 'islamic_finance', 'cybersecurity', 'real_estate_commercial', 'hr_management'];
    for (const d of fullDomains) {
      assert.ok(data.domains[d], `domain ${d} must be present`);
      assert.equal(data.domains[d].full_expertise, true, `${d}.full_expertise must be true`);
    }
  });

  test('stub domains have full_expertise false', async () => {
    const result = await listDomains();
    const data = parseText(result);
    // tax is a known stub
    assert.ok(data.domains.tax, 'tax domain must be present');
    assert.equal(data.domains.tax.full_expertise, false, 'tax.full_expertise must be false');
  });
});

// ---------------------------------------------------------------------------
// getDomainExpertise
// ---------------------------------------------------------------------------

describe('getDomainExpertise', () => {
  // --- unknown domain ---
  test('returns error for unknown domain', async () => {
    const result = await getDomainExpertise({ domain: 'unicorn', depth: 'overview', region: 'global' });
    const data = parseText(result);
    assert.ok(data.error, 'must return error field for unknown domain');
    assert.ok(data.error.includes('unicorn'), 'error must mention the unknown domain');
  });

  // --- stub domain ---
  test('returns stub info for known stub domain (tax)', async () => {
    const result = await getDomainExpertise({ domain: 'tax', depth: 'overview', region: 'global' });
    const data = parseText(result);
    assert.equal(data.domain, 'Taxation', 'domain name must be Taxation');
    assert.ok(data.note, 'stub must include a note');
    assert.ok(Array.isArray(data.available_now), 'stub must include available_now list');
  });

  // --- overview depth ---
  test('accounting overview returns principles and key_standards', async () => {
    const result = await getDomainExpertise({ domain: 'accounting', depth: 'overview', region: 'global' });
    const data = parseText(result);
    assert.equal(data.domain, 'Accounting');
    assert.equal(data.depth, 'overview');
    assert.ok(data.expertise, 'must have expertise field');
    assert.ok(Array.isArray(data.expertise.principles), 'overview must include principles');
    assert.ok(data.expertise.principles.length > 0, 'principles must not be empty');
    assert.ok(Array.isArray(data.expertise.key_standards), 'overview must include key_standards');
  });

  test('accounting overview includes common_mistakes', async () => {
    const result = await getDomainExpertise({ domain: 'accounting', depth: 'overview', region: 'global' });
    const data = parseText(result);
    assert.ok(Array.isArray(data.expertise.common_mistakes), 'overview must include common_mistakes');
  });

  // --- practitioner depth ---
  test('accounting practitioner includes decision_frameworks', async () => {
    const result = await getDomainExpertise({ domain: 'accounting', depth: 'practitioner', region: 'global' });
    const data = parseText(result);
    assert.equal(data.depth, 'practitioner');
    assert.ok(Array.isArray(data.expertise.decision_frameworks), 'practitioner must include decision_frameworks');
    assert.ok(data.expertise.decision_frameworks.length > 0, 'decision_frameworks must not be empty');
  });

  test('accounting practitioner includes both overview and practitioner fields', async () => {
    const result = await getDomainExpertise({ domain: 'accounting', depth: 'practitioner', region: 'global' });
    const data = parseText(result);
    // Overview fields
    assert.ok(data.expertise.principles, 'must include principles (from overview)');
    // Practitioner fields
    assert.ok(data.expertise.decision_frameworks, 'must include decision_frameworks (from practitioner)');
  });

  test('accounting practitioner with gcc region returns regional_context', async () => {
    const result = await getDomainExpertise({ domain: 'accounting', depth: 'practitioner', region: 'gcc' });
    const data = parseText(result);
    assert.ok(data.regional_context, 'gcc region must return regional_context');
    assert.ok(data.regional_context.saudi, 'regional_context must include saudi');
  });

  test('accounting practitioner with mena region returns regional_context', async () => {
    const result = await getDomainExpertise({ domain: 'accounting', depth: 'practitioner', region: 'mena' });
    const data = parseText(result);
    assert.ok(data.regional_context, 'mena region must return regional_context');
  });

  test('accounting practitioner with global region does not return regional_context', async () => {
    const result = await getDomainExpertise({ domain: 'accounting', depth: 'practitioner', region: 'global' });
    const data = parseText(result);
    assert.equal(data.regional_context, undefined, 'global region must not return regional_context');
  });

  // --- expert depth ---
  test('accounting expert includes reasoning_patterns and edge_cases', async () => {
    const result = await getDomainExpertise({ domain: 'accounting', depth: 'expert', region: 'global' });
    const data = parseText(result);
    assert.equal(data.depth, 'expert');
    assert.ok(Array.isArray(data.expertise.reasoning_patterns), 'expert must include reasoning_patterns');
    assert.ok(Array.isArray(data.expertise.edge_cases), 'expert must include edge_cases');
  });

  test('accounting expert includes all previous depth fields', async () => {
    const result = await getDomainExpertise({ domain: 'accounting', depth: 'expert', region: 'global' });
    const data = parseText(result);
    assert.ok(data.expertise.principles, 'expert must include principles');
    assert.ok(data.expertise.decision_frameworks, 'expert must include decision_frameworks');
    assert.ok(data.expertise.reasoning_patterns, 'expert must include reasoning_patterns');
  });

  // --- focus_area ---
  test('focus_area is reflected in response', async () => {
    const result = await getDomainExpertise({ domain: 'accounting', depth: 'overview', region: 'global', focus_area: 'revenue' });
    const data = parseText(result);
    assert.equal(data.focus_area, 'revenue', 'focus_area must appear in response');
  });

  test('focus_area defaults to general when omitted', async () => {
    const result = await getDomainExpertise({ domain: 'accounting', depth: 'overview', region: 'global' });
    const data = parseText(result);
    assert.equal(data.focus_area, 'general', 'default focus_area must be general');
  });

  // --- other full-expertise domains ---
  test('islamic_finance overview returns principles', async () => {
    const result = await getDomainExpertise({ domain: 'islamic_finance', depth: 'overview', region: 'global' });
    const data = parseText(result);
    assert.equal(data.domain, 'Islamic Finance');
    assert.ok(Array.isArray(data.expertise.principles), 'islamic_finance must have principles');
    assert.ok(data.expertise.principles.length > 0);
  });

  test('cybersecurity practitioner with gcc region returns regional_context', async () => {
    const result = await getDomainExpertise({ domain: 'cybersecurity', depth: 'practitioner', region: 'gcc' });
    const data = parseText(result);
    assert.ok(data.regional_context, 'gcc region must return regional_context');
  });

  test('hr_management overview returns key_areas', async () => {
    const result = await getDomainExpertise({ domain: 'hr_management', depth: 'overview', region: 'global' });
    const data = parseText(result);
    assert.ok(Array.isArray(data.expertise.key_areas), 'hr_management must have key_areas');
  });

  test('real_estate_commercial overview returns key_metrics', async () => {
    const result = await getDomainExpertise({ domain: 'real_estate_commercial', depth: 'overview', region: 'global' });
    const data = parseText(result);
    assert.ok(Array.isArray(data.expertise.key_metrics), 'real_estate_commercial must have key_metrics');
  });
});

// ---------------------------------------------------------------------------
// getDomainDecisionTree
// ---------------------------------------------------------------------------

describe('getDomainDecisionTree', () => {
  // --- domain with no trees ---
  test('returns note for domain without decision trees', async () => {
    const result = await getDomainDecisionTree({ domain: 'hr_management', scenario: 'termination', jurisdiction: 'global' });
    const data = parseText(result);
    assert.ok(data.note, 'must return a note for domains without trees');
    assert.ok(Array.isArray(data.available_domains), 'must list available_domains');
    assert.ok(data.available_domains.includes('accounting'), 'available_domains must include accounting');
  });

  // --- accounting / revenue recognition ---
  test('accounting revenue recognition returns a decision_tree', async () => {
    const result = await getDomainDecisionTree({ domain: 'accounting', scenario: 'revenue recognition', jurisdiction: 'global' });
    const data = parseText(result);
    assert.equal(data.domain, 'accounting');
    assert.ok(data.decision_tree, 'must return decision_tree');
    assert.ok(data.decision_tree.question, 'decision_tree must start with a question');
  });

  test('decision tree response includes scenario and jurisdiction', async () => {
    const result = await getDomainDecisionTree({ domain: 'accounting', scenario: 'revenue recognition', jurisdiction: 'SA' });
    const data = parseText(result);
    assert.ok(data.scenario, 'must have scenario field');
    assert.equal(data.jurisdiction, 'SA');
  });

  test('decision tree includes a note', async () => {
    const result = await getDomainDecisionTree({ domain: 'accounting', scenario: 'revenue recognition', jurisdiction: 'global' });
    const data = parseText(result);
    assert.ok(data.note, 'must include a note');
  });

  test('jurisdiction defaults to global when not provided', async () => {
    const result = await getDomainDecisionTree({ domain: 'accounting', scenario: 'revenue recognition' });
    const data = parseText(result);
    assert.equal(data.jurisdiction, 'global');
  });

  // --- islamic_finance / sharia compliance ---
  test('islamic_finance sharia compliance returns a decision_tree', async () => {
    const result = await getDomainDecisionTree({ domain: 'islamic_finance', scenario: 'sharia compliance check', jurisdiction: 'global' });
    const data = parseText(result);
    assert.ok(data.decision_tree, 'must return decision_tree');
    assert.ok(data.decision_tree.question, 'decision_tree must start with a question');
  });

  // --- no matching scenario ---
  test('returns available_scenarios when no scenario matches', async () => {
    const result = await getDomainDecisionTree({ domain: 'accounting', scenario: 'depreciation of intangibles', jurisdiction: 'global' });
    const data = parseText(result);
    assert.ok(Array.isArray(data.available_scenarios), 'must list available_scenarios');
    assert.ok(data.note, 'must include a note');
  });

  // --- partial match (case-insensitive substring) ---
  test('matches scenario by substring', async () => {
    const result = await getDomainDecisionTree({ domain: 'accounting', scenario: 'How to handle revenue recognition for SaaS', jurisdiction: 'AE' });
    const data = parseText(result);
    // Should match because scenario contains "revenue recognition"
    assert.ok(data.decision_tree, 'must match on substring and return decision_tree');
  });
});
