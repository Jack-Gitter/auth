import { Column, Entity, JoinTable, ManyToMany } from "typeorm";
import { Role } from "./Role";

@Entity()
export class User {

    @Column({primary: true})
    email: string

    @ManyToMany(() => Role)
    @JoinTable()
    roles: Role[] 

}
