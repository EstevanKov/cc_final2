//medications/medications.controller.ts:

import { Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { MedicationsService } from '../medications/medications.service';
import { Newmedicina, Updatmedicina } from './medications.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ShedulesService } from '../shedules/shedules.service';
import { NotificationsService } from 'notifications/notifications.service';
import { Shedules } from 'shedules/shedules.entity';

@UseGuards(JwtAuthGuard)
@Controller('medications')
export class MedicationsController {
    constructor(
        private readonly MServ: MedicationsService,
        private readonly shedulesService: ShedulesService,
        private readonly notificationsService: NotificationsService
    ) {}

    @Post('/addWithSchedule')
async agregarMedicinaConHorario(
    @Body() medicinaData: { 
        name: string; 
        quantity: number; 
        user: number; 
        intervalo: number; 
        finish_time: Date; 
        notifications: Array<{ sentAt: Date; message: string }> 
    }
) {
    try {
        // Validar si notifications es un arreglo y no está vacío
        if (!Array.isArray(medicinaData.notifications) || medicinaData.notifications.length === 0) {
            throw new Error('No se proporcionaron notificaciones válidas.');
        }

        // Guardar medicamento
        const nuevaMedicina = await this.MServ.createM(medicinaData);

        // Crear el horario
        const shedulesData = {
            medicina: nuevaMedicina.id,
            user: medicinaData.user,
            intervalo: medicinaData.intervalo,
            finish_time: medicinaData.finish_time,
        };
        const nuevoHorario = await this.shedulesService.createS(shedulesData);

        // Crear notificaciones
        const notificationsToSave = medicinaData.notifications.map(notification => ({
            ...notification,
            schedule: { id: nuevoHorario.id } as Shedules, // Relación válida con Shedules
            type: 'reminder',
        }));
        const notificaciones = await this.notificationsService.createMany(notificationsToSave);

        return {
            medicamento: nuevaMedicina,
            horario: nuevoHorario,
            notificaciones,
        };
    } catch (error) {
        console.error('Error al añadir medicamento, horario o notificaciones', error);
        throw new Error('Error al añadir medicamento, horario o notificaciones');
    }
}

    @Patch('/editWithSchedule/:id')
    async editarMedicinaConHorario(
        @Param('id', ParseIntPipe) id: number,
        @Body() medicinaData: { name?: string, quantity?: number, user: number, intervalo?: number, finish_time?: Date }
    ) {
        // Actualizar los datos del medicamento en la tabla Medicina
        const updatedMedicina = await this.MServ.updateM(id, {
            name: medicinaData.name,
            quantity: medicinaData.quantity,
        });
    
        if (!updatedMedicina) {
            throw new NotFoundException(`Medicina con id ${id} no encontrada`);
        }
    
        // Verifica si se debe actualizar el horario
        if (medicinaData.intervalo || medicinaData.finish_time) {
            const shedulesData = {
                medicina: updatedMedicina.id,
                user: medicinaData.user,
                intervalo: medicinaData.intervalo,
                finish_time: medicinaData.finish_time,
            };
    
            await this.shedulesService.updateS(updatedMedicina.id, shedulesData);
        }
    
        return updatedMedicina;
    }

    
    @Post()
    agregarM(@Body() medicina: Newmedicina) {
        return this.MServ.createM(medicina);
    }

    @Get()
    getAll() {
        return this.MServ.findAll();
    }

    @Get(':id')
    findMedic(@Param('id', ParseIntPipe) id: number) {
        return this.MServ.findMedicina(id);
    }

    @Patch(':id')
    actualizM(@Param('id', ParseIntPipe) id: number, @Body() updatU: Updatmedicina) {
        return this.MServ.updateM(id, updatU);
    }

    @Delete(':id')
    async deleteM(@Param('id', ParseIntPipe) id: number) {
        try {
            return await this.MServ.deleteM(id);
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw new NotFoundException(`Medicina con id ${id} no encontrada`);
            }
            throw error;
        }
    }
}
