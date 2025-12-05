// const isProd = process.env.NODE_ENV === "production";

const nextConfig = {
  output: "export",
  // basePath: isProd ? "/cassia" : "",
  // assetPrefix: isProd ? "/cassia/" : "",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
