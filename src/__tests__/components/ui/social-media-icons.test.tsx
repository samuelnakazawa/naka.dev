import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { SocialIcons } from '@/components/ui/social-media-icons';

describe('SocialIcons', () => {
  it('renders all 4 social links', () => {
    render(<SocialIcons />);
    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(4);
  });

  it('renders GitHub link', () => {
    render(<SocialIcons />);
    const github = screen.getByLabelText('GitHub');
    expect(github).toHaveAttribute('href', 'https://github.com/samuelnakazawa');
  });

  it('renders LinkedIn link', () => {
    render(<SocialIcons />);
    const linkedin = screen.getByLabelText('LinkedIn');
    expect(linkedin).toHaveAttribute(
      'href',
      'https://www.linkedin.com/in/samuel-nakazawa-960301141/'
    );
  });

  it('renders Instagram link', () => {
    render(<SocialIcons />);
    const instagram = screen.getByLabelText('Instagram');
    expect(instagram).toHaveAttribute('href', 'https://www.instagram.com/samuelnkz/');
  });

  it('renders Medium link', () => {
    render(<SocialIcons />);
    const medium = screen.getByLabelText('Medium');
    expect(medium).toHaveAttribute('href', 'https://medium.com/@samuelnakazawa895');
  });

  it('all links open in new tab', () => {
    render(<SocialIcons />);
    const links = screen.getAllByRole('link');
    links.forEach(link => {
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    });
  });

  it('renders icon images with aria-hidden', () => {
    const { container } = render(<SocialIcons />);
    const images = container.querySelectorAll('img');
    expect(images.length).toBeGreaterThanOrEqual(4);
    images.forEach(img => {
      expect(img).toHaveAttribute('aria-hidden', 'true');
    });
  });

  it('renders name tooltips on hover', () => {
    render(<SocialIcons />);
    const names = ['GitHub', 'LinkedIn', 'Instagram', 'Medium'];
    names.forEach(name => {
      expect(screen.getByText(name)).toBeInTheDocument();
    });
  });

  it('snapshot', () => {
    const { container } = render(<SocialIcons />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
