# Content & Positioning Audit — ericqiu.dev

Reviewer role: content strategist / copy editor for personal brands.
Scope: every string a visitor reads (`src/site.ts`, `src/pages/index.astro`, `Hero.astro`, `Nav.astro`, `Footer.astro`, `EducationCard.astro`, JSON-LD in `Base.astro`, OG image copy in `og-image.png.ts`), plus the two external destinations the page sends people to (`ericqiu.io`, `photos.ericqiu.io`). Repo untouched.

Evidence gathered beyond the repo:
- `ericqiu.io` (target of "Chat with me →") is a 2018 anime.js chat-bubble bio. Its bundle contains the visitor-facing strings *"I'm Eric, a Computer Science …"*, *"Software Infrastructure Engineer at …"*, *"When a photo makes it off my SD cards, it eventually makes it onto …"*, and — the important one — *"You can find my current landing page at [ericqiu.dev]"*. The CTA sends a visitor to a page whose payload is a link back to the page they just left. Meta description still says "Software Engineering Student"; Twitter creator is `@eqiu1998`; analytics is dead UA; its JSON-LD publishes `"email": "hello@ericqiu.io"` in plain text.
- `photos.ericqiu.io`: "Photos by Eric Qiu" / h1 "Photos from places I've been." / lede "Photos from trips, walks, and older folders I haven't gone through." Nav: Places (6), Series (7), Archive (47). About h1: "Where I put the photos." Links back to ericqiu.dev and Instagram. A real, well-made, modest site — and its copy voice (dry, specific, un-salesy) is better than the hobby copy on the main site.
- GitHub API not reachable through the proxy; could not assess raw material for a projects section. Flagged as a question.

---

## 1. Positioning diagnosis

**Who lands here.** Almost everyone arrives from a LinkedIn profile click, a recruiter's sourcing tab, an Instagram bio link, or a colleague/Google search. No blog or projects, so nobody arrives via content. The visitor already knows one fact ("works at Bloomberg" or "takes photos") and wants to answer one question: *is this person senior, credible, and worth a message?* They give it 20 seconds.

**What they should believe after 20 seconds.** "Senior infrastructure engineer who owns platform-scale systems at Bloomberg (300+ teams depend on them), Waterloo pedigree, NYC, reachable, and — as texture, not headline — someone with taste."

**What the page actually says.** The kicker is the first line read and the first line in the OG card (`site.kicker` feeds both `Hero.astro` and `og-image.png.ts:69`): **"Software Engineer // Coffee Addict // New York City."** Then a huge name, a bio that is a company list, then "I also shoot photos →". Seniority is absent from everything above the fold ("Senior" appears only in `<title>`, meta description, JSON-LD and the Work entry). The only number on the site ("over 300 teams") is buried mid-sentence behind "DR-1 compliant."

**Is "Coffee Addict" serving the audience?** No, and the cost is asymmetric:
- Recruiters/hiring managers: "addict" is a 2015 internet-bio trope ("coffee addict / dog dad / pizza enthusiast"). On a page whose entire design language is *restraint* — Fraunces, hairline rules, section numerals — it is the one element that reads as a Twitter bio. It also occupies one of three slots in the line that shows up in every LinkedIn/Slack/iMessage unfurl.
- Senior engineers/collaborators: they won't hold it against him, but it tells them nothing. "Software Infrastructure" would.
- It is also the *weakest* of the coffee mentions: `bioAside` ("pour over coffee") and `footerBio` ("chasing a good pour over") are specific and pleasant; "addict" is generic.

The design is doing sophisticated, adult work. The copy is not yet matching it. That is the diagnosis.

**Severity: High. Effort: S.** One-line change in `src/site.ts`; propagates to hero + OG image.

### Kicker / bio directions (conservative → distinctive)

All keep the Space Mono uppercase register and ≤ ~50 chars so the OG render doesn't wrap.

**A. Conservative — title/employer/place.**
> `SENIOR SOFTWARE ENGINEER // BLOOMBERG // NEW YORK`

