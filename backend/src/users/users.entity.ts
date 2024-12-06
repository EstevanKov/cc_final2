//users/users.entity.ts:
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Shedules } from '../shedules/shedules.entity';
import { Medicina } from '../medications/medications.entity';

@Entity({ name: 'users' })
export class Users {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    user: string;

    @Column({ unique: true })
    email: string;

    @Column()

    password: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;


    @OneToMany(() => Shedules, shedules => shedules.users)
    shedules: Shedules[];

    @OneToMany(() => Medicina, medicina => medicina.user)
    medicina: Medicina[];
}