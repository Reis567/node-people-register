import { testServer } from './../jest.setup';
import { StatusCodes } from 'http-status-codes';
describe('Cidades - UpdateById',()=>{
    it('Edita registro existente', async () => {
        const resCria = await testServer.post('/cidades').send({
            nome: 'Maricá',
          });
          
          expect(resCria.statusCode).toEqual(StatusCodes.CREATED);
          
          const resAtualiza = await testServer.put(`/cidades/${resCria.body}`).send({
            nome:'Marica2'
          });
          
          expect(resAtualiza.statusCode).toEqual(StatusCodes.NO_CONTENT);
          
      });
    
    it('Tenta editar registro inexistente', async () => {
    
        const response = await testServer.put(`/cidades/99999`).send({
            nome:'Maricá'
        });
    
        expect(response.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
        expect(response.body).toHaveProperty('errors.default');
      });

})