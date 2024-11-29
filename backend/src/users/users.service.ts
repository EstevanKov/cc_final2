//users/users.service.ts:

import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Users } from './users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { updateUser, usersNew } from './users.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users) private readonly userRepository: Repository<Users>,
  ) {}

  // Crear un nuevo usuario
  async agregarUser(user: usersNew): Promise<Users> {
    if (user.password) {
      user.password = await bcrypt.hash(user.password, 10);
    }
    return await this.userRepository.save(user);
  }

  // Obtener todos los usuarios
  async getUsers(): Promise<Users[]> {
    return await this.userRepository.find({
      relations: {
        shedules: true,
        medicina: true
      },
    });
  }

  // Encontrar un usuario por su ID
  async findUser(id: number): Promise<Users> {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: {
        shedules: {
          notifications: true, // Incluye notificaciones relacionadas a los schedules
        },
        medicina: true, // Incluye medicinas relacionadas
      },
    });
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }
  

 // Actualizar un usuario en el backend
async updateUser(id: number, user: updateUser): Promise<void> {
  const { currentPassword, newPassword, ...updatedFields } = user;
  
  const existingUser = await this.userRepository.findOne({ where: { id } });
  if (!existingUser) {
    throw new NotFoundException(`User with id ${id} not found`);
  }

  // Verificar si la contraseña actual es correcta
  if (currentPassword) {
    const isPasswordValid = await bcrypt.compare(currentPassword, existingUser.password);
    if (!isPasswordValid) {
      throw new BadRequestException('La contraseña actual es incorrecta.');
    }
  }

  // Encriptar la nueva contraseña si fue proporcionada
  if (newPassword) {
    updatedFields.password = await bcrypt.hash(newPassword, 10);
  }

  // Actualizar el usuario en la base de datos
  const updateResult = await this.userRepository.update(id, updatedFields);

  if (updateResult.affected === 0) {
    throw new NotFoundException(`User with id ${id} not found`);
  }
}

  // Eliminar un usuario
  async deleteUser(id: number): Promise<string> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    await this.userRepository.delete(id);
    return 'User deleted';
  }
}
