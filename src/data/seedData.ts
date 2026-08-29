import {
  UserProfile,
  JobPreferences,
  JobListing,
  ResumeVersion,
  ApplicationRecord,
  ReminderItem,
  NotificationItem,
  CareerInsight,
  AuditLog,
  AIJobAnalysis,
  RecruiterMessage
} from '../types';

export const INITIAL_USER_PROFILE: UserProfile = {
  id: 'usr_pilot_98124',
  name: 'Alex Mercer',
  email: 'alex.mercer@example.com',
  phone: '+1 (555) 234-8901',
  city: 'San Francisco',
  state: 'CA',
  country: 'United States',
  linkedinUrl: 'https://linkedin.com/in/alex-mercer-tech',
  githubUrl: 'https://github.com/alexmercer-dev',
  portfolioUrl: 'https://alexmercer.dev',
  summary:
    'Dedicated Full-Stack Software Engineer & Systems Specialist with 3.5+ years of hands-on experience developing resilient web applications, modern React/Node.js microservices, and IT infrastructure automation. Passionate about scalable architecture, transparent software practices, and automated testing.',
  targetJobTitles: [
    'Frontend Developer',
    'Full Stack Engineer',
    'IT Support Specialist',
    'Software Engineer',
    'Technical Support Engineer'
  ],
  skills: [
    'React',
    'TypeScript',
    'JavaScript (ES6+)',
    'Node.js',
    'Express',
    'PostgreSQL',
    'Tailwind CSS',
    'Git & GitHub',
    'REST APIs',
    'Docker',
    'Linux / Bash',
    'Network Troubleshooting',
    'Jest & Vitest',
    'Next.js'
  ],
  education: [
    {
      id: 'edu_1',
      institution: 'University of California, Davis',
      degree: 'Bachelor of Science',
      fieldOfStudy: 'Computer Science',
      startDate: '2019-09',
      endDate: '2023-06',
      gpa: '3.78',
      location: 'Davis, CA'
    }
  ],
  experience: [
    {
      id: 'exp_1',
      company: 'Apex Cloud Solutions',
      position: 'Software Engineer',
      location: 'San Francisco, CA',
      startDate: '2023-07',
      endDate: 'Present',
      isCurrent: true,
      bulletPoints: [
        'Engineered reusable frontend UI libraries in React and TypeScript, boosting developer feature velocity by 28%.',
        'Built authenticated REST microservices with Node.js and PostgreSQL handling 40,000+ daily requests with 99.9% uptime.',
        'Optimized client-side rendering bottlenecks and bundle sizes, reducing initial load latency by 350ms.',
        'Integrated automated CI/CD unit testing pipelines with GitHub Actions, catching 95% of regressions pre-merge.'
      ]
    },
    {
      id: 'exp_2',
      company: 'Vanguard Tech Services',
      position: 'IT Systems & Junior Developer',
      location: 'Sacramento, CA',
      startDate: '2021-06',
      endDate: '2023-05',
      isCurrent: false,
      bulletPoints: [
        'Administered internal ticketing and endpoint network diagnostics for 250+ enterprise users with a 98% satisfaction rating.',
        'Authored automated Bash and PowerShell scripts to standardize workstation provisioning, saving 12 hours weekly.',
        'Maintained PostgreSQL databases and supported internal admin dashboards built with React and Tailwind CSS.'
      ]
    }
  ],
  projects: [
    {
      id: 'proj_1',
      name: 'OmniDash Cloud Monitor',
      description:
        'Open-source real-time server health and log analyzer built with React, TypeScript, Node.js, and WebSockets.',
      technologies: ['React', 'TypeScript', 'Node.js', 'WebSockets', 'Tailwind CSS'],
      link: 'https://github.com/alexmercer-dev/omnidash',
      role: 'Creator & Lead Maintainer'
    },
    {
      id: 'proj_2',
      name: 'TaskMatrix Kanban Engine',
      description:
        'High-performance drag-and-drop workflow system with optimistic state updates and offline persistence.',
      technologies: ['React', 'TypeScript', 'PostgreSQL', 'Express'],
      link: 'https://github.com/alexmercer-dev/taskmatrix',
      role: 'Full Stack Developer'
    }
  ],
  certifications: [
    {
      id: 'cert_1',
      name: 'AWS Certified Cloud Practitioner',
      issuer: 'Amazon Web Services',
      issueDate: '2023-11',
      credentialId: 'AWS-CCP-98104'
    },
    {
      id: 'cert_2',
      name: 'CompTIA Security+',
      issuer: 'CompTIA',
      issueDate: '2022-08',
      credentialId: 'COMP-SEC-7741'
    }
  ],
  languages: ['English (Native)', 'Spanish (Conversational)'],
  workAuthorization: 'Authorized to work in the US without restriction',
  requireSponsorship: false,
  preferredSalaryMin: 95000,
  currency: 'USD'
};

export const INITIAL_JOB_PREFERENCES: JobPreferences = {
  desiredJobTitles: ['Frontend Developer', 'Full Stack Engineer', 'Software Engineer', 'IT Systems Specialist'],
  jobTypes: ['full-time', 'contract'],
  locations: ['San Francisco, CA', 'San Jose, CA', 'Remote'],
  remotePreference: ['remote', 'hybrid'],
  minimumSalary: 95000,
  currency: 'USD',
  preferredIndustries: ['Enterprise Software', 'Developer Tools', 'Fintech', 'Cloud Infrastructure'],
  experienceLevel: 'mid',
  autoSaveStrongMatches: true,
  autoTailorResume: true,
  autoGenerateCoverLetter: true,
  requireApprovalBeforeApply: false,
  defaultResumeTemplate: 'modern',
  autoApplyEnabled: true,
  autoApplyDailyTarget: 12,
  autoApplyMinMatchScore: 85,
  autoApplyPreferredPortals: ['greenhouse', 'lever', 'linkedin', 'direct'],
  autoApplyNotifyEmail: true,
  autoApplyHumanToneOnly: true,
  lastAutonomousRun: '2026-08-29T08:00:00Z',
  todayAppliedCount: 12,
  instantEmailAlertOnRecruiterReply: true,
  forwardDestinationEmail: 'nobady016@gmail.com',
  autoDraftReplies: true
};

