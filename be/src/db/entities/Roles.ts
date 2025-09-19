import { Column, Entity } from "typeorm";
import { ROLE_TYPE } from "../../types";

@Entity()
export class Role {

    @Column({type: 'enum', enum: ROLE_TYPE, default: ROLE_TYPE.viewer})
    type: ROLE_TYPE

}
