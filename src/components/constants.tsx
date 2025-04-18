export const skillIconPaths: Record<SkillName, string> = {
  JavaScript: '/javascript.svg',
  TypeScript: '/typescript.svg',
  React: '/react.svg',
  'Node.js': '/node.svg',
  'Next.js': '/nextjs.svg',
  Python: '/python.svg',
  PostgreSQL: '/postgresql.svg',
  MongoDB: '/mongodb.svg',
  'Google Cloud': '/gcp.svg',
  Github: '/github.svg',
  Grafana: '/grafana.svg',
};

export const skills: Skill[] = [
  { name: 'JavaScript', iconPath: skillIconPaths['JavaScript'] },
  { name: 'TypeScript', iconPath: skillIconPaths['TypeScript'] },
  { name: 'React', iconPath: skillIconPaths['React'] },
  { name: 'Node.js', iconPath: skillIconPaths['Node.js'] },
  { name: 'Next.js', iconPath: skillIconPaths['Next.js'] },
  { name: 'Python', iconPath: skillIconPaths['Python'] },
  { name: 'PostgreSQL', iconPath: skillIconPaths['PostgreSQL'] },
  { name: 'MongoDB', iconPath: skillIconPaths['MongoDB'] },
  { name: 'Google Cloud', iconPath: skillIconPaths['Google Cloud'] },
  { name: 'Github', iconPath: skillIconPaths['Github'] },
  { name: 'Grafana', iconPath: skillIconPaths['Grafana'] },
];

//links

export const profileLinks = {
  linkedin: 'https://www.linkedin.com/in/samuel-nakazawa-960301141/',
  github: 'https://github.com/samuelnakazawa',
  instagram: 'https://www.instagram.com/samuelnkz/',
  medium: 'https://medium.com/@samuelnakazawa895',
};

export const socialLinks = [
  {
    name: 'GitHub',
    url: profileLinks['github'],
    icon: (
      <img
        src={'/github-2.svg'}
        alt={`github icon`}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  {
    name: 'LinkedIn',
    url: profileLinks['linkedin'],
    icon: (
      <img
        src={'/linkedin.svg'}
        alt={`linkedin icon`}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  {
    name: 'Instagram',
    url: profileLinks['instagram'],
    icon: (
      <img
        src={'/instagram.svg'}
        alt={`Instagram icon`}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  {
    name: 'Medium',
    url: profileLinks['medium'],
    icon: (
      <img
        src={'/medium.svg'}
        alt={`Medium icon`}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
];

export const experiences = [
  {
    id: 1,
    role: 'Software Engineer',
    company: 'Globo',
    period: 'April 2023 – Present',
    description: [
      'Globo is the largest media and television company in Latin America.',
      {
        main: 'During my tenure, I:',
        items: [
          'Developed AI-integrated interfaces for content production and distribution',
          'Built microservices for large-scale applications',
          {
            text: 'Maintained, engineered, and provisioned systems for critical event coverage including:',
            subitems: ['Brazilian municipal elections', 'The Olympics', 'Big Brother Brasil'],
          },
        ],
      },
    ],
  },
  {
    id: 2,
    role: 'Mid-Level Software Engineer',
    company: 'CI&T',
    period: 'July 2021 – March 2023',
    description: [
      'CI&T is a global consultancy with clients including: Cielo, Google, HP, Itaú, Johnson & Johnson, Motorola, and Globo.',
      {
        main: 'During my time there, I:',
        items: [
          {
            text: 'Designed automation systems including:',
            subitems: [
              'Data processing with Python',
              "Content distribution system for Globo.com (Brazil's 3rd most-visited website)",
            ],
          },
          {
            text: 'Led technical migrations for the following projects using web scraping techniques:',
            subitems: ['Memória Globo website', 'História Globo website'],
          },
        ],
      },
    ],
  },
  {
    id: 3,
    role: 'Front-End Developer',
    company: 'agendaOS',
    period: 'November 2019 – July 2021',
    description: [
      'Developed and maintained agendaOS web platform using React.js and Redux.',
      'Contributed to the initial development of the mobile application with React Native.',
    ],
  },
];

export const education = {
  id: 4,
  role: 'Technology in Information System',
  company: 'Faculdade de Tecnologia de Bragança Paulista',
  period: '2018-2020',
  description: [
    'Focused on system development and information technology management.',
    'Completed degree with honors in 2020.',
  ],
};

export const cardSkills = {
  id: 5,
  role: 'Languages',
  company: 'Languages that I speak',
  description: ['Languages: English (Full Professional Proficiency)', 'Portuguese (Native)'],
};
