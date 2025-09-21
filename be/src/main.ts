import express from 'express'
import "reflect-metadata"
import { configDotenv } from 'dotenv'
import { dataSource } from './db/datasource'
import { auth_id_token } from './auth/google_id_token'
import { addRole } from './role/add-role'
import { giveRole } from './role/give-role'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { auth_access_token } from './auth/google_access_token'


async function main() {

    configDotenv()
    const app = express()
    app.use(bodyParser.urlencoded())
    app.use(bodyParser.json())
    app.use(cookieParser())
    app.use(cors())

    const port = 3000
    await dataSource.initialize()

    app.post('/login/id/google', auth_id_token)
    app.get('/login/access/google', auth_access_token)
    app.post('/role/:type', addRole)
    app.get('/login/stytch', (req, res) => {
        console.log(req)
        res.send()
    })

    app.patch('/user/:email/role/:type', giveRole)

    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`)
    })
}


main()
