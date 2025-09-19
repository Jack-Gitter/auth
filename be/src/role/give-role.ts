import {Request, Response} from 'express'
import { dataSource } from '../db/datasource'
import { User } from '../db/entities/User'
import { ROLE_TYPE } from '../types'
import { Role } from '../db/entities/Role'
export async function giveRole(req: Request, res: Response) {
    try {
        const email = req.params.email as string
        const type = req.params.type as ROLE_TYPE
        const userRepository = dataSource.getRepository(User)
        const user = await userRepository.findOneBy({email})
        if (user) {
            if (!user?.roles) {
                user.roles = []
            }
            user.roles.push(new Role(type))
            await userRepository.save(user)
            res.status(200).send()
        } else {
            res.status(404).send('No user found with provided email')
        }
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).send(error.message)
        } 
        res.status(500).send('something went wrong')
    }
}
