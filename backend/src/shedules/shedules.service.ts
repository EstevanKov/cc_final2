//shedules/shedules.service.ts:

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Shedules } from './shedules.entity';
import { newShed, updatShed } from './shedules.dto';
import { Medicina } from '../medications/medications.entity';
import { Users } from '../users/users.entity';



@Injectable()
export class ShedulesService {
  constructor(
    @InjectRepository(Shedules) private readonly sRepository: Repository<Shedules>,
    @InjectRepository(Users) private readonly userRepository: Repository<Users>,
  ) {}

  async createS(shed: newShed): Promise<Shedules> {
    const medicina = new Medicina();
    medicina.id = shed.medicina; // Medicamento que acaba de ser creado
  
    const user = new Users();
    user.id = shed.user; // Usuario que está activo en la sesión
  
    // Verifica si ya existe un schedule para la misma medicina y usuario
    const existingSchedule = await this.sRepository.findOne({
      where: {
        medicina: medicina,
        users: user
      }
    });
  
    if (existingSchedule) {
      // Si ya existe un schedule, lo puedes actualizar o devolver el existente
      return existingSchedule;
    }
  
    const shedul = this.sRepository.create({
      medicina,
      users: user,
      interval_hours: shed.intervalo,
      finish_dose_time: shed.finish_time,
    });
  
    return await this.sRepository.save(shedul);
  }
  

  async updateS(id: number, updateShed: updatShed) {
    const shedules = await this.sRepository.findOne({ where: { id } });

    if (!shedules) {
        throw new NotFoundException('Schedule not found');
    }

    if (updateShed.intervalo) {
        shedules.interval_hours = updateShed.intervalo;
    }

    if (updateShed.finish_time) {
        shedules.finish_dose_time = updateShed.finish_time;
    }

    return await this.sRepository.save(shedules);
}

    async findAll(): Promise<Shedules[]> {
        return await this.sRepository.find({
            relations: ['medicina', 'users', 'notifications'],
        });
    }

    async findShedules(id: number): Promise<Shedules> {
        const shedules = await this.sRepository.findOne({
          where: { id },
          relations: {
            medicina: true, // Incluye medicina relacionada
            users: true,    // Incluye usuario relacionado
            notifications: true, // Incluye notificaciones relacionadas
          },
        });
        if (!shedules) {
          throw new NotFoundException(`Schedule with id ${id} not found`);
        }
        return shedules;
      }
      
    // async updateS(id: number, shed: updatShed) {
    //     const updateResult = await this.sRepository.update(id, shed);
    //     if (updateResult.affected === 0) {
    //         throw new NotFoundException(`Shedules with id ${id} not found`);
    //     }
    // }

    async deleteS(id: number): Promise<string> {
        const shedules = await this.sRepository.findOne({ where: { id } });
        if (!shedules) {
            throw new NotFoundException(`Shedules with id ${id} not found`);
        }

        await this.sRepository.delete(id);
        return 'Shedules deleted';
    }

    async findShedulesByUser(userId: number): Promise<Shedules[]> {
        const user = await this.userRepository.findOne({ where: { id: userId } });
    
        if (!user) {
          throw new NotFoundException(`User with id ${userId} not found`);
        }
    
        // Buscamos los schedules de ese usuario
        return this.sRepository.find({
          where: { users: { id: userId } },
          relations: ['medicina', 'notifications'], // Puedes incluir otras relaciones que necesites
        });
      }
}
