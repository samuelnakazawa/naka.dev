import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ResumeSection } from '@/components/layout/about/resume';

describe('ResumeSection', () => {
  it('renders the experience heading', () => {
    render(<ResumeSection />);
    expect(screen.getByText('Experience')).toBeInTheDocument();
  });

  it('renders experience items from i18n data', () => {
    render(<ResumeSection />);
    expect(screen.getByText('Software Engineer')).toBeInTheDocument();
    expect(screen.getByText('Junior Developer')).toBeInTheDocument();
  });

  it('renders company names', () => {
    render(<ResumeSection />);
    expect(screen.getByText('Globo')).toBeInTheDocument();
    expect(screen.getByText('Startup Inc')).toBeInTheDocument();
  });

  it('renders periods', () => {
    render(<ResumeSection />);
    expect(screen.getByText('2022 - Present')).toBeInTheDocument();
    expect(screen.getByText('2020 - 2022')).toBeInTheDocument();
  });

  it('renders education section', () => {
    render(<ResumeSection />);
    expect(screen.getByText('Computer Science')).toBeInTheDocument();
    expect(screen.getByText('University XYZ')).toBeInTheDocument();
  });

  it('renders languages section', () => {
    render(<ResumeSection />);
    expect(screen.getByText('Languages')).toBeInTheDocument();
  });

  it('has accessible heading for experience section', () => {
    render(<ResumeSection />);
    const heading = screen.getByRole('heading', { name: 'Experience' });
    expect(heading).toHaveAttribute('id', 'experience-heading');
  });

  it('experience section has aria-labelledby', () => {
    const { container } = render(<ResumeSection />);
    const section = container.querySelector('[aria-labelledby="experience-heading"]');
    expect(section).toBeInTheDocument();
  });

  it('renders correct number of experience cards', () => {
    render(<ResumeSection />);
    const cards = screen.getAllByText('Hover for details');
    expect(cards.length).toBeGreaterThanOrEqual(2);
  });

  it('snapshot', () => {
    const { container } = render(<ResumeSection />);
    expect(container).toMatchSnapshot();
  });
});