export const INITIAL_RESUME_VERSIONS: ResumeVersion[] = [
  {
    id: 'res_master_01',
    userId: 'usr_pilot_98124',
    title: 'Master Technical Resume',
    targetRole: 'Full-Stack / Frontend Engineer',
    template: 'modern',
    summary: INITIAL_USER_PROFILE.summary,
    skills: INITIAL_USER_PROFILE.skills,
    experience: INITIAL_USER_PROFILE.experience,
    education: INITIAL_USER_PROFILE.education,
    projects: INITIAL_USER_PROFILE.projects,
    certifications: INITIAL_USER_PROFILE.certifications,
    isTailored: false,
    atsScore: 92,
    truthfulGuarantee: true,
    createdAt: '2026-08-01T10:00:00Z',
    updatedAt: '2026-08-20T14:30:00Z'
  },
  {
    id: 'res_it_support_02',
    userId: 'usr_pilot_98124',
    title: 'IT Support & Systems Engineer Resume',
    targetRole: 'IT Support Specialist / Systems Admin',
    template: 'ats',
    summary:
      'Proactive Systems Specialist with deep technical troubleshooting background, Linux/Bash automation capabilities, and network diagnostics experience. Proven track record supporting 250+ enterprise users with 98% CSAT.',
    skills: [
      'Network Troubleshooting',
      'Linux / Bash',
      'PostgreSQL',
      'PowerShell',
      'Git & GitHub',
      'CompTIA Security+',
      'AWS Cloud',
      'REST APIs'
    ],
    experience: INITIAL_USER_PROFILE.experience,
    education: INITIAL_USER_PROFILE.education,
    projects: INITIAL_USER_PROFILE.projects,
    certifications: INITIAL_USER_PROFILE.certifications,
    isTailored: false,
    atsScore: 89,
    truthfulGuarantee: true,
    createdAt: '2026-08-05T11:00:00Z',
    updatedAt: '2026-08-22T09:15:00Z'
  }
];

