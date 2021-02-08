import * as dotenv from "dotenv"

// TODO clean all this

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
    public prettyLog: boolean
    public apiKey: string
    public jwtSecretKey: string
    public jwtTtl: string
    public mongodbUri: string

    public mail_host: string
    public mail_sender: string
    public smtp_port: string
    public mail_login: string
    public mail_password: string

    public cs_projectId: string
    public cs_keyFilename: string
    public cs_bucket: string

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
        this.jwtSecretKey = process.env.JWT_SECRET_KEY
        this.jwtTtl = process.env.JWT_TTL
        this.mongodbUri = process.env.MONGODB_URI
        this.prettyLog =
            this.environment === environments.LOCAL || this.environment === environments.DEVELOPMENT

        this.mail_host = process.env.MAIL_HOST
        this.mail_sender = process.env.MAIL_SENDER
        this.smtp_port = process.env.MAIL_PORT
        this.mail_login = process.env.MAIL_LOGIN
        this.mail_password = process.env.MAIL_PASS

        this.cs_projectId = process.env.CS_PROJECT
        this.cs_keyFilename = process.env.CS_KEYFILENAME
        this.cs_bucket = process.env.CS_BUCKET
    }
}
