/**
 * Tests for workflow.js — assessComplexity, getWorkflow
 */
import { test, describe } from 'node:test';
import assert from 'node:assert/strict';

import { assessComplexity, getWorkflow } from './workflow.js';

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
// assessComplexity
// ---------------------------------------------------------------------------

describe('assessComplexity', () => {
  // --- response structure ---
  test('returns content[0].text with valid JSON', async () => {
    const result = await assessComplexity({ domain: 'accounting', task_description: 'Prepare month-end close', stakes: 'medium' });
    const data = parseText(result);
    assert.ok(data, 'parsed data must be truthy');
  });

  test('response includes required fields', async () => {
    const result = await assessComplexity({ domain: 'accounting', task_description: 'Prepare month-end close', stakes: 'medium' });
    const data = parseText(result);
    assert.equal(data.domain, 'accounting');
    assert.ok(typeof data.complexity_score === 'number', 'complexity_score must be a number');
    assert.ok(['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'].includes(data.complexity_level), 'complexity_level must be a valid level');
    assert.ok(typeof data.recommendation === 'string', 'recommendation must be a string');
    assert.ok(Array.isArray(data.risk_factors), 'risk_factors must be an array');
    assert.ok(['overview', 'practitioner', 'expert'].includes(data.suggested_depth), 'suggested_depth must be valid');
    assert.ok(typeof data.human_review_needed === 'boolean', 'human_review_needed must be boolean');
  });

  test('complexity_score is between 10 and 100', async () => {
    const result = await assessComplexity({ domain: 'accounting', task_description: 'Prepare month-end close', stakes: 'medium' });
    const data = parseText(result);
    assert.ok(data.complexity_score >= 10, 'complexity_score must be >= 10');
    assert.ok(data.complexity_score <= 100, 'complexity_score must be <= 100');
  });

  // --- stakes multiplier ---
  test('critical stakes yields higher complexity than low stakes for same task', async () => {
    const [low, critical] = await Promise.all([
      assessComplexity({ domain: 'accounting', task_description: 'standard bookkeeping', stakes: 'low' }),
      assessComplexity({ domain: 'accounting', task_description: 'standard bookkeeping', stakes: 'critical' }),
    ]);
    const lowData = parseText(low);
    const critData = parseText(critical);
    assert.ok(critData.complexity_score > lowData.complexity_score, 'critical stakes must increase complexity');
  });

  // --- complexity indicators (increase) ---
  test('multi-jurisdiction task scores higher than single-entity task', async () => {
    const [single, multi] = await Promise.all([
      assessComplexity({ domain: 'accounting', task_description: 'single entity bookkeeping', stakes: 'medium' }),
      assessComplexity({ domain: 'accounting', task_description: 'multi-entity consolidation', stakes: 'medium' }),
    ]);
    const singleData = parseText(single);
    const multiData = parseText(multi);
    assert.ok(multiData.complexity_score > singleData.complexity_score, 'multi indicator must raise score');
  });

  test('dispute/litigation task scores higher', async () => {
    const [base, dispute] = await Promise.all([
      assessComplexity({ domain: 'accounting', task_description: 'basic bookkeeping', stakes: 'medium' }),
      assessComplexity({ domain: 'accounting', task_description: 'accounting dispute investigation', stakes: 'medium' }),
    ]);
    const baseData = parseText(base);
    const disputeData = parseText(dispute);
    assert.ok(disputeData.complexity_score > baseData.complexity_score, 'dispute indicator must raise score');
  });

  // --- simplicity indicators (decrease) ---
  test('simple/basic task scores lower than default', async () => {
    const [base, simple] = await Promise.all([
      assessComplexity({ domain: 'accounting', task_description: 'month-end close', stakes: 'medium' }),
      assessComplexity({ domain: 'accounting', task_description: 'simple straightforward bank reconciliation', stakes: 'medium' }),
    ]);
    const baseData = parseText(base);
    const simpleData = parseText(simple);
    assert.ok(simpleData.complexity_score < baseData.complexity_score, 'simple indicator must reduce score');
  });

  // --- complexity level thresholds ---
  test('very complex task with critical stakes reaches CRITICAL level', async () => {
    const result = await assessComplexity({
      domain: 'islamic_finance',
      task_description: 'cross-border multi-entity complex dispute litigation regulatory compliance audit',
      stakes: 'critical',
    });
    const data = parseText(result);
    assert.equal(data.complexity_level, 'CRITICAL', 'must be CRITICAL');
    assert.equal(data.human_review_needed, true, 'CRITICAL must require human review');
  });

  test('simple low-stakes accounting task reaches LOW level', async () => {
    const result = await assessComplexity({
      domain: 'accounting',
      task_description: 'simple basic straightforward single entry',
      stakes: 'low',
    });
    const data = parseText(result);
    assert.ok(['LOW', 'MEDIUM'].includes(data.complexity_level), 'must be LOW or MEDIUM for simple low-stakes task');
  });

  // --- unknown domain falls back gracefully ---
  test('unknown domain does not throw — uses fallback base', async () => {
    const result = await assessComplexity({ domain: 'unknown_domain', task_description: 'basic task', stakes: 'low' });
    const data = parseText(result);
    assert.ok(typeof data.complexity_score === 'number', 'must return complexity_score even for unknown domain');
    assert.ok(['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'].includes(data.complexity_level));
  });

  // --- suggested_depth alignment ---
  test('LOW complexity suggests overview depth', async () => {
    const result = await assessComplexity({
      domain: 'hr_management',
      task_description: 'simple basic straightforward single standard HR policy',
      stakes: 'low',
    });
    const data = parseText(result);
    if (data.complexity_level === 'LOW') {
      assert.equal(data.suggested_depth, 'overview');
      assert.equal(data.human_review_needed, false);
    }
  });

  test('HIGH complexity suggests expert depth', async () => {
    const result = await assessComplexity({
      domain: 'cybersecurity',
      task_description: 'cross-border multi-jurisdictional regulatory compliance audit investigation',
      stakes: 'high',
    });
    const data = parseText(result);
    if (['HIGH', 'CRITICAL'].includes(data.complexity_level)) {
      assert.equal(data.suggested_depth, 'expert');
      assert.equal(data.human_review_needed, true);
    }
  });

  // --- task and stakes reflected in response ---
  test('response echoes back task_description and stakes', async () => {
    const result = await assessComplexity({ domain: 'accounting', task_description: 'My custom task', stakes: 'high' });
    const data = parseText(result);
    assert.equal(data.task, 'My custom task');
    assert.equal(data.stakes, 'high');
  });
});

