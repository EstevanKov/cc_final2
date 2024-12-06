import { Test, TestingModule } from "@nestjs/testing";
import { AuthController } from "../auth.controller";
import { AuthService } from "../auth.service";
import { LoginUserDto } from "../dto/login-user.dto";


describe ('AuthController', ()=>{
    let authController: AuthController;
    let authService: AuthService;


    beforeEach(async ()=>{
        const module: TestingModule = await Test.createTestingModule({
            controllers:[AuthController],
            providers:[
                {
                provide:AuthService, 
                useValue:{
                    login: jest.fn(),
                    register: jest.fn(),
                },
            },
        ],
    }).compile();

            authController = module.get<AuthController>(AuthController);
            authService= module.get<AuthService>(AuthService);
        });
it('Debería estar definido', ()=>{
    expect(AuthController).toBeDefined();
});

describe('login',()=>{
    it('Debería regresar un JWT cuando los datos ingresados sean validos', async ()=>{
        const result={access_token:'mocked_token'};
        const loginUserDto: LoginUserDto= { email:'admin@admin.com', password:'admin'};

        jest.spyOn(authService,'login').mockResolvedValue(result);

        expect(await authController.login(loginUserDto)).toEqual(result);
    });

    it('Debería mostrar un error cuando los datos de acceso son incorrecto', async ()=>{
        const loginUserDto: LoginUserDto= { email:'correo.com', password:'contrasena'};

        jest.spyOn(authService,'login').mockRejectedValue(new Error('Los datos son incorrectos'));

        await expect(authController.login(loginUserDto)).rejects.toThrow('Los datos son incorrectos');

    });
    });
});



