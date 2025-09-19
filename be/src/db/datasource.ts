import { DataSource } from "typeorm"
import { Role } from "./entities/Role"

export const appDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "test",
    password: "test",
    database: "test",
    synchronize: true,
    logging: true,
    entities: [Role],
    subscribers: [],
    migrations: [],
})
