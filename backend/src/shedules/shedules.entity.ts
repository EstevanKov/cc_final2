import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Medicina } from '../medications/medications.entity';
import { Users } from '../users/users.entity';

import { Notifications } from '../notifications/notifications.entity';


@Entity({ name: 'shedules' })
export class Shedules {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Users, users => users.shedules)

    @JoinColumn({ name: 'user' })
    users: Users;

    @ManyToOne(() => Medicina, medicina => medicina.schedules)
    @JoinColumn({ name: 'medicina' })

    medicina: Medicina;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    start_time: Date;

    @Column()
    interval_hours: number;

    @Column()
    finish_dose_time: Date;

    @OneToMany(() => Notifications, notifications => notifications.schedule)
    notifications: Notifications[];

}