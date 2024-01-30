const withPlugins = require("next-compose-plugins")

const nextConfig = {
  reactStrictMode: true,
  publicRuntimeConfig: {
    API_URL: process.env.API_URL,
  },
}

module.exports = withPlugins([], nextConfig)
