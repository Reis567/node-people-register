import { StatusCodes } from 'http-status-codes';
import { testServer } from "../jest.setup";

describe('Pessoas - Create', () => {
    let cidadeId :number|undefined = undefined
    beforeAll(async()=>{
        const resCidade = await testServer.post('/cidades').send({nome:'Brumadinho'})
        cidadeId= resCidade.body
    })
    it('Cria registro', async () => {
        const resposta1 = await testServer.post('/pessoas').send({
            nomeCompleto: 'Fulano de Tal',
            email: 'fulano@example.com',
            cidadeId, 
        });

        expect(resposta1.statusCode).toEqual(StatusCodes.CREATED);
        expect(typeof resposta1.body).toEqual('number');
    });

    it('Tenta criar registro com nome curto/Cidade Id incorreto', async () => {
        const resposta1 = await testServer.post('/pessoas').send({
            nomeCompleto: 'Jo',
            email: 'jo@example.com',
            cidadeId: 9999,
        });

        expect(resposta1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(resposta1.body).toHaveProperty('errors.body.nomeCompleto');
    });

});
