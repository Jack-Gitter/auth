import { dataSource } from "../db/datasource"
import { User } from "../db/entities/User"
import jwt from 'jsonwebtoken'
import { AUTH_PROVIDER, JWTPayload } from "../types"
import { Request, Response } from 'express'
import {OAuth2Client} from 'google-auth-library'

// change the email to the jwt access token provided by google login
export async function auth(req: Request, res: Response) {
    const accessToken = req.body.credential as string
    const csrfToken = req.body.g_csrf_token as string
    const csrfCookie = req.cookies.g_csrf_token as string
    if (csrfToken !== csrfCookie) {
        res.status(401).send('Nice try')
    }

    const client = new OAuth2Client();
     const ticket = await client.verifyIdToken({
      idToken: accessToken,
      audience: process.env.CLIENT_ID as string,  
    });
    const payload = ticket.getPayload();
    console.log(payload)
    try {
        const email = req.params.email as string
        const userRepository = dataSource.getRepository(User)
        let user = await userRepository.findOne(
            {
                where: {email},
                relations: ['roles']
            }
        )
        if (!user) {
             user = await userRepository.save({email})
        }
        const roles = user.roles.map(role => role.type)
        const jwtPayload: JWTPayload = {
            sub: email,
            iss: 'Test App',
            aud: 'Test App',
            roles: roles, 
            authProvider: AUTH_PROVIDER.google,
            accessToken: ''
        }
        const token = jwt.sign(jwtPayload, process.env.JWT_SECRET ?? '', {expiresIn: 60 * 60})
        res.send(token)
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).send(error.message)
        } else {
            res.status(500).send('Something went wrong')
        }
    }
}
