/** @type {import('next').NextConfig} */
const nextConfig = {
    
};
// middleware.config.ts
export const config = {
    matcher: ['/admin/:path*', '/dashboard/:path*'], // Các đường dẫn mà middleware áp dụng
  };
  
export default nextConfig;
