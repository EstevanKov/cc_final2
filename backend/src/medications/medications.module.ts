import { Module } from '@nestjs/common';
import { MedicationsController } from './medications.controller';
import { Medicina } from './medications.entity';
import { MedicationsService } from './medications.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShedulesModule } from '../shedules/shedules.module';  // Importa ShedulesModule

@Module({
  imports: [
    TypeOrmModule.forFeature([Medicina]),
    ShedulesModule,  // Asegúrate de incluir aquí el módulo de Shedules
  ],
  providers: [MedicationsService],
  controllers: [MedicationsController],
})
export class MedicationsModule {}
