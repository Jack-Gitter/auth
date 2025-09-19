import {Request, Response} from 'express'
import { dataSource } from '../db/datasource'
import { Role } from '../db/entities/Role'
import { ROLE_TYPE } from '../types'

export async function addRole(req: Request, res: Response) {
    const roleRepository = dataSource.getRepository(Role)
    const type = req.params.type as ROLE_TYPE
    try {
        await roleRepository.save({type}) 
        res.status(200).send()
    } catch (error) {
        res.status(400)
        if (error instanceof Error) {
            res.status(400).send(error.message)
        } else {
            res.status(500).send('Something went wrong creating a role')
        }
    }
}
