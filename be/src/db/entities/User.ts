import { Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { ROLE_TYPE } from "../../types";
import { Role } from "./Role";

@Entity()
export class User {

    constructor() {}

    @PrimaryGeneratedColumn()
    id: number

    @ManyToMany(() => Role)
    @JoinTable()
    roleType: ROLE_TYPE

}
