/** @type {import('next').NextConfig} */
const nextConfig = {
  // Allow cross-origin requests from your local network during development
  allowedDevOrigins: [
    '192.168.1.169',
    'localhost',
    '127.0.0.1',
    '0.0.0.0',
    // Add your local network IP range
    '192.168.1.*',
    '192.168.0.*',
    '10.0.0.*',
  ],
  
  // Enable experimental features for better development experience
  experimental: {
    // Enable faster refresh
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
    },
  },

  // Image optimization settings
  images: {
    domains: [
      'localhost',
      '192.168.1.169',
      // Add any external image domains you might use
      'api.meshy.ai',
      'blob.vercel-storage.com',
    ],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    unoptimized: true, // Added from updates
  },

  // Headers for better security and CORS handling
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
      // Allow CORS for API routes during development
      {
        source: '/api/(.*)',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: process.env.NODE_ENV === 'development' ? '*' : 'https://yourdomain.com',
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET, POST, PUT, DELETE, OPTIONS',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'Content-Type, Authorization',
          },
        ],
      },
    ]
  },

  // Webpack configuration for better module resolution
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Handle SVG imports
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })

    // Optimize bundle size
    if (!dev && !isServer) {
      config.optimization.splitChunks.cacheGroups = {
        ...config.optimization.splitChunks.cacheGroups,
        three: {
          name: 'three',
          chunks: 'all',
          test: /[\\/]node_modules[\\/](three|@react-three)[\\/]/,
          priority: 20,
        },
        framer: {
          name: 'framer',
          chunks: 'all',
          test: /[\\/]node_modules[\\/]framer-motion[\\/]/,
          priority: 15,
        },
      }
    }

    return config
  },

  // Environment variables that should be available on the client
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },

  // Redirect configuration
  async redirects() {
    return [
      // Add any redirects you might need
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
    ]
  },

  // Rewrite configuration for API proxying if needed
  async rewrites() {
    return [
      // Add any rewrites you might need for API proxying
    ]
  },

  // ESLint and TypeScript configurations added from updates
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
}

export default nextConfig
