import { IsString, IsInt, IsNotEmpty, IsOptional,IsEmail  } from 'class-validator';

export class usersNew{
    @IsNotEmpty({message:"No puede quedar vacío"})
    @IsString({message:"El dato debe ser texto"})
    userName: string

    @IsNotEmpty({message:"No puede quedar vacío"})
    @IsString({message:"El dato debe ser texto"})
    @IsEmail({}, { message: "El dato debe ser un email válido" })
    email:string

    @IsNotEmpty({message:"No puede quedar vacío"})
    password:string
}

export class updateUser {
    currentPassword: string;
    newPassword?: string;
    @IsOptional() // Hace que el campo no sea obligatorio
    @IsString({ message: "El dato debe ser texto" })
    userName?: string;
  
    @IsOptional() // Hace que el campo no sea obligatorio
    @IsEmail({}, { message: "El dato debe ser un email válido" })
    email?: string;
  
    @IsOptional() // Hace que el campo no sea obligatorio
    @IsString({ message: "El dato debe ser texto" })
    password?: string;
  }