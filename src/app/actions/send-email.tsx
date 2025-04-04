'use server';

import { Resend } from 'resend';
import { EmailTemplate } from '@/components/templates/EmailTemplate';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail(data) {
  try {
    await resend.emails.send({
      from: 'Contact Form <onboarding@resend.dev>',
      to: 'samuelnakazawa895@gmail.com',
      subject: `New message from ${data.name}`,
      react: EmailTemplate(data),
    });
  } catch (error) {
    throw new Error('Failed to send email');
  }
}
