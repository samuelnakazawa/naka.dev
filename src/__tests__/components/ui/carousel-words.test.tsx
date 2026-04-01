import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import { CarouselWords } from '@/components/ui/carousel-words';

describe('CarouselWords', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders all carousel words', () => {
    render(<CarouselWords />);
    const words = ['Developer', 'Engineer', 'Creator'];
    words.forEach(word => {
      expect(screen.getByLabelText(word)).toBeInTheDocument();
    });
  });

  it('shows the first word as active initially', () => {
    render(<CarouselWords />);
    const firstWord = screen.getByLabelText('Developer');
    expect(firstWord.className).toContain('translate-y-0');
    expect(firstWord.className).toContain('opacity-100');
  });

  it('hides non-active words', () => {
    render(<CarouselWords />);
    const secondWord = screen.getByLabelText('Engineer');
    expect(secondWord.className).toContain('translate-y-full');
    expect(secondWord.className).toContain('opacity-0');
  });

  it('cycles to the next word after 3 seconds', () => {
    render(<CarouselWords />);

    act(() => {
      vi.advanceTimersByTime(3000);
    });

    const secondWord = screen.getByLabelText('Engineer');
    expect(secondWord.className).toContain('translate-y-0');
  });

  it('cycles back to the first word after all words', () => {
    render(<CarouselWords />);

    act(() => {
      vi.advanceTimersByTime(9000);
    });

    const firstWord = screen.getByLabelText('Developer');
    expect(firstWord.className).toContain('translate-y-0');
  });

  it('cleans up interval on unmount', () => {
    const clearSpy = vi.spyOn(global, 'clearInterval');
    const { unmount } = render(<CarouselWords />);
    unmount();
    expect(clearSpy).toHaveBeenCalled();
    clearSpy.mockRestore();
  });

  it('snapshot', () => {
    const { container } = render(<CarouselWords />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
