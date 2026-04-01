import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Header } from '@/components/layout/Header';

describe('Header', () => {
  it('renders the brand name 中澤', () => {
    render(<Header />);
    expect(screen.getByText('中澤')).toBeInTheDocument();
  });

  it('renders the brand as a link to home', () => {
    render(<Header />);
    const brand = screen.getByText('中澤');
    expect(brand).toHaveAttribute('href', '/');
  });

  it('renders the header element', () => {
    render(<Header />);
    expect(screen.getByRole('banner')).toBeInTheDocument();
  });

  it('renders menu items on desktop', () => {
    render(<Header />);
    expect(screen.getAllByText('Home').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('About').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('Contact').length).toBeGreaterThanOrEqual(1);
  });

  it('renders language switcher', () => {
    render(<Header />);
    expect(screen.getByLabelText('Switch to Portuguese')).toBeInTheDocument();
  });

  it('renders GitHub button', () => {
    render(<Header />);
    expect(screen.getByLabelText('Star on GitHub')).toBeInTheDocument();
  });

  it('renders hamburger button', () => {
    render(<Header />);
    expect(screen.getByLabelText('Open menu')).toBeInTheDocument();
  });

  it('toggles mobile menu on hamburger click', async () => {
    const user = userEvent.setup();
    render(<Header />);

    const hamburger = screen.getByLabelText('Open menu');
    await user.click(hamburger);

    const closeButtons = screen.getAllByLabelText('Close menu');
    expect(closeButtons.length).toBeGreaterThanOrEqual(1);
  });

  it('header has fixed positioning', () => {
    render(<Header />);
    const header = screen.getByRole('banner');
    expect(header.className).toContain('fixed');
  });

  it('header has z-50 for stacking', () => {
    render(<Header />);
    const header = screen.getByRole('banner');
    expect(header.className).toContain('z-50');
  });

  it('snapshot', () => {
    const { container } = render(<Header />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
