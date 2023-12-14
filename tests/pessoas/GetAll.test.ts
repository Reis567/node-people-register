import { testServer } from './../jest.setup';
import { StatusCodes } from 'http-status-codes';


describe('Pessoas - GetAll', ()=>{
    it('Busca todos os registros',async ()=>{
        const resposta1 = await testServer.post('/pessoas').send({
            nomeCompleto: 'Fulano de Tal',
            email: 'fulano@example.com',
            cidadeId: 1, 
        
        })
        expect(resposta1.statusCode).toEqual(StatusCodes.CREATED);
        const resBuscada = await testServer.get('/pessoas').send();

        expect(Number(resBuscada.header['x-total-count'])).toBeGreaterThan(0);
        expect(resBuscada.statusCode).toEqual(StatusCodes.OK);
        expect(resBuscada.body.length).toBeGreaterThan(0)
    });
});