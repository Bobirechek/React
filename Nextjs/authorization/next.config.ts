import type { NextConfig } from "next";

const nextConfig: NextConfig = {
   allowedDevOrigins: ['http://192.168.234.1:3000', '*.local-origin.dev'],
};

export default nextConfig;