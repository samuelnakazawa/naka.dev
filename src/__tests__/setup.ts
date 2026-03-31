import '@testing-library/jest-dom/vitest';
import { vi } from 'vitest';

vi.mock('next-intl', () => ({
  useTranslations: (namespace?: string) => {
    const translations: Record<string, Record<string, unknown>> = {
      home: {
        text: 'Software Engineer',
        button: 'About me',
      },
      header: {
        button: 'Star on GitHub',
        'menu-open': 'Open menu',
        'menu-close': 'Close menu',
        items: {
          home: { text: 'Home', path: '/' },
          about: { text: 'About', path: '/about' },
          contact: { text: 'Contact', path: '/contact' },
        },
      },
      footer: {
        rightsHolder: 'Samuel Nakazawa. All rights reserved.',
      },
      contact: {
        title: 'Get in Touch',
        description: 'Send me a message',
        messageAnswer: 'I usually respond within 24 hours',
        'follow-me': 'Follow me',
        'success-message': 'Message sent!',
        'thank-you-message': 'Thank you for reaching out.',
        'error-message': 'Failed to send message.',
        form: {
          name: 'Name',
          'name-placeholder': 'Your name',
          email: 'Email',
          'email-placeholder': 'your@email.com',
          message: 'Message',
          'message-placeholder': 'Your message',
          'submit-button': 'Send Message',
          'submit-loading': 'Sending...',
          'send-new-message': 'Send another message',
        },
        formValidation: {
          'name-required': 'Name is required',
          'name-min-length': 'Name must be at least 3 characters',
          'email-required': 'Email is required',
          'email-invalid': 'Invalid email address',
          'message-required': 'Message is required',
          'message-min-length': 'Message must be at least 10 characters',
        },
      },
      notFound: {
        title: 'Page Not Found',
        description: 'The page you are looking for does not exist.',
        'go-home': 'Go Home',
        'go-back': 'Go Back',
        error: 'Error 404',
      },
      about: {
        hero: {
          h1: "Hi, I'm",
          im: "I'm a ",
          span1: 'Software Engineer',
          text1: 'with X years of experience.',
          text2: 'Currently working at',
          text3: 'I love building',
          span2: 'great products',
          text4: "Let's connect!",
          carousel: ['Developer', 'Engineer', 'Creator'],
        },
        info: {
          h1: 'Want to know more?',
          'cv-button': 'Download CV',
          chat: "Let's chat",
        },
        card: {
          resume: 'Experience',
          hover: 'Hover for details',
          click: 'Tap for details',
        },
        experience: {
          items: {
            '1': {
              role: 'Software Engineer',
              company: 'Globo',
              period: '2022 - Present',
              description: ['Built APIs', 'Led migrations'],
            },
            '2': {
              role: 'Junior Developer',
              company: 'Startup Inc',
              period: '2020 - 2022',
              description: ['Developed features'],
            },
          },
        },
        education: {
          role: 'Computer Science',
          item: {
            institution: 'University XYZ',
            period: '2016 - 2020',
            description: ['Graduated with honors'],
          },
        },
        languages: {
          title: 'Languages',
          description: ['Portuguese - Native', 'English - Fluent'],
        },
      },
      skill: {
        skillset: 'Skillset',
        'show-more-button': 'Show more',
        'show-less-button': 'Show less',
      },
      loader: {
        text: 'Loading...',
      },
    };

    const t = (key: string) => {
      if (!namespace) return key;
      const ns = translations[namespace];
      if (!ns) return key;
      const keys = key.split('.');
      let value: unknown = ns;
      for (const k of keys) {
        if (value && typeof value === 'object' && k in (value as Record<string, unknown>)) {
          value = (value as Record<string, unknown>)[k];
        } else {
          return key;
        }
      }
      return typeof value === 'string' ? value : key;
    };

    t.raw = (key: string) => {
      if (!namespace) return key;
      const ns = translations[namespace];
      if (!ns) return key;
      const keys = key.split('.');
      let value: unknown = ns;
      for (const k of keys) {
        if (value && typeof value === 'object' && k in (value as Record<string, unknown>)) {
          value = (value as Record<string, unknown>)[k];
        } else {
          return key;
        }
      }
      return value;
    };

    return t;
  },
  useLocale: () => 'en',
}));

vi.mock('@/i18n/navigation', () => ({
  Link: ({
    children,
    href,
    ...props
  }: {
    children: React.ReactNode;
    href: string;
    [key: string]: unknown;
  }) => {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const React = require('react');
    return React.createElement('a', { href, ...props }, children);
  },
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    back: vi.fn(),
  }),
  usePathname: () => '/',
}));

vi.mock('next/image', () => ({
  default: ({ src, alt, ...props }: { src: string; alt: string; [key: string]: unknown }) => {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const React = require('react');
    return React.createElement('img', { src, alt, ...props });
  },
}));

vi.mock('next/navigation', () => ({
  usePathname: () => '/',
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    back: vi.fn(),
  }),
}));

vi.mock('next/link', () => ({
  default: ({
    children,
    href,
    ...props
  }: {
    children: React.ReactNode;
    href: string;
    [key: string]: unknown;
  }) => {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const React = require('react');
    return React.createElement('a', { href, ...props }, children);
  },
}));

vi.mock('framer-motion', () => ({
  motion: new Proxy(
    {},
    {
      get: (_target, prop: string) => {
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        const React = require('react');
        // eslint-disable-next-line react/display-name
        return React.forwardRef(
          (
            { children, ...props }: { children?: React.ReactNode; [key: string]: unknown },
            ref: React.Ref<unknown>
          ) => {
            const filteredProps: Record<string, unknown> = {};
            for (const [key, value] of Object.entries(props)) {
              if (
                ![
                  'initial',
                  'animate',
                  'exit',
                  'transition',
                  'variants',
                  'whileHover',
                  'whileTap',
                  'whileInView',
                  'style',
                ].includes(key)
              ) {
                filteredProps[key] = value;
              }
            }
            return React.createElement(prop, { ...filteredProps, ref }, children);
          }
        );
      },
    }
  ),
  AnimatePresence: ({ children }: { children: React.ReactNode }) => children,
}));

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

Object.defineProperty(window, 'scrollTo', {
  writable: true,
  value: vi.fn(),
});

let rafId = 0;
Object.defineProperty(window, 'requestAnimationFrame', {
  writable: true,
  value: vi.fn().mockImplementation(() => {
    return ++rafId;
  }),
});

Object.defineProperty(window, 'cancelAnimationFrame', {
  writable: true,
  value: vi.fn(),
});

Element.prototype.scrollIntoView = vi.fn();
