//medications/medications.module.ts:
import { Module } from '@nestjs/common';
import { MedicationsController } from './medications.controller';
import { Medicina } from './medications.entity';
import { MedicationsService } from './medications.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShedulesModule } from '../shedules/shedules.module';  // Importa ShedulesModule

import { NotificationsModule } from '../notifications/notifications.module';  // Importa el módulo Notifications

@Module({
  imports: [
    TypeOrmModule.forFeature([Medicina]),
    ShedulesModule,  // Asegúrate de incluir aquí el módulo de Shedules
    NotificationsModule,  // Agrega el módulo de Notifications aquí
  ],
  providers: [MedicationsService],
  controllers: [MedicationsController],
})
export class MedicationsModule {}
