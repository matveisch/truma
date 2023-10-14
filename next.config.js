/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [{ source: '/', destination: '/he', permanent: true }];
  },
  env: {
    SUPABASE_KEY: process.env.SUPABASE_KEY,
  },
};

module.exports = nextConfig;
