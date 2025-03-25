export const menuItems = ['home', 'about', 'projects', 'resume', 'blog'];
export const carouselText = [
  'Frontend Engineer',
  'React & Typescript',
  'Sleepyhead',
  'Cat Person',
  'Knowledge Seeker',
];
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
