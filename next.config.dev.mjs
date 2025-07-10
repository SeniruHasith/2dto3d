/** @type {import('next').NextConfig} */
const devConfig = {
  // Development-specific configuration
  allowedDevOrigins: [
    // Local development
    'localhost',
    '127.0.0.1',
    '0.0.0.0',
    
    // Common local network ranges
    '192.168.1.*',
    '192.168.0.*',
    '10.0.0.*',
    '172.16.*',
    
    // Specific IP addresses (add your device IPs here)
    '192.168.1.169',
    '192.168.1.100',
    '192.168.1.101',
    '192.168.1.102',
    '192.168.1.103',
    '192.168.1.104',
    '192.168.1.105',
  ],

  // Enable hot reloading from any origin during development
  devIndicators: {
    buildActivity: true,
    buildActivityPosition: 'bottom-right',
  },

  // Faster builds during development
  swcMinify: true,
  
  // Enable source maps for better debugging
  productionBrowserSourceMaps: false,
  
  // Optimize for development
  compiler: {
    removeConsole: false,
  },

  // ESLint configuration
  eslint: {
    ignoreDuringBuilds: true,
  },

  // TypeScript configuration
  typescript: {
    ignoreBuildErrors: true,
  },

  // Images configuration
  images: {
    unoptimized: true,
  },
}

export default devConfig