Bio: *"I work on Bloomberg's Software Infrastructure team, building managed distributed services that 300+ engineering teams run on. University of Waterloo CS. Previously Addepar, Postmates, and BMO Capital Markets."*
Aside: *"Off hours: a Fujifilm X100VI, pour-over coffee, and whatever book is face-down on my desk."*

**B. Discipline-first (recommended).** Drops the generic title for the specialty; "Bloomberg" moves to the bio where it can carry the number.
> `SOFTWARE INFRASTRUCTURE // NEW YORK CITY`

Bio: *"I build the multi-tenant cloud services other teams at Bloomberg build on — 300+ of them, across every business. Waterloo CS, by way of Hamilton, Ontario. New York since 2021."*
Aside: *"Evenings are for a camera and a kettle."*

**C. Newspaper dateline.** Kicker becomes a byline, not a tag cloud.
> `SENIOR SOFTWARE ENGINEER, BLOOMBERG — NEW YORK, N.Y.`

Bio: *"Distributed systems and cloud infrastructure at Bloomberg. Before that, four years of Waterloo co-ops: Addepar, Postmates, BMO Capital Markets, Bloomberg."*

**D. Distinctive — a claim, not a label.** Promotes the existing skills statement ("I build the infrastructure other systems depend on"), the best sentence on the site, currently hidden in section 03.
> `INFRASTRUCTURE OTHER SYSTEMS DEPEND ON // NYC`

Bio: *"Senior Software Engineer on Bloomberg's Software Infrastructure team. My work is the platform under 300+ teams' work — when it's going well, nobody notices it. Waterloo CS. Previously Addepar, Postmates, BMO Capital Markets."*
Aside: *"I also keep a photo site, a pour-over habit, and a stack of half-read books."*

**E. Keep the hobby, lose the trope.** Specificity is what separates personality from cliché.
> `SOFTWARE INFRASTRUCTURE // X100VI // NEW YORK`

(Only works if photography gets the single confident treatment in §4.)

Note on `//`: a code-comment idiom, slightly at odds with the serif concept, but consistent with the mono caption register and nav. Keep if the content is professional (A, B, E); use ` — ` for the dateline form (C). Don't mix.

---

## 2. Line-by-line copy edit — Work and Education

General problems across all six descriptions (`src/pages/index.astro:20–86`):
1. Every entry is one 35–50-word sentence opening with a participle ("Working in…", "Designed and developed…", "Architected and led…", "Trained and productionized…", "Prototyped proof-of-concept…", "Worked on full-stack development…"). Résumé syntax set in Fraunces.
2. Internal nouns leak: *DR-1 compliant*, *Bloomberg Engineering and Global Data*, *Data Cognition desk*, *Enterprise Data clients*, *FICC desk*.
3. Impact trails or is absent. "300 teams" is the only number.
4. Co-ops (4 months each) carry the same voice and weight as a 5-year senior role, and two claim architect/lead scope a reader will discount.
5. The two Bloomberg entries are incoherent: entry 1 lists *two* roles (Senior 2021–, Co-op Jan–Apr 2020) but describes only the current one — the 2020 co-op has no content — while the 2018 co-op gets a standalone entry further down. Backlog #7 (merge) is right.

Rewrites keep or shorten length. `[CONFIRM]` marks facts to verify.

### Bloomberg LP — merged entry
Roles (data model already supports this): Senior Software Engineer, Jun 2021 – Present · Software Engineering Co-op, Jan – Apr 2020 · Software Engineering Co-op, Sep – Dec 2018

**Current (senior):**
> Working in Software Infrastructure to architect and develop managed multi-tenant distributed DR-1 compliant cloud services in use by over 300 teams across all businesses and powering mission-critical applications at Bloomberg Engineering and Global Data.

