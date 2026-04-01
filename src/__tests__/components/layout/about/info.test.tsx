import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { InfoSection } from '@/components/layout/about/info';

describe('InfoSection', () => {
  it('renders the heading', () => {
    render(<InfoSection />);
    expect(screen.getByText('Want to know more?')).toBeInTheDocument();
  });

  it('renders the CV download button', () => {
    render(<InfoSection />);
    const downloadLink = screen.getByText('Download CV', { exact: false });
    expect(downloadLink).toBeInTheDocument();
  });

  it('CV download link points to correct PDF', () => {
    render(<InfoSection />);
    const downloadLink = screen.getByText('Download CV', { exact: false }).closest('a');
    expect(downloadLink).toHaveAttribute('href', '/documents/Samuel_Nakazawa_Resume_SWE-en.pdf');
    expect(downloadLink).toHaveAttribute('download', 'Samuel-Nakazawa-Resume-en.pdf');
  });

  it('renders the chat link', () => {
    render(<InfoSection />);
    const chatLink = screen.getByText("Let's chat");
    expect(chatLink).toBeInTheDocument();
  });

  it('chat link navigates to contact page', () => {
    render(<InfoSection />);
    const chatLink = screen.getByText("Let's chat").closest('a');
    expect(chatLink).toHaveAttribute('href', '/contact');
  });

  it('renders the download icon SVG', () => {
    const { container } = render(<InfoSection />);
    const svgs = container.querySelectorAll('svg');
    expect(svgs.length).toBeGreaterThanOrEqual(1);
  });

  it('snapshot', () => {
    const { container } = render(<InfoSection />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
