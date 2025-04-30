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
