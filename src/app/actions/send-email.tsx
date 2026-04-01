'use server';

import { Resend } from 'resend';
import { EmailTemplate } from '@/components/templates/EmailTemplate';
import { headers } from 'next/headers';

const resend = new Resend(process.env.RESEND_API_KEY);

const RATE_LIMIT_WINDOW_MS = 60_000;
const MAX_REQUESTS_PER_WINDOW = 3;
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  entry.count++;
  return entry.count > MAX_REQUESTS_PER_WINDOW;
}

import { z } from 'zod';

const sendEmailSchema = z.object({
  name: z.string().trim().min(1).min(3),
  email: z.string().trim().email(),
  message: z.string().trim().min(1).min(10),
});

type SendEmailData = z.infer<typeof sendEmailSchema>;

export async function sendEmail(data: SendEmailData) {
  const headersList = await headers();
  const ip = headersList.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';

  if (isRateLimited(ip)) {
    throw new Error('Too many requests. Please try again later.');
  }

  const parsed = sendEmailSchema.safeParse(data);
  if (!parsed.success) {
    throw new Error('Invalid form data.');
  }

  try {
    await resend.emails.send({
      from: 'Contact Form <onboarding@resend.dev>',
      to: 'samuelnakazawa.dev@gmail.com',
      subject: `New message from ${parsed.data.name}`,
      react: EmailTemplate(parsed.data),
    });
  } catch {
    throw new Error('Failed to send email');
  }
}
