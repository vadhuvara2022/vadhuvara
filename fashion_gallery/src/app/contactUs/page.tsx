'use client';

import { Suspense } from 'react';
import SearchParamsComponent from './SearchParamsComponent';

export default function ContactUsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchParamsComponent />
    </Suspense>
  );
}