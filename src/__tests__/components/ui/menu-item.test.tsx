import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MenuItem } from '@/components/ui/menu-item';

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
  usePathname: () => '/',
}));

describe('MenuItem', () => {
  it('renders menu item text', () => {
    render(<MenuItem type="home" />);
    expect(screen.getByText('Home')).toBeInTheDocument();
  });

  it('renders link to correct path', () => {
    render(<MenuItem type="about" />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/about');
  });

  it('highlights active item when pathname matches', () => {
    render(<MenuItem type="home" />);
    const text = screen.getByText('Home');
    expect(text.className).toContain('text-[#c95bf5]');
    expect(text.className).toContain('font-medium');
  });

  it('does not highlight inactive items', () => {
    render(<MenuItem type="about" />);
    const text = screen.getByText('About');
    expect(text.className).not.toContain('font-medium');
  });

  it('calls onClick when wrapper is clicked', async () => {
    const onClick = vi.fn();
    const { container } = render(<MenuItem type="home" onClick={onClick} />);

    const wrapper = container.querySelector('.group') as HTMLElement;
    wrapper.click();
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('has animate-slide-down class', () => {
    const { container } = render(<MenuItem type="home" />);
    const animated = container.querySelector('.animate-slide-down');
    expect(animated).toBeInTheDocument();
  });

  it('snapshot - active', () => {
    const { container } = render(<MenuItem type="home" />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('snapshot - inactive', () => {
    const { container } = render(<MenuItem type="about" />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
