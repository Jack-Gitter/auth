import express from 'express'
import "reflect-metadata"
import { configDotenv } from 'dotenv'
import { dataSource } from './db/datasource'
import { auth } from './auth/google'
import { addRole } from './role/add-role'
import { giveRole } from './role/give-role'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import cors from 'cors'


async function main() {

    configDotenv()
    const app = express()
    app.use(bodyParser.urlencoded())
    app.use(bodyParser.json())
    app.use(cookieParser())
    app.use(cors())

    const port = 3000
    await dataSource.initialize()

    app.post('/login/id/google', auth)
    app.post('/role/:type', addRole)
    app.post('/login/access/google', (req, res) => (res.send()))

    app.patch('/user/:email/role/:type', giveRole)

    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`)
    })
}


main()
