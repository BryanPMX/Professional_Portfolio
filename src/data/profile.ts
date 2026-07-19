export const profile = {
  name: 'Bryan Perez',
  role: 'AI & Software Engineer',
  headline: 'I build trustworthy agent systems and production software.',
  summary:
    'AI/software engineer with production experience in agentic systems, full-stack platforms, and applied machine learning.',
  location: 'El Paso, Texas',
  timezone: 'Mountain Time',
  email: 'perez.bryan24@outlook.com',
  phone: '(915) 887-1622',
  phoneHref: 'tel:+19158871622',
  resumeHref: '/assets/Bryan-Perez-Resume.pdf',
  github: 'https://github.com/BryanPMX',
  linkedin: 'https://linkedin.com/in/brpmx',
  availability: 'Open to software and AI engineering roles',
} as const;

export const navigation = [
  { href: '/', label: 'Home' },
  { href: '/projects', label: 'Work' },
  { href: '/about', label: 'Experience' },
  { href: '/research', label: 'Research' },
  { href: '/games', label: 'Lab' },
] as const;

export const proofPoints = [
  { value: '4', label: 'guarded agent action paths', context: 'Waifinder OS' },
  { value: '7', label: 'production user roles', context: 'CAF platform' },
  { value: '200+', label: 'API route registrations', context: 'CAF platform' },
  { value: '24 / 130+', label: 'tables / indexes', context: 'CAF platform' },
] as const;

export const skillGroups = [
  {
    label: 'AI / ML engineering',
    skills: ['LLM agents', 'Orchestration', 'Tool integrations', 'Structured outputs', 'Guardrails', 'Evals', 'Observability', 'SVM', 'RL'],
  },
  {
    label: 'Backend & data',
    skills: ['Go', 'Python', 'FastAPI', 'Go/Gin', 'PostgreSQL', 'Redis', 'GORM', 'REST', 'JWT/RBAC', 'Multi-tenancy'],
  },
  {
    label: 'Frontend & mobile',
    skills: ['TypeScript', 'React', 'Next.js', 'Angular', 'Svelte', 'Flutter', 'TanStack Query', 'WebSockets'],
  },
  {
    label: 'Cloud & quality',
    skills: ['Docker', 'Linux', 'AWS', 'Vercel', 'Terraform/OpenTofu', 'CI/CD', 'Integration testing', 'Documentation'],
  },
] as const;

