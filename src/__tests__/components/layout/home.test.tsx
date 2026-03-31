import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import { HomeSection } from '@/components/layout/Home';

describe('HomeSection', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders the container', () => {
    const { container } = render(<HomeSection />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders the CTA button linking to /about', () => {
    render(<HomeSection />);
    const ctaLink = screen.getByText('About me');
    expect(ctaLink).toHaveAttribute('href', '/about');
  });

  it('starts with kanji visible (showText=false)', () => {
    const { container } = render(<HomeSection />);
    const svgs = container.querySelectorAll('svg');
    expect(svgs.length).toBeGreaterThan(0);
  });

  it('renders 4 kanji layers after client hydration', () => {
    const { container } = render(<HomeSection />);
    const svgContainers = container.querySelectorAll('[style*="preserve-3d"]');
    expect(svgContainers).toHaveLength(4);
  });

  it('shows typed text after kanji display time', () => {
    render(<HomeSection />);

    act(() => {
      vi.advanceTimersByTime(4500);
    });

    act(() => {
      vi.advanceTimersByTime(3000);
    });

    expect(screen.getByText('Software Engineer')).toBeInTheDocument();
  });

  it('has proper backdrop blur on CTA button', () => {
    render(<HomeSection />);
    const ctaLink = screen.getByText('About me');
    expect(ctaLink.style.backdropFilter).toBe('blur(4px)');
  });

  it('CTA has focus ring for accessibility', () => {
    render(<HomeSection />);
    const ctaLink = screen.getByText('About me');
    expect(ctaLink.className).toContain('focus:ring-2');
    expect(ctaLink.className).toContain('focus:outline-none');
  });

  it('cleans up interval on unmount', () => {
    const clearSpy = vi.spyOn(global, 'clearInterval');
    const { unmount } = render(<HomeSection />);
    unmount();
    expect(clearSpy).toHaveBeenCalled();
    clearSpy.mockRestore();
  });

  it('cleans up animation frame on unmount', () => {
    const cancelSpy = vi.spyOn(window, 'cancelAnimationFrame');
    const { unmount } = render(<HomeSection />);
    unmount();
    expect(cancelSpy).toHaveBeenCalled();
    cancelSpy.mockRestore();
  });

  it('kanji SVGs have aria-hidden for accessibility', () => {
    const { container } = render(<HomeSection />);
    const svgs = container.querySelectorAll('svg');
    svgs.forEach(svg => {
      expect(svg).toHaveAttribute('aria-hidden', 'true');
    });
  });

  it('snapshot', () => {
    const { container } = render(<HomeSection />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
