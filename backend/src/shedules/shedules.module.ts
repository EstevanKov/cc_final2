//shedules/shedules.module.ts:
import { Module } from '@nestjs/common';
import { ShedulesService } from './shedules.service';
import { ShedulesController } from './shedules.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Shedules } from './shedules.entity';
import { UsersModule } from 'users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Shedules]),UsersModule],
  providers: [ShedulesService],
  controllers: [ShedulesController],
  exports: [ShedulesService],  // Exporta el servicio aquí
})
export class ShedulesModule {}
