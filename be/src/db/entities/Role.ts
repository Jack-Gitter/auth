import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { ROLE_TYPE } from "../../types";

@Entity()
export class Role {

    constructor(type: ROLE_TYPE) {
        this.type = type
    }

    @PrimaryGeneratedColumn()
    id: number

    @Column({type: 'enum', enum: ROLE_TYPE, default: ROLE_TYPE.viewer, unique: true})
    type: ROLE_TYPE

}
