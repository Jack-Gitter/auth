import { dataSource } from "../db/datasource"
import { User } from "../db/entities/User"
import jwt from 'jsonwebtoken'
import { AUTH_PROVIDER, JWTPayload } from "../types"
import { Request, Response } from 'express'

// change the email to the jwt access token provided by google login
export async function auth(req: Request, res: Response) {
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
            email: email,
            roles: roles, 
            authProvider: AUTH_PROVIDER.google,
            accessToken: ''
        }
        const token = jwt.sign(jwtPayload, process.env.JWT_SECRET ?? '')
        res.send(token)
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).send(error.message)
        } else {
            res.status(500).send('Something went Wrong')
        }
    }
}
