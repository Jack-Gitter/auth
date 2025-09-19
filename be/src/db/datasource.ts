import { DataSource } from "typeorm"
import { User } from "./entities/User"
import { configDotenv } from "dotenv"
import { Role } from "./entities/Role"
import { Migrations1758290248287 } from "./migrations/1758290248287-migrations"
import { Migrations1758290551813 } from "./migrations/1758290551813-migrations"
configDotenv()

export const dataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: Number(process.env.POSTGRES_PORT),
    username: process.env.POSTGRES_USER ?? ' ',
    password: process.env.POSTGRES_PASSWORD ?? ' ',
    database: process.env.POSTGRES_DB ?? ' ',
    entities: [Role, User],
    migrations: [Migrations1758290248287, Migrations1758290551813],
})
await dataSource.initialize()
