import {Request, Response} from 'express'
import stytch from 'stytch'
import { AUTH_PROVIDER, JWTPayload } from '../types';
import { dataSource } from '../db/datasource';
import { User } from '../db/entities/User';

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

    try {
        const response = await client.magicLinks.authenticate(params)
        const jwt = response.session_jwt
        const content = await client.sessions.authenticateJwtLocal({session_jwt: jwt})
        const userResponse = await client.users.get({user_id: content.user_id})
        const email = userResponse.emails[0]?.email as string
        const userRepository = dataSource.getRepository(User)
        let user = await userRepository.findOne({ where: {email}, relations: ['roles']})
        if (!user) {
             user = await userRepository.save({email})
        }
        userResponse.roles = userResponse.roles ?? []
        const roles = user.roles.map(role => role.type)
        const ourjwt: JWTPayload = {
            ...content,
            aud: 'Test Auth',
            iss: 'Test Auth',
            sub: content.user_id,
            roles,
            authProvider: AUTH_PROVIDER.stytch,
            accessToken: undefined,
            refreshToken: undefined
        }
        res.cookie('jwt', ourjwt, {maxAge: Date.now() + 60 * 60}).redirect('http://localhost:3001')
    } catch (error) {
            if (error instanceof Error) {
                res.status(400).send(error.message)
            } else {
                res.status(500).send('Something went wrong')
            }
        }
}
