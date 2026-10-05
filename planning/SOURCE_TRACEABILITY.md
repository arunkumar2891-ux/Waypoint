# Source Traceability

## Master Source

`Master ATS Resume.md`

## High-value sections

- Professional Summary: lines 15–18
- Core Competencies: lines 19–93
- Palo Alto Networks: lines 94–431
- GenAI methodology: lines 432–539
- Personal projects: lines 540–734
- Forward Deployment Engineering: lines 735–802
- Earlier Experience: lines 803–838
- Technical Skills: lines 839–952
- Certifications/Education: lines 953–988
- Metrics summary: lines 989–1009

## Website Claim Rule

Every factual claim should be traceable to the master resume or a separately approved source.

3D visualizations may abstract documented architecture/workflows, but must not invent undocumented systems.

Examples:
- CareerPilot visualization can represent the documented 18-step execution flow.
- FW_Flex visualization can represent the documented common/worker architecture.
- Skills constellation can represent documented skills and their documented relationships.

Do not invent hidden infrastructure, users, customers, revenue, performance or architecture.

## Additional Approved Sources

Sources other than the master resume, approved individually. Each entry records what was used and what was withheld.

### Project Attest — Access Recertification

- Work entry: `content/work.ts`, slug `attest-access-recertification`.
- Resume: `Master ATS Resume.md`, Palo Alto Networks section — "Project: Attest — Workday Access Recertification Platform" (line 323), plus the metrics summary table.
- Source: the Attest repository itself — `README.md`, `AGENTS.md`, and the `server/src` and `client/src` trees.
- The resume section was authored **from** that repository, so the repository remains the primary source of record for this project.

Claim verification method. The repository `README.md` describes only Phase 1 as complete and the remaining seven screens as placeholders. That is stale. Every claim in the work entry was verified against the source tree rather than the README:

- 8 implemented screens, no `ComingSoon` references remaining.
- 11 controllers, 36 HTTP endpoint decorators.
- 12 Firestore entity schemas, 12 entity services, 9 composite indexes.
- 19 audited actions in the `AuditAction` enum.
- 596 test cases — 393 server `*.spec.ts`, 203 client `*.test.ts(x)`.
- 8 review enforcement rules (R1–R7, R9 — there is no R8 in the code).
- Pilot counts (52 groups, 1,105 lines, 589 people, 96 auto-closed, 1,009 to review) are asserted in `server/src/import/tests/pilot-acceptance.spec.ts`, pinned to a fixed extract date.
- Delivery status (phases 1–4 implemented, phase 5 is UAT and defect fixing) confirmed directly by the author.

Withheld from the public site as confidential employer information or internal infrastructure detail. Note that the resume is a private document and is sanitized less aggressively than `content/work.ts`; it names the employer's platform conventions where a reader would expect them, but still carries no secrets, no infrastructure identifiers, and no personal data:

- GCP project id, Firestore database name, GCS bucket name.
- Internal container registry hostnames and base image names.
- Vault secret paths and environment key names.
- The internal shared platform library name — described as a shared internal platform library where relevant.
- Identity-provider and transactional-email vendor product names — described as an enterprise OIDC provider and an enterprise transactional email provider.
- The identity-provider discovery hostname.
- The source workbook filename, which identifies the internal report.
- Individual colleague names appearing in the repository.
- All personally identifiable data. The pilot extract holds 589 real employee names and emails; only aggregate counts are published, never any record.

## Publishing Rule

The resume is the factual source of truth. Public-site suitability is a separate publishing decision.

Review before publishing:
- phone number;
- personal email;
- confidential employer information;
- internal URLs;
- customer information;
- proprietary screenshots.

## Project Ownership

Every project must explicitly identify:
- `professional`
- `personal`

Never blur employer and personal work.
