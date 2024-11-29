//medications/medications.service.ts:

import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Medicina } from '../medications/medications.entity';
import { Newmedicina, Updatmedicina } from '../medications/medications.dto';
import { Users } from '../users/users.entity';
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ShedulesService } from 'shedules/shedules.service';




@Injectable()
export class MedicationsService {
  constructor(
    @InjectRepository(Medicina) private readonly MRepository: Repository<Medicina>,
    private readonly shedulesService: ShedulesService  // Inyectamos el servicio para trabajar con Shedules.
  ) {}

  async createM(medicina: Newmedicina): Promise<Medicina> {
    const user = new Users();
    user.id = medicina.user; // Obtenemos el usuario de la sesión (ID del localStorage).
    
    const med = new Medicina();
    med.name = medicina.name;
    med.quantity = medicina.quantity; 
    med.user = user;

    try {
      // Guardamos el medicamento en la base de datos.
      const savedMedicina = await this.MRepository.save(med);
      
      // Esperamos un momento antes de agregar el schedule (por ejemplo, 1 segundo).
      await new Promise(resolve => setTimeout(resolve, 1000)); 

      // Ahora creamos el schedule asociado
      await this.shedulesService.createS({
        medicina: savedMedicina.id, // ID del medicamento creado.
        user: medicina.user, // ID del usuario en sesión.
        intervalo: medicina.intervalo, // Intervalo de horas.
        finish_time: medicina.finish_time, // Fecha de finalización calculada.
      });

      return savedMedicina;
    } catch (error) {
      throw new InternalServerErrorException('Error al crear la medicina o schedule.');
    }
  }

  async findAll(): Promise<Medicina[]> {
    const medications = await this.MRepository.find({ relations: ['user'] });
  //  console.log('Medications fetched:', medications);  // Verificar los datos aquí
    return medications;
}

async findMedicina(id: number): Promise<Medicina> {
  const medicina = await this.MRepository.findOne({
    where: { id },
    relations: {
      user: true,        // Incluye usuario relacionado
      schedules: {       // Incluye schedules relacionados
        notifications: true, // Incluye notificaciones dentro de schedules
      },
    },
  });
  if (!medicina) {
    throw new NotFoundException(`Medicina with id ${id} not found`);
  }
  return medicina;
}



// En MedicationsService
async updateM(id: number, updateData: Partial<Medicina>): Promise<Medicina> {
  await this.MRepository.update(id, updateData);
  return this.MRepository.findOne({ where: { id } }); // Devuelve el objeto actualizado
}



    async deleteM(id: number): Promise<string> {
        const find = await this.MRepository.findOne({ where: { id } });
        if (!find) {
            throw new NotFoundException(`Medicina with id ${id} not found`);
        }
        await this.MRepository.delete(id);
        return 'Medicina borrada';
    }
}
