import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Card } from '@/components/ui/hover-card';

const defaultProps = {
  id: 1,
  role: 'Software Engineer',
  company: 'Globo',
  period: '2022 - Present',
  description: ['Built APIs', 'Led migrations'],
  hoveredCard: null as number | null,
  setHoveredCard: vi.fn(),
  activeCard: null as number | null,
  setActiveCard: vi.fn(),
};

describe('Card (HoverCard)', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1024,
    });
  });

  it('renders the role', () => {
    render(<Card {...defaultProps} />);
    expect(screen.getByText('Software Engineer')).toBeInTheDocument();
  });

  it('renders the company', () => {
    render(<Card {...defaultProps} />);
    expect(screen.getByText('Globo')).toBeInTheDocument();
  });

  it('renders the period', () => {
    render(<Card {...defaultProps} />);
    expect(screen.getByText('2022 - Present')).toBeInTheDocument();
  });

  it('shows "Hover for details" on desktop when not hovered', () => {
    render(<Card {...defaultProps} />);
    expect(screen.getByText('Hover for details')).toBeInTheDocument();
  });

  it('shows description when hovered on desktop', () => {
    render(<Card {...defaultProps} hoveredCard={1} />);
    expect(screen.getByText('Built APIs')).toBeInTheDocument();
    expect(screen.getByText('Led migrations')).toBeInTheDocument();
  });

  it('calls setHoveredCard on mouse enter (desktop)', async () => {
    const user = userEvent.setup();
    const setHoveredCard = vi.fn();
    render(<Card {...defaultProps} setHoveredCard={setHoveredCard} />);

    const card = screen
      .getByText('Software Engineer')
      .closest('[class*="rounded-xl"]') as HTMLElement;
    await user.hover(card);
    expect(setHoveredCard).toHaveBeenCalledWith(1);
  });

  it('calls setHoveredCard(null) on mouse leave (desktop)', async () => {
    const user = userEvent.setup();
    const setHoveredCard = vi.fn();
    render(<Card {...defaultProps} setHoveredCard={setHoveredCard} />);

    const card = screen
      .getByText('Software Engineer')
      .closest('[class*="rounded-xl"]') as HTMLElement;
    await user.hover(card);
    await user.unhover(card);
    expect(setHoveredCard).toHaveBeenCalledWith(null);
  });

  it('does not render company when not provided', () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { company: _company, ...propsWithoutCompany } = defaultProps;
    render(<Card {...propsWithoutCompany} />);
    expect(screen.queryByText('Globo')).not.toBeInTheDocument();
  });

  it('does not render period when not provided', () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { period: _period, ...propsWithoutPeriod } = defaultProps;
    render(<Card {...propsWithoutPeriod} />);
    expect(screen.queryByText('2022 - Present')).not.toBeInTheDocument();
  });

  it('renders nested description groups', () => {
    const descriptionWithGroup = [
      {
        main: 'Main task',
        items: ['Sub task 1', 'Sub task 2'],
      },
    ];
    render(<Card {...defaultProps} description={descriptionWithGroup} hoveredCard={1} />);
    expect(screen.getByText('Main task')).toBeInTheDocument();
    expect(screen.getByText('Sub task 1')).toBeInTheDocument();
    expect(screen.getByText('Sub task 2')).toBeInTheDocument();
  });

  it('renders deeply nested description subitems', () => {
    const descriptionWithSubitems = [
      {
        main: 'Category',
        items: [
          {
            text: 'Sub category',
            subitems: ['Detail 1', 'Detail 2'],
          },
        ],
      },
    ];
    render(<Card {...defaultProps} description={descriptionWithSubitems} hoveredCard={1} />);
    expect(screen.getByText('Category')).toBeInTheDocument();
    expect(screen.getByText('Sub category')).toBeInTheDocument();
    expect(screen.getByText('Detail 1')).toBeInTheDocument();
    expect(screen.getByText('Detail 2')).toBeInTheDocument();
  });

  it('applies active styles when hovered', () => {
    const { container } = render(<Card {...defaultProps} hoveredCard={1} />);
    const card = container.firstChild as HTMLElement;
    expect(card.className).toContain('from-[#9a4dff]');
  });

  it('applies inactive styles when not hovered', () => {
    const { container } = render(<Card {...defaultProps} />);
    const card = container.firstChild as HTMLElement;
    expect(card.className).toContain('bg-[#1a0a2a]');
  });

  it('snapshot - inactive', () => {
    const { container } = render(<Card {...defaultProps} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('snapshot - active', () => {
    const { container } = render(<Card {...defaultProps} hoveredCard={1} />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
