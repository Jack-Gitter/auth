import express from 'express'
import cookieParser from 'cookie-parser'
import {google} from 'googleapis'
import { configDotenv } from 'dotenv'

async function main() {

    const app = express()
    app.use(cookieParser())
    configDotenv()
    const port = 3001

    app.get('/', (req, res) => {
        res.sendFile(__dirname + '/index.html')
    })

    app.get('/login', (req, res) => {
        if (req.cookies.jwt) {
            res.redirect('http://localhost:3001')
        } else {
            res.sendFile(__dirname + '/login/index.html')
        }
    })

    app.get('/test', (req, res) =>{
        const oauth2Client = new google.auth.OAuth2({
            clientId: process.env.CLIENT_ID ?? '',
            clientSecret: process.env.CLIENT_SECRET ?? '',
            redirectUri: 'http://localhost:3001/test/test'
            }
        );

        const scopes = [
          'https://www.googleapis.com/auth/blogger',
          'https://www.googleapis.com/auth/calendar'
        ];

        const url = oauth2Client.generateAuthUrl({
          access_type: 'offline',
          scope: scopes
        });

        res.redirect(url)

    })

    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`)
    })
}


main()
