# Work-side evidence prompt (companion to plan.md Phase 1 and §6)

Purpose: paste into an agent running **inside the work environment** (Claude Code, Codex, etc.) to reconstruct
what Eric actually did, with evidence and confidentiality classification, so website copy can be written
accurately. It produces an evidence pack, not website copy. Check employer policy on running agents over
internal code before use; only the sanitized `30-draft-phrasings.md` should cross to personal devices, and
anything with a number needs comms sign-off before publication.

---

# Task: assemble a career evidence pack for my personal website

You are running inside my work environment with access to my authored code, PRs,
design docs, tickets, incident records, and internal wiki. Your job is to help me
reconstruct what I actually did here, with evidence, so I can describe it
accurately and safely on my personal website (ericqiu.dev), on LinkedIn, and in
a résumé. You are NOT writing the website. You are producing a structured,
classified evidence pack that I will review and sanitize by hand.

## Hard rules

1. Everything you produce stays in this environment. Write to `~/career-evidence/`
   only. Do not send anything to external services, paste into tickets, or commit
   to any repo.
2. Never copy source code, config, hostnames, internal URLs, customer/client names,
   or personal names of colleagues into the pack. Cite by reference (PR number,
   doc title, ticket ID) so I can go look, but don't reproduce contents.
3. Classify every single line item with one of:
   - `PUBLIC-SAFE` — already visible externally (public talk, public blog, job posting language, open-source)
   - `SANITIZABLE` — real substance that can be described in generic terms (e.g. "multi-tenant control plane" not the internal product name)
   - `INTERNAL-ONLY` — numbers, names, architectures, or roadmap that must not leave the building
   When in doubt, mark it `INTERNAL-ONLY`. I will downgrade classifications myself.
4. Only use systems I am already authorized to access. If you hit a permission
   boundary, note it and move on; don't work around it.
5. Distinguish clearly between what I authored, what I reviewed, what I led, and
   what my team did. Overclaiming is worse than underclaiming.

## What I need to know (the questions the website can't currently answer)

A. **Timeline and title.** Exact start dates, title changes, promotions, team
   changes, tech-lead or workstream-lead scope, mentoring/onboarding I did.
   Include the 2020 co-op term (Jan–Apr 2020) and the 2018 co-op (Sep–Dec 2018,
   Derivatives Data / vol-surface ML) — what did I actually ship in each?

B. **The platform, in one sentence per system.** For each service or component I
   have materially worked on: what it is in generic terms (control plane, data
   plane, operator, scheduler, storage, queue, tenancy layer, CLI, SDK, CI/CD),
   who its consumers are, and my role on it (designed / built / owned / on-call /
   migrated / reviewed).

C. **Scale and outcome numbers**, each with source, date, and classification:
   tenants or teams served, clusters/regions, request rates, data volumes,
   latency or availability targets and actuals, incident counts before/after,
   cost or capacity effects, migration sizes, adoption curves. Give me the
   number, where it came from (dashboard name, doc title, review packet), and
   whether it was ever stated externally.

D. **Ownership stories (STAR format), 4–8 of them.** Situation, what I did, the
   result, and the evidence link. Prioritize: things I designed from scratch,
   hard debugging or incidents I drove, migrations, cross-team work, anything
   where the DR / resilience posture mattered, anything where I changed how
   other teams work.

E. **Reliability and operations.** On-call participation and rotation, postmortems
   I authored or led, SLOs I defined or hit, DR tier requirements in plain
   English (what does the compliance tier actually require of a service owner?).

F. **Leverage.** Design docs/RFCs I authored (title + date + outcome), internal
   talks or brown bags, interview loops, mentoring, code-review volume, standards
   or templates I wrote that others adopted.

G. **Skills as evidenced by code, not as claimed.** From my authored commits and
   PRs over the last 5 years: languages by lines/PRs, frameworks, infra tooling,
   testing practices, anything notable (e.g. wrote a Kubernetes operator, a gRPC
   service, a Terraform module, a data pipeline). Give counts and date ranges.

H. **Candidate public writing topics.** From all of the above, list 5–10
   engineering problems I've worked on that could become 300–600-word anonymised
   notes ("what tenancy isolation actually costs", "what the top DR tier means
   for a service owner", "a zero-downtime migration"), with a one-line sketch of
   the lesson and a classification of how sanitizable each is.

I. **Gaps.** What you looked for and could not find or could not access, and the
   specific questions I should ask my manager or peers to fill them.

## How to work

1. Inventory first: list the sources you can reach (repos where I'm an author,
   doc spaces, ticket projects, incident tooling, review/promo artifacts if
   accessible) and roughly how much material each holds. Write this to
   `00-inventory.md` before extracting anything.
2. Extract by source, one file per source (`10-git.md`, `11-design-docs.md`,
   `12-tickets.md`, `13-incidents.md`, `14-reviews.md`, ...). Use dated,
   referenced bullets. No prose yet.
3. Then synthesize into `20-evidence-pack.md` organized by sections A–I above.
   Every bullet: claim → evidence reference → classification.
4. Write `30-draft-phrasings.md`: for each `SANITIZABLE` item, two phrasings —
   one at the specificity of a LinkedIn bullet, one at the specificity of a
   personal website with no internal nouns. Mark any quantity that would need
   comms approval with `[APPROVAL]`.
5. Write `40-gaps-and-questions.md` (section I).
6. Stop and report. Do not iterate on wording; I'll do that elsewhere with a
   voice guide. Depth over breadth: I'd rather have four ownership stories with
   airtight evidence than twelve vague ones.

## Context on why

My website currently says "managed multi-tenant distributed DR-1 compliant cloud
services in use by over 300 teams" and nothing else about five years of work.
Reviewers of the site said the same thing independently: it describes the team,
not me, and asserts without showing. This pack is how I fix that without
guessing or leaking.

---

## After it runs

Bring back only `30-draft-phrasings.md` plus answers to plan.md §6. That is enough to rewrite the hero,
Work section, and JSON-LD against the voice guide in `reports/report-content.md` §6, and to draft the first
two "problems I've worked on" notes (plan Phase 3.3).
