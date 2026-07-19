# Recruiter-facing portfolio strategy

Updated July 2026.

## Design decision

The portfolio is an interactive technical briefing, not a résumé translated into decorative cards. Recruiters should see positioning and proof in the first screen; hiring managers should find architecture, ownership, quality controls, and tradeoffs one click deeper.

The evidence hierarchy is:

1. Waifinder OS — trustworthy multi-agent workflows, human review, and controlled execution.
2. CAF Case Platform — production ownership across API, admin, mobile, public web, infrastructure, and data.
3. Entorno35 — multi-tenant product architecture, billing reliability, and end-to-end compliance workflows.
4. MyCloud — secure media ingestion, self-hosting, and cross-platform clients.
5. Applied ML research — experiment design, evaluation, and limitations.
6. Browser games — secondary engineering lab work, not primary recruiter evidence.

## Why this structure

- The Linux Foundation's 2026 tech-talent report places hands-on prior work and project portfolios ahead of degrees and certifications in employer evaluation. Portfolio pages therefore lead with inspectable work rather than an ungrounded skills wall.
- GitHub's official résumé guidance recommends a small number of relevant, diverse projects with concise documentation, setup/testing guidance, and demos. The site features four primary systems and keeps labs secondary.
- LinkedIn's 2026 U.S. software-engineer talent analysis emphasizes Python, cloud, SQL, React, and rapidly growing AI capability. Bryan's project order makes that range visible through applied work.
- Stack Overflow's 2025 survey reports broad developer concern about agent accuracy, privacy, and security. Waifinder's review gates, grounding, dry-run execution, evaluation, and tracing are therefore more credible than a generic "AI" label.
- NIST's AI RMF guidance emphasizes documented evaluation, production-like testing, monitoring, and human oversight. The case-study schema explicitly surfaces those controls.

## Case-study contract

Every project route presents:

1. problem and user context,
2. Bryan's role, team context, and ownership,
3. architecture and technical decisions,
4. security, privacy, failure handling, testing, and observability,
5. verified scope or results,
6. media with captions and alt text,
7. confidentiality notes where required,
8. lessons and future improvements when the project evidence package is ready.

## Motion and performance guardrails

- Ambient motion is restrained, user-pausable, and disabled by `prefers-reduced-motion`.
- Content is visible without JavaScript; reveal animation is progressive enhancement.
- Product videos must be muted, user-controlled, captioned when they include narration, and accompanied by a poster.
- Images must include dimensions, responsive sizing, descriptive alt text, and lazy loading below the fold.
- Performance targets follow current Core Web Vitals guidance: LCP at or below 2.5 seconds, INP at or below 200 ms, and CLS at or below 0.1 at the 75th percentile.

## Sources

- [Linux Foundation — 2026 State of Tech Talent](https://training.linuxfoundation.org/wp-content/uploads/2026/05/LFTraining_Tech_Talent_Report_Global_2026_webversion_052626.pdf)
- [GitHub Docs — Using your GitHub profile to enhance your résumé](https://docs.github.com/en/account-and-profile/tutorials/using-your-github-profile-to-enhance-your-resume)
- [LinkedIn Economic Graph — U.S. Software Engineer Talent Landscape 2026](https://economicgraph.linkedin.com/content/dam/me/economicgraph/en-us/PDF/us-software-engineer-talent-landscape-2026.pdf)
- [Stack Overflow — 2025 Developer Survey: AI](https://survey.stackoverflow.co/2025/ai)
- [NIST — AI RMF Core](https://airc.nist.gov/airmf-resources/airmf/5-sec-core/)
- [web.dev — Core Web Vitals](https://web.dev/articles/vitals)
- [W3C — WCAG 2.2 Pause, Stop, Hide](https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html)

