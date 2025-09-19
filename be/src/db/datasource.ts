import { DataSource } from "typeorm"
import { Role } from "./entities/Role"
import { User } from "./entities/User"
import { configDotenv } from "dotenv"
configDotenv()

export const appDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: Number(process.env.POSTGRES_DB),
    username: process.env.POSTGRES_USER ?? ' ',
    password: process.env.POSTGRES_PASSWORD ?? ' ',
    database: process.env.POSTGRES_DB ?? ' ',
    entities: [Role, User],
    migrations: [],
})
