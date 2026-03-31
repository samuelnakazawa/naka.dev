import { describe, it, expect } from 'vitest';
import { routing } from '@/i18n/routing';

describe('i18n routing', () => {
  it('includes en and pt locales', () => {
    expect(routing.locales).toContain('en');
    expect(routing.locales).toContain('pt');
  });

  it('has exactly 2 locales', () => {
    expect(routing.locales).toHaveLength(2);
  });

  it('defaults to English', () => {
    expect(routing.defaultLocale).toBe('en');
  });

  it('uses as-needed locale prefix', () => {
    expect(routing.localePrefix).toBe('as-needed');
  });
});
