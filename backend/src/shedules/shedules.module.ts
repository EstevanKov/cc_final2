import { Module } from '@nestjs/common';
import { ShedulesService } from './shedules.service';
import { ShedulesController } from './shedules.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Shedules } from './shedules.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Shedules])],
  providers: [ShedulesService],
  controllers: [ShedulesController],
  exports: [ShedulesService],  // Exporta el servicio aquí
})
export class ShedulesModule {}
