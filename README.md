# domain-expertise-mcp

Inject structured professional domain expertise into AI agents. Accounting, Islamic finance, cybersecurity, real estate, HR, and 15+ more domains — all via MCP.

[![npm version](https://img.shields.io/npm/v/domain-expertise-mcp)](https://www.npmjs.com/package/domain-expertise-mcp)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

## Why This Exists

AI agents are generalists. They know a little about everything but lack the structured reasoning patterns that professionals develop over decades. This MCP server bridges that gap — giving any agent access to decision frameworks, professional workflows, terminology, and regulatory context across 24 professional domains.

No other MCP server provides structured domain expertise injection.

## What It Does

### Core Tools

- `get_domain_expertise` — Get structured professional knowledge at three depth levels (overview, practitioner, expert). Includes decision frameworks, key principles, common pitfalls, and expert reasoning patterns.
- `list_available_domains` — See all 24 available professional domains with coverage details.
- `get_decision_tree` — Get step-by-step decision logic for specific professional scenarios (e.g., "Is this transaction Sharia-compliant?", "Should I register for VAT?").
- `get_terminology` — Professional terms with definitions in English and Arabic. Includes usage context and common misunderstandings.
- `get_regulatory_context` — Regulatory bodies, applicable laws, compliance requirements, and recent changes by jurisdiction.
- `assess_complexity` — Score a task's complexity and get recommendations for agent capability level needed.
- `get_professional_workflow` — Standard professional workflows with quality checkpoints and common shortcuts that cause problems.

### Supported Domains (24)

**Finance:** Accounting, Tax, Audit, Islamic Finance, Conventional Banking, Investment, Insurance (Underwriting & Claims)

**Legal:** Corporate Law, Contract Law, Employment Law

**Healthcare:** Clinical, Administration, Pharmaceutical

**Real Estate:** Commercial, Residential

**Technology:** Cybersecurity, Data Privacy

**Operations:** Supply Chain, Logistics, Construction, Oil & Gas

**People:** Education, HR Management

### Regional Coverage

Global, GCC, MENA, EU, US, UK, Asia — with GCC-specific knowledge for Saudi Arabia, UAE, Kuwait, Bahrain, Oman, and Qatar.

## Installation

### Claude Desktop / Claude Code

```json
{
  "mcpServers": {
    "domain-expertise": {
      "command": "npx",
      "args": ["domain-expertise-mcp"]
    }
  }
}
```

### Cursor

Add to `.cursor/mcp.json`:

```json
{
  "mcpServers": {
    "domain-expertise": {
      "command": "npx",
      "args": ["domain-expertise-mcp"]
    }
  }
}
```

## Use Cases

**Building a financial agent?** Inject accounting expertise so it handles revenue recognition, lease classification, and IFRS compliance like a CPA.

**Islamic finance automation?** Get Sharia compliance decision trees, Murabaha/Sukuk structures, and AAOIFI standards for your agent.

**Cybersecurity tool?** Add incident response workflows, NIST CSF alignment, and NCA/NESA compliance knowledge.

**HR automation for GCC?** Nitaqat/Saudization calculations, Emiratisation requirements, and end-of-service computations.

## Example

```
Agent: "I need to determine if a client's Islamic finance product is Sharia-compliant"

→ get_decision_tree(domain: "islamic_finance", scenario: "sharia compliance")

Returns a structured decision tree:
1. Does the transaction involve riba (interest)? → If yes: NOT COMPLIANT
2. Is there excessive gharar (uncertainty)? → If yes: NOT COMPLIANT
3. Is the underlying activity halal? → If no: NOT COMPLIANT
4. Is risk genuinely shared? → If no: REVIEW NEEDED
5. If all pass → LIKELY COMPLIANT. Submit to Sharia Board.
```

## Depth Levels

| Level | Content | Word Count |
|-------|---------|------------|
| Overview | Principles, key standards, common mistakes | ~500 words |
| Practitioner | + Decision frameworks, regional specifics, expert tips | ~1,500 words |
| Expert | + Reasoning patterns, edge cases, nuanced judgment | ~3,000 words |

## Pricing

| Tier | Price | Included |
|------|-------|----------|
| Free | $0 | 3 domains, 100 queries/month |
| Starter | $29/month | 10 domains, 1,000 queries |
| Pro | $149/month | Unlimited domains, 15,000 queries, custom domain upload |
| Enterprise | $599/month | Unlimited + custom training, team access, SLA |

## Requirements

- Node.js 18+
- No API keys needed for free tier

## License

MIT

## Keywords

domain-expertise, mcp, mcp-server, professional-knowledge, ai-agent, accounting, islamic-finance, cybersecurity, legal, real-estate, healthcare, knowledge-injection, industry-knowledge, model-context-protocol
