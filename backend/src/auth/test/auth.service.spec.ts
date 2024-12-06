import { Test, TestingModule } from "@nestjs/testing";
import { JwtService } from "@nestjs/jwt";
import { Repository } from "typeorm";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Users } from "../../users/users.entity";
import * as bcrypt from 'bcrypt'
import { AuthService } from "../auth.service";
import { LoginUserDto } from "../dto/login-user.dto";


describe('AuthService',()=>{
    let authService: AuthService;
    let userRepository: Repository<Users>;
    let jwtService: JwtService;

    beforeEach(async ()=>{
        const module: TestingModule = await Test.createTestingModule({
            providers:[
                AuthService,{
                    provide: getRepositoryToken(Users),
                    useClass: Repository,},
                    {
                        provide: JwtService,
                        useValue: {
                            sign:jest.fn(),
                        },
                    },
            ],
        }).compile();

        authService = module.get<AuthService>(AuthService);
        userRepository= module.get<Repository<Users>>(getRepositoryToken(Users));
        jwtService = module.get<JwtService>(JwtService);
    });
    it('Debería estar definido', ()=>{
        expect(AuthService).toBeDefined();
    });

    describe('login',()=>{
        it('Debería regresar un token de acceso cuando los datos ingresados sean validos', async ()=>{
            
            const loginUserDto: LoginUserDto= { email:'admin@admin.com', password:'admin'};
            const user = {id:1,email:'admin@admin.com', password:'hashedPassword'};
            
            const result={access_token:'mocked_token'};

            jest.spyOn(userRepository,'findOne').mockResolvedValue(user as any);
            jest.spyOn(bcrypt,'compare').mockResolvedValue(true);
            jest.spyOn(jwtService,'sign').mockReturnValue('mocked_token');
            
    
            expect(await authService.login(loginUserDto)).toEqual(result);
        });
    
        it('Debería mostrar un error cuando los datos de acceso son incorrecto', async ()=>{
            const loginUserDto: LoginUserDto= { email:'correo.com', password:'contrasena'};
    
            jest.spyOn(userRepository,'findOne').mockResolvedValue(null);
    
            await expect(authService.login(loginUserDto)).rejects.toThrow('Los datos son incorrectos');
        });
        });

        describe('register', ()=>{
          it('debería mostrar un JWT despues de un registro', async () => {
            const createUserDto = {name: 'admin', email:'admin@admin.com',password:'admin'};
            const user = {id:1,userName: 'admin',email:'admin@admin.com', password:'hashedPassword'};
            const result={access_token:'mocked_token'};

            jest.spyOn(bcrypt,'hash').mockResolvedValue('hashedPassword');
            jest.spyOn(userRepository,'create').mockReturnValue(user as any);
            jest.spyOn(userRepository,'save').mockResolvedValue(user as any);
            jest.spyOn(jwtService,'sign').mockReturnValue('mocked_token');

            expect(await authService.register(createUserDto)).toEqual(result);
          })  
        })
    });