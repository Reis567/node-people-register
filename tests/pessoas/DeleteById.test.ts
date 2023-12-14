import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';

describe('Pessoas - DeleteById', () => {
  it('Exclui registro existente', async () => {
    const resCria = await testServer.post('/pessoas').send({
        nomeCompleto: 'Fulano de Tal',
        email: 'fulano@example.com',
        cidadeId: 1, 
      });
      
      expect(resCria.statusCode).toEqual(StatusCodes.CREATED);
      
      const resApaga = await testServer.delete(`/pessoas/${resCria.body}`).send();
      
      expect(resApaga.statusCode).toEqual(StatusCodes.NO_CONTENT);
      
  });

  it('Tenta excluir registro inexistente', async () => {

    const response = await testServer.delete(`/pessoas/99999`).send();

    expect(response.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(response.body).toHaveProperty('errors.default');
  });
});