export const INITIAL_JOBS: JobListing[] = [
  {
    id: 'job_001',
    source: 'greenhouse',
    externalJobId: 'gh_882910',
    title: 'Frontend Developer (React / TypeScript)',
    company: 'Starlight Tech Inc.',
    companyLogo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&auto=format&fit=crop&q=60',
    location: 'San Francisco, CA',
    remoteType: 'hybrid',
    employmentType: 'full-time',
    salaryMin: 110000,
    salaryMax: 135000,
    currency: 'USD',
    experienceLevel: 'mid',
    requiredSkills: ['React', 'TypeScript', 'Tailwind CSS', 'Git & GitHub', 'REST APIs'],
    preferredSkills: ['Next.js', 'Jest & Vitest', 'Docker', 'Performance Optimization'],
    description:
      'We are looking for a skilled Frontend Developer to build responsive, accessible, and high-performance web applications using modern React and TypeScript. You will collaborate directly with product designers and backend engineers to craft intuitive developer tools.',
    responsibilities: [
      'Architect and maintain scalable React/TypeScript components with clean modular state.',
      'Optimize client performance, ensuring sub-second page loads and seamless UX.',
      'Collaborate with UI/UX designers to translate Figma tokens into clean Tailwind styles.',
      'Write comprehensive unit and integration tests with Vitest/Jest.'
    ],
    requirements: [
      '3+ years of professional web application development with React and TypeScript.',
      'Strong understanding of HTML5, CSS3, modern JavaScript (ES6+), and responsive design.',
      'Experience integrating authenticated REST and GraphQL endpoints.',
      'B.S. in Computer Science or equivalent practical experience.'
    ],
    applicationUrl: 'https://boards.greenhouse.io/starlighttech/jobs/882910',
    postedAt: '2026-08-27T08:00:00Z',
    featured: true,
    department: 'Engineering'
  },
  {
    id: 'job_002',
    source: 'lever',
    externalJobId: 'lev_44921',
    title: 'Full Stack Software Engineer',
    company: 'Nexus Data Systems',
    companyLogo: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=100&auto=format&fit=crop&q=60',
    location: 'Remote (US)',
    remoteType: 'remote',
    employmentType: 'full-time',
    salaryMin: 120000,
    salaryMax: 145000,
    currency: 'USD',
    experienceLevel: 'mid',
    requiredSkills: ['React', 'Node.js', 'TypeScript', 'PostgreSQL', 'REST APIs'],
    preferredSkills: ['Docker', 'AWS', 'Linux / Bash', 'Microservices'],
    description:
      'Nexus Data is building the next generation of data observability. As a Full Stack Engineer, you will own features from database queries in PostgreSQL up to snappy interactive dashboards in React.',
    responsibilities: [
      'Develop robust REST APIs in Node.js/Express and resilient PostgreSQL schemas.',
      'Implement real-time dashboard data visualizers using React and WebSockets.',
      'Maintain reliable Docker-based local development environments and CI pipelines.',
      'Conduct peer code reviews and contribute to architecture RFCs.'
    ],
    requirements: [
      '3+ years building full-stack applications with Node.js, TypeScript, and SQL databases.',
      'Deep fluency with React state management and asynchronous data fetching.',
      'Experience designing database schemas and optimizing query performance.',
      'Demonstrated focus on code quality, security, and automated testing.'
    ],
    applicationUrl: 'https://jobs.lever.co/nexusdata/44921',
    postedAt: '2026-08-26T14:30:00Z',
    featured: true,
    department: 'Platform Team'
  },
  {
    id: 'job_003',
    source: 'direct',
    externalJobId: 'dir_it_209',
    title: 'IT Support & Systems Specialist',
    company: 'Krypton Security Networks',
    companyLogo: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=100&auto=format&fit=crop&q=60',
    location: 'San Jose, CA',
    remoteType: 'hybrid',
    employmentType: 'full-time',
    salaryMin: 88000,
    salaryMax: 105000,
    currency: 'USD',
    experienceLevel: 'mid',
    requiredSkills: ['Network Troubleshooting', 'Linux / Bash', 'CompTIA Security+', 'PostgreSQL'],
    preferredSkills: ['PowerShell', 'AWS Cloud', 'Docker', 'Python'],
    description:
      'Join our security operations team managing internal IT infrastructure, server automation, and technical customer tier-2 escalation support. Ideal for someone who loves Linux, shell scripting, and network architecture.',
    responsibilities: [
      'Provide escalation support for networking, VPN, firewall, and endpoint hardware issues.',
      'Automate repetitive operational workflows using Bash and Python scripts.',
      'Manage access permissions and audit compliance following strict security protocols.',
      'Maintain documentation and runbooks for common incident resolution workflows.'
    ],
    requirements: [
      '2+ years IT support, systems administration, or technical operations experience.',
      'CompTIA Security+ or Network+ certification preferred.',
      'Comfortable with Linux command line and shell scripting.',
      'Excellent verbal and written communication with non-technical stakeholders.'
    ],
    applicationUrl: 'https://careers.kryptonsec.com/jobs/it-209',
    postedAt: '2026-08-25T11:00:00Z',
    department: 'IT Operations'
  },
  {
    id: 'job_004',
    source: 'workday',
    externalJobId: 'wd_99201',
    title: 'Cloud DevOps & Systems Engineer',
    company: 'Aura Cloud Infrastructure',
    companyLogo: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=100&auto=format&fit=crop&q=60',
    location: 'San Francisco, CA',
    remoteType: 'remote',
    employmentType: 'full-time',
    salaryMin: 130000,
    salaryMax: 160000,
    currency: 'USD',
    experienceLevel: 'senior',
    requiredSkills: ['Docker', 'Linux / Bash', 'AWS', 'Kubernetes', 'Terraform'],
    preferredSkills: ['Node.js', 'PostgreSQL', 'Go', 'Prometheus'],
    description:
      'Lead infrastructure as code and containerized deployment pipelines across multi-region AWS environments. Build scalable monitoring and automated failover systems.',
    responsibilities: [
      'Design and deploy scalable Kubernetes clusters and Terraform infrastructure.',
      'Build zero-downtime CI/CD deployment pipelines.',
      'Implement observability metrics with Prometheus and Grafana.'
    ],
    requirements: [
      '4+ years DevOps or SRE experience.',
      'Strong proficiency in AWS, Docker, Kubernetes, and Terraform.',
      'Solid programming skills in Bash, Python, or Go.'
    ],
    applicationUrl: 'https://auracloud.wd5.myworkdayjobs.com/jobs/99201',
    postedAt: '2026-08-24T16:00:00Z',
    department: 'Infrastructure'
  },
  {
    id: 'job_005',
    source: 'linkedin',
    externalJobId: 'li_551829',
    title: 'Junior Software Engineer (Web Platforms)',
    company: 'Velocity Labs',
    companyLogo: 'https://images.unsplash.com/photo-1572021335469-31706a17aaef?w=100&auto=format&fit=crop&q=60',
    location: 'San Francisco, CA',
    remoteType: 'hybrid',
    employmentType: 'full-time',
    salaryMin: 92000,
    salaryMax: 110000,
    currency: 'USD',
    experienceLevel: 'junior',
    requiredSkills: ['JavaScript (ES6+)', 'React', 'Git & GitHub', 'REST APIs'],
    preferredSkills: ['TypeScript', 'Tailwind CSS', 'Node.js', 'Jest & Vitest'],
    description:
      'A great opportunity for an early-career engineer to work on customer-facing web products with senior mentorship. You will contribute to our core React web platform and internal tooling.',
    responsibilities: [
      'Write clean, well-tested React components for our web dashboard.',
      'Fix bugs and implement customer feature requests.',
      'Participate in agile sprints, daily standups, and code reviews.'
    ],
    requirements: [
      '1-2 years experience or strong project portfolio in React/JavaScript.',
      'Degree in Computer Science or related bootcamp graduate.',
      'Eager to learn and collaborate in a fast-paced environment.'
    ],
    applicationUrl: 'https://linkedin.com/jobs/view/551829',
    postedAt: '2026-08-28T06:00:00Z',
    department: 'Product Engineering'
  },
  {
    id: 'job_007',
    source: 'greenhouse',
    externalJobId: 'gh_771920',
    title: 'Frontend UI Systems Engineer',
    company: 'Linear Dynamics',
    companyLogo: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=100&auto=format&fit=crop&q=60',
    location: 'San Francisco, CA',
    remoteType: 'remote',
    employmentType: 'full-time',
    salaryMin: 125000,
    salaryMax: 155000,
    currency: 'USD',
    experienceLevel: 'mid',
    requiredSkills: ['React', 'TypeScript', 'Tailwind CSS', 'REST APIs'],
    preferredSkills: ['Next.js', 'WebSockets', 'Vitest'],
    description: 'Build fast keyboard-first workflow tools with high accessibility and sleek React architectures.',
    applicationUrl: 'https://boards.greenhouse.io/lineardynamics/jobs/771920',
    postedAt: '2026-08-28T14:00:00Z',
    department: 'Product Infrastructure'
  },
  {
    id: 'job_008',
    source: 'lever',
    externalJobId: 'lev_88301',
    title: 'Full Stack Web Developer',
    company: 'Stripe Horizon Labs',
    companyLogo: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=100&auto=format&fit=crop&q=60',
    location: 'San Francisco, CA',
    remoteType: 'hybrid',
    employmentType: 'full-time',
    salaryMin: 135000,
    salaryMax: 165000,
    currency: 'USD',
    experienceLevel: 'mid',
    requiredSkills: ['TypeScript', 'Node.js', 'React', 'PostgreSQL'],
    preferredSkills: ['Docker', 'REST APIs', 'Microservices'],
    description: 'Work on financial developer platforms, webhooks delivery, and responsive React portals.',
    applicationUrl: 'https://jobs.lever.co/stripe-horizon/88301',
    postedAt: '2026-08-28T16:00:00Z',
    department: 'Payments & Developer Platform'
  },
  {
    id: 'job_009',
    source: 'greenhouse',
    externalJobId: 'gh_99014',
    title: 'React & Node.js Application Engineer',
    company: 'Cloudflare Edge Networks',
    companyLogo: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=100&auto=format&fit=crop&q=60',
    location: 'San Jose, CA',
    remoteType: 'remote',
    employmentType: 'full-time',
    salaryMin: 130000,
    salaryMax: 155000,
    currency: 'USD',
    experienceLevel: 'mid',
    requiredSkills: ['React', 'TypeScript', 'Node.js', 'REST APIs'],
    preferredSkills: ['Linux / Bash', 'Docker', 'PostgreSQL'],
    description: 'Empower millions of developers by engineering edge dashboard interfaces and robust REST microservices.',
    applicationUrl: 'https://boards.greenhouse.io/cloudflare-edge/jobs/99014',
    postedAt: '2026-08-28T18:00:00Z',
    department: 'Edge Developer Tools'
  },
  {
    id: 'job_010',
    source: 'lever',
    externalJobId: 'lev_33091',
    title: 'Software Engineer - Developer Productivity',
    company: 'Vercel Ecosystems',
    companyLogo: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=100&auto=format&fit=crop&q=60',
    location: 'Remote (US)',
    remoteType: 'remote',
    employmentType: 'full-time',
    salaryMin: 128000,
    salaryMax: 152000,
    currency: 'USD',
    experienceLevel: 'mid',
    requiredSkills: ['React', 'TypeScript', 'Next.js', 'Git & GitHub'],
    preferredSkills: ['Node.js', 'Tailwind CSS', 'Vitest'],
    description: 'Help build developer workflow analytics, CLI integrations, and responsive web tooling.',
    applicationUrl: 'https://jobs.lever.co/vercel-ecosystems/33091',
    postedAt: '2026-08-29T02:00:00Z',
    department: 'Platform DX'
  },
  {
    id: 'job_011',
    source: 'direct',
    externalJobId: 'dir_supabase_441',
    title: 'Full-Stack TypeScript Engineer',
    company: 'Supabase Open Source',
    companyLogo: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=100&auto=format&fit=crop&q=60',
    location: 'Remote (US/Global)',
    remoteType: 'remote',
    employmentType: 'full-time',
    salaryMin: 130000,
    salaryMax: 160000,
    currency: 'USD',
    experienceLevel: 'mid',
    requiredSkills: ['PostgreSQL', 'TypeScript', 'React', 'Node.js'],
    preferredSkills: ['Docker', 'Linux / Bash', 'REST APIs'],
    description: 'Build high-performance database UI management tables and TypeScript client libraries for developers worldwide.',
    applicationUrl: 'https://supabase.com/careers/full-stack-ts',
    postedAt: '2026-08-29T04:00:00Z',
    department: 'Studio UI'
  },
  {
    id: 'job_012',
    source: 'greenhouse',
    externalJobId: 'gh_airbnb_112',
    title: 'Web Platform Engineer (Design Systems)',
    company: 'Airbnb Experience Tech',
    companyLogo: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=100&auto=format&fit=crop&q=60',
    location: 'San Francisco, CA',
    remoteType: 'hybrid',
    employmentType: 'full-time',
    salaryMin: 140000,
    salaryMax: 170000,
    currency: 'USD',
    experienceLevel: 'mid',
    requiredSkills: ['React', 'TypeScript', 'Tailwind CSS', 'Jest & Vitest'],
    preferredSkills: ['Accessibility', 'Next.js', 'REST APIs'],
    description: 'Design and ship resilient, accessible UI components used across the entire web guest experience.',
    applicationUrl: 'https://boards.greenhouse.io/airbnb/jobs/112998',
    postedAt: '2026-08-29T05:00:00Z',
    department: 'Design Technology'
  },
  {
    id: 'job_013',
    source: 'lever',
    externalJobId: 'lev_datadog_99',
    title: 'Frontend Telemetry & Observability Engineer',
    company: 'Datadog Cloud Systems',
    companyLogo: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=100&auto=format&fit=crop&q=60',
    location: 'San Francisco, CA',
    remoteType: 'remote',
    employmentType: 'full-time',
    salaryMin: 135000,
    salaryMax: 165000,
    currency: 'USD',
    experienceLevel: 'mid',
    requiredSkills: ['React', 'TypeScript', 'Node.js', 'REST APIs'],
    preferredSkills: ['PostgreSQL', 'Docker', 'WebSockets'],
    description: 'Build fast data visualization graphs and observability metric monitors for distributed enterprise architectures.',
    applicationUrl: 'https://jobs.lever.co/datadog/99120',
    postedAt: '2026-08-29T06:00:00Z',
    department: 'APM Core'
  },
  {
    id: 'job_014',
    source: 'greenhouse',
    externalJobId: 'gh_figma_88',
    title: 'Frontend Engineer - Canvas & Collaboration UI',
    company: 'Figma Creative Tools',
    companyLogo: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=100&auto=format&fit=crop&q=60',
    location: 'San Francisco, CA',
    remoteType: 'hybrid',
    employmentType: 'full-time',
    salaryMin: 145000,
    salaryMax: 175000,
    currency: 'USD',
    experienceLevel: 'mid',
    requiredSkills: ['TypeScript', 'React', 'Git & GitHub', 'REST APIs'],
    preferredSkills: ['WebSockets', 'Tailwind CSS', 'Performance Optimization'],
    description: 'Help build high-velocity multiplayer collaboration interfaces and creative developer tooling.',
    applicationUrl: 'https://boards.greenhouse.io/figma/jobs/88102',
    postedAt: '2026-08-29T07:00:00Z',
    department: 'Core Product'
  },
  {
    id: 'job_015',
    source: 'direct',
    externalJobId: 'dir_postman_77',
    title: 'API Tooling & Full Stack Engineer',
    company: 'Postman Developer Hub',
    companyLogo: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=100&auto=format&fit=crop&q=60',
    location: 'San Jose, CA',
    remoteType: 'remote',
    employmentType: 'full-time',
    salaryMin: 125000,
    salaryMax: 150000,
    currency: 'USD',
    experienceLevel: 'mid',
    requiredSkills: ['Node.js', 'TypeScript', 'React', 'REST APIs', 'PostgreSQL'],
    preferredSkills: ['Docker', 'Linux / Bash', 'Jest & Vitest'],
    description: 'Empower over 30 million developers with seamless API testing, automated mock servers, and interactive documentation.',
    applicationUrl: 'https://postman.com/careers/full-stack-api',
    postedAt: '2026-08-29T08:00:00Z',
    department: 'API Network'
  },
  {
    id: 'job_006',
    source: 'direct',
    externalJobId: 'sus_99182',
    title: 'Immediate Remote Data Entry Specialist - Urgent Hire',
    company: 'FastCash Global Holdings LLC',
    companyLogo: '',
    location: 'Remote Anywhere',
    remoteType: 'remote',
    employmentType: 'part-time',
    salaryMin: 190000,
    salaryMax: 240000,
    currency: 'USD',
    experienceLevel: 'entry',
    requiredSkills: ['Typing', 'Email'],
    preferredSkills: ['No experience required'],
    description:
      'URGENT HIRE. Earn $80/hour doing basic typing. You must send $150 deposit for equipment verification via Wire transfer or cryptocurrency prior to beginning onboarding.',
    responsibilities: ['Data typing', 'Immediate deposit verification'],
    requirements: ['No qualifications necessary'],
    applicationUrl: 'http://suspicious-fastcash-careers.example.com',
    postedAt: '2026-08-28T12:00:00Z',
    isSuspicious: true,
    suspiciousReason: 'Unrealistic salary for entry role and requests upfront payment for equipment. Flagged by AI Safety Quality Filter.',
    department: 'Unknown'
  }
];

