/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [{ source: '/', destination: '/he', permanent: true }];
  },
  experimental: {
    serverActions: true,
  },
  env: {
    SUPABASE_KEY: process.env.SUPABASE_KEY,
    RECAPTCHA_SITE_KEY: process.env.RECAPTCHA_SITE_KEY,
    // RECAPTCHA_SECRET_KEY: process.env.RECAPTCHA_SECRET_KEY,
  },
};

module.exports = nextConfig;
