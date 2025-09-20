import { google } from 'googleapis'

import {Request, Response} from 'express'


export async function auth_access_token(req: Request, res: Response) {
    console.log(req.params.code)
    const code = req.params.code as string

    console.log(process.env.CLIENT_ID)
    const oauth2Client = new google.auth.OAuth2(process.env.CLIENT_ID, 
                                                process.env.CLIENT_SECRET)

    const {tokens} = await oauth2Client.getToken(code)
    // oauth2Client.setCredentials(tokens);
    console.log(tokens)
    res.send(200)


}
