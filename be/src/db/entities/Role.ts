import { Column, Entity } from "typeorm";
import { ROLE_TYPE } from "../../types";

@Entity()
export class Role {

    constructor(type: ROLE_TYPE) {
        this.type = type
    }

    @Column({type: 'enum', enum: ROLE_TYPE, default: ROLE_TYPE.viewer})
    type: ROLE_TYPE

}
