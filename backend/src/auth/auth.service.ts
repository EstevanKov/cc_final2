import { Injectable, ConflictException, UnauthorizedException, InternalServerErrorException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Users } from '../users/users.entity'; 
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
    private jwtService: JwtService
  ) {}

  async register(createUserDto: CreateUserDto) {
    // Validar el DTO (esto se hace generalmente con Pipes en NestJS)
    if (!createUserDto.user || !createUserDto.email || !createUserDto.password) {
      throw new BadRequestException('Los campos son obligatorios');
    }

    const { user, email, password } = createUserDto;

    const existingUser = await this.usersRepository.findOne({ where: { email } });
    if (existingUser) {
      throw new ConflictException('El correo electrónico ya está en uso');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = this.usersRepository.create({
      user: user,
      email,
      password: hashedPassword,
    });

    try {
      await this.usersRepository.save(newUser);
    } catch (error) {
      throw new InternalServerErrorException('Error al guardar el usuario');
    }

    const payload = { email: newUser.email, sub: newUser.id };
    return {
      message:'Registro éxitoso',
      access_token: this.jwtService.sign(payload),
      refresh_token: this.jwtService.sign(payload, { expiresIn: '7d' }),
    };
  }

  async login(loginUserDto: LoginUserDto) {
    if (!loginUserDto.email || !loginUserDto.password) {
      throw new BadRequestException('Los campos son obligatorios');
    }

    const { email, password } = loginUserDto;
    const user = await this.usersRepository.findOne({ where: { email } });

    if (!user) {
      throw new UnauthorizedException('Datos incorrectos');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Datos incorrectos');
    }

    const payload = { email: user.email, sub: user.id };
    return {
      message:'Inicio de sesión éxitoso',
      id:user.id, 
      access_token: this.jwtService.sign(payload),
      refresh_token: this.jwtService.sign(payload, { expiresIn: '7d' }),
    };
  }

  async refreshToken(token: string) {
    if (!token) {
      throw new BadRequestException('Token no proporcionado');
    }

    try {
      const decoded = this.jwtService.verify(token);
      const payload = { email: decoded.email, sub: decoded.sub };
      return {
        access_token: this.jwtService.sign(payload),
      };
    } catch (e) {
      throw new UnauthorizedException('Token inválido o expirado');
    }
  }
}
