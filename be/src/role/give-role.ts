import {Request, Response} from 'express'
import { dataSource } from '../db/datasource'
import { User } from '../db/entities/User'
import { ROLE_TYPE } from '../types'
import { Role } from '../db/entities/Role'
export async function giveRole(req: Request, res: Response) {
    try {
        const email = req.params.email as string
        const type = req.params.type as ROLE_TYPE
        if (!Object.values(ROLE_TYPE).includes(type)) {
            res.status(400).send('Invalid Role Type')
        }
        const userRepository = dataSource.getRepository(User)
        const roleRepository = dataSource.getRepository(Role)
        const user = await userRepository.findOne({
            where: {email},
            relations: ['roles'],
        })
        const role = await roleRepository.findOneBy({type})
        if (user && role) {
            user.roles.push(role)
            await userRepository.save(user)
            res.status(200).send()
        } else {
            res.status(404).send('No user or role found')
        }
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).send(error.message)
        } else {
            res.status(500).send('Something went wrong')
        } 
    }
}
