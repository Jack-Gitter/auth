import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {

    constructor() {}

    @PrimaryGeneratedColumn()
    id: number

}
