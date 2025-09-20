import { google } from 'googleapis'

import {Request, Response} from 'express'


export async function auth_access_token(req: Request, res: Response) {
    const code = req.query.code as string

    const oauth2Client = new google.auth.OAuth2({
            clientId: process.env.CLIENT_ID ?? '',
            clientSecret: process.env.CLIENT_SECRET ?? '',
            redirectUri: 'http://localhost:3000'
        }
    );
    try {
        const { tokens } = await oauth2Client.getToken(code)
        console.log(tokens)
    } catch (e) {
        console.log(e)
    }
    res.send(200)


}
