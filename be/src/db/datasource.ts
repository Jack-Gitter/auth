import { DataSource } from "typeorm"
import { UserRole } from "./entities/Role"
import { User } from "./entities/User"
import { configDotenv } from "dotenv"
configDotenv()

export const appDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: Number(process.env.POSTGRES_PORT),
    username: process.env.POSTGRES_USER ?? ' ',
    password: process.env.POSTGRES_PASSWORD ?? ' ',
    database: process.env.POSTGRES_DB ?? ' ',
    entities: [UserRole, User],
    migrations: [],
})
