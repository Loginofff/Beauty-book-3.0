/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: ["res.cloudinary.com"], // Добавляем разрешённый домен
    },
    reactStrictMode: true, // Включаем строгий режим для React
  };
  
  export default nextConfig;
  