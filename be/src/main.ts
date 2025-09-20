import express from 'express'
import "reflect-metadata"
import { configDotenv } from 'dotenv'
import { dataSource } from './db/datasource'
import { auth } from './auth/google'
import { addRole } from './role/add-role'
import { giveRole } from './role/give-role'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'


async function main() {

    configDotenv()
    const app = express()
    app.use(bodyParser.urlencoded())
    app.use(bodyParser.json())
    app.use(cookieParser())

    const port = 3000
    await dataSource.initialize()

    app.post('/login/id/google', auth)
    app.post('/role/:type', addRole)

    app.patch('/user/:email/role/:type', giveRole)

    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`)
    })
}


main()
