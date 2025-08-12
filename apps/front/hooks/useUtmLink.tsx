'use client';

import { useMemo } from 'react';
import { UTM_CAMPAIGN } from '@/utils/ide/utm';

interface UseUtmLinkProps {
  originalHref: string | undefined | null;
  variant: string | undefined | null;
}

export const useUtmLink = ({ originalHref, variant }: UseUtmLinkProps): string => {
  return useMemo(() => {
    if (!originalHref) {
      return '#';
    }
    if (!variant || !UTM_CAMPAIGN[variant]) {
      return originalHref;
    }

    const specificCampaign = UTM_CAMPAIGN[variant];

    try {
      const url = new URL(originalHref, typeof window !== 'undefined' ? window.location.origin : 'http://localhost');
      url.searchParams.set('utm_campaign', specificCampaign as string);
      if (originalHref.startsWith('/') || originalHref.startsWith('.')) {
        return `${url.pathname}${url.search}`;
      }
      return url.href;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error constructing UTM link:', error);

      const separator = originalHref.includes('?') ? '&' : '?';
      return `${originalHref}${separator}utm_campaign=${specificCampaign}`;
    }
  }, [originalHref, variant]);
};
