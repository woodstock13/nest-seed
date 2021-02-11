import * as dotenv from "dotenv"

export enum environments {
    PRODUCTION = "production",
    STAGING = "staging",
    DEVELOPMENT = "development",
    LOCAL = "local"
}

export default class Config {
    private static instance: Config
    public environment: string
    public port: number
    public apiKey: string

    public static getInstance = (): Config => {
        if (!Config.instance) {
            Config.instance = new Config()
        }
        return Config.instance
    }

    private constructor() {
        let path = ""

        switch (process.env.NODE_ENV) {
            case environments.PRODUCTION:
                path = `${__dirname}/../_production.env`
                break
            case environments.STAGING:
                path = `${__dirname}/../_staging.env`
                break
            case environments.DEVELOPMENT:
                path = `${__dirname}/../_development.env`
                break
            default:
                path = `${__dirname}/../_local.env`
        }

        dotenv.config({
            path: path
        })

        this.environment = process.env.NODE_ENV || environments.LOCAL
        this.port = parseInt(process.env.NODE_PORT) || parseInt(process.env.PORT)
        this.apiKey = process.env.API_KEY
    }
}
