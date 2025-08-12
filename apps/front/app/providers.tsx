'use client';

import React from 'react';
import posthog from 'posthog-js';
import { PostHogProvider } from 'posthog-js/react';

export function PHProvider({ children, bootstrapData }: { children: React.ReactNode; bootstrapData: any }) {
  if (typeof window !== 'undefined') {
    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
      bootstrap: bootstrapData,
      persistence: 'localStorage+cookie',
      persistence_name: 'coderabbit_ph',
      cross_subdomain_cookie: true,
      autocapture: true,
      capture_pageview: true,
      capture_pageleave: true,
      loaded: phInstance => {
        if (process.env.NODE_ENV === 'development') {
          phInstance.debug();
        }
      },
    });

    if (bootstrapData?.distinctID) {
      const expires = new Date();
      expires.setFullYear(expires.getFullYear() + 1);
      document.cookie = `cr_distinct_id=${
        bootstrapData.distinctID
      }; path=/; expires=${expires.toUTCString()}; samesite=lax`;
    }
  }

  return <PostHogProvider client={posthog}>{children}</PostHogProvider>;
}

export default PHProvider;
