import { z } from 'zod';

const menuItemSchema = z.object({
  text: z.string(),
  icon: z.string(),
  path: z.string(),
});

const headerSchema = z.object({
  items: z.record(menuItemSchema),
  button: z.string(),
  'menu-open': z.string(),
  'menu-close': z.string(),
});

const heroSchema = z.object({
  h1: z.string(),
  h2: z.string(),
  carrousel: z.array(z.string()),
});

const footerSchema = z.object({
  rightsHolder: z.string(),
});

const homeSchema = z.object({
  skillset: z.string(),
  'show-more-button': z.string(),
  'show-less-button': z.string(),
});

const resumeSchema = z.object({
  'cv-button': z.string(),
  loading: z.string(),
  error: z.string(),
});

export const translationSchema = z.object({
  header: headerSchema,
  hero: heroSchema,
  footer: footerSchema,
  home: homeSchema,
  resume: resumeSchema,
});
