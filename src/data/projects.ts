export type ProjectStatus = 'private' | 'personal' | 'production';

export interface ProjectMetric {
  value: string;
  label: string;
}

export interface ProjectMediaSlot {
  filename: string;
  label: string;
  alt: string;
  brief: string;
  caption?: string;
}

export interface Project {
  slug: string;
  title: string;
  kicker: string;
  status: ProjectStatus;
  period: string;
  role: string;
  summary: string;
  problem: string;
  ownership: readonly string[];
  architecture: string;
  quality: readonly string[];
  technologies: readonly string[];
  metrics: readonly ProjectMetric[];
  media: readonly ProjectMediaSlot[];
  captureFocus: readonly string[];
  confidentiality?: string;
  repository?: string;
}

export const projects: readonly Project[] = [
  {
    slug: 'waifinder-os',
    title: 'Waifinder OS',
    kicker: 'Trustworthy multi-agent delivery workflows',
    status: 'private',
    period: '2026 - Present',
    role: 'AI Engineer Intern · agent contracts, workflow state, guardrails, and evaluation',
    summary:
      'A two-agent Sales and Platform MVP that turns client conversations into governed delivery actions without removing human judgment.',
    problem:
      'Agentic workflows need to act on changing client and delivery context while keeping approvals, escalation, grounding, and failure behavior explicit.',
    ownership: [
      'Co-designed a typed agent I/O contract and human-in-the-loop state machine.',
      'Built four Platform Agent action paths for signature hand-off, roadmap updates, SOW amendments, and delivery orchestration.',
      'Hardened the system with dry-run-first tools, persisted review gates, grounding guardrails, and talk-to-human escalation.',
      'Contributed evaluation and observability seams for golden conversations, tracing, and cost/model routing.',
    ],
    architecture:
      'A shared Anthropic Messages API loop coordinates Sales and Platform agents through typed contracts, with PostgreSQL-backed session memory and explicit review states around tool execution.',
    quality: ['Dry-run-first execution', 'Golden-conversation evals', 'Pytest coverage', 'Langfuse-ready tracing', 'Grounding guardrails'],
    technologies: ['Python', 'LLM agents', 'Anthropic API', 'PostgreSQL', 'Structured outputs', 'Pytest'],
    metrics: [
      { value: '2', label: 'coordinated agents' },
      { value: '4', label: 'guarded action paths' },
      { value: 'HITL', label: 'persisted review gates' },
    ],
    media: [
      { filename: 'hero.webp', label: 'Conversation to action', alt: 'Waifinder agent workspace with a structured action awaiting human review', brief: 'Show the highest-signal end-to-end agent workflow using sanitized demo data.' },
      { filename: 'workflow.webp', label: 'Review state machine', alt: 'Waifinder human review and escalation state diagram', brief: 'Show chips, structured embeds, review gates, and escalation as one coherent lifecycle.' },
      { filename: 'quality.webp', label: 'Evaluation evidence', alt: 'Waifinder evaluation and trace view for a golden conversation', brief: 'Show evaluation, tracing, or dry-run behavior without exposing private prompts or client data.' },
    ],
    captureFocus: ['One complete Sales-to-Platform workflow', 'Human approval and escalation', 'Dry-run tool output', 'Trace or evaluation evidence'],
    confidentiality: 'This work is private. Portfolio media must use sanitized demo data and may be replaced by redrawn system diagrams.',
  },
  {
    slug: 'caf-platform',
    title: 'CAF Case Platform',
    kicker: 'Production operations across four product surfaces',
    status: 'production',
    period: '2023 - Present',
    role: 'Software Engineer · architecture, full-stack delivery, infrastructure, and quality',
    summary:
      'A multi-role case-management platform connecting staff, clients, administrators, and the public across web and mobile experiences.',
    problem:
      'Case intake, appointments, documents, notifications, payments, and reporting needed one secure operating system with different workflows for each role.',
    ownership: [
      'Built role-aware dashboards, case timelines, document upload and preview, notifications, and Stripe webhook flows.',
      'Designed REST APIs across 200+ route registrations and a 24-table PostgreSQL schema with 130+ indexes.',
      'Delivered a Next.js admin portal, Flutter client portal, and SvelteKit public site around the Go API.',
      'Owned deployments across AWS, Vercel, and self-hosted Docker/PostgreSQL environments.',
    ],
    architecture:
      'A Go/PostgreSQL backend serves dedicated Next.js, Flutter, and SvelteKit clients. Versioned transactional migrations protect schema changes, WebSockets support timely updates, and interchangeable S3 or local storage adapters handle documents.',
    quality: ['Role and office scoping', 'Internal/client visibility', 'Transactional migrations', 'Health and readiness checks', 'Go test suite', 'Next.js production build'],
    technologies: ['Go', 'PostgreSQL', 'Next.js', 'Flutter', 'SvelteKit', 'WebSockets', 'AWS', 'Docker'],
    metrics: [
      { value: '7', label: 'user roles' },
      { value: '200+', label: 'route registrations' },
      { value: '24 / 130+', label: 'tables / indexes' },
    ],
    media: [
      {
        filename: 'hero.webp',
        label: 'Role-aware operations',
        alt: 'CAF administrator dashboard with fictional totals for staff, clients, cases, appointments, and notifications',
        brief: 'The administrator view consolidates people, cases, appointments, and notifications into one operational overview.',
        caption: 'A role-aware Spanish-language dashboard gives administrators a single view of fictional local demo activity across staff, clients, cases, appointments, and notifications.',
      },
      {
        filename: 'workflow.webp',
        label: 'Case lifecycle',
        alt: 'CAF fictional case workspace showing case details, legal process stages, history, documents, and tasks',
        brief: 'A single case workspace makes the legal process stage and the surrounding operational context visible.',
        caption: 'The fictional case workspace keeps core details, the five-stage process, history, documents, and tasks in one inspectable workflow.',
      },
      {
        filename: 'quality.webp',
        label: 'Visibility boundaries',
        alt: 'CAF fictional case history showing separate internal staff and client-visible comments',
        brief: 'Explicit visibility controls separate staff-only context from updates that clients are allowed to see.',
        caption: 'Timeline entries visibly distinguish internal staff notes from client-visible updates, reinforcing privacy boundaries in the operational UI.',
      },
    ],
    captureFocus: ['Role-aware dashboard', 'Five-stage case workflow', 'Internal/client visibility controls', 'Document and task workspace'],
    confidentiality: 'All displayed names, records, counts, and case details are fictional local demo data created for the portfolio capture.',
    repository: 'https://github.com/BryanPMX/CAF',
  },
  {
    slug: 'entorno35',
    title: 'Entorno35',
    kicker: 'Multi-tenant NOM-035 compliance SaaS',
    status: 'personal',
    period: 'Personal project',
    role: 'Full-stack engineer · product architecture, implementation, deployment, and testing',
    summary:
      'A multi-tenant compliance platform that takes organizations from staff import and assessment through reporting and subscription management.',
    problem:
      'Organizations need a defensible, repeatable assessment workflow while keeping tenant data isolated and operational tasks such as invitations, billing, and reporting reliable.',
    ownership: [
      'Built Go/Gin APIs around hexagonal architecture, PostgreSQL/GORM, JWT authentication, and tenant isolation.',
      'Implemented CSV staff import, automated assessments, PDF reports, SMTP invitations, and registration cleanup.',
      'Shipped a Next.js dashboard with TanStack Query and Stripe subscriptions.',
      'Hardened webhooks with idempotency, added rate limiting, and verified lint, test, build, and visual-regression gates.',
    ],
    architecture:
      'A hexagonal Go service isolates domain rules from adapters for PostgreSQL, email, billing, and report generation. A Next.js client consumes tenant-aware APIs and subscription state.',
    quality: ['Tenant isolation', 'Webhook idempotency', 'Rate limiting', 'Visual regression', 'Automated cleanup', 'Quality gates'],
    technologies: ['Go', 'Gin', 'PostgreSQL', 'GORM', 'Next.js', 'TanStack Query', 'Stripe', 'Docker'],
    metrics: [
      { value: 'Multi-tenant', label: 'isolated organization data' },
      { value: 'Idempotent', label: 'billing webhooks' },
      { value: 'End-to-end', label: 'assessment to PDF' },
    ],
    media: [
      { filename: 'hero.webp', label: 'Organization dashboard', alt: 'Entorno35 organization dashboard with fictional compliance data', brief: 'Show the clearest overview of assessment status and next actions.' },
      { filename: 'workflow.webp', label: 'Assessment lifecycle', alt: 'Entorno35 staff import and assessment workflow', brief: 'Show CSV import through invitation and assessment completion.' },
      { filename: 'quality.webp', label: 'Report and controls', alt: 'Entorno35 generated report and tenant administration controls', brief: 'Show the PDF result or tenant/billing control with fictional data.' },
    ],
    captureFocus: ['Organization dashboard', 'CSV staff import', 'Assessment flow', 'Generated report or subscription controls'],
  },
  {
    slug: 'mycloud',
    title: 'MyCloud',
    kicker: 'Secure self-hosted media cloud',
    status: 'personal',
    period: 'Personal project',
    role: 'Full-stack engineer · clean architecture, secure media pipeline, and cross-platform client',
    summary:
      'A self-hosted media cloud with secure uploads, background processing, object storage, and Flutter clients for web and mobile.',
    problem:
      'Personal media needs a private home that still feels like a polished cloud product, with controlled access and a safe path from upload to usable asset.',
    ownership: [
      'Architected a Go Clean Architecture backend with PostgreSQL, Redis, MinIO/S3, REST, and WebSocket APIs.',
      'Built Flutter web and mobile clients around JWT sessions and RBAC/admin invitations.',
      'Implemented presigned uploads, ClamAV scanning, and WebP thumbnail generation.',
      'Containerized the complete environment for self-hosted deployment.',
    ],
    architecture:
      'Flutter clients obtain presigned upload access from the Go service. Media is stored through MinIO/S3, scanned before processing, and published with generated WebP thumbnails; Redis and WebSockets coordinate responsive updates.',
    quality: ['JWT sessions', 'RBAC and invites', 'Malware scanning', 'Presigned uploads', 'Object storage', 'Containerized deployment'],
    technologies: ['Go', 'Flutter', 'PostgreSQL', 'Redis', 'MinIO/S3', 'ClamAV', 'WebSockets', 'Docker'],
    metrics: [
      { value: 'Web + mobile', label: 'Flutter clients' },
      { value: 'Scanned', label: 'media ingestion' },
      { value: 'Self-hosted', label: 'Docker deployment' },
    ],
    media: [
      { filename: 'hero.webp', label: 'Media library', alt: 'MyCloud responsive media library with fictional assets', brief: 'Show the main library with polished loading, filtering, and media states.' },
      { filename: 'workflow.webp', label: 'Secure upload', alt: 'MyCloud upload progress and processing states', brief: 'Show one upload moving through progress, scan, processing, and completion.' },
      { filename: 'quality.webp', label: 'Cross-platform control', alt: 'MyCloud mobile view and administrative access controls', brief: 'Show the mobile client or RBAC invitation flow.' },
    ],
    captureFocus: ['Media library', 'Secure upload lifecycle', 'Mobile experience', 'Admin invitation or access control'],
  },
] as const;

export const featuredProjects = projects.slice(0, 4);

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
