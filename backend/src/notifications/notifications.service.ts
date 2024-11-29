//notifications/notifications.service.ts:
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notifications } from './notifications.entity';
import { newNotificacion } from './notifications.dto';
import { Updatnotif } from './notificationss.dto';
import { Shedules } from '../shedules/shedules.entity';

@Injectable()
export class NotificationsService {
    constructor(
        @InjectRepository(Notifications) private readonly notificationsRepository: Repository<Notifications>
    ) {}

    async createN(notification: newNotificacion) {
        const shedule = new Shedules();
        shedule.id = notification.schedule;

        const notifi = this.notificationsRepository.create({
            schedule: shedule,
            message: notification.message,
            sentAt: notification.sent,
            type: notification.type,
        });
        return await this.notificationsRepository.save(notifi);
    }

    async createMany(notifications: Array<Partial<Notifications>>) {
        return await this.notificationsRepository.save(notifications);
    }

    async findAll(): Promise<Notifications[]> {
        return await this.notificationsRepository.find({
            relations: ['schedule'],
        });
    }

    async findNotification(id: number) {
        const notification = await this.notificationsRepository.findOne({
            where: { id },
        });
        if (!notification) {
            throw new NotFoundException('Notification not found');
        }
        return notification;
    }

    async updateN(id: number, updateNotification: Updatnotif) {

        const notification = await this.notificationsRepository.findOne({ where: { id } });
        if (!notification) {
            throw new NotFoundException('Notification not found');
        }

        if (updateNotification.shedule) {
            const schedule = new Shedules();
            schedule.id = updateNotification.shedule;
            notification.schedule = schedule;
        }

        if (updateNotification.sent) {
            notification.sentAt = updateNotification.sent;
        }

        if (updateNotification.type) {
            notification.type = updateNotification.type;
        }

        if (updateNotification.message) {
            notification.message = updateNotification.message;
        }

        await this.notificationsRepository.save(notification);
    }

    async deleteN(id: number) {
        const notification = await this.notificationsRepository.findOne({ where: { id } });

        if (!notification) {
            throw new NotFoundException('Notification not found');
        }
        await this.notificationsRepository.delete(id);
        return 'Notification deleted';
    }
}