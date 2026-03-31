import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Button, buttonVariants } from '@/components/ui/button';

describe('Button', () => {
  it('renders with default variant and size', () => {
    render(<Button>Click me</Button>);
    const button = screen.getByRole('button', { name: 'Click me' });
    expect(button).toBeInTheDocument();
    expect(button.tagName).toBe('BUTTON');
  });

  it('renders with data-slot attribute', () => {
    render(<Button>Test</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('data-slot', 'button');
  });

  it('applies custom className', () => {
    render(<Button className="custom-class">Test</Button>);
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });

  it('renders as child element when asChild is true', () => {
    render(
      <Button asChild>
        {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
        <a href="/test">Link Button</a>
      </Button>
    );
    const link = screen.getByRole('link', { name: 'Link Button' });
    expect(link).toBeInTheDocument();
    expect(link.tagName).toBe('A');
    expect(link).toHaveAttribute('href', '/test');
  });

  it('passes through native button props', () => {
    render(
      <Button type="submit" disabled>
        Submit
      </Button>
    );
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('type', 'submit');
    expect(button).toBeDisabled();
  });

  it('handles onClick events', () => {
    let clicked = false;
    render(<Button onClick={() => (clicked = true)}>Click</Button>);
    screen.getByRole('button').click();
    expect(clicked).toBe(true);
  });

  describe('variants', () => {
    it.each(['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'] as const)(
      'renders %s variant',
      variant => {
        render(<Button variant={variant}>{variant}</Button>);
        expect(screen.getByRole('button')).toBeInTheDocument();
      }
    );
  });

  describe('sizes', () => {
    it.each(['default', 'sm', 'lg', 'icon'] as const)('renders %s size', size => {
      render(<Button size={size}>Sized</Button>);
      expect(screen.getByRole('button')).toBeInTheDocument();
    });
  });

  describe('buttonVariants', () => {
    it('generates class names for default variant', () => {
      const classes = buttonVariants();
      expect(classes).toContain('bg-primary');
    });

    it('generates class names for destructive variant', () => {
      const classes = buttonVariants({ variant: 'destructive' });
      expect(classes).toContain('bg-destructive');
    });

    it('generates class names for sm size', () => {
      const classes = buttonVariants({ size: 'sm' });
      expect(classes).toContain('h-8');
    });

    it('generates class names for lg size', () => {
      const classes = buttonVariants({ size: 'lg' });
      expect(classes).toContain('h-10');
    });

    it('merges custom className', () => {
      const classes = buttonVariants({ className: 'my-custom' });
      expect(classes).toContain('my-custom');
    });
  });

  it('snapshot - default button', () => {
    const { container } = render(<Button>Default</Button>);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('snapshot - destructive button', () => {
    const { container } = render(<Button variant="destructive">Delete</Button>);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('snapshot - outline button', () => {
    const { container } = render(<Button variant="outline">Outline</Button>);
    expect(container.firstChild).toMatchSnapshot();
  });
});
