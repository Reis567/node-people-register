import { StatusCodes } from 'http-status-codes';
import { testServer } from "../jest.setup";

describe('Pessoas - Create', () => {
    let cidadeId: number | undefined = undefined;

    beforeAll(async () => {
        const resCidade = await testServer.post('/cidades').send({ nome: 'Brumadinho' });
        cidadeId = resCidade.body;
    });

    it('Cria registro', async () => {
        const resposta1 = await testServer.post('/pessoas').send({
            nomeCompleto: 'Fulano de Tal',
            email: 'fulanoCreate1@example.com',
            cidadeId,
        });

        expect(resposta1.statusCode).toEqual(StatusCodes.CREATED);
        expect(typeof resposta1.body).toEqual('number');
    });
    it('Cria registro 2', async () => {
        const resposta1 = await testServer.post('/pessoas').send({
            nomeCompleto: 'Fulano o segundo',
            email: 'fulanoCreate2@example.com',
            cidadeId,
        });

        expect(resposta1.statusCode).toEqual(StatusCodes.CREATED);
        expect(typeof resposta1.body).toEqual('number');
    });
    it('Tenta criar registro com email duplicado', async () => {
        const respostaemail1 = await testServer.post('/pessoas').send({
            nomeCompleto: 'Ciclano de Tal',
            email: 'fulanoCreate2@example.com', 
            cidadeId,
        });

        expect(respostaemail1.statusCode).toEqual(StatusCodes.CREATED);

        const respostaemail2 = await testServer.post('/pessoas').send({
            nomeCompleto: 'Ciclano de Tal2',
            email: 'fulanoCreate2@example.com', 
            cidadeId,
        });

        expect(respostaemail2.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
        expect(respostaemail2.body).toHaveProperty('errors.default')
    });


});
