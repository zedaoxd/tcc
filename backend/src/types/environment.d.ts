declare global {
    namespace NodeJS {
        interface ProcessEnv {
            DATABASE_URL: string;
            SALT_OR_ROUNDS: string;
            JWT_SECRET: string;
            JWT_EXPIRATION_TIME: string;
        }
    }
}
export { };