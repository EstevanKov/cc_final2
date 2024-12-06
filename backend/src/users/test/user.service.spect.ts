import { Test, TestingModule } from "@nestjs/testing";
import { Repository } from "typeorm";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Users } from "../../users/users.entity";
import * as bcrypt from 'bcrypt'
import { AuthService } from "../../auth/auth.service"
;
import { UsersService } from "../users.service";
import { usersNew } from "users/users.dto";

describe('UserService',()=>{
    let userService: UsersService;
    let userRepository: Repository<Users>;
    let authService: AuthService;

    beforeEach(async ()=>{
        const module: TestingModule = await Test.createTestingModule({
            providers:[
                UsersService,{
                    provide: getRepositoryToken(Users),
                    useValue: {
                            create:jest.fn(),
                            find:jest.fn(),
                            findOne:jest.fn(),
                            update:jest.fn(),
                            delet:jest.fn(),
                            save:jest.fn(),
                        },
                    },{
                        provide: AuthService,
                        useValue:{
                            generateToken: jest.fn()
                        },
                    },
            ],
        }).compile();

        userService = module.get<UsersService>(UsersService);
        userRepository= module.get<Repository<Users>>(getRepositoryToken(Users));
        authService = module.get<AuthService>(AuthService);
    });
    it('Debería estar definido', ()=>{
        expect(userService).toBeDefined();
    });

  
       /* describe('register', ()=>{
          it('deber{ia registrar un usuario, encriptar su contraseña, guardar el usuario y devolverl el JWT', async () => {
            const newUser:usersNew = {userName: 'admin', email:'admin@admin.com',password:'admin'};
            const savedUser = {...newUser, id:1, password:'hashedPassword'};
            const accessToken='some-token';

            jest.spyOn(bcrypt,'hash').mockResolvedValue('hashedPassword');
            jest.spyOn(userRepository,'create').mockReturnValue(savedUser as any);
            jest.spyOn(userRepository,'save').mockResolvedValue(savedUser as any);
            jest.spyOn(authService,'generateToken').mockReturnValue(accessToken);

           const result = await userService.register(newUser);
           expect(bcrypt.hash).toHaveBeenCalledWith('admin')
            expect(userRepository.save).toHaveBeenCalledWith({
                ...newUser,password:'hashedPassword'
            });

            expect(userRepository.save).toHaveBeenCalledWith(savedUser);
            expect(authService.generateToken).toHaveBeenCalledWith({email:savedUser.email,sub:savedUser.id});
            expect(result).toEqual({access_token:accessToken, user:savedUser});
        });
    });*/

});