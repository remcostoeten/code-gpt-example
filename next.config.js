/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [{ hostname: "utfs.io" }],
      },
      typescript: {
        ignoreBuildErrors: true,
      },
      eslint: {
        ignoreDuringBuilds: true,
      },

    experimental: {
        serverComponentsExternalPackages: ["@libsql/client"]
    }
}

module.exports = nextConfig

