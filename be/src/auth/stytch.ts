import {Request, Response} from 'express'
import stytch from 'stytch'
import { AUTH_PROVIDER, JWTPayload } from '../types';

export async function stytchAuth(req: Request, res: Response) {

    const token = req.query.token as string

    const client = new stytch.Client({
        project_id: process.env.STYTCH_ID ?? '',
        secret: process.env.STYTCH_SECRET ?? ''
    });

    const params = {
      token,
      session_duration_minutes: 60,
    };

    const response = await client.magicLinks.authenticate(params)
    const jwt = response.session_jwt
    const content = await client.sessions.authenticateJwtLocal({session_jwt: jwt})
    // find our user, create our own jwt
    const ourJWT: JWTPayload = {
        ...content,
        aud: 'Test Auth',
        iss: 'Test Auth',
        sub: 'user',
        roles: [],
        authProvider: AUTH_PROVIDER.stytch,
        accessToken: undefined,
        refreshToken: undefined
    }
    res.send(ourJWT)

}
