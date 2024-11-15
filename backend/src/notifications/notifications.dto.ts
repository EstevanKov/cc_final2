import { IsString, IsInt, IsNotEmpty } from 'class-validator';

export class newNotificacion{
    @IsNotEmpty({message:"No puede quedar vacío"})
    @IsInt({message:"El dato debe ser un número"})
    schedule: number

    sent: Date
    type: string
    message: string
}