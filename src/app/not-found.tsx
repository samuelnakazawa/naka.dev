import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Paget not found | 404 Error',
  description: 'This page could not be found.',
};

import { Container, Page404 } from '@/components/layout';

export default function NotFound() {
  return (
    <section>
      <Page404 />
    </section>
  );
}
