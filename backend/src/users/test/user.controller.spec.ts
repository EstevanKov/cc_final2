import { Test, TestingModule } from "@nestjs/testing";
import { UsersController } from "../users.controller";
import { UsersService } from "../users.service";
import { Users } from "../users.entity";
import { usersNew, updateUser } from "../users.dto";
import { LoginUserDto } from "../../auth/dto/login-user.dto";
import { NotFoundException } from '@nestjs/common';

describe('UsersController', () => {
    let usersController: UsersController;
    let usersService: UsersService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [UsersController],
            providers: [
                {
                    provide: UsersService,
                    useValue: {
                        register: jest.fn(),
                        login: jest.fn(),
                        agregarUser: jest.fn(),
                        getUsers: jest.fn(),
                        findUser: jest.fn(),
                        updateUser: jest.fn(),
                        deleteUser: jest.fn(),
                    },
                },
            ],
        }).compile();


        usersController = module.get<UsersController>(UsersController);
        usersService = module.get<UsersService>(UsersService);
    });
   /* describe('register', () => {
        it('debería registrar un nuevo usuario', async () => {
            const userDto: usersNew = { userName: 'admin', email: 'admin@admin.com', password: 'admin' };
            const result = {
                access_token: 'token', user: {
                    ...userDto, id: 1, createdAt: new Date(), shedules: [], medicina: []
                }
            };

            jest.spyOn(usersService, 'register').mockResolvedValue(result);

            expect(await usersController.register(userDto)).toEqual(result);

        });
    });
    describe('login', () => {
        it('debería darle acceso a un  usuario', async () => {
            const loginUserDto: LoginUserDto = { email: 'admin@admin.com', password: 'admin' };

            const result = { access_token: 'token' };

            jest.spyOn(usersService, 'login').mockResolvedValue(result);

            expect(await usersController.login(loginUserDto)).toEqual(result);
        });
    });

    describe('insert', () => {
        it('debería insertar un nuevo usuario', async () => {
            const newUser: Users = {
                id: 1,
                userName: 'admin',
                email: 'admin@admin.com',
                password: 'admin',
                createdAt: new Date(),
                shedules: [],
                medicina: []
            };

            jest.spyOn(usersService, 'agregarUser').mockResolvedValue(newUser);

            expect(await usersController.insert(newUser)).toEqual(newUser);
        });
    });

    describe('Find', () => {
        it('debería a todos los usuarios', async () => {
            const users: Users[] = [{
                id: 1,
                userName: 'admin',
                email: 'admin@admin.com',
                password: 'admin',
                createdAt: new Date(),
                shedules: [],
                medicina: []
            },

            ];

            jest.spyOn(usersService, 'getUsers').mockResolvedValue(users);

            expect(await usersController.Find()).toEqual(users);
        });
    });


    describe('findOne', () => {
        it('debería un solo usuario por ID', async () => {
            const user: Users = {
                id: 1,
                userName: 'admin',
                email: 'admin@admin.com',
                password: 'admin',
                createdAt: new Date(),
                shedules: [],
                medicina: []
            };

            jest.spyOn(usersService, 'findUser').mockResolvedValue(user);

            expect(await usersController.findOne(1)).toEqual(user);
        });
        it('should throw a NotFoundException if user not found', async () => {
            jest.spyOn(usersService, 'findUser').mockRejectedValue(new NotFoundException());

            await expect(usersController.findOne(1)).rejects.toThrow(NotFoundException);
        });

    });


    describe('updateUser', () => {
        it('should update a user', async () => {
            const updateUserDto: updateUser = { userName: 'John Updated' };
            jest.spyOn(usersService, 'updateUser').mockResolvedValue(undefined);

            expect(await usersController.updateUser(1, updateUserDto)).toBeUndefined();
        });
    });
*/

    describe('deleteUser', () => {
        it('debería eliminar un usuario', async () => {
            const result = 'User deleted';

            jest.spyOn(usersService, 'deleteUser').mockResolvedValue(result);

            expect(await usersController.deleteUser(1)).toEqual(result);
        });

        it('Debería mostrar una exepción su no se encnentra el usuario a eliminar', async () => {
            jest.spyOn(usersService, 'deleteUser').mockRejectedValue(new NotFoundException());

            await expect(usersController.deleteUser(1)).rejects.toThrow(NotFoundException);

        });
    });


});