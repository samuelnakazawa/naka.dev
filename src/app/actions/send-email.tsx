'use server';

import { Resend } from 'resend';
import { EmailTemplate } from '@/components/templates/EmailTemplate';

const resend = new Resend(process.env.RESEND_API_KEY);

interface SendEmailData {
  name: string;
  email: string;
  message: string;
}

export async function sendEmail(data: SendEmailData) {
  try {
    await resend.emails.send({
      from: 'Contact Form <onboarding@resend.dev>',
      to: 'samuelnakazawa.dev@gmail.com',
      subject: `New message from ${data.name}`,
      react: EmailTemplate(data),
    });
  } catch {
    throw new Error('Failed to send email');
  }
}
