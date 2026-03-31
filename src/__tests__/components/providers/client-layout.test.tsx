import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';

vi.mock('@/components/layout/Header', () => ({
  Header: () => {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const React = require('react');
    return React.createElement('header', { 'data-testid': 'header' }, 'Header');
  },
}));

vi.mock('@/components/layout/Footer', () => ({
  Footer: () => {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const React = require('react');
    return React.createElement('footer', { 'data-testid': 'footer' }, 'Footer');
  },
}));

const mockUsePathname = vi.fn().mockReturnValue('/');

vi.mock('next/navigation', () => ({
  usePathname: () => mockUsePathname(),
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    back: vi.fn(),
  }),
}));

import { ClientLayout } from '@/components/providers/client-layout';

describe('ClientLayout', () => {
  beforeEach(() => {
    mockUsePathname.mockReturnValue('/');
  });

  it('renders children', () => {
    render(
      <ClientLayout>
        <div>Page content</div>
      </ClientLayout>
    );
    expect(screen.getByText('Page content')).toBeInTheDocument();
  });

  it('renders the Header', () => {
    render(
      <ClientLayout>
        <div>Content</div>
      </ClientLayout>
    );
    expect(screen.getByTestId('header')).toBeInTheDocument();
  });

  it('does not render Footer on home page (/)', () => {
    render(
      <ClientLayout>
        <div>Content</div>
      </ClientLayout>
    );
    expect(screen.queryByTestId('footer')).not.toBeInTheDocument();
  });

  it('renders Footer on non-home pages', () => {
    mockUsePathname.mockReturnValue('/about');
    render(
      <ClientLayout>
        <div>Content</div>
      </ClientLayout>
    );
    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });

  it('applies dark background on home page', () => {
    const { container } = render(
      <ClientLayout>
        <div>Content</div>
      </ClientLayout>
    );
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.className).toContain('bg-[#0d0d0d]');
  });

  it('applies gradient background on non-home pages', () => {
    mockUsePathname.mockReturnValue('/contact');
    const { container } = render(
      <ClientLayout>
        <div>Content</div>
      </ClientLayout>
    );
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.className).toContain('bg-gradient-to-b');
  });

  it('recognizes /pt as home page', () => {
    mockUsePathname.mockReturnValue('/pt');
    render(
      <ClientLayout>
        <div>Content</div>
      </ClientLayout>
    );
    expect(screen.queryByTestId('footer')).not.toBeInTheDocument();
  });

  it('main has fade-in animation', () => {
    const { container } = render(
      <ClientLayout>
        <div>Content</div>
      </ClientLayout>
    );
    const main = container.querySelector('main');
    expect(main?.className).toContain('animate-fade-in');
  });

  it('has grid layout structure', () => {
    const { container } = render(
      <ClientLayout>
        <div>Content</div>
      </ClientLayout>
    );
    const grid = container.querySelector('.grid');
    expect(grid?.className).toContain('grid-rows-[auto_1fr_auto]');
  });

  it('snapshot - home page', () => {
    const { container } = render(
      <ClientLayout>
        <div>Home Content</div>
      </ClientLayout>
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
