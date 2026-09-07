# ericqiu.dev — Career / Hiring-Manager Audit

(Saved by the orchestrator from the subagent's returned text; the subagent could not write to the scratchpad.)

**Verified facts that drive the findings**

- `github.com/itsericqiu/ericqiu.dev` is **public**. Root tree contains `CLAUDE.md`, `PLAN.md`, and `.claude/memory/{editorial-redesign-notes,palette-notes,work-tracking}.md`. Anyone can read the content critique of Eric's own copy and the full backlog.
- Lab pages are live on production: `/_lab`, `/palette-preview` (114KB), `/hero-anim`, etc. (`.html` URLs 308 to extensionless routes, serve 200).
- GitHub profile: bio "☕ continuously caffeinating" / "My birthstone is coffee bean". 31 public repos, 11 followers. Pinned: `ericqiu.dev`, `mini-site`, `uscis-caselens`. **Active 2026 projects the site never mentions:** `home-stack` (Go, "Portable private Tailnet home-stack on macOS with Caddy ingress", pushed 2026-09-05), `home-portal` (TS PWA, 2026-08-29), `gallery-next` (Astro, 2026-08-24 — presumably the photo site), `uscis-caselens` (userscript with a well-written README, PRIVACY.md, SECURITY.md, threat model, 2026-08-17), `dotfiles`, `homelab`. Also `wtr-3b`, `wtr-4a` (Waterloo work-term reports, public) and a `blog` repo (2019–2023, never surfaced).
- Portfolio repo last push 2026-04-27; GitHub activity continues through 2026-09-05. The site is 4+ months behind the person.
- `ericqiu.io` ("Chat with me →" target): 2018 Netlify page, UA analytics, JSON-LD `jobTitle: "Software Engineer"`, `knowsAbout: ["Eric","Qiu","Piano","Seattle",…]`, links `about.me/ericqiu`. No chat, form, or calendar.
- `photos.ericqiu.io`: "Photos from places I've been." Places (6), Series (7), Archive (47). Reads as curated, professional-grade.
- LinkedIn blocked by egress proxy (not evaluated).

## 1. The 20-second test

- *Seniority:* Ambiguous. Kicker says "Software Engineer"; `<title>` says "Senior Software Engineer"; OG title says "Software Engineer"; GitHub says "Cloud Infrastructure Software Engineer". Must scroll to Work to see "Senior".
- *Domain:* infra/platform, but the only specifics are "managed multi-tenant distributed DR-1 compliant cloud services in use by over 300 teams" — a *team* description, not a *person* description. What is the service? What did *he* own?
- *Scope:* "300+ teams" is the best number on the site and it's buried in a 41-word run-on. It belongs in the hero.
- *Trajectory:* Six co-ops (2017–2020) then one job (2021–). Co-ops get 5 of 6 entries at equal visual weight.

**Missing before an intro call** (ranked): (1) one sentence of what the system is (control plane / data plane / operator / tenancy / SLO nouns); (2) 2–4 outcomes with numbers; (3) a "what I'm looking for" line; (4) a résumé PDF; (5) technical depth evidence outside the employer — the GitHub already has it (`home-stack`, `uscis-caselens`) but none is on the site; (6) consistent title/identity across all surfaces.

## 2. Credibility evidence gap — ranked

| # | Addition | Effort | Payoff | Notes |
|---|---|---|---|---|
| 1 | **Projects / "Selected work"** (4–5 cards): photo site, `uscis-caselens`, `home-stack` (Go, Tailnet, Caddy — *this is infra*), this site's token pipeline | S–M | High | Converts "hobbyist" into "ships things". |
| 2 | **2–4 "Problems I've worked on" notes** (300–600 words, anonymised): tenancy isolation; what DR-1 means for a service owner; a zero-downtime migration; on-call lessons | M–L | Very high | Separates "works at Bloomberg on infra" from "is a systems thinker". Needs employer-comms sanity check. |
| 3 | **`/resume` + PDF** | S | High for recruiters | Backlog has said "once available" since March. |
| 4 | **Blog, 3 posts** | L | High if sustained; zero if it stalls | The dead `blog` repo is a warning. Do #2 first — those *are* the posts. |
| 5 | **`/now`** | S | Medium | Answers "what are you into / looking for" in 150 words; natural home for homelab tinkering and availability. |
| 6 | **Talks/podcasts** | L (external) | High but slow | NYC meetup lightning talk on any #2 topic. |
| 7 | **`/uses`** | S | Low | On-brand, zero hiring signal. Fold into `/now` or skip. |

**Sequence:** Projects → Résumé → `/now` with availability line → first note → notes 2–3 → `/writing` index.

## 3. Experience section as a hiring manager reads it

Weighting is wrong for 2026: six visually identical blocks; five are 4-month co-ops from ages 19–21; the role that matters gets one team-level paragraph.

**Proposed restructure:**

```
Bloomberg LP — Senior Software Engineer, Software Infrastructure   2021 – present
  One line: what the platform is (control plane / multi-tenant / N clusters / 300+ teams)
  • Outcome bullet with a number
  • Ownership/design bullet
  • Reliability bullet (on-call, SLOs, DR posture in plain English)
  • Leverage bullet (mentoring, cross-team, workstream lead)
  "Previously co-op here in 2020 (same team) and 2018 (Derivatives Data ML)."

Earlier (co-ops, 2017–2020) — compact one-line-each list, mono, muted:
  Addepar · SWE Co-op · 2020 · 2FA audit & admin tooling
  Bloomberg · SWE Co-op · 2020 · Software Infrastructure (returned full-time)
  Postmates · SWE Co-op · 2019 · Courier self-service support (led 3-dev project)
  Bloomberg · SWE Co-op · 2018 · ML model for implied-vol surfaces
  BMO CM · Quant Dev Co-op · 2018 · FICC desk tooling
  LCBO · Full Stack Co-op · 2017 · In-store 3D inventory mapping
```

**Copy that reads negatively:** "Candidate for Bachelor of Software Engineering 2016–2020" (reads as unfinished degree); "DR-1 compliant" as a *skill*; "Assisted Data Cognition desk"; "blockchain… analogous to ICOs" (2018 framing draws a smirk in 2026); "Architected and led multi-developer team" as a 4-month intern (overclaim — use a real number); "6+ years of experience" (recruiter computes 5 FT); "Coffee Addict" in the kicker/OG; 41-word Bloomberg sentence with internal org names; Specialties row (HCI is a course; Full-Stack dilutes infra positioning); no "next" statement.

## 4. Photography & personality

Six hobby mentions in ~600 words (seven counting the GitHub bio); ≈80 words of hobby copy vs ≈41 words of concrete copy about the current job; every mention framed apologetically ("aside/also/too/outside work"). **Dilutes at this dose.** Right dose: once in the hero (keep the X100VI line, drop coffee from the kicker), once as a *project card*, Instagram in footer. Photo site is a career asset, mis-filed: a shipped, self-built Astro product with real IA — reads as taste, finishing ability, curation. Frame as "Built and shot photos.ericqiu.io — Astro, image pipeline, 47 photos across 13 collections".

## 5. Contact friction

Today: LinkedIn InMail, or hand-retype `hello[at]ericqiu[dot]io` on a different domain; "Chat with me →" opens a blank 2018 page (assume broken / unmaintained). Fix (all S): plain `mailto:`; kill or redirect "Chat with me →" (Cal.com if he wants conversations); one-line availability statement ("Not actively looking, but happy to talk infra/platform/staff-level roles in NYC or remote. I reply within a few days."); 301 `ericqiu.io` → `ericqiu.dev`; add `email` to JSON-LD.

## 6. Comparables (patterns, not templates)

Marc Brooker (brooker.co.za — one systems idea per short essay); Dan Luu (writing-first *and* terse résumé page); Julia Evans (jvns.ca — public notes without leaking internals; plain "what I do / not available for"); Xe Iaso (personality never at the expense of depth; explicit Talks/Resume/Contact-with-expectations); Rachel Kroll (anonymised war stories — never names the system, always names the lesson; exactly Eric's genre); Mitchell Hashimoto ("what I'm working on now" + one-line projects); Tanya Reilly (explicit about scope and leverage — senior→staff). Common: writing is primary evidence; plain dated résumé; projects one line + link; plain email + expectation; none mention coffee more than once.

## 7. Risks

| Sev | Risk | Fix |
|---|---|---|
| High | Public repo exposes self-critique and internal notes (`.claude/memory/*`, `PLAN.md`) via the *first pinned repo*. | Move notes out / gitignore `.claude/` or flip private; make `CLAUDE.md` operational-only. Before linking repo from Projects. (S) |
| Medium | Employer-specific detail: "DR-1", "300 teams across all businesses", "Bloomberg Engineering and Global Data", "Data Cognition desk", "Symphony messages", 2018 vol-surface product line. | Sanity-check against comms policy; translate to plain English. (S) |
| Medium | Stale `ericqiu.io` contradicts new site; is CTA target and email domain. | 301 → ericqiu.dev. (S) |
| Medium | Inconsistent title across kicker/OG/title/JSON-LD/GitHub. | One string everywhere incl. LinkedIn. (S) |
| Medium | Lab pages in production, crawlable, loading third-party Google Fonts. | Move off `public/` or noindex. (S–M) |
| Medium | Site reads abandoned vs GitHub (Apr vs Sep). Build-time copyright freezes. | Projects/`/now` give reasons to redeploy; "last updated" line. (S) |
| Low | Public work-term reports `wtr-3b`, `wtr-4a` may describe employer systems. | Check; private if needed. |
| Low | GitHub bio is 100% coffee; 11 followers; portfolio repo full of AI planning notes. | Bio: "Senior SWE, Software Infrastructure @bloomberg · Go/Kubernetes · NYC". Pin `home-stack`, `uscis-caselens`, `gallery-next`. Profile README. |
| Idea | Without `/resume`, LinkedIn is the de-facto résumé — the one surface he doesn't design. | Ship `/resume` as canonical. |

## Quick wins (≤1 hour each)

1. Kicker → `Senior Software Engineer // Infrastructure // New York City` (also fixes OG).
2. Unify title across `kicker`, `ogTitle`, `pageTitle`, JSON-LD, GitHub bio.
3. Remove "Candidate for Bachelor of Software Engineering".
4. Remove "DR-1 Compliance" from `techStack`; plain-English the Bloomberg sentence.
5. Replace "6+ years of experience" or delete.
6. Replace "Chat with me → ericqiu.io" with mailto or Cal.com; add availability line.
7. Plain `mailto:` in footer; add `email` to JSON-LD.
8. Cut the contact-tagline hobby clause and the "There's a photo side too" strip.
9. GitHub: rewrite bio, re-pin, add profile README.
10. Gitignore `.claude/`, remove `.claude/memory/` and `PLAN.md` from the public repo (or flip private).
11. 301 `ericqiu.io` → `ericqiu.dev`.

## Bigger bets

1. Restructure Work: Bloomberg one-liner + 4 outcome bullets; co-ops to compact "Earlier" list. (M)
2. Projects section: photo site, `uscis-caselens`, `home-stack`, token pipeline. (S–M)
3. 2–4 anonymised "problems I've worked on" notes. (L, over a quarter.)
4. `/resume` + `/now`. (S each.)
5. Move the design lab off production. (M)
6. NYC infra-meetup lightning talk; then a Talks line. (L, external.)

## Open questions only Eric can answer

1. What *is* the platform, at the publicly allowed specificity? Which parts did you personally design/own?
2. Hired as Senior in 2021 or promoted? Any tech-lead/staff scope not stated?
3. Three shareable numbers (tenants, clusters, p99, availability, incident reduction, migration size)?
4. What's next — bigger scope, a move, staff-level infra? Active or passive? NYC-only or remote?
5. Is Bloomberg comms OK with "300 teams", "DR-1", "Global Data", the 2018 vol-surface line?
6. Does `hello@ericqiu.io` get read? Plain mailto acceptable? Cal.com?
7. Comfortable describing `home-stack` publicly?
8. Was public visibility of `.claude/memory/`, `PLAN.md`, and the lab pages intentional?
9. Do `wtr-3b` / `wtr-4a` contain employer details that should be private?
10. Photography: hero differentiator or project card?

## Cross-cutting notes

- Performance/design work is strong and *not* the bottleneck; content is. Further palette/animation iteration has negative marginal return until Work/Projects/Contact are fixed.
- Career-relevant backlog items (#7, #8, #11, DR-1 removal, résumé PDF) have sat open while colour-direction items (#1–#4) got attention. Invert that priority.
