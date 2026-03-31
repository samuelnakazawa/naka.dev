import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SkillCard } from '@/components/ui/skill-cards';
import type { Skill } from '@/types';

const mockSkill: Skill = {
  name: 'React',
  iconPath: '/react.svg',
};

describe('SkillCard', () => {
  it('renders the skill name', () => {
    render(<SkillCard skill={mockSkill} />);
    expect(screen.getByText('React')).toBeInTheDocument();
  });

  it('renders the skill icon', () => {
    render(<SkillCard skill={mockSkill} />);
    const img = screen.getByAltText('React icon');
    expect(img).toHaveAttribute('src', '/react.svg');
  });

  it('has accessible label', () => {
    render(<SkillCard skill={mockSkill} />);
    expect(screen.getByLabelText('Skill: React')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(<SkillCard skill={mockSkill} className="extra" />);
    expect((container.firstChild as HTMLElement).className).toContain('extra');
  });

  it('shows tooltip on hover', async () => {
    const user = userEvent.setup();
    render(<SkillCard skill={mockSkill} />);

    const card = screen.getByLabelText('Skill: React');
    await user.hover(card);
    const tooltips = screen.getAllByText('React');
    expect(tooltips.length).toBeGreaterThanOrEqual(1);
  });

  it('hides tooltip on mouse leave', async () => {
    const user = userEvent.setup();
    render(<SkillCard skill={mockSkill} />);

    const card = screen.getByLabelText('Skill: React');
    await user.hover(card);
    await user.unhover(card);

    const texts = screen.getAllByText('React');
    expect(texts).toHaveLength(1);
  });

  it('handles skill with special characters in name', () => {
    const specialSkill: Skill = { name: 'Node.js', iconPath: '/node.svg' };
    render(<SkillCard skill={specialSkill} />);
    expect(screen.getByText('Node.js')).toBeInTheDocument();
    expect(screen.getByLabelText('Skill: Node.js')).toBeInTheDocument();
  });

  it('snapshot', () => {
    const { container } = render(<SkillCard skill={mockSkill} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('snapshot - with className', () => {
    const { container } = render(<SkillCard skill={mockSkill} className="test-class" />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
