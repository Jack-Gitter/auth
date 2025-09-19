import { dataSource } from "../db/datasource"
import { User } from "../db/entities/User"
import jwt from 'jsonwebtoken'
import { JWTPayload } from "../types"

export async function auth(req, res) {
    const email = req.params.email
    const userRepository = dataSource.getRepository(User)
    const user = await userRepository.findOneBy({email})
    if (!user) {
        await userRepository.save([{email}])
    }
    const userRoles = user?.roles.map(role => role.type)
    const jwtPayload: JWTPayload = {
        roles: userRoles ?? []
    }
    const token = jwt.sign(jwtPayload, process.env.JWT_SECRET ?? '')
    res.send(token)
}
