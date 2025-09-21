import { google } from 'googleapis'
import jwt from 'jsonwebtoken'
import {Request, Response} from 'express'
import { AUTH_PROVIDER, JWTPayload } from '../types';
import { dataSource } from '../db/datasource';
import { User } from '../db/entities/User';

export type UserInfo = {
    id: string,
    email: string,
    verified_email: boolean,
    name: string,
    given_name: string,
    family_name: string,
    picture: string
}

export async function auth_access_token(req: Request, res: Response) {
    const code = req.query.code as string

    const oauth2Client = new google.auth.OAuth2({
            clientId: process.env.CLIENT_ID ?? '',
            clientSecret: process.env.CLIENT_SECRET ?? '',
            redirectUri: 'http://localhost:3000/login/access/google'
        }
    );
    try {
        const { tokens } = await oauth2Client.getToken(code)
        const accessToken = tokens.access_token
        const refreshToken = tokens.refresh_token
        const expiresIn = tokens.expiry_date ?? Date.now() + 60 * 60

        const response = await fetch( `https://www.googleapis.com/oauth2/v2/userinfo?access_token=${accessToken}`)
        const json = await response.json()  as UserInfo
        const email = json.email
        const userRepository = dataSource.getRepository(User)
        let user = await userRepository.findOne({ where: {email}, relations: ['roles']})
        if (!user) {
             user = await userRepository.save({email})
        }
        user.roles = user.roles ?? []
        const roles = user.roles.map(role => role.type)
        // get the user email with the access token
        const jwtPayload: JWTPayload = {
            ...json,
            sub: '',
            iss: 'Test App',
            aud: 'Test App',
            roles: roles, 
            accessToken: accessToken ?? undefined,
            refreshToken: refreshToken ?? undefined,
            authProvider: AUTH_PROVIDER.google,
        }
        const token = jwt.sign(jwtPayload, process.env.JWT_SECRET ?? '')
        res.cookie('jwt', token, {maxAge: expiresIn}).redirect('http://localhost:3001')
    } catch (e) {
        if (e instanceof Error) {
            res.status(400).send(e.message)
        } else {
            res.status(500).send('Something went wrong')
        }
    }
}