**Rewrite:**
> Software Infrastructure. I design and run managed, multi-tenant distributed services used by 300+ engineering teams across every Bloomberg business, including the systems behind the Terminal's most critical applications. Built to the firm's highest disaster-recovery tier [CONFIRM: is that a fair translation of "DR-1", or cut?]. [CONFIRM: one concrete scale number — requests/day, clusters, regions, data volume — would do more than any adjective.]

**2020 co-op (currently no description):**
> Co-op, 2020 — [CONFIRM: team and one-line outcome].

**2018 co-op — current:**
> Trained and productionized machine learning model along with accompanying data pipeline to serve a new hybrid higher-quality and lower-latency data source for implied equity options volatility surfaces in Terminal and for Enterprise Data clients. Optimized Derivatives Data applications for performance.

**Rewrite:**
> Co-op, 2018 — Shipped an ML model and its data pipeline that gave the Terminal and enterprise data clients a faster, higher-fidelity source for equity options volatility surfaces [CONFIRM: latency/coverage number]. Also tuned Derivatives Data applications for performance.

### Addepar — Software Engineering Co-op, Sep – Dec 2020
**Current:**
> Designed and developed full-stack implementation of 2FA auditing and management tools for firm administrators within Addepar's portfolio analysis and financial graph product for Family Offices, Private Offices, and RIAs.

**Rewrite:**
> Built the two-factor-auth audit and management tools firm administrators use inside Addepar's wealth-management platform, end to end — data model, API, and UI. [CONFIRM: shipped to production during the term? number of client firms?]

(Cut "Family Offices, Private Offices, and RIAs" — fintech-insider taxonomy; "wealth-management platform" covers it.)

### Postmates — Software Engineering Co-op, May – Aug 2019
**Current:**
> Architected and led multi-developer team in tandem with Product Design to introduce automated self-service support workflows for Postmates Couriers including implementations in CRM, database, server job queue management in Kubernetes-based backend, and in-app/in-browser experience.

**Rewrite:**
> Led a small team, with Product Design, to build self-service support flows for couriers — replacing tickets that previously needed a human agent [CONFIRM framing]. Work spanned the CRM integration, backend job queues on Kubernetes, and the in-app and web experience. [CONFIRM: "led" as a 4-month intern is the most eyebrow-raising claim on the page; if it was "primary engineer among N", say that — more believable, just as strong.]

(Prior memory notes rank this the strongest entry. Partly disagree: strongest *content*, but credibility is undermined by "Architected and led multi-developer team" in a co-op slot.)

### BMO Capital Markets — Quantitative Developer Co-op, Jan – Apr 2018
**Current:**
> Prototyped proof-of-concept for blockchain-based bond-issuance platform analogous to ICOs for the Fixed Income, Currencies & Commodities desk. Assisted Data Cognition desk in work on solutions for mining trade and transaction data from Bloomberg Terminal and Symphony messages.

**Rewrite:**
> Built a working prototype of a bond-issuance platform on a distributed ledger for the fixed-income desk [CONFIRM: drop "blockchain"/"ICO" — in 2026 it dates the entry]. Also built tooling that extracted trade and transaction data from Terminal and Symphony chat for the desk's data team.

### LCBO — Full Stack Developer Co-op, May – Aug 2017
**Current:**
> Worked on full-stack development of in-store 3D inventory and product mapping solution for customer and sales representatives. Visited retail locations piloting the solution to conduct user research. Prototyped solutions for technology-based KYC applications and age verification.

**Rewrite:**
> Full-stack work on an in-store 3D map of inventory and products, used by shoppers and floor staff — including visits to pilot stores to watch people actually use it. Also prototyped age-verification approaches for checkout. [CONFIRM: "KYC" is a banking term; for a liquor retailer "age verification" alone is clearer.]

(The store-visit sentence is the most human line in Work — keep it, make it concrete.)

### Education
**Waterloo — current:** BCS 2016–2021 / David R. Cheriton School of CS / "Candidate for Bachelor of Software Engineering 2016–2020" / four course bullets.
Problems: "Candidate for … 2016–2020" reads as an unfinished second degree, and the overlapping dates make a reader stop. If the truth is "started in SE, transferred to CS", say it in three words or cut it. Course lists are what a new grad lists; for a senior engineer they lower perceived seniority. Department name adds nothing for a non-Waterloo reader.

