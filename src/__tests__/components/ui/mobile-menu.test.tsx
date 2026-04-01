import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MobileMenu } from '@/components/ui/mobile-menu';

vi.mock('@/i18n/navigation', () => ({
  Link: ({
    children,
    href,
    onClick,
    ...props
  }: {
    children: React.ReactNode;
    href: string;
    onClick?: () => void;
    [key: string]: unknown;
  }) => {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const React = require('react');
    return React.createElement('a', { href, onClick, ...props }, children);
  },
  usePathname: () => '/',
}));

describe('MobileMenu', () => {
  it('renders nothing when closed', () => {
    const { container } = render(<MobileMenu isOpen={false} onClose={vi.fn()} />);
    expect(container.innerHTML).toBe('');
  });

  it('renders menu when open', () => {
    render(<MobileMenu isOpen={true} onClose={vi.fn()} />);
    expect(screen.getByText('中澤')).toBeInTheDocument();
  });

  it('renders close button with accessible label', () => {
    render(<MobileMenu isOpen={true} onClose={vi.fn()} />);
    expect(screen.getByLabelText('Close menu')).toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', async () => {
    const onClose = vi.fn();
    const user = userEvent.setup();
    render(<MobileMenu isOpen={true} onClose={onClose} />);

    await user.click(screen.getByLabelText('Close menu'));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when backdrop is clicked', async () => {
    const onClose = vi.fn();
    const user = userEvent.setup();
    const { container } = render(<MobileMenu isOpen={true} onClose={onClose} />);

    const backdrop = container.querySelector('[aria-hidden="true"]')!;
    await user.click(backdrop);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('renders menu items', () => {
    render(<MobileMenu isOpen={true} onClose={vi.fn()} />);
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
  });

  it('renders social icons', () => {
    render(<MobileMenu isOpen={true} onClose={vi.fn()} />);
    const links = screen.getAllByRole('link');
    expect(links.length).toBeGreaterThanOrEqual(4);
  });

  it('renders copyright text', () => {
    render(<MobileMenu isOpen={true} onClose={vi.fn()} />);
    expect(screen.getByText(`© ${new Date().getFullYear()} Samuel Nakazawa`)).toBeInTheDocument();
  });

  it('renders the brand name as a link to home', () => {
    render(<MobileMenu isOpen={true} onClose={vi.fn()} />);
    const brandLink = screen.getByText('中澤');
    expect(brandLink).toHaveAttribute('href', '/');
  });

  it('snapshot - open', () => {
    const { container } = render(<MobileMenu isOpen={true} onClose={vi.fn()} />);
    expect(container).toMatchSnapshot();
  });
});
