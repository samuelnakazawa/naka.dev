import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { GitHubButton } from '@/components/ui/github-button';

describe('GitHubButton', () => {
  it('renders a link to the GitHub repo', () => {
    render(<GitHubButton />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', 'https://github.com/samuelnakazawa/naka.dev');
  });

  it('opens in a new tab', () => {
    render(<GitHubButton />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('has accessible label', () => {
    render(<GitHubButton />);
    expect(screen.getByLabelText('Star on GitHub')).toBeInTheDocument();
  });

  it('renders the star icon image', () => {
    const { container } = render(<GitHubButton />);
    const img = container.querySelector('img');
    expect(img).toHaveAttribute('src', '/star.svg');
    expect(img).toHaveAttribute('aria-hidden', 'true');
  });

  it('shows tooltip on hover', async () => {
    const user = userEvent.setup();
    render(<GitHubButton />);

    const link = screen.getByRole('link');
    await user.hover(link);
    expect(screen.getByText('Star on GitHub')).toBeInTheDocument();
  });

  it('hides tooltip on mouse leave', async () => {
    const user = userEvent.setup();
    render(<GitHubButton />);

    const link = screen.getByRole('link');
    await user.hover(link);
    expect(screen.getByText('Star on GitHub')).toBeInTheDocument();

    await user.unhover(link);
    expect(screen.queryByText('Star on GitHub')).not.toBeInTheDocument();
  });

  it('has animate-slide-up class', () => {
    render(<GitHubButton />);
    const link = screen.getByRole('link');
    expect(link.className).toContain('animate-slide-up');
  });

  it('snapshot', () => {
    const { container } = render(<GitHubButton />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
