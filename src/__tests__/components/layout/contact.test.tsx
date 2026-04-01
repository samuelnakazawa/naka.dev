import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ContactForm } from '@/components/layout/Contact';

vi.mock('@/app/actions/send-email', () => ({
  sendEmail: vi.fn(),
}));

import { sendEmail } from '@/app/actions/send-email';
const mockSendEmail = vi.mocked(sendEmail);

describe('ContactForm', () => {
  beforeEach(() => {
    mockSendEmail.mockClear();
    mockSendEmail.mockResolvedValue(undefined);
  });

  it('renders the form', () => {
    render(<ContactForm />);
    expect(screen.getByText('Get in Touch')).toBeInTheDocument();
  });

  it('renders name input with label', () => {
    render(<ContactForm />);
    expect(screen.getByLabelText('Name')).toBeInTheDocument();
  });

  it('renders email input with label', () => {
    render(<ContactForm />);
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
  });

  it('renders message textarea with label', () => {
    render(<ContactForm />);
    expect(screen.getByLabelText('Message')).toBeInTheDocument();
  });

  it('renders submit button', () => {
    render(<ContactForm />);
    expect(screen.getByText('Send Message')).toBeInTheDocument();
  });

  it('renders social icons section', () => {
    render(<ContactForm />);
    expect(screen.getByText('Follow me')).toBeInTheDocument();
  });

  describe('form validation', () => {
    it('shows error when name is empty', async () => {
      const user = userEvent.setup();
      render(<ContactForm />);

      await user.click(screen.getByText('Send Message'));

      await waitFor(() => {
        expect(screen.getByText('Name is required')).toBeInTheDocument();
      });
    });

    it('shows error when name is too short', async () => {
      const user = userEvent.setup();
      render(<ContactForm />);

      await user.type(screen.getByLabelText('Name'), 'ab');
      await user.click(screen.getByText('Send Message'));

      await waitFor(() => {
        expect(screen.getByText('Name must be at least 3 characters')).toBeInTheDocument();
      });
    });

    it('shows error for invalid email', async () => {
      const user = userEvent.setup();
      render(<ContactForm />);

      await user.type(screen.getByLabelText('Name'), 'John Doe');
      await user.type(screen.getByLabelText('Email'), 'a@b');
      await user.click(screen.getByText('Send Message'));

      await waitFor(() => {
        expect(screen.getByText('Invalid email address')).toBeInTheDocument();
      });
    });

    it('shows error when email is empty', async () => {
      const user = userEvent.setup();
      render(<ContactForm />);

      await user.type(screen.getByLabelText('Name'), 'John Doe');
      await user.click(screen.getByText('Send Message'));

      await waitFor(() => {
        expect(screen.getByText('Invalid email address')).toBeInTheDocument();
      });
    });

    it('shows error when message is empty', async () => {
      const user = userEvent.setup();
      render(<ContactForm />);

      await user.type(screen.getByLabelText('Name'), 'John Doe');
      await user.type(screen.getByLabelText('Email'), 'john@example.com');
      await user.click(screen.getByText('Send Message'));

      await waitFor(() => {
        expect(screen.getByText('Message is required')).toBeInTheDocument();
      });
    });

    it('shows error when message is too short', async () => {
      const user = userEvent.setup();
      render(<ContactForm />);

      await user.type(screen.getByLabelText('Name'), 'John Doe');
      await user.type(screen.getByLabelText('Email'), 'john@example.com');
      await user.type(screen.getByLabelText('Message'), 'Short');
      await user.click(screen.getByText('Send Message'));

      await waitFor(() => {
        expect(screen.getByText('Message must be at least 10 characters')).toBeInTheDocument();
      });
    });
  });

  describe('form submission', () => {
    it('submits successfully with valid data', async () => {
      const user = userEvent.setup();
      render(<ContactForm />);

      await user.type(screen.getByLabelText('Name'), 'John Doe');
      await user.type(screen.getByLabelText('Email'), 'john@example.com');
      await user.type(screen.getByLabelText('Message'), 'Hello, this is a test message');
      await user.click(screen.getByText('Send Message'));

      await waitFor(() => {
        expect(screen.getByText('Message sent!')).toBeInTheDocument();
      });

      expect(mockSendEmail).toHaveBeenCalledWith({
        name: 'John Doe',
        email: 'john@example.com',
        message: 'Hello, this is a test message',
      });
    });

    it('shows success message with thank you text', async () => {
      const user = userEvent.setup();
      render(<ContactForm />);

      await user.type(screen.getByLabelText('Name'), 'John Doe');
      await user.type(screen.getByLabelText('Email'), 'john@example.com');
      await user.type(screen.getByLabelText('Message'), 'Hello, this is a test message');
      await user.click(screen.getByText('Send Message'));

      await waitFor(() => {
        expect(screen.getByText('Thank you for reaching out.')).toBeInTheDocument();
      });
    });

    it('shows "Send another message" button after success', async () => {
      const user = userEvent.setup();
      render(<ContactForm />);

      await user.type(screen.getByLabelText('Name'), 'John Doe');
      await user.type(screen.getByLabelText('Email'), 'john@example.com');
      await user.type(screen.getByLabelText('Message'), 'Hello, this is a test message');
      await user.click(screen.getByText('Send Message'));

      await waitFor(() => {
        expect(screen.getByText('Send another message')).toBeInTheDocument();
      });
    });

    it('returns to form when "Send another message" is clicked', async () => {
      const user = userEvent.setup();
      render(<ContactForm />);

      await user.type(screen.getByLabelText('Name'), 'John Doe');
      await user.type(screen.getByLabelText('Email'), 'john@example.com');
      await user.type(screen.getByLabelText('Message'), 'Hello, this is a test message');
      await user.click(screen.getByText('Send Message'));

      await waitFor(() => {
        expect(screen.getByText('Send another message')).toBeInTheDocument();
      });

      await user.click(screen.getByText('Send another message'));
      expect(screen.getByLabelText('Name')).toBeInTheDocument();
    });

    it('shows error message on submission failure', async () => {
      mockSendEmail.mockRejectedValueOnce(new Error('Network error'));
      const user = userEvent.setup();
      render(<ContactForm />);

      await user.type(screen.getByLabelText('Name'), 'John Doe');
      await user.type(screen.getByLabelText('Email'), 'john@example.com');
      await user.type(screen.getByLabelText('Message'), 'Hello, this is a test message');
      await user.click(screen.getByText('Send Message'));

      await waitFor(() => {
        expect(screen.getByText('Failed to send message.')).toBeInTheDocument();
      });
    });

    it('resets form fields after successful submission', async () => {
      const user = userEvent.setup();
      render(<ContactForm />);

      await user.type(screen.getByLabelText('Name'), 'John Doe');
      await user.type(screen.getByLabelText('Email'), 'john@example.com');
      await user.type(screen.getByLabelText('Message'), 'Hello, this is a test message');
      await user.click(screen.getByText('Send Message'));

      await waitFor(() => {
        expect(screen.getByText('Send another message')).toBeInTheDocument();
      });

      await user.click(screen.getByText('Send another message'));

      expect(screen.getByLabelText('Name')).toHaveValue('');
      expect(screen.getByLabelText('Email')).toHaveValue('');
      expect(screen.getByLabelText('Message')).toHaveValue('');
    });
  });

  describe('edge cases', () => {
    it('trims whitespace-only name', async () => {
      const user = userEvent.setup();
      render(<ContactForm />);

      await user.type(screen.getByLabelText('Name'), '   ');
      await user.click(screen.getByText('Send Message'));

      await waitFor(() => {
        expect(screen.getByText('Name is required')).toBeInTheDocument();
      });
    });

    it('trims whitespace-only message', async () => {
      const user = userEvent.setup();
      render(<ContactForm />);

      await user.type(screen.getByLabelText('Name'), 'John Doe');
      await user.type(screen.getByLabelText('Email'), 'john@example.com');
      await user.type(screen.getByLabelText('Message'), '         ');
      await user.click(screen.getByText('Send Message'));

      await waitFor(() => {
        expect(screen.getByText('Message is required')).toBeInTheDocument();
      });
    });

    it('accepts email with valid special formats', async () => {
      const user = userEvent.setup();
      render(<ContactForm />);

      await user.type(screen.getByLabelText('Name'), 'John Doe');
      await user.type(screen.getByLabelText('Email'), 'user+tag@example.co.uk');
      await user.type(screen.getByLabelText('Message'), 'This is a valid long message');
      await user.click(screen.getByText('Send Message'));

      await waitFor(() => {
        expect(screen.getByText('Message sent!')).toBeInTheDocument();
      });
    });

    it('name with exactly 3 characters passes validation', async () => {
      const user = userEvent.setup();
      render(<ContactForm />);

      await user.type(screen.getByLabelText('Name'), 'abc');
      await user.type(screen.getByLabelText('Email'), 'john@example.com');
      await user.type(screen.getByLabelText('Message'), 'This is enough text');
      await user.click(screen.getByText('Send Message'));

      await waitFor(() => {
        expect(screen.getByText('Message sent!')).toBeInTheDocument();
      });
    });

    it('message with exactly 10 characters passes validation', async () => {
      const user = userEvent.setup();
      render(<ContactForm />);

      await user.type(screen.getByLabelText('Name'), 'John Doe');
      await user.type(screen.getByLabelText('Email'), 'john@example.com');
      await user.type(screen.getByLabelText('Message'), '1234567890');
      await user.click(screen.getByText('Send Message'));

      await waitFor(() => {
        expect(screen.getByText('Message sent!')).toBeInTheDocument();
      });
    });
  });

  it('snapshot - form state', () => {
    const { container } = render(<ContactForm />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
