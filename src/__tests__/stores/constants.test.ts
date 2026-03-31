import { describe, it, expect } from 'vitest';
import { skillIconPaths, skills, profileLinks, socialLinks } from '@/components/constants';

describe('constants', () => {
  describe('skillIconPaths', () => {
    it('has an entry for every SkillName', () => {
      const expectedSkills = [
        'JavaScript',
        'TypeScript',
        'React',
        'Node.js',
        'Next.js',
        'Python',
        'PostgreSQL',
        'MongoDB',
        'Google Cloud',
        'Github',
        'Grafana',
      ];
      expect(Object.keys(skillIconPaths)).toEqual(expectedSkills);
    });

    it('all icon paths are non-empty strings starting with /', () => {
      for (const [, path] of Object.entries(skillIconPaths)) {
        expect(path).toMatch(/^\/.+\.svg$/);
      }
    });
  });

  describe('skills', () => {
    it('has 11 skills', () => {
      expect(skills).toHaveLength(11);
    });

    it('each skill has a name and iconPath', () => {
      for (const skill of skills) {
        expect(skill.name).toBeTruthy();
        expect(skill.iconPath).toBeTruthy();
      }
    });

    it('each skill iconPath matches skillIconPaths', () => {
      for (const skill of skills) {
        expect(skill.iconPath).toBe(skillIconPaths[skill.name]);
      }
    });

    it('has no duplicate skill names', () => {
      const names = skills.map(s => s.name);
      expect(new Set(names).size).toBe(names.length);
    });
  });

  describe('profileLinks', () => {
    it('has linkedin, github, instagram, and medium', () => {
      expect(profileLinks).toHaveProperty('linkedin');
      expect(profileLinks).toHaveProperty('github');
      expect(profileLinks).toHaveProperty('instagram');
      expect(profileLinks).toHaveProperty('medium');
    });

    it('all links are valid URLs', () => {
      for (const [, url] of Object.entries(profileLinks)) {
        expect(() => new URL(url)).not.toThrow();
      }
    });
  });

  describe('socialLinks', () => {
    it('has 4 social links', () => {
      expect(socialLinks).toHaveLength(4);
    });

    it('each social link has name, url, and icon', () => {
      for (const link of socialLinks) {
        expect(link.name).toBeTruthy();
        expect(link.url).toBeTruthy();
        expect(link.icon).toBeTruthy();
      }
    });

    it('social link URLs match profileLinks', () => {
      const githubLink = socialLinks.find(l => l.name === 'GitHub');
      expect(githubLink?.url).toBe(profileLinks.github);

      const linkedinLink = socialLinks.find(l => l.name === 'LinkedIn');
      expect(linkedinLink?.url).toBe(profileLinks.linkedin);
    });

    it('all icons are SVG paths', () => {
      for (const link of socialLinks) {
        expect(link.icon).toMatch(/^\/.+\.svg$/);
      }
    });
  });
});
