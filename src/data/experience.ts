export interface ExperienceItem {
  organization: string;
  role: string;
  period: string;
  location: string;
  summary: string;
  highlights: readonly string[];
  technologies: readonly string[];
}

export const experience: readonly ExperienceItem[] = [
  {
    organization: 'Workforce Solutions Borderplex',
    role: 'AI Engineer Intern',
    period: '2026 - Present',
    location: 'Remote',
    summary:
      'Contributing to Phase 2 of Waifinder OS: a two-agent Sales and Platform MVP designed around explicit contracts, human review, and controlled tool execution.',
    highlights: [
      'Co-designed the agent I/O contract and human-in-the-loop state machine, including persisted review gates, grounding guardrails, and human escalation.',
      'Built four Platform Agent action paths for signature hand-off, roadmap updates, SOW amendments, and delivery sub-agent orchestration.',
      'Added seams for tracing, cost and model routing, modular skills, golden-conversation evaluation, and pytest coverage.',
    ],
    technologies: ['Python', 'Anthropic Messages API', 'PostgreSQL', 'Pytest', 'Langfuse-ready tracing'],
  },
  {
    organization: 'Centro de Apoyo para la Familia A.C.',
    role: 'Software Engineer',
    period: '2023 - Present',
    location: 'Ciudad Juarez, Mexico',
    summary:
      'Building and operating a multi-role case-management platform across API, admin, client, and public-facing surfaces.',
    highlights: [
      'Supports seven role types through a Go/PostgreSQL API, Next.js admin portal, Flutter client portal, and SvelteKit public site.',
      'Designed an API with 200+ route registrations and a 24-table schema with 130+ indexes.',
      'Owned AWS, Vercel, and self-hosted Docker/PostgreSQL deployment with health checks, rate limiting, S3 storage, and automated tests.',
    ],
    technologies: ['Go', 'PostgreSQL', 'Next.js', 'Flutter', 'SvelteKit', 'AWS', 'Docker'],
  },
] as const;

export const education = {
  school: 'The University of Texas at El Paso',
  degree: 'Bachelor of Science in Computer Science',
  minor: 'Minor in Mathematics',
  year: '2025',
  gpa: '3.4',
  coursework: ['Algorithms', 'Databases', 'Software Engineering', 'Artificial Intelligence', 'Machine Learning', 'Computer Security'],
} as const;

