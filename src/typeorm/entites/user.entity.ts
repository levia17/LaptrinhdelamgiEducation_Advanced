import { Column, Entity, PrimaryColumn } from "typeorm";


@Entity({ name: 'users' })
export class User {

    @PrimaryColumn({
        type: 'varchar',
        length: 20
    })
    username: string;

    @Column({
        type: 'varchar',
        length: 20
    })
    password: string;

    @Column({
        type: 'varchar',
        length: 20,
        nullable: true
    })
    nickname: string;

    @Column({
        type: 'varchar',
        length: 20,
        default: 'member'
    })
    role: string;

    @Column({
        type: 'varchar',
        length: 2048,
        default: null,
    })
    avatar: string;

    @Column()
    createAt: Date;



}