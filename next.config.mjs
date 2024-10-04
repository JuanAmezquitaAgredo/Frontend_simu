import createNextintlPlugin from 'next-intl/plugin';
/** @type {import('next').NextConfig} */

const withNextIntl = createNextintlPlugin();
const nextConfig = {
    compiler: {
        styledComponents: true,
    }
};

export default withNextIntl(nextConfig);