export const PRECOMPUTED_ANALYSES: Record<string, AIJobAnalysis> = {
  job_001: {
    jobId: 'job_001',
    matchScore: 91,
    scoreBreakdown: {
      skillsScore: 92,
      experienceScore: 90,
      educationScore: 95,
      locationScore: 90,
      preferenceScore: 88
    },
    strengths: [
      'Strong React & TypeScript experience from Apex Cloud Solutions',
      'Proven track record building reusable component libraries with Tailwind CSS',
      'Direct REST API microservice integration experience',
      'BS in Computer Science matches requirements exactly'
    ],
    missingSkills: ['Next.js (preferred, easy to learn given React background)'],
    experienceMatch: true,
    educationMatch: true,
    recommendation: 'Strong match',
    summaryReason:
      'Your 3.5+ years working with React, TypeScript, and Tailwind CSS aligns directly with Starlight Tech’s tech stack and mid-level requirements.',
    suggestedBulletPoints: [
      'Engineered reusable frontend UI component libraries in React and TypeScript, accelerating feature rollouts by 28%.',
      'Optimized client-side rendering bottlenecks and bundle sizes, reducing initial load latency by 350ms.'
    ],
    keyKeywords: ['React', 'TypeScript', 'Tailwind CSS', 'Component Architecture', 'Vitest']
  },
  job_002: {
    jobId: 'job_002',
    matchScore: 88,
    scoreBreakdown: {
      skillsScore: 88,
      experienceScore: 86,
      educationScore: 95,
      locationScore: 100,
      preferenceScore: 90
    },
    strengths: [
      'Full-stack expertise spanning React, Node.js, and PostgreSQL',
      'Experience handling high-traffic microservices (40k+ daily requests)',
      'Remote US role matches user preferences perfectly'
    ],
    missingSkills: ['AWS infrastructure management (have AWS Cloud Practitioner cert, minimal production SRE)'],
    experienceMatch: true,
    educationMatch: true,
    recommendation: 'Strong match',
    summaryReason:
      'Excellent match across the full JavaScript stack (Node.js + React + PostgreSQL) and database schema design.',
    suggestedBulletPoints: [
      'Built authenticated REST microservices with Node.js and PostgreSQL handling 40,000+ daily requests with 99.9% uptime.',
      'Maintained PostgreSQL databases and supported internal dashboards built with React and Tailwind CSS.'
    ],
    keyKeywords: ['Full Stack', 'Node.js', 'PostgreSQL', 'REST APIs', 'React', 'Observability']
  },
  job_003: {
    jobId: 'job_003',
    matchScore: 84,
    scoreBreakdown: {
      skillsScore: 85,
      experienceScore: 88,
      educationScore: 90,
      locationScore: 80,
      preferenceScore: 75
    },
    strengths: [
      'CompTIA Security+ certification directly held',
      'Proven IT user support background for 250+ enterprise users at Vanguard Tech',
      'Strong Linux / Bash scripting capabilities'
    ],
    missingSkills: ['PowerShell automation (primary experience was Bash)'],
    experienceMatch: true,
    educationMatch: true,
    recommendation: 'Good match',
    summaryReason:
      'Your hands-on IT support background at Vanguard Tech Services plus your CompTIA Security+ certification makes you an exceptional candidate.',
    suggestedBulletPoints: [
      'Administered internal ticketing and endpoint network diagnostics for 250+ enterprise users with a 98% satisfaction rating.',
      'Authored automated Bash scripts to standardize workstation provisioning, saving 12 hours weekly.'
    ],
    keyKeywords: ['IT Support', 'Network Troubleshooting', 'Linux', 'Security+', 'Bash Automation']
  },
  job_004: {
    jobId: 'job_004',
    matchScore: 68,
    scoreBreakdown: {
      skillsScore: 60,
      experienceScore: 65,
      educationScore: 90,
      locationScore: 90,
      preferenceScore: 80
    },
    strengths: ['Docker containerization', 'Linux command line', 'AWS Cloud Practitioner certification'],
    missingSkills: ['Kubernetes cluster administration', 'Terraform Infrastructure as Code', '4+ years dedicated SRE experience'],
    experienceMatch: false,
    educationMatch: true,
    recommendation: 'Moderate match',
    summaryReason:
      'Role requires senior-level Kubernetes and Terraform orchestration experience, which is currently a growth area.',
    suggestedBulletPoints: [
      'Integrated automated CI/CD unit testing pipelines with GitHub Actions, catching 95% of regressions pre-merge.'
    ],
    keyKeywords: ['DevOps', 'Kubernetes', 'Terraform', 'AWS', 'Docker']
  },
  job_005: {
    jobId: 'job_005',
    matchScore: 95,
    scoreBreakdown: {
      skillsScore: 96,
      experienceScore: 95,
      educationScore: 95,
      locationScore: 95,
      preferenceScore: 92
    },
    strengths: [
      'Surpasses all required skills (React, JavaScript, Git, REST APIs)',
      'Offers bonus TypeScript and backend experience',
      'Computer Science degree matches required qualifications'
    ],
    missingSkills: [],
    experienceMatch: true,
    educationMatch: true,
    recommendation: 'Strong match',
    summaryReason:
      'You exceed every junior requirement with verified production React experience and solid CS foundational knowledge.',
    suggestedBulletPoints: [
      'Engineered reusable frontend UI libraries in React and TypeScript, boosting developer feature velocity by 28%.'
    ],
    keyKeywords: ['React', 'JavaScript', 'Git', 'REST APIs', 'UI Components']
  }
};

