//notifications/notifications.controller.ts:

import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { newNotificacion } from './notifications.dto';
import { Updatnotif } from './notificationss.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('notifications')
export class NotificationsController {
    constructor(private readonly NServ: NotificationsService) {}

    @Post()

    agregarN(@Body() Notific: newNotificacion) {
        return this.NServ.createN(Notific);

    }

    @Get()
    getAll() {
        return this.NServ.findAll();
    }

    @Get(':id')
    findNotif(@Param('id', ParseIntPipe) id: number) {
        return this.NServ.findNotification(id);
    }

    @Patch(':id')
    actualizN(@Param('id', ParseIntPipe) id: number, @Body() updatU: Updatnotif) {
        return this.NServ.updateN(id, updatU);
    }

    @Delete(':id')
    deletNotif(@Param('id', ParseIntPipe) id: number) {
        return this.NServ.deleteN(id);
    }
}
