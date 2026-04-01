'use client';

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useTranslations } from 'next-intl';
import { sendEmail } from '@/app/actions/send-email';
import { SocialIcons } from '@/components/ui';

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export function ContactForm() {
  const t = useTranslations('contact');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  const formSchema = z.object({
    name: z
      .string()
      .trim()
      .min(1, { message: t('formValidation.name-required') })
      .min(3, { message: t('formValidation.name-min-length') }),
    email: z
      .string()
      .email({ message: t('formValidation.email-invalid') })
      .trim()
      .min(1, { message: t('formValidation.email-required') }),
    message: z
      .string()
      .trim()
      .min(1, { message: t('formValidation.message-required') })
      .min(10, { message: t('formValidation.message-min-length') }),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitError(false);
    try {
      await sendEmail(data);
      setSubmitSuccess(true);
      reset();
    } catch {
      setSubmitError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative z-10 flex min-h-[calc(100vh-80px)] w-full flex-col py-8 pt-32">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-12 md:flex-row">
        <div className="space-y-6 md:w-1/2">
          <div className="space-y-4">
            <div className="relative inline-block">
              <span className="relative z-10 bg-gradient-to-r from-[#c95bf5] via-[#a84ef9] to-[#9a4dff] bg-clip-text text-2xl font-bold text-transparent sm:text-3xl">
                {t('title')}
              </span>
            </div>

            <p className="text-lg leading-relaxed text-[#d8c7ff]">{t('description')}</p>

            <div className="py-2">
              <span className="inline-block rounded-full border border-[#c95bf5]/30 bg-[#1a0a2a] px-4 py-2 text-sm font-medium text-[#e2d9f3]">
                {t('messageAnswer')}
              </span>
            </div>
          </div>

          <div className="pt-8">
            <p className="mb-4 text-lg text-[#d8c7ff]">{t('follow-me')}</p>
            <div className="flex">
              <SocialIcons />
            </div>
          </div>
        </div>

        <div className="md:w-1/2">
          <div className="w-full rounded-xl border border-[#2d1b4a] bg-[#1a0a2a] bg-opacity-70 p-6 shadow-lg backdrop-blur-sm sm:p-8">
            {submitSuccess ? (
              <div className="py-8 text-center">
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#c95bf5]/10">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#c95bf5"
                    strokeWidth="2"
                    aria-hidden="true"
                  >
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                </div>
                <h3 className="mb-2 text-2xl font-bold text-[#f8f5ff]">{t('success-message')}</h3>
                <p className="mb-6 text-[#b8a2e0]">{t('thank-you-message')}</p>
                <button
                  onClick={() => setSubmitSuccess(false)}
                  className="cursor-pointer rounded-lg bg-[#c95bf5] px-5 py-2 font-medium text-white transition-colors hover:bg-[#b74ae5]"
                >
                  {t('form.send-new-message')}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
                <div>
                  <label htmlFor="name" className="mb-2 block text-sm font-medium text-[#e2d9f3]">
                    {t('form.name')}
                  </label>
                  <input
                    id="name"
                    {...register('name')}
                    required
                    aria-required="true"
                    autoComplete="name"
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? 'name-error' : undefined}
                    className="w-full rounded-lg border border-[#3a2a5a] bg-[#12071f] px-4 py-3 text-[#f8f5ff] placeholder-[#5d4a7a] outline-none transition-all focus:border-[#c95bf5] focus:ring-2 focus:ring-[#c95bf5]/50"
                    placeholder={t('form.name-placeholder')}
                  />
                  {errors.name && (
                    <p id="name-error" role="alert" className="mt-2 text-sm text-[#ff6b6b]">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="mb-2 block text-sm font-medium text-[#e2d9f3]">
                    {t('form.email')}
                  </label>
                  <input
                    id="email"
                    type="email"
                    {...register('email')}
                    required
                    aria-required="true"
                    autoComplete="email"
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                    className="w-full rounded-lg border border-[#3a2a5a] bg-[#12071f] px-4 py-3 text-[#f8f5ff] placeholder-[#5d4a7a] outline-none transition-all focus:border-[#c95bf5] focus:ring-2 focus:ring-[#c95bf5]/50"
                    placeholder={t('form.email-placeholder')}
                  />
                  {errors.email && (
                    <p id="email-error" role="alert" className="mt-2 text-sm text-[#ff6b6b]">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="mb-2 block text-sm font-medium text-[#e2d9f3]"
                  >
                    {t('form.message')}
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    {...register('message')}
                    required
                    aria-required="true"
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? 'message-error' : undefined}
                    className="w-full rounded-lg border border-[#3a2a5a] bg-[#12071f] px-4 py-3 text-[#f8f5ff] placeholder-[#5d4a7a] outline-none transition-all focus:border-[#c95bf5] focus:ring-2 focus:ring-[#c95bf5]/50"
                    placeholder={t('form.message-placeholder')}
                  />
                  {errors.message && (
                    <p id="message-error" role="alert" className="mt-2 text-sm text-[#ff6b6b]">
                      {errors.message.message}
                    </p>
                  )}
                </div>

                {submitError && <p className="text-sm text-[#ff6b6b]">{t('error-message')}</p>}

                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex w-full cursor-pointer items-center justify-center rounded-lg bg-[#c95bf5] px-6 py-3 font-medium text-white transition-colors hover:bg-[#b74ae5] disabled:opacity-70"
                  >
                    {isSubmitting ? (
                      <>
                        <svg
                          className="-ml-1 mr-3 h-5 w-5 animate-spin text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                        {t('form.submit-loading')}
                      </>
                    ) : (
                      <span>{t('form.submit-button')}</span>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