export const INITIAL_APPLICATIONS: ApplicationRecord[] = [
  {
    id: 'app_001',
    userId: 'usr_pilot_98124',
    jobId: 'job_001',
    job: INITIAL_JOBS[0],
    resumeVersionId: 'res_master_01',
    resumeTitle: 'Master Technical Resume (Tailored)',
    status: 'interview',
    appliedDate: '2026-08-20',
    matchScore: 91,
    notes: 'Technical screen completed with Lead Architect. Next: System design & React live pairing.',
    interviewDate: '2026-09-02T10:00:00-07:00',
    followUpDate: '2026-09-03',
    verifiedByUser: true,
    applicationAnswers: [
      {
        id: 'ans_1',
        question: 'How many years of commercial experience do you have with React and TypeScript?',
        category: 'experience',
        suggestedAnswer: '3+ years of production experience across web applications and component libraries.',
        userAnswer: '3+ years of production experience across web applications and component libraries.',
        status: 'approved',
        requiresManualReview: false
      },
      {
        id: 'ans_2',
        question: 'Are you authorized to work in the United States without sponsorship?',
        category: 'work_auth',
        suggestedAnswer: 'Yes, I am a US citizen / authorized to work without sponsorship.',
        userAnswer: 'Yes, I am a US citizen / authorized to work without sponsorship.',
        status: 'approved',
        requiresManualReview: false
      }
    ],
    history: [
      { status: 'saved', timestamp: '2026-08-19T09:00:00Z', note: 'Discovered via Greenhouse job board' },
      { status: 'preparing', timestamp: '2026-08-19T11:00:00Z', note: 'Resume tailored with truth guarantee' },
      { status: 'applied', timestamp: '2026-08-20T14:20:00Z', note: 'Application submitted with user approval' },
      { status: 'interview', timestamp: '2026-08-26T16:00:00Z', note: 'Invited to Round 2 Technical Screen' }
    ],
    createdAt: '2026-08-19T09:00:00Z',
    updatedAt: '2026-08-26T16:00:00Z'
  },
  {
    id: 'app_002',
    userId: 'usr_pilot_98124',
    jobId: 'job_002',
    job: INITIAL_JOBS[1],
    resumeVersionId: 'res_master_01',
    resumeTitle: 'Master Technical Resume',
    status: 'assessment',
    appliedDate: '2026-08-22',
    matchScore: 88,
    notes: 'Completed 60-minute async coding challenge on Node.js/PostgreSQL query performance.',
    followUpDate: '2026-08-30',
    verifiedByUser: true,
    applicationAnswers: [
      {
        id: 'ans_3',
        question: 'Describe your experience optimizing SQL query bottlenecks in PostgreSQL.',
        category: 'technical',
        suggestedAnswer:
          'At Apex Cloud, I analyzed slow query logs using EXPLAIN ANALYZE, added composite B-tree indexes, and restructured ORM joins, reducing query latency by 45%.',
        userAnswer:
          'At Apex Cloud, I analyzed slow query logs using EXPLAIN ANALYZE, added composite B-tree indexes, and restructured ORM joins, reducing query latency by 45%.',
        status: 'approved',
        requiresManualReview: false
      }
    ],
    history: [
      { status: 'saved', timestamp: '2026-08-21T10:00:00Z' },
      { status: 'applied', timestamp: '2026-08-22T08:30:00Z' },
      { status: 'assessment', timestamp: '2026-08-25T11:00:00Z', note: 'Received Take-Home Assessment' }
    ],
    createdAt: '2026-08-21T10:00:00Z',
    updatedAt: '2026-08-25T11:00:00Z'
  },
  {
    id: 'app_003',
    userId: 'usr_pilot_98124',
    jobId: 'job_003',
    job: INITIAL_JOBS[2],
    resumeVersionId: 'res_it_support_02',
    resumeTitle: 'IT Support & Systems Engineer Resume',
    status: 'applied',
    appliedDate: '2026-08-25',
    matchScore: 84,
    notes: 'Submitted directly to Krypton Security careers portal.',
    followUpDate: '2026-09-01',
    verifiedByUser: true,
    applicationAnswers: [],
    history: [
      { status: 'saved', timestamp: '2026-08-24T12:00:00Z' },
      { status: 'applied', timestamp: '2026-08-25T15:45:00Z' }
    ],
    createdAt: '2026-08-24T12:00:00Z',
    updatedAt: '2026-08-25T15:45:00Z'
  },
  {
    id: 'app_004',
    userId: 'usr_pilot_98124',
    jobId: 'job_005',
    job: INITIAL_JOBS[4],
    resumeVersionId: 'res_master_01',
    resumeTitle: 'Master Technical Resume',
    status: 'preparing',
    matchScore: 95,
    notes: 'Resume tailored; ready for assisted form-fill review.',
    verifiedByUser: false,
    applicationAnswers: [],
    history: [{ status: 'saved', timestamp: '2026-08-28T07:00:00Z' }],
    createdAt: '2026-08-28T07:00:00Z',
    updatedAt: '2026-08-28T07:00:00Z'
  }
];

