import { Column, Entity, JoinTable, ManyToMany } from "typeorm";
import { ROLE_TYPE } from "../../types";
import { Role } from "./Role";

@Entity()
export class User {

    @Column({primary: true})
    email: string

    @ManyToMany(() => Role)
    @JoinTable()
    roleType: ROLE_TYPE[]

}
