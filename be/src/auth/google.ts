import { dataSource } from "../db/datasource"
import { User } from "../db/entities/User"
import jwt from 'jsonwebtoken'
import { JWTPayload } from "../types"
import { Request, Response } from 'express'

export async function auth(req: Request, res: Response) {
    try {
        const email = req.params.email as string
        const userRepository = dataSource.getRepository(User)
        let user = await userRepository.findOneBy({email})
        console.log(user)
        if (!user) {
             user = await userRepository.save({email})
        }
        const roles = user?.roles?.map(role => role.type)
        const jwtPayload: JWTPayload = {
            roles: roles ?? []
        }
        const token = jwt.sign(jwtPayload, process.env.JWT_SECRET ?? '')
        res.send(token)
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).send(error.message)
        }
        res.status(500).send('Something went Wrong')
    }
}
