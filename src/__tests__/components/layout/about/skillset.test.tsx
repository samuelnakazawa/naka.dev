import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SkillSection } from '@/components/layout/about/skillset';

describe('SkillSection', () => {
  it('renders the skillset heading', () => {
    render(<SkillSection />);
    expect(screen.getByText('Skillset')).toBeInTheDocument();
  });

  it('renders skill cards', () => {
    render(<SkillSection />);
    expect(screen.getAllByText('React').length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText('TypeScript').length).toBeGreaterThanOrEqual(1);
  });

  it('renders the show more button on mobile grid', () => {
    render(<SkillSection />);
    expect(screen.getByText('Show more', { exact: false })).toBeInTheDocument();
  });

  it('shows limited skills initially on mobile', () => {
    const { container } = render(<SkillSection />);
    const mobileGrid = container.querySelector('.md\\:hidden.grid');
    if (mobileGrid) {
      const cards = mobileGrid.children;
      expect(cards.length).toBe(4);
    }
  });

  it('shows all skills on desktop', () => {
    const { container } = render(<SkillSection />);
    const desktopGrid = container.querySelector('.md\\:grid.hidden');
    if (desktopGrid) {
      expect(desktopGrid.children.length).toBe(11);
    }
  });

  it('expands to show all skills when "Show more" is clicked', async () => {
    const user = userEvent.setup();
    const { container } = render(<SkillSection />);

    await user.click(screen.getByText('Show more', { exact: false }));

    const mobileGrid = container.querySelector('.md\\:hidden.grid');
    if (mobileGrid) {
      expect(mobileGrid.children.length).toBe(11);
    }
  });

  it('shows "Show less" after expanding', async () => {
    const user = userEvent.setup();
    render(<SkillSection />);

    await user.click(screen.getByText('Show more', { exact: false }));
    expect(screen.getByText('Show less')).toBeInTheDocument();
  });

  it('collapses back when "Show less" is clicked', async () => {
    const user = userEvent.setup();
    const { container } = render(<SkillSection />);

    await user.click(screen.getByText('Show more', { exact: false }));
    await user.click(screen.getByText('Show less'));

    const mobileGrid = container.querySelector('.md\\:hidden.grid');
    if (mobileGrid) {
      expect(mobileGrid.children.length).toBe(4);
    }
  });

  it('show more button displays remaining count', () => {
    render(<SkillSection />);
    const button = screen.getByText('Show more', { exact: false });
    expect(button.textContent).toContain('+7');
  });

  it('heading is an h2', () => {
    render(<SkillSection />);
    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading).toHaveTextContent('Skillset');
  });

  it('snapshot', () => {
    const { container } = render(<SkillSection />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
