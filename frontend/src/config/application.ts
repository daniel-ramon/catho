import getConfig from "next/config"
const { publicRuntimeConfig } = getConfig()

export const application = {
  API_URL: String(publicRuntimeConfig.API_URL),
}
