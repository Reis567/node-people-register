import { testServer } from './../jest.setup';
import { StatusCodes } from 'http-status-codes';


describe('Pessoas - GetBy Id', ()=>{
    let cidadeId :number|undefined = undefined
    beforeAll(async()=>{
        const resCidade = await testServer.post('/cidades').send({nome:'Brumadinho'})
        cidadeId= resCidade.body
    })

    it('Busca registro existente',async ()=>{


        const resCria = await testServer.post('/pessoas').send({
            nomeCompleto: 'Fulano de Tal',
            email: 'fulanogetbyid@example.com',
            cidadeId
          });
          
          expect(resCria.statusCode).toEqual(StatusCodes.CREATED);
          
          const resBusca = await testServer.delete(`/pessoas/${resCria.body}`).send();
          
          expect(resBusca.statusCode).toEqual(StatusCodes.NO_CONTENT);
    });
    it('Tenta Busca registro inexistente',async ()=>{
        const response = await testServer.get(`/pessoas/99999`).send();

        expect(response.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
        expect(response.body).toHaveProperty('errors.default');
    });
});