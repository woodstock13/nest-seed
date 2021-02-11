export default class Config {
    private static instance: Config
    public environment: string
    public port: number
    public prettyLog: boolean
    public apiKey: string
    public jwtSecretKey: string
    public jwtTtl: string

    public static getInstance = (): Config => {
        if (!Config.instance) {
            Config.instance = new Config()
        }
        return Config.instance
    }

    private constructor() {
        this.port = parseInt(process.env.NODE_PORT) || parseInt(process.env.PORT)
        this.apiKey = process.env.API_KEY
        this.jwtSecretKey = process.env.JWT_SECRET_KEY
        this.jwtTtl = process.env.JWT_TTL
    }
}
