export default {
    APPLICATION_NAME: String(process.env.APPLICATION_NAME),
    APPLICATION_VERSION: String(process.env.APPLICATION_VERSION),
    ENVIRONMENT: String(process.env.ENVIRONMENT),
    SERVER_PORT: String(process.env.SERVER_PORT),
    LOG_LEVEL: process.env.LOG_LEVEL,
    APP_DB_HOST: String(process.env.APP_DB_HOST),
    APP_DB_USER: String(process.env.APP_DB_USER),
    APP_DB_PASS: String(process.env.APP_DB_PASS),
    CRYPTO_AES_KEY_32B: String(process.env.CRYPTO_AES_KEY_32B),
    CRYPTO_AES_IV_16B: String(process.env.CRYPTO_AES_IV_16B),
}