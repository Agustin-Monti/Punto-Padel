import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  images: {
    loader: 'custom',
    loaderFile: './src/lib/supabase-image-loader.ts',
    unoptimized: true,
  },
};

export default nextConfig;
 