'use client';

import { useEffect } from 'react';
import { usePostHog } from 'posthog-js/react';
import { usePathname } from 'next/navigation';

type PageType = 'home' | 'ide' | 'extension' | 'pricing' | 'blog' | 'about';

interface VariantTrackerProps {
  variant: string;
  page: PageType;
}

export default function VariantTracker({ variant, page }: VariantTrackerProps): null {
  const posthog = usePostHog();
  const pathname = usePathname();

  useEffect(() => {
    if (posthog && variant && pathname) {
      posthog.unregister('variant');
      posthog.unregister('variant_path');
      posthog.unregister('home_page_variant');
      posthog.unregister('home_page_variant_path');
      posthog.unregister('ide_variant');
      posthog.unregister('ide_variant_path');

      let constructedVariantPath = pathname;

      if (page === 'ide' && pathname.includes('/ide')) {
        const pathSegments = pathname.split('/');
        if (pathSegments.length > 0 && pathSegments[pathSegments.length - 1] !== variant) {
          const ideBasePathIndex = pathname.lastIndexOf('/ide');
          if (ideBasePathIndex !== -1) {
            const basePathUptoIde = pathname.substring(0, ideBasePathIndex + '/ide'.length);
            constructedVariantPath = `${basePathUptoIde}/${variant}`;
          } else {
            constructedVariantPath = `${pathname}/${variant}`.replace('//', '/');
          }
        }
        constructedVariantPath = constructedVariantPath.replace('//', '/');
      }

      const variantProperties: Record<string, string> = {};

      switch (page) {
        case 'home':
          variantProperties.home_page_variant = variant;
          variantProperties.home_page_variant_path = constructedVariantPath;
          break;
        case 'ide':
          variantProperties.ide_variant = variant;
          variantProperties.ide_variant_path = constructedVariantPath;
          break;
        default:
          variantProperties[`${page}_variant`] = variant;
          variantProperties[`${page}_variant_path`] = constructedVariantPath;
          break;
      }

      posthog.register(variantProperties);

      if (page === 'ide') {
        posthog.stopSessionRecording();
        posthog.startSessionRecording();
      }

      posthog.capture('$pageview');
    }
  }, [posthog, variant, pathname, page]);

  return null;
}
