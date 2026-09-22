import type { Profile, CareerPosition, Certification, Education, SkillCategory, Metric } from '@/lib/types'

export const profile: Profile = {
  name: 'Arunkumar JS',
  title: 'Integration Architect | GenAI Developer | Forward Deployed Engineer',
  roles: [
    'Integration Architect',
    'GenAI Developer',
    'Forward Deployment Engineer',
  ],
  location: 'Chennai, Tamil Nadu',
  summary:
    'Results-driven Integration Architect and GenAI-native developer with 10+ years of experience in enterprise software engineering. Proven track record of leading large-scale initiatives at Palo Alto Networks, delivering measurable business impact including 66% infrastructure reduction, 4-10x performance improvements, and internal platforms serving 100+ users.',
  email: 'arunkumarjs@outlook.com',
  linkedin: 'https://www.linkedin.com/in/arunkumar-j-s-05164393/',
  github: 'https://github.com/arunkumar2891-ux',
}

export const heroMetrics: Metric[] = [
  { label: 'Years Experience', value: '10+' },
  { label: 'Snap Reduction', value: '66%' },
  { label: 'Query Latency', value: '4–10×' },
  { label: 'Platform Users', value: '100+' },
  { label: 'Uptime', value: '99.95%' },
]

export const careerTimeline: CareerPosition[] = [
  {
    company: 'Palo Alto Networks',
    title: 'Staff IT Systems Engineer — SnapLogic Center of Excellence',
    location: 'Bengaluru',
    period: 'Jul 2024 – Present',
    description:
      'Lead architect for enterprise integration solutions using SnapLogic iPaaS. Oversee integration architecture standards, build internal developer tools, and drive operational excellence across the Integration CoE.',
    current: true,
  },
  {
    company: 'Infosys',
    title: 'Senior Consultant',
    location: 'India',
    period: 'Apr 2024 – Jul 2024',
    description:
      'Enterprise SnapLogic and integration delivery for manufacturing and telecom clients.',
    current: false,
  },
  {
    company: 'Infosys',
    title: 'Consultant',
    location: 'India',
    period: 'Mar 2023 – Mar 2024',
    description:
      'Delivered SnapLogic integration solutions across GCP, Azure, Oracle, SAP, and Salesforce ecosystems.',
    current: false,
  },
  {
    company: 'Infosys',
    title: 'Consultant',
    location: 'India',
    period: 'Aug 2022 – Mar 2023',
    description:
      'Designed CI/CD deployment flow with rollback and smoke-testing for NTT Ltd using SnapLogic and GitHub.',
    current: false,
  },
  {
    company: 'Infosys',
    title: 'Senior Associate Consultant',
    location: 'India',
    period: 'Feb 2021 – Sep 2022',
    description:
      'Developed Dell Boomi B2B interfaces for ICHOR Systems and Visteon Corporation. Led integration delivery as Business Analyst and Scrum Master.',
    current: false,
  },
  {
    company: 'Tata Consultancy Services (TCS)',
    title: 'Systems Engineer',
    location: 'India',
    period: 'Jun 2016 – Feb 2021',
    description:
      'Built integration solutions across manufacturing, telecom, and enterprise domains using Dell Boomi and SnapLogic.',
    current: false,
  },
]

export const certifications: Certification[] = [
  { name: 'SnapLogic Certified Enterprise Automation Professional', year: '2024' },
  { name: 'SnapLogic Partner Integrator Library', year: '2024' },
  { name: 'Dell Boomi Professional Developer', year: '2021' },
  { name: 'Dell Boomi Associate Developer', year: '2020' },
]

export const education: Education[] = [
  {
    degree: 'B.Tech – Information Technology',
    institution: 'SASTRA University',
    year: '2016',
    location: 'Thanjavur',
  },
]

export const skillCategories: SkillCategory[] = [
  {
    name: 'Integration',
    skills: [
      'SnapLogic iPaaS',
      'Dell Boomi',
      'REST APIs',
      'Event-Driven Architecture',
      'Pub/Sub',
      'ETL/ELT',
      'Microservices',
    ],
  },
  {
    name: 'Cloud',
    skills: [
      'GCP',
      'BigQuery',
      'Vertex AI',
      'GKE',
      'Kubernetes',
      'Cloud Functions',
      'Vault',
    ],
  },
  {
    name: 'Data',
    skills: [
      'BigQuery',
      'PostgreSQL',
      'MongoDB',
      'Oracle',
      'SQL Optimization',
      'Data Modeling',
    ],
  },
  {
    name: 'GenAI',
    skills: [
      'Gemini',
      'RAG',
      'Prompt Engineering',
      'AI Agents',
      'Tool Use',
      'Context Optimization',
    ],
  },
  {
    name: 'Full Stack',
    skills: [
      'React',
      'TypeScript',
      'Node.js',
      'Express',
      'Vite',
      'Tailwind CSS',
      'Supabase',
    ],
  },
  {
    name: 'DevOps',
    skills: [
      'Docker',
      'Helm',
      'Harness',
      'GitHub Actions',
      'Datadog',
      'Chronosphere',
      'Terraform',
    ],
  },
]
