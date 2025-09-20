import { google } from 'googleapis'
import {Request, Response} from 'express'


export async function auth_access_token(req: Request, res: Response) {

    const oauth2Client = new google.auth.OAuth2(
        process.env.CLIENT_ID,
        process.env.CLIENT_SECRET,
        'http://localhost:3000/'
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

}
