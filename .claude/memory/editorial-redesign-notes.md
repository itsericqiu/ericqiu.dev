# Editorial Redesign — Open Decisions & Notes

## Copy decisions to revisit

### Hero bio
Current: "I build distributed systems and cloud infrastructure at Bloomberg. University of Waterloo CS. Previously at Addepar, Postmates, and BMO Capital Markets."

Content reviewer critique: Reads like a resume list — companies without context. Suggested direction:
- Integrate photography as part of identity (not an aside), e.g. "I architect distributed infrastructure at Bloomberg. I'm drawn to hard systems problems — and to documenting the world through a camera."
- OR keep bio sparse and remove photography from hero entirely, letting the callout strip below be the single mention.

Decision needed: Is photography a core differentiator (integrate into bio) or a passion project (footer callout only)?

### Photography — two mentions
Current: hero CTA ("I also shoot photos →") + photo callout strip before footer.
Issue: "also" framing sounds like an aside. Two mentions suggest indecision.
Options:
- Keep both if photos.ericqiu.io is strong/professional-grade portfolio
- Keep only callout strip (remove from hero) if it's more of a personal project

### "Chat with me" CTA link
Links to ericqiu.io — destination unclear (calendar? contact form?). Worth clarifying what the user lands on.

### CTA directional signal
Current: "Open to discussing infrastructure, system design, or interesting problems."
Consider adding availability/response-time context: e.g. "I typically respond within 48 hours."

## Experience descriptions — ranked by effectiveness
Strongest → weakest:
1. **Postmates** — leads with leadership ("Architected and led multi-developer team") + cross-functional, clear outcome
2. **Bloomberg (current)** — "in use by over 300 teams" gives concrete scale, DR-1 signals regulated complexity
3. **Addepar** — full-stack + clear domain (Family Offices, RIAs)
4. **LCBO** — user research callout is humanizing and rare; "Prototyped KYC" is vague
5. **Bloomberg (2018)** — opens with technical process, not impact; two unrelated projects crammed together
6. **BMO** — "Prototyped POC" is redundant, blockchain without context, "Assisted" feels deflating

Rewrites suggested for BMO and Bloomberg 2018 to lead with impact rather than process.

## Skills section
Content reviewer flagged:
- HCI is listed in both the prose statement AND the specialties grid — redundant
- "DR-1 Compliance" is a regulatory classification, not a technology — move to Bloomberg description context, remove from skills grid
- Tech stack (Go, Python, Kubernetes, AWS) is table-stakes; no differentiation
- Options: deepen with specifics, OR remove section entirely and let work descriptions carry it

## Missing content to consider (not urgent)
- No open-source contributions / projects visible
- No blog or written technical content
- No quantifiable wins (latency numbers, RPS, transaction volumes)
- GitHub is only in footer
- Résumé: no PDF to link currently; add back to footer once available

## Brand name preferences (confirmed)
- "Bloomberg LP" (not "Bloomberg Engineering") in hero bio
- "BMO Capital Markets" (not "BMO") in hero bio
