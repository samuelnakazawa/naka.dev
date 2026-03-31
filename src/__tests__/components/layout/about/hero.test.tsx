import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { HeroSection } from '@/components/layout/about/hero';

describe('HeroSection', () => {
  it('renders the heading with name', () => {
    render(<HeroSection />);
    expect(screen.getByText("Hi, I'm")).toBeInTheDocument();
    expect(screen.getByText('Samuel Nakazawa')).toBeInTheDocument();
  });

  it('renders the profile image on desktop', () => {
    render(<HeroSection />);
    const img = screen.getByAltText('Samuel Nakazawa');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', '/images/samuelnakazawa.jpeg');
  });

  it('profile image has priority for LCP', () => {
    render(<HeroSection />);
    const img = screen.getByAltText('Samuel Nakazawa');
    expect(img).toHaveAttribute('fetchPriority', 'high');
  });

  it('renders bio paragraphs', () => {
    render(<HeroSection />);
    expect(screen.getByText('Software Engineer', { exact: false })).toBeInTheDocument();
    expect(screen.getByText('Globo')).toBeInTheDocument();
  });

  it('renders social icons', () => {
    render(<HeroSection />);
    expect(screen.getByLabelText('GitHub')).toBeInTheDocument();
    expect(screen.getByLabelText('LinkedIn')).toBeInTheDocument();
  });

  it('has fade-in animation class', () => {
    const { container } = render(<HeroSection />);
    const section = container.querySelector('section');
    expect(section?.className).toContain('animate-fade-in');
  });

  it('heading is h1 for SEO', () => {
    render(<HeroSection />);
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toBeInTheDocument();
  });

  it('snapshot', () => {
    const { container } = render(<HeroSection />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
