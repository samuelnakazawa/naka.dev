import type { Skill, SkillName } from '@/types';

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

export const profileLinks = {
  linkedin: 'https://www.linkedin.com/in/samuel-nakazawa-960301141/',
  github: 'https://github.com/samuelnakazawa',
  instagram: 'https://www.instagram.com/samuelnkz/',
  medium: 'https://medium.com/@samuelnakazawa895',
};

export const socialLinks = [
  { name: 'GitHub', url: profileLinks.github, icon: '/github-2.svg' },
  { name: 'LinkedIn', url: profileLinks.linkedin, icon: '/linkedin.svg' },
  { name: 'Instagram', url: profileLinks.instagram, icon: '/instagram.svg' },
  { name: 'Medium', url: profileLinks.medium, icon: '/medium.svg' },
];
