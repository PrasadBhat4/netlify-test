'use client';

import { Check, Settings, XCircleIcon } from 'lucide-react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import Cookies from 'universal-cookie';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';

const CONSENT_REQUIRED_COUNTRIES = [
  'FR',
  'DE',
  'IT',
  'ES',
  'NL',
  'BE',
  'SE',
  'DK',
  'PL',
  'IE',
  'PT',
  'AT',
  'FI',
  'CZ',
  'RO',
  'SK',
  'HR',
  'BG',
  'HU',
  'EL',
  'MT',
  'CY',
  'LU',
  'EE',
  'LV',
  'LT',
  'SI',
  'NO',
  'IS',
  'LI',
  'GB',
];

type CookieType = 'necessary' | 'advertising' | 'analytics' | 'functionality';

const cookieTypes: { type: CookieType; label: string; description: string }[] = [
  {
    type: 'necessary',
    label: 'Necessary Cookies',
    description: 'Required for the website to function properly',
  },
  {
    type: 'advertising',
    label: 'Advertising Cookies',
    description: 'Used for targeted advertising',
  },
  {
    type: 'analytics',
    label: 'Analytics Cookies',
    description: 'Help us understand how visitors interact with the website',
  },
  {
    type: 'functionality',
    label: 'Functionality Cookies',
    description: 'Enable enhanced functionality and personalization',
  },
];

const cookieName = 'cr-cookie-preferences';

export const CookieConsent: React.FC = () => {
  const [isConsentSaved, setIsConsentSaved] = useState(true);
  const cookies = useMemo(() => new Cookies(), []);
  const [preferences, setPreferences] = useState<{ [key in CookieType]: boolean }>({
    necessary: true,
    advertising: true,
    analytics: true,
    functionality: true,
  });

  function gtag(...args: any[]) {
    (window as any).dataLayer = (window as any).dataLayer || [];
    (window as any).dataLayer.push(args);
  }
  const sendConsent = useCallback((consent: object) => {
    // @ts-ignore - gtag expects any arguments
    gtag('consent', 'update', consent);
  }, []);

  useEffect(() => {
    const initializePreferences = async () => {
      try {
        if (cookies.get(cookieName)) return;
        const geoRequest = await fetch('/api/geo');
        const { country } = await geoRequest.json();
        // eslint-disable-next-line no-console
        if (CONSENT_REQUIRED_COUNTRIES.includes(country) && !cookies.get(cookieName)) {
          setIsConsentSaved(false);
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error reading cookie preferences:', error);
        setIsConsentSaved(false);
      }
    };

    initializePreferences();
  }, [cookies, sendConsent]);

  const handleToggle = (type: CookieType) => {
    setPreferences(prev => ({ ...prev, [type]: !prev[type] }));
  };

  const [isCustomizing, setIsCustomizing] = useState(false);

  const handleSavePreferences = (newPreferences: { [key in CookieType]: boolean }) => {
    try {
      setPreferences(newPreferences);
      const consent = {
        ad_storage: newPreferences.advertising ? 'granted' : 'denied',
        analytics_storage: newPreferences.analytics ? 'granted' : 'denied',
        functionality_storage: newPreferences.functionality ? 'granted' : 'denied',
        personalization_storage: newPreferences.necessary ? 'granted' : 'denied',
        security_storage: newPreferences.necessary ? 'granted' : 'denied',
      };
      cookies.set(cookieName, JSON.stringify(consent), {
        path: '/',
        secure: true,
        sameSite: 'strict',
        expires: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
      });
      sendConsent(consent);
      setIsConsentSaved(true);
      setIsCustomizing(false);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error saving cookie preferences:', error);
    }
  };

  const handleAcceptAll = () => {
    handleSavePreferences({
      necessary: true,
      advertising: true,
      analytics: true,
      functionality: true,
    });
  };

  return (
    !isConsentSaved && (
      <div
        role='dialog'
        aria-labelledby='cookie-consent-title'
        className='fixed bottom-0 z-50 px-4 py-5 w-full bg-white dark:bg-neutral-800 rounded-lg shadow-lg transition-all duration-300 ease-in-out'>
        <div className='flex flex-col gap-4 justify-between items-center px-4 md:px-10 lg:px-20 md:flex-row'>
          <div className='px-0 space-y-4 text-body-sm md:px-10 lg:px-20'>
            By clicking “Accept”, you agree to the storing of cookies on your device to enhance site navigation, analyze
            site usage, and assist in our marketing efforts.
          </div>

          <div className='flex flex-col gap-2 items-center w-full md:w-auto md:flex-row'>
            <Button size='sm' className='w-full md:w-auto' onClick={() => setIsCustomizing(true)} variant='outline'>
              <Settings className='w-4 h-4' />
              <span className='text-body-sm'>Manage Cookies</span>
            </Button>
            <Button size='sm' className='w-full md:w-auto' onClick={handleAcceptAll}>
              <Check className='w-4 h-4' />
              <span className='text-body-sm'>Accept</span>
            </Button>
            <button aria-label='Close' type='button' className='' onClick={() => handleSavePreferences(preferences)}>
              <XCircleIcon className='w-4 h-4' />
            </button>
          </div>
        </div>
        <Dialog open={isCustomizing} onOpenChange={setIsCustomizing}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className='font-semibold text-body-lg'>Cookie Settings</DialogTitle>
              <DialogDescription className='text-body-sm'>
                <div className='mt-4 space-y-4'>
                  {cookieTypes.map(({ type, label, description }) => (
                    <div key={type} className='flex items-center space-x-4'>
                      <div className='flex items-center h-5'>
                        <Switch
                          id={type}
                          checked={preferences[type as CookieType]}
                          onCheckedChange={() => handleToggle(type as CookieType)}
                          disabled={type === 'necessary'}
                          aria-label={`Toggle ${label}`}
                        />
                      </div>
                      <div className='flex-1'>
                        <p className='font-medium'>{label}</p>
                        <p className='text-sm text-gray-500'>{description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className='flex flex-col gap-2 md:flex-row'>
              <Button size='sm' variant='outline' onClick={handleAcceptAll}>
                <Check className='w-4 h-4' />
                <span className='text-body-sm'>Accept</span>
              </Button>
              <Button size='sm' onClick={() => handleSavePreferences(preferences)}>
                <span className='text-body-sm'>Save Preferences</span>
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    )
  );
};
