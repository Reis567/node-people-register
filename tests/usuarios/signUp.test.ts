import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';

describe('Usuarios - Signup', () => {
    it('Cria registro de usuário', async () => {
        const resposta1 = await testServer.post('/cadastrar').send({
            nome: 'Fulano de Tal',
            email: 'fulano@example.com',
            senha: 'senha123',
        });

        expect(resposta1.statusCode).toEqual(StatusCodes.CREATED);
        expect(typeof resposta1.body).toEqual('number');
    });
    it('Cria registro de usuário 2', async () => {
        const resposta1 = await testServer.post('/cadastrar').send({
            nome: 'Fulano 2',
            email: 'fulano2@example.com',
            senha: 'senha1234',
        });

        expect(resposta1.statusCode).toEqual(StatusCodes.CREATED);
        expect(typeof resposta1.body).toEqual('number');
    });

    it('Email duplicado', async () => {
        const resposta1 = await testServer.post('/cadastrar').send({
            nome: 'Fulano3',
            email: 'fulano30@example.com',
            senha: 'senha1234',
        });

        expect(resposta1.statusCode).toEqual(StatusCodes.CREATED);
        expect(typeof resposta1.body).toEqual('number');

        const resposta2 = await testServer.post('/cadastrar').send({
            nome: 'Fulano 4',
            email: 'fulano30@example.com',
            senha: 'senha1234',
        });

        expect(resposta2.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
        expect(resposta2.body).toHaveProperty('errors.default');
    });



    it('Tenta criar registro de usuário com nome curto', async () => {
        const resposta2 = await testServer.post('/cadastrar').send({
            nome: 'Jo',
            email: 'jo@example.com',
            senha: 'senha123',
        });

        expect(resposta2.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(resposta2.body).toHaveProperty('errors.body.nome');
    });

    it('Tenta criar registro de usuário sem nome', async () => {
        const resposta3 = await testServer.post('/cadastrar').send({
            email: 'jo@example.com',
            senha: 'senha123',
        });

        expect(resposta3.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(resposta3.body).toHaveProperty('errors.body.nome');
    });

    it('Tenta criar registro de usuário com email inválido', async () => {
        const resposta4 = await testServer.post('/cadastrar').send({
            nome: 'Jose',
            email: 'email_invalido',
            senha: 'senha123',
        });

        expect(resposta4.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(resposta4.body).toHaveProperty('errors.body.email');
    });

    it('Tenta criar registro de usuário sem email', async () => {
        const resposta5 = await testServer.post('/cadastrar').send({
            nome: 'Jose',
            senha: 'senha123',
        });

        expect(resposta5.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(resposta5.body).toHaveProperty('errors.body.email');
    });

    it('Tenta criar registro de usuário com senha curta', async () => {
        const resposta6 = await testServer.post('/cadastrar').send({
            nome: 'Jose',
            email: 'jose@example.com',
            senha: '123',
        });

        expect(resposta6.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(resposta6.body).toHaveProperty('errors.body.senha');
    });
    it('Tenta criar registro sem senha', async () => {
        const resposta6 = await testServer.post('/cadastrar').send({
            nome: 'Jose',
            email: 'jose@example.com',
        });

        expect(resposta6.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(resposta6.body).toHaveProperty('errors.body.senha');
    });
});