export const INITIAL_REMINDERS: ReminderItem[] = [
  {
    id: 'rem_1',
    type: 'interview',
    title: 'Round 2 Technical Interview with Starlight Tech',
    company: 'Starlight Tech Inc.',
    jobTitle: 'Frontend Developer (React / TypeScript)',
    dueDate: '2026-09-02T10:00:00-07:00',
    completed: false,
    applicationId: 'app_001'
  },
  {
    id: 'rem_2',
    type: 'follow_up',
    title: 'Check status on Nexus Data Systems Take-home',
    company: 'Nexus Data Systems',
    jobTitle: 'Full Stack Software Engineer',
    dueDate: '2026-08-30T09:00:00-07:00',
    completed: false,
    applicationId: 'app_002'
  },
  {
    id: 'rem_3',
    type: 'deadline',
    title: 'Complete application draft for Velocity Labs',
    company: 'Velocity Labs',
    jobTitle: 'Junior Software Engineer',
    dueDate: '2026-08-29T18:00:00-07:00',
    completed: false,
    applicationId: 'app_004'
  }
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif_1',
    title: 'New 95% Strong Match Found',
    message: 'Junior Software Engineer at Velocity Labs matches your React & TypeScript skills.',
    type: 'match',
    timestamp: '2026-08-28T06:15:00Z',
    read: false,
    link: '/jobs/job_005'
  },
  {
    id: 'notif_2',
    title: 'Upcoming Interview in 5 Days',
    message: 'Starlight Tech Round 2 Technical Interview scheduled for Sept 2nd.',
    type: 'reminder',
    timestamp: '2026-08-28T08:00:00Z',
    read: false,
    link: '/applications'
  },
  {
    id: 'notif_3',
    title: 'Application Ready for Review',
    message: 'Assisted form mapping completed for Velocity Labs. Please review before submission.',
    type: 'application',
    timestamp: '2026-08-28T07:05:00Z',
    read: true,
    link: '/applications/review/job_005'
  },
  {
    id: 'notif_4',
    title: 'Suspicious Job Alert',
    message: 'JobPilot AI flagged an entry-level listing requesting equipment payments.',
    type: 'security',
    timestamp: '2026-08-28T12:05:00Z',
    read: true,
    link: '/jobs'
  }
];

