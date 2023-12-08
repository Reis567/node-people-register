import { testServer } from './../jest.setup';
import { StatusCodes } from 'http-status-codes';


describe('Cidades - GetBy Id', ()=>{
    it('Busca registro existente',async ()=>{
        const resCria = await testServer.post('/cidades').send({
            nome: 'Maricá',
          });
          
          expect(resCria.statusCode).toEqual(StatusCodes.CREATED);
          
          const resBusca = await testServer.delete(`/cidades/${resCria.body}`).send();
          
          expect(resBusca.statusCode).toEqual(StatusCodes.NO_CONTENT);
    });
    it('Tenta Busca registro inexistente',async ()=>{
        const response = await testServer.get(`/cidades/99999`).send();

        expect(response.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
        expect(response.body).toHaveProperty('errors.default');
    });
});