'use client';

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { sendEmail } from '@/app/actions/send-email';
import { useLanguageStore } from '@/stores/language';
import { SocialIcons } from '@/components/ui';

const formSchema = (t: any) =>
  z.object({
    name: z
      .string()
      .trim()
      .min(1, { message: t.contact.formValidation['name-required'] })
      .min(3, { message: t.contact.formValidation['name-min-length'] }),
    email: z
      .string()
      .email({ message: t.contact.formValidation['email-invalid'] })
      .trim()
      .min(1, { message: t.contact.formValidation['email-required'] }),
    message: z
      .string()
      .trim()
      .min(1, { message: t.contact.formValidation['message-required'] })
      .min(10, { message: t.contact.formValidation['message-min-length'] }),
  });
export const metadata = {
  title: 'Contact me | Samuel Nakazawa',
  description: 'send me a message!',
  keywords: ['developer', 'portfolio', 'contact', 'projects'],
};
export function ContactForm() {
  const { t } = useLanguageStore();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(formSchema(t)),
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      await sendEmail(data);
      setSubmitSuccess(true);
      reset();
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="min-h-[calc(100vh-80px)] flex flex-col items-center justify-center relative z-10 w-full py-8 px-6 md:px-4">
      <div className="max-w-6xl mx-auto w-full">
        <div className="mb-10 text-center">
          <div className="text-center mb-12 max-w-2xl mx-auto space-y-4">
            <div className="relative inline-block">
              <span className="relative z-10 text-2xl sm:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#c95bf5] via-[#a84ef9] to-[#9a4dff]">
                {t.contact.title}
              </span>
            </div>

            <p className="text-[#d8c7ff] text-lg leading-relaxed">{t.contact.description}</p>

            <div className="py-4">
              <span className="inline-block px-4 py-2 bg-[#1a0a2a] border border-[#c95bf5]/30 rounded-full text-[#e2d9f3] text-sm font-medium">
                {`✉️  ${t.contact.messageAnswer}`}
              </span>
            </div>

            <p className="text-[#c95bf5] font-medium italic">{`"${t.contact.phrase}"`}</p>
          </div>
        </div>

        <div className="bg-[#1a0a2a] w-full max-w-2xl mx-auto border border-[#2d1b4a] rounded-xl p-6 sm:p-8 shadow-lg backdrop-blur-sm bg-opacity-70">
          {submitSuccess ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-[#c95bf5]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#c95bf5"
                  strokeWidth="2"
                >
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-[#f8f5ff] mb-2">
                {t.contact['success-message']}
              </h3>
              <p className="text-[#b8a2e0] mb-6">{t.contact['thank-you-message']}</p>
              <button
                onClick={() => setSubmitSuccess(false)}
                className="px-5 py-2 rounded-lg bg-[#c95bf5] hover:bg-[#b74ae5] text-white font-medium transition-colors"
              >
                {t.contact.form['send-new-message']}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-[#e2d9f3] mb-2">
                  {t.contact.form.name}
                </label>
                <input
                  id="name"
                  {...register('name')}
                  className="w-full px-4 py-3 bg-[#12071f] border border-[#3a2a5a] rounded-lg focus:ring-2 focus:ring-[#c95bf5]/50 focus:border-[#c95bf5] outline-none text-[#f8f5ff] placeholder-[#5d4a7a] transition-all"
                  placeholder={t.contact.form['name-placeholder']}
                />
                {errors.name && (
                  <p className="mt-2 text-sm text-[#ff6b6b]">{errors.name.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-[#e2d9f3] mb-2">
                  {t.contact.form.email}
                </label>
                <input
                  id="email"
                  type="email"
                  {...register('email')}
                  className="w-full px-4 py-3 bg-[#12071f] border border-[#3a2a5a] rounded-lg focus:ring-2 focus:ring-[#c95bf5]/50 focus:border-[#c95bf5] outline-none text-[#f8f5ff] placeholder-[#5d4a7a] transition-all"
                  placeholder={t.contact.form['email-placeholder']}
                />
                {errors.email && (
                  <p className="mt-2 text-sm text-[#ff6b6b]">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-[#e2d9f3] mb-2">
                  {t.contact.form.message}
                </label>
                <textarea
                  id="message"
                  rows={5}
                  {...register('message')}
                  className="w-full px-4 py-3 bg-[#12071f] border border-[#3a2a5a] rounded-lg focus:ring-2 focus:ring-[#c95bf5]/50 focus:border-[#c95bf5] outline-none text-[#f8f5ff] placeholder-[#5d4a7a] transition-all"
                  placeholder={t.contact.form['message-placeholder']}
                ></textarea>
                {errors.message && (
                  <p className="mt-2 text-sm text-[#ff6b6b]">{errors.message.message}</p>
                )}
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 px-6 bg-[#c95bf5] hover:bg-[#b74ae5] text-white font-medium rounded-lg transition-colors disabled:opacity-70 flex items-center justify-center cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      {t.contact.form['submit-loading']}
                    </>
                  ) : (
                    <span>{t.contact.form['submit-button']}</span>
                  )}
                </button>
              </div>
            </form>
          )}
          <div className="mt-12 text-center">
            <p className="text-[#d8c7ff] mb-4 text-lg">{t.contact['follow-me']}</p>
            <div className="flex justify-center">
              <SocialIcons />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
