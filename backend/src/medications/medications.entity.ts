//medications/medications.entity.ts:
import { Shedules } from "../shedules/shedules.entity";
import { Users } from "../users/users.entity";
import { PrimaryGeneratedColumn, Entity, Column, OneToMany, ManyToOne, JoinColumn } from "typeorm";

@Entity({ name: 'Medicina' })
export class Medicina {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    quantity: number;

    @ManyToOne(() => Users, users => users.medicina)
    @JoinColumn({ name: 'user' })
    user: Users;

    @OneToMany(() => Shedules, shedules => shedules.medicina)
    schedules: Shedules[];
}
