import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LanguageSwitcher } from '@/components/ui/language-switcher';

const mockReplace = vi.fn();
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
    replace: mockReplace,
    push: vi.fn(),
    back: vi.fn(),
  }),
  usePathname: () => '/',
}));

describe('LanguageSwitcher', () => {
  beforeEach(() => {
    mockReplace.mockClear();
  });

  it('renders a button', () => {
    render(<LanguageSwitcher />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('has accessible label for English locale', () => {
    render(<LanguageSwitcher />);
    expect(screen.getByLabelText('Switch to Portuguese')).toBeInTheDocument();
  });

  it('renders the US flag for English locale', () => {
    render(<LanguageSwitcher />);
    const img = screen.getByAltText('US Flag');
    expect(img).toHaveAttribute('src', '/us.svg');
  });

  it('calls router.replace with new locale on click', async () => {
    const user = userEvent.setup();
    render(<LanguageSwitcher />);

    await user.click(screen.getByRole('button'));
    expect(mockReplace).toHaveBeenCalledWith('/', { locale: 'pt' });
  });

  it('shows tooltip on hover', async () => {
    const user = userEvent.setup();
    render(<LanguageSwitcher />);

    await user.hover(screen.getByRole('button'));
    expect(screen.getByText('EN-US')).toBeInTheDocument();
  });

  it('hides tooltip on mouse leave', async () => {
    const user = userEvent.setup();
    render(<LanguageSwitcher />);

    await user.hover(screen.getByRole('button'));
    await user.unhover(screen.getByRole('button'));
    expect(screen.queryByText('EN-US')).not.toBeInTheDocument();
  });

  it('has animate-slide-up class', () => {
    render(<LanguageSwitcher />);
    const button = screen.getByRole('button');
    expect(button.className).toContain('animate-slide-up');
  });

  it('snapshot', () => {
    const { container } = render(<LanguageSwitcher />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
