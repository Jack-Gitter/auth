import { DataSource } from "typeorm"
import { User } from "./entities/User"
import { configDotenv } from "dotenv"
import { Role } from "./entities/Role"
configDotenv()

export const appDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: Number(process.env.POSTGRES_PORT),
    username: process.env.POSTGRES_USER ?? ' ',
    password: process.env.POSTGRES_PASSWORD ?? ' ',
    database: process.env.POSTGRES_DB ?? ' ',
    entities: [Role, User],
    migrations: [],
})
