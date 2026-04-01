import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { HamburgerButton } from '@/components/ui/hamburguer-button';

describe('HamburgerButton', () => {
  it('renders a button', () => {
    render(<HamburgerButton isOpen={false} onClick={vi.fn()} />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('shows "Open menu" label when closed', () => {
    render(<HamburgerButton isOpen={false} onClick={vi.fn()} />);
    expect(screen.getByLabelText('Open menu')).toBeInTheDocument();
  });

  it('shows "Close menu" label when open', () => {
    render(<HamburgerButton isOpen={true} onClick={vi.fn()} />);
    expect(screen.getByLabelText('Close menu')).toBeInTheDocument();
  });

  it('calls onClick when clicked', async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();
    render(<HamburgerButton isOpen={false} onClick={onClick} />);

    await user.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('renders three bar spans', () => {
    const { container } = render(<HamburgerButton isOpen={false} onClick={vi.fn()} />);
    const bars = container.querySelectorAll('.bg-gray-300');
    expect(bars).toHaveLength(3);
  });

  it('is only visible on mobile (md:hidden)', () => {
    const { container } = render(<HamburgerButton isOpen={false} onClick={vi.fn()} />);
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.className).toContain('md:hidden');
  });

  it('snapshot - closed', () => {
    const { container } = render(<HamburgerButton isOpen={false} onClick={vi.fn()} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('snapshot - open', () => {
    const { container } = render(<HamburgerButton isOpen={true} onClick={vi.fn()} />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
