import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Footer } from '@/components/layout/Footer';

describe('Footer', () => {
  it('renders the footer element', () => {
    render(<Footer />);
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });

  it('renders copyright text with current year', () => {
    render(<Footer />);
    const year = new Date().getFullYear();
    expect(screen.getByText(`© ${year}`, { exact: false })).toBeInTheDocument();
  });

  it('renders rights holder text', () => {
    render(<Footer />);
    expect(
      screen.getByText('Samuel Nakazawa. All rights reserved.', { exact: false })
    ).toBeInTheDocument();
  });

  it('renders GitHub link', () => {
    render(<Footer />);
    const githubLink = screen.getByText('GitHub').closest('a');
    expect(githubLink).toHaveAttribute('href', 'https://github.com/samuelnakazawa');
  });

  it('renders LinkedIn link', () => {
    render(<Footer />);
    const linkedinLink = screen.getByText('LinkedIn').closest('a');
    expect(linkedinLink).toHaveAttribute(
      'href',
      'https://www.linkedin.com/in/samuel-nakazawa-960301141/'
    );
  });

  it('renders E-mail link to contact page', () => {
    render(<Footer />);
    const emailLink = screen.getByText('E-mail').closest('a');
    expect(emailLink).toHaveAttribute('href', '/contact');
  });

  it('external links open in new tab with noopener', () => {
    render(<Footer />);
    const githubLink = screen.getByText('GitHub').closest('a');
    expect(githubLink).toHaveAttribute('target', '_blank');
    expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer');

    const linkedinLink = screen.getByText('LinkedIn').closest('a');
    expect(linkedinLink).toHaveAttribute('target', '_blank');
    expect(linkedinLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('has minimum height for CLS prevention', () => {
    render(<Footer />);
    const footer = screen.getByRole('contentinfo');
    expect(footer.className).toContain('min-h-[120px]');
  });

  it('snapshot', () => {
    const { container } = render(<Footer />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
