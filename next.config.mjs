/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          hostname: "res.cloudinary.com",
        },
      ],
    },
    env: {
      MONGODB_URL: process.env.MONGODB_URL,
      NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    },
  };
  
  export default nextConfig;
  