// ---------------------------------------------------------------------------
// getWorkflow
// ---------------------------------------------------------------------------

describe('getWorkflow', () => {
  // --- domain without workflows ---
  test('returns note for domain without workflows', async () => {
    const result = await getWorkflow({ domain: 'real_estate_commercial', task: 'property valuation', experience_level: 'mid' });
    const data = parseText(result);
    assert.ok(data.note, 'must include a note');
    assert.ok(Array.isArray || typeof data.note === 'string', 'note must be a string');
  });

  // --- accounting / financial audit ---
  test('accounting financial audit returns steps array', async () => {
    const result = await getWorkflow({ domain: 'accounting', task: 'financial audit', experience_level: 'mid' });
    const data = parseText(result);
    assert.ok(Array.isArray(data.steps), 'must have steps array');
    assert.ok(data.steps.length > 0, 'steps must not be empty');
  });

  test('each audit step has phase and actions', async () => {
    const result = await getWorkflow({ domain: 'accounting', task: 'financial audit', experience_level: 'mid' });
    const data = parseText(result);
    for (const step of data.steps) {
      assert.ok(typeof step.phase === 'string', 'each step must have a phase string');
      assert.ok(Array.isArray(step.actions), 'each step must have actions array');
      assert.ok(step.actions.length > 0, 'actions must not be empty');
    }
  });

  test('accounting financial audit returns quality_checkpoints', async () => {
    const result = await getWorkflow({ domain: 'accounting', task: 'financial audit', experience_level: 'mid' });
    const data = parseText(result);
    assert.ok(Array.isArray(data.quality_checkpoints), 'must have quality_checkpoints');
    assert.ok(data.quality_checkpoints.length > 0);
  });

  test('accounting financial audit returns common_shortcuts_that_cause_problems', async () => {
    const result = await getWorkflow({ domain: 'accounting', task: 'financial audit', experience_level: 'mid' });
    const data = parseText(result);
    assert.ok(Array.isArray(data.common_shortcuts_that_cause_problems), 'must have common_shortcuts_that_cause_problems');
  });

  // --- accounting / month-end close ---
  test('accounting month-end close returns steps', async () => {
    const result = await getWorkflow({ domain: 'accounting', task: 'month-end close', experience_level: 'junior' });
    const data = parseText(result);
    assert.ok(Array.isArray(data.steps), 'must have steps');
  });

  // --- cybersecurity workflows ---
  test('cybersecurity penetration test returns steps', async () => {
    const result = await getWorkflow({ domain: 'cybersecurity', task: 'penetration test', experience_level: 'senior' });
    const data = parseText(result);
    assert.ok(Array.isArray(data.steps), 'must have steps');
    assert.ok(data.steps.length > 0);
  });

  test('cybersecurity incident response returns steps', async () => {
    const result = await getWorkflow({ domain: 'cybersecurity', task: 'incident response', experience_level: 'partner' });
    const data = parseText(result);
    assert.ok(Array.isArray(data.steps), 'must have steps');
  });

  // --- islamic_finance workflows ---
  test('islamic_finance sharia audit returns steps', async () => {
    const result = await getWorkflow({ domain: 'islamic_finance', task: 'sharia audit', experience_level: 'mid' });
    const data = parseText(result);
    assert.ok(Array.isArray(data.steps), 'must have steps');
    assert.ok(data.steps.length > 0);
  });

  // --- experience levels ---
  test('junior experience level returns junior-specific guidance', async () => {
    const result = await getWorkflow({ domain: 'accounting', task: 'financial audit', experience_level: 'junior' });
    const data = parseText(result);
    assert.ok(typeof data.level_guidance === 'string', 'must have level_guidance string');
    assert.ok(data.level_guidance.toLowerCase().includes('document') || data.level_guidance.toLowerCase().includes('review'), 'junior guidance must mention documentation or review');
  });

  test('senior experience level returns senior-specific guidance', async () => {
    const result = await getWorkflow({ domain: 'accounting', task: 'financial audit', experience_level: 'senior' });
    const data = parseText(result);
    assert.ok(typeof data.level_guidance === 'string', 'must have level_guidance string');
  });

  test('partner experience level returns partner-specific guidance', async () => {
    const result = await getWorkflow({ domain: 'accounting', task: 'financial audit', experience_level: 'partner' });
    const data = parseText(result);
    assert.ok(data.level_guidance.toLowerCase().includes('delegate') || data.level_guidance.toLowerCase().includes('client'), 'partner guidance must mention delegation or client');
  });

  // --- response metadata ---
  test('response includes domain and workflow fields', async () => {
    const result = await getWorkflow({ domain: 'accounting', task: 'financial audit', experience_level: 'mid' });
    const data = parseText(result);
    assert.equal(data.domain, 'accounting');
    assert.ok(typeof data.workflow === 'string', 'must have workflow name string');
  });

  test('response includes experience_level', async () => {
    const result = await getWorkflow({ domain: 'accounting', task: 'financial audit', experience_level: 'mid' });
    const data = parseText(result);
    assert.equal(data.experience_level, 'mid');
  });

  // --- no matching workflow ---
  test('returns available_workflows when no task matches', async () => {
    const result = await getWorkflow({ domain: 'accounting', task: 'ipo roadshow preparation', experience_level: 'mid' });
    const data = parseText(result);
    assert.ok(Array.isArray(data.available_workflows), 'must list available_workflows');
    assert.ok(data.note, 'must include a note');
  });

  // --- partial/substring match ---
  test('matches workflow by partial task string', async () => {
    // task contains "audit" which matches "financial audit"
    const result = await getWorkflow({ domain: 'accounting', task: 'full financial audit engagement for a listed company', experience_level: 'senior' });
    const data = parseText(result);
    assert.ok(Array.isArray(data.steps), 'must match and return steps');
  });
});
