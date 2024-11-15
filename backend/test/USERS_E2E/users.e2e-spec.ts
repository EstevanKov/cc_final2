import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import * as request from 'supertest';
import { AppModule } from '../../src/app.module'
import passport from "passport";

describe('Pruebas e2e de usuarios', () => {
    let app: INestApplication;
    let jwToken: string;
    let userID: number;
    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();
        app = module.createNestApplication();
        await app.init();

        jwToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsInN1YiI6MSwiaWF0IjoxNzI1MTQ2NzY3LCJleHAiOjE3MjUxNTAzNjd9.gdNdboiXNcNI3dGPTOGx7-XhyRssxyd4En_hfHrSCzM'
    });
    it('POST: /users/register debe crear un nuevo usuario y mostrarlo', async () => {
        const response = await request(app.getHttpServer()).post('/users/register').send({
            userName: 'Usuario de prueba',
            email: 'test@gmail.com',
            password: '1234'
        }).expect(201);

        userID = response.body.user.id;
        expect(response.body.user.email).toEqual('test@gmail.com');

    });
    it('GET: /users debe mostrar TODOS los usuarios en la BD', async () => {
        const response = await request(app.getHttpServer()).get('/users')
            .set('Authorization', `Bearer ${jwToken}`)
            .expect(200);

        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBeGreaterThan(0);

    });
    it('GET: /users:id debe mostrar un usuario especifico en la BD', async () => {
        const response = await request(app.getHttpServer())
            .get(`/users/${userID}`)
            .set('Authorization', `Bearer ${jwToken}`)
            .expect(200);

        expect(response.body.id).toEqual(userID);
        expect(response.body.email).toEqual('test@gmail.com');

    });

    it('PATCH: /users/:id debería actualizar un usuario y mostrarlo', async () => {
        await request(app.getHttpServer())
            .patch(`/users/${userID}`)
            .set('Authorization', `Bearer ${jwToken}`)
            .send(
                {
                    userName: 'Usuario actualizado',
                    email: 'correonuevo@gmail.com'
                }
            )
            .expect(200);

        const response = await request(app.getHttpServer())
            .get(`/users/${userID}`)
            .set('Authorization', `Bearer ${jwToken}`)
            .expect(200);


        expect(response.body.userName).toEqual('Usuario actualizado');
        expect(response.body.email).toEqual('correonuevo@gmail.com');
    });

    it('DELETE: /users/:id', async () => {
        await request(app.getHttpServer())
            .delete(`/users/${userID}`)
            .set('Authorization', `Bearer ${jwToken}`)
            .expect(200);

        await request(app.getHttpServer())
            .get(`/users/${userID}`)
            .set('Authorization', `Bearer ${jwToken}`)
            .expect(404);
    });

    afterAll(async () => {
        await app.close();
    })
});