export const INITIAL_CAREER_INSIGHT: CareerInsight = {
  topInDemandSkills: [
    { skill: 'TypeScript', demandGrowth: '+34% YoY', userHas: true },
    { skill: 'React', demandGrowth: '+28% YoY', userHas: true },
    { skill: 'Docker & Containers', demandGrowth: '+42% YoY', userHas: true },
    { skill: 'Next.js & SSR', demandGrowth: '+39% YoY', userHas: false },
    { skill: 'AWS Cloud Infrastructure', demandGrowth: '+31% YoY', userHas: true },
    { skill: 'Kubernetes / SRE', demandGrowth: '+45% YoY', userHas: false }
  ],
  skillGaps: [
    {
      skill: 'Next.js App Router',
      frequency: 68,
      recommendation:
        'Found in 68% of your matched Frontend roles. Building a full-stack Next.js project will immediately boost your match score to 96%+.'
    },
    {
      skill: 'Dockerized Microservices',
      frequency: 44,
      recommendation:
        'Highlight your container setup in project descriptions to stand out for full-stack postings.'
    }
  ],
  strongestJobCategories: [
    { category: 'Frontend Engineering (React/TS)', matchRate: 92, applicationSuccessRate: 40 },
    { category: 'Full-Stack JavaScript/Node', matchRate: 88, applicationSuccessRate: 33 },
    { category: 'IT Support & Systems Diagnostics', matchRate: 85, applicationSuccessRate: 25 }
  ],
  recommendedProjects: [
    {
      title: 'Real-time Next.js Collaboration Canvas',
      targetSkills: ['Next.js', 'Server Actions', 'WebSockets', 'Tailwind CSS'],
      estimatedTime: '2 weekends',
      rationale:
        'Directly addresses the #1 skill gap in your target Frontend & Full-Stack job listings.'
    },
    {
      title: 'Terraform AWS Infrastructure Starter',
      targetSkills: ['AWS', 'Terraform', 'CI/CD'],
      estimatedTime: '1 weekend',
      rationale: 'Demonstrates practical cloud deployment readiness for DevOps/Systems postings.'
    }
  ],
  resumeImprovements: [
    'Add quantifiable latency and bundle-size metrics to your UC Davis project bullets.',
    'List CompTIA Security+ in the top certification summary for IT Systems applications.',
    'Reorder TypeScript above general JavaScript in technical skill headers.'
  ]
};

