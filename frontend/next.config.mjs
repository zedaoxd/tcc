/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                hostname:  process.env.NEXT_PUBLIC_SUPABASE_STORAGE_HOSTNAME,
                protocol:  'https',
            }, 
            {
                hostname:  'i.pinimg.com',
                protocol:  'https',
            }
        ]
    },
    sassOptions: {
        includePaths: ['./src/styles'],
    }
};

export default nextConfig;
