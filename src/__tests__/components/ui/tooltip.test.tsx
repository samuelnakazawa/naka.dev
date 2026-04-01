import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Tooltip } from '@/components/ui/tooltip';

describe('Tooltip', () => {
  it('renders tooltip text', () => {
    render(<Tooltip text="Hello Tooltip" />);
    expect(screen.getByText('Hello Tooltip')).toBeInTheDocument();
  });

  it('defaults to top position', () => {
    const { container } = render(<Tooltip text="Top" />);
    const tooltip = container.firstChild as HTMLElement;
    expect(tooltip.className).toContain('bottom-full');
  });

  it('renders in bottom position', () => {
    const { container } = render(<Tooltip text="Bottom" position="bottom" />);
    const tooltip = container.firstChild as HTMLElement;
    expect(tooltip.className).toContain('top-full');
  });

  it('renders in left position', () => {
    const { container } = render(<Tooltip text="Left" position="left" />);
    const tooltip = container.firstChild as HTMLElement;
    expect(tooltip.className).toContain('right-full');
  });

  it('renders in right position', () => {
    const { container } = render(<Tooltip text="Right" position="right" />);
    const tooltip = container.firstChild as HTMLElement;
    expect(tooltip.className).toContain('left-full');
  });

  it('renders the arrow element', () => {
    const { container } = render(<Tooltip text="Arrow test" />);
    const arrow = container.querySelector('.h-0.w-0');
    expect(arrow).toBeInTheDocument();
  });

  it('has whitespace-nowrap class', () => {
    const { container } = render(<Tooltip text="No wrap" />);
    const tooltip = container.firstChild as HTMLElement;
    expect(tooltip.className).toContain('whitespace-nowrap');
  });

  it('snapshot - top position', () => {
    const { container } = render(<Tooltip text="Snapshot Top" position="top" />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('snapshot - bottom position', () => {
    const { container } = render(<Tooltip text="Snapshot Bottom" position="bottom" />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
