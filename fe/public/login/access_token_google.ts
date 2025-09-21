import {Request, Response} from 'express'
import {google} from 'googleapis'


export function redirect_to_google_acess_token_auth(req:Request, res:Response) {
        const oauth2Client = new google.auth.OAuth2({
            clientId: process.env.CLIENT_ID ?? '',
            clientSecret: process.env.CLIENT_SECRET ?? '',
            redirectUri: 'http://localhost:3000/login/access/google'
            }
        );
        const scopes = [
          'https://www.googleapis.com/auth/blogger',
          'https://www.googleapis.com/auth/calendar',
          'https://www.googleapis.com/auth/userinfo.email',
          'https://www.googleapis.com/auth/userinfo.profile'
        ];
        const url = oauth2Client.generateAuthUrl({
          access_type: 'offline',
          scope: scopes
        });
        res.redirect(url)
}
