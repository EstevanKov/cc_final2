import { IsString, IsInt, IsNotEmpty, Min } from 'class-validator';

export class Newmedicina {
    @IsNotEmpty({message:"No puede quedar vacío"})
    @IsString({message:"El dato debe ser texto"})
    name: string;

    @IsNotEmpty({message:"No puede quedar vacío"})
    @IsInt({message:"El dato debe ser un número"})
    @Min(1,{message:"La cantidad minima debe ser 1"})
    quantity: number;

    @IsNotEmpty({message:"No puede quedar vacío"})
    @IsInt({message:"El dato debe ser un número"})
    user: number;

    intervalo: number;

    finish_time: Date;

  }
  
  export class Updatmedicina {
    @IsNotEmpty({message:"No puede quedar vacío"})
    @IsString({message:"El dato debe ser texto"})
    name?: string;

    @IsNotEmpty({message:"No puede quedar vacío"})
    @IsInt({message:"El dato debe ser un número"})
    quantity?: number;
  }
  