**Rewrite (one line, no logo):**
> University of Waterloo — BCS, Computer Science, 2021. [CONFIRM: optionally "(began in Software Engineering)" / co-op designation / distinction.]

**POSTECH — rewrite:**
> POSTECH, South Korea — exchange term, 2019.

(Exchange in Korea is genuinely interesting; the course list is not.)

**Severity: High (Bloomberg coherence, Postmates credibility), Medium (rest). Effort: S–M.**

---

## 3. Information architecture

Current: Hero → 01 Work → 02 Education → 03 What I Do → 04 Get in touch → photo strip → Footer.

| Section | Keep? | Why |
|---|---|---|
| Hero | Keep, sharpen | Working. Fix kicker, bio, single CTA. |
| 01 Work | Keep, restructure | Merge Bloomberg (3 roles, one logo). Demote co-ops visually (backlog #8): smaller company name, one-line description, or group the five 2017–2020 co-ops under one rule labelled "Co-ops, 2017–2020". Six equal-weight entries, five of them four-month internships, make a senior page read as a 2021 new-grad page with one line added on top. |
| 02 Education | **Demote** to two lines inside/below Work | Five years post-grad, with 120px logos, department names and eight course bullets, it is the second-largest block on the page. Waterloo CS is a strong signal — one line delivers all of it. Cut logos, department, courses, "Candidate for". Also removes `waterloo-dark` special-casing and the `secondProgram` prop. |
| 03 What I Do | **Cut as a section** | Memory notes already suspect this; go further. "I build the infrastructure other systems depend on" should be promoted to the hero (direction D) or a Work sub-head. Tech rows are table stakes and contain two non-technologies ("DR-1 Compliance", "Human-Computer Interaction") and one non-skill ("Full-Stack Development"). "6+ years" is wrong either way (§5). Nothing here survives on its own. |
| 04 Get in touch | Keep, fix | §4. Rename to match nav. |
| Photo strip | Merge | Becomes the single photo mention (§4), or folds into "Now". |
| Footer | Keep, de-duplicate | Third restatement of the hero; replace with one line + links. |

**What's missing — be honest about raw material.** No writing, no talks, no OSS verifiable from here. Do **not** add a "Projects"/"Writing" heading with nothing behind it. Two additions have material today:

1. **Résumé PDF** (already in backlog). The single most requested artifact by the primary audience, and it is missing. Link from hero CTA row and contact. A PDF also lets the web page stop being a résumé, which frees the copy above.
2. **A short "Now" block — conditional.** Hobby copy is currently smeared across five places. A dated Now block ("September 2026 — Reading / Shooting / Brewing / Working on") collects it into one confident, specific place and gives repeat visitors a reason to look. **But** the last commit is 2026-04-27; a Now block saying "March 2026" in December is a liability. Do it only if Eric commits to a quarterly edit; otherwise an undated "Off hours" three-liner in the same slot. Either replaces `bioAside`, the strip, and the footer hobby sentence.

"Uses" / reading-list pages: not for this audience; a camera line fits inside Now.

**Recommended order:**
Hero (kicker · name · bio · professional CTA row incl. résumé) → **01 Work** (Bloomberg merged; co-ops grouped/lighter; Education as two closing lines) → **02 Now / Off hours** (photo link lives here, optionally with two thumbnails) → **03 Contact** → Footer (one line, links, email, ©).

Three numbered sections instead of four; the numerals stay.

**Severity: Medium–High. Effort: M.**

---

## 4. CTAs and contact

### "Chat with me →" — Critical, S
`index.astro:154` → `https://ericqiu.io`: a 2018 chat-bubble bio introducing him as a *"Computer Science …"* student, whose final message says *"You can find my current landing page at"* ericqiu.dev. The only professional action on the page besides LinkedIn bounces the visitor back to where they started and reveals an unmaintained 2018 page that contradicts "Senior".

Fix: remove the link today. Then 301 `ericqiu.io` → `ericqiu.dev` (preserves old inbound links), or if sentimental, park it at `2018.ericqiu.io` and never link it from the main site.

### Email obfuscation `hello[at]ericqiu[dot]io` — Medium, S
- Anti-scraping value in 2026: near zero. `[at]`/`[dot]` has been a harvester regex for fifteen years, and the legacy site's JSON-LD already publishes `hello@ericqiu.io` in plain text. The obfuscation protects nothing.
- Cost: not clickable (no `mailto:` on mobile, where much LinkedIn-referred traffic lands), copy-paste needs editing, screen readers say "hello bracket at bracket", email excluded from the site's own JSON-LD.
- Domain: it's on `ericqiu.io`, the legacy domain the site is otherwise retiring. Does mail on `.io` route long-term? [CONFIRM]

Recommendation, in order:
1. **Plain `mailto:hello@ericqiu.dev`** (or `.io`) with Cloudflare Email Routing (free; DNS is already at Cloudflare) so a spam flood can be re-routed or the alias rotated in one click. Spam is a filtering problem, not a markup problem.
2. If friction is wanted: two-line inline script assembling `user + '@' + host` into `<a href="mailto:">`, with `[at]` text in `<noscript>`. Same anti-bot value as today, but clickable.
3. Contact form via Worker + Turnstile: over-engineered for a personal page with no inbound-volume evidence; skip.
4. Cal.com link: only if he *wants* cold coffee-chat requests. Offer as a question, not a recommendation — it changes the kind of inbound he gets.

### Photography: five mentions → one confident treatment — Medium, S
Currently: hero CTA "I also shoot photos →" (the only CTA above the fold is the *hobby*), `bioAside` (X100VI), contact tagline ("…or photography"), strip "There's a photo side too. / See my photos →", footer bio ("evenings with a camera"). Two of the five are apologetic ("also", "there's a … side too").

The destination earns confidence: 47 photos, 6 places (Iceland, Vietnam, Japan, Spain, London, NYC), 7 series, its own dark mode, and copy drier and better than the main site's.

One treatment — keep **only** the strip, moved into the Now/Off-hours slot, written in the photo site's own voice:

> **Photos from places I've been.**
> Iceland, Vietnam, Japan, Spain, London, New York — shot mostly on a Fujifilm X100VI.
> `PHOTOS.ERICQIU.IO →`

(Reusing the h1 from photos.ericqiu.io makes the two sites read as one voice. Two small thumbnails here would do more than any sentence, if the design reviewer agrees.) The hero CTA then becomes professional (`Résumé → · Email → · LinkedIn →`), and "or photography" comes out of the contact tagline. Backlog #13's "I shoot with a Fujifilm X100VI." is fine, but a *place list* is more evocative than a camera model and advertises the collections that actually exist.

---

## 5. Microcopy and consistency

| # | Issue | Evidence | Fix | Sev / Effort |
|---|---|---|---|---|
| 5.1 | "Senior Software Engineer" vs "Software Engineer" | `pageTitle`, `description`, JSON-LD `jobTitle` say Senior; `kicker` and `ogTitle` don't. `dist/index.html`: 7× "Senior Software Engineer", 8× bare "Software Engineer". The share card (`ogTitle` + kicker image) is the *un*-senior version. | Pick one. "Senior Software Engineer" wherever a title appears, or discipline ("Software Infrastructure") in the kicker with "Senior…" in title/JSON-LD. Never let the OG card be the lesser one. | Medium / S |
| 5.2 | "6+ years of experience" | `index.astro:132`. Full-time Jun 2021 → Sep 2026 = 5 yr 3 mo. Co-ops: 6 × 4 mo = 2 yr, from May 2017. "6+" matches neither full-time (5), total (~7), nor span (9). A recruiter reading Work will do the arithmetic. | Cut the counter (it goes with the section). If a number is wanted: "Bloomberg since 2021 · shipping since 2017." Dates self-update; "N+ years" rots, and the page is already five months stale. | Medium / S |
| 5.3 | "Candidate for Bachelor of Software Engineering 2016–2020" | `index.astro:92–93` | Reads as an incomplete degree. Cut, or "began in Software Engineering, graduated BCS 2021". | Medium / S |
| 5.4 | Nav "Skills" ≠ "What I Do"; nav "Contact" ≠ "Get in touch" | `Nav.astro:4–5` vs `index.astro:129,150` | Agree with backlog #10 on "Contact" (the warmer heading is contradicted by the obfuscated email under it). "Skills": the section should go; if kept, the nav word wins. | Low / S |
| 5.5 | Coffee ×4, photography ×5, Waterloo ×4, Bloomberg ×6 | `site.ts` kicker/bio/bioAside/footerBio; tagline; strip | ~600 words restating six facts three times each. One fact, one home: employer + scale → hero bio; hobbies → Now block; Hamilton → footer line or hero bio, not both. | Medium / S |
| 5.6 | Footer bio duplicates hero bio — and is hard-coded | `Footer.astro:26–30` does not read `site.footerBio`; `site.ts` is not the single source of truth it claims (cross-cutting note for code reviewer) | One line: "Eric Qiu — Senior Software Engineer, Bloomberg. New York, via Hamilton, Ontario." Read from `site.ts`. | Low / S |
| 5.7 | `//` separators | `site.ts:17` | Fine with professional content. Use ` — ` for dateline form. Don't use `//` in hero and ` · ` in tech rows. | Low / S |
| 5.8 | Internal org names (Global Data, DR-1, Data Cognition, FICC, Enterprise Data) | Work descriptions | Translate or cut (§2). | Medium / S |
| 5.9 | `twitterHandle: "@itsericqiu"` vs legacy `@eqiu1998`; no X link on the page | `site.ts:27` | Confirm which is live; drop `twitter:creator` if dormant. | Low / S |
| 5.10 | JSON-LD `knowsAbout` lists "Full-Stack Development", "Human-Computer Interaction" | `Base.astro:173` | Align to positioning: Distributed Systems, Cloud Infrastructure, Multi-tenant Services, Kubernetes, Go. | Low / S |
| 5.11 | Contact tagline lists four things | `index.astro:151` | Good sentence, wrong list length: "Open to conversations about infrastructure and system design — or a good pour over." Skip the memory-notes suggestion of "respond within 48 hours" — support-desk phrasing. | Low / S |
| 5.12 | "Get in touch" over a non-clickable email | §4 | The heading promises ease; the mechanism refuses it. Fix the email or the heading. | Medium / S |
| 5.13 | Undated copy, design implies currency | last commit Apr 2026 | Date a Now block if added; otherwise avoid counters that rot. | Low / S |

---

## 6. Voice and tone guide

Derived from what already works: "Eric / *Qiu.*", the numerals, the hairline rules, the LCBO store-visit line, the photo site's copy.

1. **Say the specific thing.** "Fujifilm X100VI", "300+ teams", "Iceland, Vietnam, Japan" — yes. "Coffee addict", "interesting problems", "mission-critical" — no. If a phrase could appear on anyone's page, it shouldn't appear on this one.
2. **Lead with the effect, then the mechanism.** Who used it / what changed, then how. Never open a description with a participle.
3. **One fact, one home.** Each biographical fact appears once. Repetition reads as filler at 600 words.
4. **Write like the photo site.** Dry, first person, short declaratives; self-deprecation through concreteness ("older folders I haven't gone through"), never through labels ("addict").
5. **No internal nouns.** If a term needs a Bloomberg badge to decode, translate or cut.
6. **Match weight to tenure.** A five-year senior role gets three sentences; a four-month co-op gets one. Verbs scale too: "led" and "architected" are earned by scope.
7. **Numbers that self-update, or none.** Dates, not "N+ years".
8. **Confidence is quiet.** No "also", no "there's a … side too", no exclamation points, no "feel free to". The period after *Qiu.* is the model: end the sentence and stop.

---

## Findings summary

| Sev | Finding | Effort |
|---|---|---|
| **Critical** | "Chat with me →" sends the only professional CTA to a 2018 student chat-bio that links back to this page | S |
| **High** | Kicker "Coffee Addict" is the lead line of the page *and* the OG share image; seniority absent above the fold | S |
| **High** | Two Bloomberg entries incoherent (2020 co-op listed but undescribed; 2018 standalone); five equal-weight co-ops make a senior page read as new-grad | M |
| **High** | Postmates "Architected and led multi-developer team" as a co-op undermines credibility of the Work section | S |
| **Medium** | Internal jargon across four entries | S |
| **Medium** | Education is a first-class section with logos, department names, course bullets and an unfinished-looking "Candidate for" line | M |
| **Medium** | "What I Do": wrong counter, non-skills in rows, best sentence on the site hidden here | S–M |
| **Medium** | Email obfuscated on a legacy domain; not clickable; already leaked in plain text by the legacy site | S |
| **Medium** | Photography ×5 (twice apologetic); coffee ×4; footer bio restates hero | S |
| **Medium** | "Senior" in `<title>`/JSON-LD, absent from kicker/`ogTitle` | S |
| **Low** | Nav/section label mismatches; separators; `knowsAbout`; twitter handle; tagline list | S |
| **Idea** | Dated "Now" block; résumé PDF; two photo thumbnails in the photo slot | M |

## Quick wins (≤ 1 hour each)
1. Delete "Chat with me →"; 301 `ericqiu.io` → `ericqiu.dev`.
2. `site.kicker` → direction A or B; align `ogTitle` to "Senior Software Engineer".
3. Replace six Work descriptions and two Education entries with §2 drafts (after `[CONFIRM]`s).
4. Merge three Bloomberg roles into one entry.
5. Email → `mailto:` (plain or JS-assembled); "Get in touch" → "Contact".
6. Remove hero "I also shoot photos →" and "or photography" from the tagline; rewrite the strip in the photo site's voice.
7. Delete "6+ years", "DR-1 Compliance", "Human-Computer Interaction", "Full-Stack Development" (or the whole block).
8. Footer bio → one line, sourced from `site.ts`.

## Bigger bets
- **IA restructure** (§3): 4 sections → 3; Education folded into Work; co-ops grouped/de-weighted; hobbies consolidated into Now/Off-hours with the photo link and optional thumbnails.
- **Résumé PDF** + hero CTA row.
- **Positioning line D** as the hero claim — a stance, needs Eric's buy-in.
- **Quarterly Now update** habit; without it, keep the block undated.

## Open questions only Eric can answer
1. Priority reader for the next 12 months — recruiters (résumé + seniority first), peers/collaborators (stance + writing), or neither?
2. One or two concrete numbers for the Bloomberg senior role (QPS, clusters, regions, data, team size). Is "DR-1" translatable as "highest disaster-recovery tier" or should it go?
3. What did the Jan–Apr 2020 Bloomberg co-op do? Currently listed with no description.
4. Postmates: primary engineer among how many? Was "led" a formal role?
5. Waterloo: started in Software Engineering, transferred to CS? Any designation worth one word?
6. Does `hello@ericqiu.io` remain the long-term address, or move to `@ericqiu.dev` via Cloudflare Email Routing? Willing to publish a plain `mailto:`?
7. Is `ericqiu.io` sentimental (park) or disposable (redirect)?
8. Any public writing, talks, or GitHub work (API blocked from here) that would justify a Projects/Writing section?
9. Will he update a dated Now block quarterly? If not, undated "Off hours".
10. Cold coffee-chat requests welcome (booking link) or warm intros only (email/LinkedIn)?
11. Is `@itsericqiu` on X live? If not, drop `twitter:creator`.
