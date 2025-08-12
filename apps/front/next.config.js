const { createSecureHeaders } = require('next-secure-headers');
const createNextIntlPlugin = require('next-intl/plugin');
const { withSentryConfig } = require('@sentry/nextjs');

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['react-tweet'],
  compress: true,

  //this is required for rending pdf when not using turbopack
  webpack: config => {
    config.resolve.alias.canvas = false;
    return config;
  },
  experimental: {
    esmExternals: 'loose',
    optimizePackageImports: [
      'lucide-react',
      'graphql',
      '@sentry/nextjs',
      'framer-motion',
      '@next/third-parties',
      'markdown-to-jsx',
      '@dotlottie/react-player',
    ],
  },

  rewrites: async () => {
    return [
      {
        source: '/integrations/schema.v2.json',
        destination: 'https://storage.googleapis.com/coderabbit_public_assets/schema.v2.json',
      },
      {
        source: '/about',
        destination: 'https://resources.coderabbit.ai/about',
      },
      {
        source: '/feed',
        destination: '/api/blog/rss',
      },
      {
        source: '/gitlabHandler',
        destination: 'https://app.coderabbit.ai/gitlabHandler',
      },
      {
        source: '/jiraHandler',
        destination: 'https://app.coderabbit.ai/jiraHandler',
      },
      {
        source: '/linearHandler',
        destination: 'https://app.coderabbit.ai/linearHandler',
      },
    ];
  },
  redirects: async () => {
    return [
      // {
      //   source: '/FAQ',
      //   destination: 'https://www.coderabbit.ai/faq',
      //   permanent: false, // Indicates a permanent redirect with a 308 status code
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'resources.(?<domain>.*)',
          },
        ],
        destination: 'https://:domain/:path*',
        permanent: true,
      },
      {
        source: '/vscode',
        destination: '/ide',
        permanent: true, // Indicates a permanent redirect with a 308 status code
      },
      {
        source: '/vscode',
        destination: '/ide',
        permanent: true, // Indicates a permanent redirect with a 308 status code
      },
      {
        source: '/pages/:slug',
        destination: '/:slug',
        statusCode: 301, // Indicates a permanent redirect with a 301 status code
      },
      {
        source: '/docs1',
        destination: 'https://a8047283.coderabbit-docs.pages.dev',
        permanent: true, // Indicates a permanent redirect with a 308 status code
      },
      {
        source: '/blog1',
        destination: 'https://a8047283.coderabbit-docs.pages.dev/blog',
        permanent: true, // Indicates a permanent redirect with a 308 status code
      },
      {
        source: '/blog/all',
        destination: 'https://www.coderabbit.ai/blog',
        permanent: true, // Indicates a permanent redirect with a 308 status code
      },
      {
        source: '/changelog',
        destination: 'https://docs.coderabbit.ai/changelog',
        permanent: true, // Indicates a permanent redirect with a 308 status code
      },
      {
        source: '/careers',
        destination: 'https://resources.coderabbit.ai/careers',
        permanent: false, // Indicates a temporary redirect with a 302 status code
      },
    ];
  },
  headers: async () => {
    return [
      {
        source: '/(.*)',
        locale: false,
        headers: [
          ...createSecureHeaders({
            forceHTTPSRedirect: [true, { maxAge: 63072000, includeSubDomains: true, preload: true }],
          }),
        ],
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '3000',
      },
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '1337',
      },
      {
        protocol: 'https',
        hostname: 'victorious-bubble-f69a016683.strapiapp.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'victorious-bubble-f69a016683.media.strapiapp.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'sparkling-delight-918748c1f6.strapiapp.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'sparkling-delight-918748c1f6.media.strapiapp.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'phenomenal-purpose-7c77e8a0b7.strapiapp.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'phenomenal-purpose-7c77e8a0b7.media.strapiapp.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'cdn.hashnode.com',
        port: '',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
      },
      {
        protocol: 'https',
        hostname: 'framerusercontent.com',
        port: '',
      },
      // Twitter images
      { protocol: 'https', hostname: 'pbs.twimg.com' },
      // Twitter images
      { protocol: 'https', hostname: 'abs.twimg.com' },
    ],
    domains: ['localhost']
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

const sentryWebpackPluginOptions = {
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options

  org: 'coderabbitai',
  project: 'website',

  // Only print logs for uploading source maps in CI
  silent: !process.env.CI,

  // For all available options, see:
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

  // Upload a larger set of source maps for prettier stack traces (increases build time)
  widenClientFileUpload: true,

  // Automatically annotate React components to show their full name in breadcrumbs and session replay
  reactComponentAnnotation: {
    enabled: true,
  },

  // Uncomment to route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
  // This can increase your server load as well as your hosting bill.
  // Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
  // side errors will fail.
  // tunnelRoute: "/monitoring",

  // Hides source maps from generated client bundles
  hideSourceMaps: true,

  // Automatically tree-shake Sentry logger statements to reduce bundle size
  disableLogger: true,

  // Enables automatic instrumentation of Vercel Cron Monitors. (Does not yet work with App Router route handlers.)
  // See the following for more information:
  // https://docs.sentry.io/product/crons/
  // https://vercel.com/docs/cron-jobs
  automaticVercelMonitors: true,
};

module.exports = withSentryConfig(withNextIntl(nextConfig), sentryWebpackPluginOptions);
