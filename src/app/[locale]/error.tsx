'use client';

import { useRouter } from '@/i18n/navigation';
import { Button } from '@/components/ui/button';

export default function Error({ reset }: { error: Error; reset: () => void }) {
  const router = useRouter();

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden p-4 text-white">
      <div className="relative z-10 flex w-full max-w-md flex-col items-center text-center">
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#c95bf5]/10">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#c95bf5"
            strokeWidth="2"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
        </div>

        <h1 className="mb-2 text-3xl font-bold text-[#f8f5ff]">Something went wrong</h1>
        <p className="mb-8 text-[#b8a2e0]">An unexpected error occurred. Please try again.</p>

        <div className="flex gap-4">
          <Button
            onClick={reset}
            className="cursor-pointer bg-[#c95bf5] transition-colors hover:bg-[#b74ae5]"
          >
            Try again
          </Button>
          <Button
            onClick={() => router.push('/')}
            variant="outline"
            className="cursor-pointer border-[#c95bf5]/30 text-[#e2d9f3] transition-colors hover:bg-[#c95bf5]/10"
          >
            Go home
          </Button>
        </div>
      </div>
    </div>
  );
}
