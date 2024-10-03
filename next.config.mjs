import createNextintlPlugin from 'next-intl/plugin';
/** @type {import('next').NextConfig} */

const withNextIntl = createNextintlPlugin();
const nextConfig = {};

export default withNextIntl(nextConfig);
