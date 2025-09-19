import express from 'express'
import "reflect-metadata"
import { configDotenv } from 'dotenv'
import { dataSource } from './db/datasource'
import { auth } from './auth/google'


async function main() {

    configDotenv()
    const app = express()
    const port = 3000
    await dataSource.initialize()

    app.get('/', (req, res) => {
      res.send('Hello World!')
    })

    app.get('/google/auth', auth)

    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`)
    })
}


main()
