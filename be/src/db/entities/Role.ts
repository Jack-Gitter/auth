import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { ROLE_TYPE } from "../../types";

@Entity()
export class Role {

    @PrimaryGeneratedColumn()
    id: number

    @Column({type: 'enum', enum: ROLE_TYPE, default: ROLE_TYPE.viewer, unique: true})
    type: ROLE_TYPE

}
