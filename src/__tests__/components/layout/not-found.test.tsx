import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Page404 } from '@/components/layout/NotFound';

const mockPush = vi.fn();
const mockBack = vi.fn();

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
    push: mockPush,
    replace: vi.fn(),
    back: mockBack,
  }),
  usePathname: () => '/nonexistent',
}));

describe('Page404', () => {
  beforeEach(() => {
    mockPush.mockClear();
    mockBack.mockClear();
  });

  it('renders 404 text', () => {
    render(<Page404 />);
    expect(screen.getByText('404')).toBeInTheDocument();
  });

  it('renders page title', () => {
    render(<Page404 />);
    expect(screen.getByText('Page Not Found')).toBeInTheDocument();
  });

  it('renders description', () => {
    render(<Page404 />);
    expect(screen.getByText('The page you are looking for does not exist.')).toBeInTheDocument();
  });

  it('renders go home button', () => {
    render(<Page404 />);
    expect(screen.getByText('Go Home')).toBeInTheDocument();
  });

  it('renders go back button', () => {
    render(<Page404 />);
    expect(screen.getByText('Go Back')).toBeInTheDocument();
  });

  it('calls router.push("/") when go home is clicked', async () => {
    const user = userEvent.setup();
    render(<Page404 />);

    await user.click(screen.getByText('Go Home'));
    expect(mockPush).toHaveBeenCalledWith('/');
  });

  it('calls router.back() when go back is clicked', async () => {
    const user = userEvent.setup();
    render(<Page404 />);

    await user.click(screen.getByText('Go Back'));
    expect(mockBack).toHaveBeenCalled();
  });

  it('renders the confused cat meme image', () => {
    render(<Page404 />);
    const image = screen.getByAltText('Confused cat meme');
    expect(image).toBeInTheDocument();
  });

  it('renders error text at bottom', () => {
    render(<Page404 />);
    expect(screen.getByText('Error 404')).toBeInTheDocument();
  });

  it('has CSS animation classes', () => {
    const { container } = render(<Page404 />);
    expect(container.querySelector('.animate-slide-in-left')).toBeInTheDocument();
    expect(container.querySelector('.animate-scale-in')).toBeInTheDocument();
    expect(container.querySelector('.animate-pulse-subtle')).toBeInTheDocument();
    expect(container.querySelector('.animate-fade-in-delayed')).toBeInTheDocument();
  });

  it('snapshot', () => {
    const { container } = render(<Page404 />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
