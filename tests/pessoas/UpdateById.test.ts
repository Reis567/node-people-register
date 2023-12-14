import { testServer } from './../jest.setup';
import { StatusCodes } from 'http-status-codes';
describe('Pessoas - UpdateById',()=>{
    it('Edita registro existente', async () => {
        const resCria = await testServer.post('/pessoas').send({
            nomeCompleto: 'Fulano de Tal',
            email: 'fulano@example.com',
            cidadeId: 1, 
          });
          
          expect(resCria.statusCode).toEqual(StatusCodes.CREATED);
          
          const resAtualiza = await testServer.put(`/pessoas/${resCria.body}`).send({
            nomeCompleto: 'Fulano de Tal2',
            email: 'fulano2@example.com',
            cidadeId: 2, 
          });
          
          expect(resAtualiza.statusCode).toEqual(StatusCodes.NO_CONTENT);
          
      });
    
    it('Tenta editar registro inexistente', async () => {
    
        const response = await testServer.put(`/pessoas/99999`).send({
            nomeCompleto: 'Fulano de Tal',
            email: 'fulano@example.com',
            cidadeId: 1, 
        });
    
        expect(response.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
        expect(response.body).toHaveProperty('errors.default');
      });

})