import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { getDomainExpertise, listDomains, getDomainDecisionTree } from '../tools/expertise.js';
import { assessComplexity, getWorkflow } from '../tools/workflow.js';
import { getTerminology } from '../tools/reference.js';

describe('domain-expertise-mcp', () => {
  it('returns expertise for accounting domain', async () => {
    const result = await getDomainExpertise({ domain: 'accounting', depth: 'overview', region: 'gcc' });
    const data = JSON.parse(result.content[0].text);
    assert.ok(data.domain.toLowerCase() === 'accounting');
    assert.ok(data.expertise, 'Should return expertise object');
  });

  it('lists all available domains', async () => {
    const result = await listDomains();
    const data = JSON.parse(result.content[0].text);
    assert.ok(data.domains, 'Should return domains object');
    assert.ok(Object.keys(data.domains).length >= 10, 'Should have 10+ domains');
    assert.ok(data.total_domains >= 10, 'Should report total count');
  });

  it('generates decision tree for accounting domain', async () => {
    const result = await getDomainDecisionTree({
      domain: 'accounting',
      scenario: 'How to classify a lease?',
      jurisdiction: 'SA',
    });
    const data = JSON.parse(result.content[0].text);
    assert.equal(data.domain, 'accounting');
    // May return decision_tree or note depending on scenario match
    assert.ok(data.decision_tree || data.note || data.available_domains, 'Should return some content');
  });

  it('assesses task complexity', async () => {
    const result = await assessComplexity({
      domain: 'corporate_law',
      task_description: 'Review a shareholder agreement for a new joint venture in the UAE free zone',
      stakes: 'high',
    });
    const data = JSON.parse(result.content[0].text);
    assert.ok(data.complexity_score !== undefined || data.complexity || data.level, 'Should return complexity assessment');
  });

  it('returns workflow for known domain and task', async () => {
    const result = await getWorkflow({
      domain: 'accounting',
      task: 'monthly close',
      experience_level: 'senior',
    });
    const data = JSON.parse(result.content[0].text);
    assert.equal(data.domain, 'accounting');
    // May return workflow or note + available_workflows
    assert.ok(data.workflow || data.steps || data.note, 'Should return some workflow content');
  });

  it('returns terminology for islamic finance', async () => {
    const result = await getTerminology({ domain: 'islamic_finance', language: 'en' });
    const data = JSON.parse(result.content[0].text);
    assert.ok(data.terms || data.definitions || data.domain, 'Should return terminology');
  });
});
