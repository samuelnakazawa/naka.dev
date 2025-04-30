export type SkillName =
  | 'JavaScript'
  | 'TypeScript'
  | 'React'
  | 'Node.js'
  | 'Next.js'
  | 'Python'
  | 'PostgreSQL';
  | 'MongoDB';
  | 'Google Cloud'
  | 'Github'
  | 'Grafana'


export interface Skill {
  name: SkillName,
  iconPath: string
}

export type MenuItemType = 'home' | 'about' | 'projects' |  'blog';
