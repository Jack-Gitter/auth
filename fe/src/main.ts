import express from 'express'
import cookieParser from 'cookie-parser'
import {google} from 'googleapis'
import { configDotenv } from 'dotenv'
import { redirect_to_google_acess_token_auth } from './login/access_token_google'

async function main() {

    const app = express()
    app.use(cookieParser())
    configDotenv()
    const port = 3001

    app.get('/', (req, res) => {
        res.sendFile(__dirname + '/index.html')
    })

    app.get('/login/access/google',redirect_to_google_acess_token_auth)

    app.listen(port, () => {
      console.log(`FE listening on port ${port}`)
    })
}


main()