export const INITIAL_AUDIT_LOGS: AuditLog[] = [
  {
    id: 'log_01',
    timestamp: '2026-08-28T13:10:00Z',
    event: 'job_analysis',
    description: 'Calculated transparent match score (91%) for Starlight Tech Frontend Developer.',
    status: 'success'
  },
  {
    id: 'log_02',
    timestamp: '2026-08-28T11:45:00Z',
    event: 'ai_generation',
    description: 'Generated truthful tailored resume bullets without fabricated claims.',
    status: 'success'
  },
  {
    id: 'log_03',
    timestamp: '2026-08-28T09:30:00Z',
    event: 'application_approved',
    description: 'User confirmed form fields and CAPTCHA acknowledgment for Starlight Tech.',
    status: 'success'
  },
  {
    id: 'log_04',
    timestamp: '2026-08-27T16:20:00Z',
    event: 'resume_upload',
    description: 'Parsed master PDF resume and extracted 14 verified skills and 2 work experiences.',
    status: 'success'
  },
  {
    id: 'log_05',
    timestamp: '2026-08-27T14:00:00Z',
    event: 'login',
    description: 'Authenticated session started for alex.mercer@example.com.',
    status: 'info'
  }
];

export const INITIAL_RECRUITER_MESSAGES: RecruiterMessage[] = [
  {
    id: 'msg_rec_01',
    applicationId: 'app_01',
    jobId: 'job_001',
    company: 'Starlight Tech',
    jobTitle: 'Frontend Developer (React / TypeScript)',
    senderName: 'Claire Vance',
    senderRole: 'Senior Talent Partner',
    senderEmail: 'claire.vance@starlighttech.io',
    subject: 'Interview Invitation: Frontend Developer at Starlight Tech',
    snippet: 'Hi Alex, we reviewed your tailored application and were very impressed with your TypeScript and React projects. We would love to schedule a 30-minute introductory video call...',
    body: `Hi Alex,

Thank you for applying to the Frontend Developer role at Starlight Tech! 

Our engineering leadership reviewed your resume and project portfolio, particularly your work with scalable React components and clean TypeScript architectures. We would love to move forward with a 30-minute introductory technical screening video call this week.

Could you let us know your availability over the next few days (Tuesday through Thursday between 10:00 AM - 4:00 PM PST)?

Looking forward to speaking with you!

Warm regards,
Claire Vance
Senior Talent Acquisition Partner | Starlight Tech
claire.vance@starlighttech.io`,
    receivedAt: '2026-08-29T09:15:00Z',
    messageType: 'interview_invite',
    sentiment: 'positive',
    forwardedToUserEmail: 'nobady016@gmail.com',
    forwardStatus: 'delivered',
    forwardedAt: '2026-08-29T09:15:05Z',
    read: false,
    suggestedReply: {
      subject: 'Re: Interview Invitation: Frontend Developer at Starlight Tech',
      body: `Hi Claire,

Thank you for reaching out! I'm thrilled to hear the team's feedback and would love to connect for the introductory video screening.

I am available Wednesday at 11:00 AM PST or Thursday at 2:00 PM PST. Please let me know if either of those time slots works for your calendar.

Best regards,
Alex Mercer`,
      tone: 'professional'
    }
  },
  {
    id: 'msg_rec_02',
    applicationId: 'app_02',
    jobId: 'job_002',
    company: 'Apex Cloud Solutions',
    jobTitle: 'Full Stack Engineer (Node.js & React)',
    senderName: 'Marcus Reynolds',
    senderRole: 'Technical Hiring Manager',
    senderEmail: 'marcus.reynolds@apexcloud.co',
    subject: 'Apex Cloud: Next Steps - Short Technical Assessment Link',
    snippet: 'Hello Alex, following up on your application. We would like to invite you to complete a 45-minute asynchronous TypeScript coding challenge...',
    body: `Hello Alex,

Thank you for your interest in Apex Cloud Solutions. We were impressed with your background in Node.js backend services and React state patterns.

As a next step in our interview process, we invite you to complete a brief 45-minute practical TypeScript assessment on CodeSignal. You can complete it whenever convenient within the next 5 days.

Assessment Link: https://app.codesignal.com/invite/apex-cloud-eng-98124

Please let us know if you have any questions or accommodation requests.

Best,
Marcus Reynolds
Apex Cloud Solutions Engineering Team`,
    receivedAt: '2026-08-28T16:40:00Z',
    messageType: 'assessment_link',
    sentiment: 'positive',
    forwardedToUserEmail: 'nobady016@gmail.com',
    forwardStatus: 'delivered',
    forwardedAt: '2026-08-28T16:40:06Z',
    read: true,
    suggestedReply: {
      subject: 'Re: Apex Cloud: Next Steps - Short Technical Assessment Link',
      body: `Hi Marcus,

Thank you for the update and the assessment link. I have received the details and will complete the challenge by tomorrow afternoon.

Best regards,
Alex Mercer`,
      tone: 'professional'
    }
  }
];

