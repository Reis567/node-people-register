import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';

describe('Cidades - DeleteById', () => {
  it('Exclui registro existente', async () => {
    const resCria = await testServer.post('/cidades').send({
        
        nome:'Maricá',
    
    })
    expect(resCria.statusCode).toEqual(StatusCodes.CREATED);


    const resApaga = await testServer.delete(`/cidades/${resCria.body}`).send();

    expect(resApaga.statusCode).toEqual(StatusCodes.NO_CONTENT);
  });

  it('Tenta excluir registro inexistente', async () => {

    const nonExistingId = 99999;

    const response = await testServer.delete(`/cidades/${nonExistingId}`).send();

    expect(response.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(response.body).toHaveProperty('errors.default');
  });
});
