---
sidebar_position: 2
---

# Goose Agents Building zkSDK

The zkSDK project is run by a persistent Goose workspace (`zksdkjs/agent/privacy-agent`) that coordinates seven specialized AI agents. Each agent maps to a recipe in `automation/recipes` and a shell entry point in `automation/scripts`.

## Agent Roster

| Agent | Model | Recipe | Focus |
| --- | --- | --- | --- |
| **Chief Strategy Officer** | Claude Opus | `recipe-strategy-chief.yaml` | Roadmapping, risk calls, cross-agent prioritization, and updating `plans/`. |
| **Developer Agent** | Qwen Coder 32B | `recipe-developer.yaml` | Implements providers, updates `sdk/packages/**`, and records deliverables in `outputs/social/dev_summary_*.md`. |
| **Tester Agent** | Qwen Coder | `recipe-tester.yaml` | Generates Jest suites, runs targeted `npm test` commands, and reports gaps. |
| **Research & Intelligence** | Claude Opus | `recipe-research-intelligence.yaml` | Digs into new privacy protocols, documents findings in `outputs/strategic/`. |
| **Marketing & Growth** | Claude Opus | `recipe-marketing-growth.yaml` | Builds developer funnels, partner outreach plans, and community updates. |
| **Social / Content** | Claude Opus | `recipe-social.yaml` | Turns daily summaries into Twitter threads, blog posts, and tutorials. |
| **Release & Operations** | Claude Sonnet | `recipe-release-operations.yaml` | Owns launch sequencing, enterprise readiness, and health checks. |

Specialist boosters (Railgun, Aztec, fhEVM, Bitcoin, Privacy Cash) live next to the core recipes and are launched as needed by the orchestration scripts.

## How the System Stays in Sync

- `automation/scripts/launch-strategic-system.sh` bootstraps memory, rotates through providers based on `memory/build_progress.json`, and ensures every agent reads existing code before writing new lines.
- `automation/scripts/goose-continue.sh`, `smart-continue-real-hour.sh`, and `run-forever.sh` keep long-lived sessions alive, restoring context from `~/.local/share/goose/sessions/`.
- Progress snapshots (`memory/build_progress.json`) are refreshed before each work cycle. The updater counts TypeScript lines for each provider (`fhevm`, `railgun`, `privacy-cash`, `aztec`, `bitcoin`) and tags them as `not_started`, `partial`, or `complete`.
- Output directories are contractually defined:  
  - `outputs/social/` → Twitter threads, blog drafts, dev summaries  
  - `outputs/strategic/` → planning documents and OKRs  
  - `outputs/logs/` → chronological execution logs for audits

Everything you read in this documentation should map directly to an artifact in those folders.

## Running the Fleet Locally

1. Install Goose and configure model credentials (`goose configure`). The workspace defaults to OpenRouter for Qwen and Anthropic for Claude, as outlined in `SETUP.md`.
2. From `privacy-agent/`, run `./automation/scripts/launch-strategic-system.sh` for the full orchestration, or pick a targeted agent:
   - Railgun implementation push: `goose run --recipe automation/recipes/recipe-railgun-specialist.yaml --max-turns 20`
   - fhEVM refinement: `goose run --recipe automation/recipes/recipe-zama-fhe-specialist.yaml --max-turns 20`
   - Aztec PXE debugging: `goose run --recipe automation/recipes/recipe-aztec-specialist.yaml --max-turns 20`
3. Tail live output: `tail -f logs/*.log` and watch `outputs/social/dev_summary_*.md` for the daily recap.
4. Before editing docs, read the most recent summary plus the matching plan in `plans/*.md` so new copy reflects reality.

## Why Goose?

Block's Goose framework gives us:

- Local-first execution with full repository access.
- Per-task recipes that encode the "Fortune 500" management pattern (Strategy → Research → Build → Review → Publish).
- Persistent memory via JSON files, so agents never restart from a blank slate.
- Multi-model routing: heavy reasoning goes to Claude, high-throughput coding stays on Qwen.

The result: zkSDK evolves 24/7, and every change is inspectable. If you are updating this page, verify the recipe definitions and latest outputs before shipping new text.
