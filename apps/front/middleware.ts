import createMiddleware from 'next-intl/middleware';
import { NextRequest } from 'next/server';
import { routing } from './i18n/routing';

const UTM_PARAMS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'grsf'];
const MAX_AGE_IN_SECONDS = 30 * 24 * 60 * 60;

const intlMiddleware = createMiddleware(routing);

export async function middleware(request: NextRequest) {
  const response = await intlMiddleware(request);
  const { searchParams } = request.nextUrl;

  // UTM cookies logic - preserve UTM parameters across navigation
  const expires = new Date(Date.now() + MAX_AGE_IN_SECONDS * 1000);
  UTM_PARAMS.forEach(param => {
    const value = searchParams.get(param);
    if (value) {
      response.cookies.set(param, value, {
        maxAge: MAX_AGE_IN_SECONDS,
        expires,
        path: '/',
        domain: '.coderabbit.ai',
        sameSite: 'lax',
      });
    }
  });

  return response;
}

//  matcher recommended by next-intl
export const config = {
  matcher: '/((?!api|trpc|_next|_vercel|feed|.*\\..*).*)',
};
