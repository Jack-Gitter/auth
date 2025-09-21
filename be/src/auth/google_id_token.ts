import { dataSource } from "../db/datasource"
import { User } from "../db/entities/User"
import jwt from 'jsonwebtoken'
import { AUTH_PROVIDER, JWTPayload } from "../types"
import { Request, Response } from 'express'
import {OAuth2Client} from 'google-auth-library'

// change the email to the jwt access token provided by google login
export async function auth_id_token(req: Request, res: Response) {
    const IdToken = req.body.credential as string
    const csrfToken = req.body.g_csrf_token as string
    const csrfCookie = req.cookies.g_csrf_token as string
    if (csrfToken !== csrfCookie) {
        res.status(401).send('Nice try')
    }

    const client = new OAuth2Client();
     const ticket = await client.verifyIdToken({
      idToken: IdToken,
      audience: process.env.CLIENT_ID as string,  
    });
    const payload = ticket.getPayload();
    try {
        const email = payload?.email as string
        const userRepository = dataSource.getRepository(User)
        let user = await userRepository.findOne({ where: {email}, relations: ['roles']})
        if (!user) {
             user = await userRepository.save({email})
        }
        user.roles = user.roles ?? []
        const roles = user.roles.map(role => role.type)
        const jwtPayload: JWTPayload = {
            ...payload,
            sub: email,
            iss: 'Test App',
            aud: 'Test App',
            roles: roles, 
            accessToken: undefined,
            refreshToken: undefined,
            authProvider: AUTH_PROVIDER.google,
        }
        const token = jwt.sign(jwtPayload, process.env.JWT_SECRET ?? '')
        res.cookie('jwt', token, {maxAge: Date.now() + 60 * 60}).redirect('http://localhost:3001')
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).send(error.message)
        } else {
            res.status(500).send('Something went wrong')
        }
    }
}
