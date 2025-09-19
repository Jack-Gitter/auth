import express from 'express'
import "reflect-metadata"
import { configDotenv } from 'dotenv'
import { dataSource } from './db/datasource'
import { auth } from './auth/google'
import { addRole } from './role/add-role'
import { giveRole } from './role/give-role'


async function main() {

    configDotenv()
    const app = express()
    const port = 3000
    await dataSource.initialize()

    app.get('/', (req, res) => {
      res.send('Hello World!')
    })

    app.post('/google/login/:email', auth)
    app.post('/role/:type', addRole)

    app.patch('/user/:email/role/:type', giveRole)

    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`)
    })
}


main()
