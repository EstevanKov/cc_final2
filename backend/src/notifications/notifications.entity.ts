//notifications/notifications.entity.ts:
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Shedules } from '../shedules/shedules.entity';

@Entity({ name: 'notifications' })
export class Notifications {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Shedules, (shedules) => shedules.notifications, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'schedule_id' })
    schedule: Shedules;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    sentAt: Date;

    @Column()
    type: string;

    @Column()
    message: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;
    
}
