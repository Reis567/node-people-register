import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';

describe('Cidades - DeleteById', () => {
  let accessToken = '';
  beforeAll(async()=>{
      const email = 'cidades-delete@gmail.com';
      await testServer.post('/cadastrar').send({nome:'teste',email,senha:'12345678'})
      const signInRes = await testServer.post('/entrar').send({email,senha:'12345678'});

      accessToken = signInRes.body.accessToken
  })

  it('Exclui registro existente', async () => {
    const resCria = await testServer.post('/cidades')
    .set({Authorization:`Bearer ${accessToken}`})
    .send({
        nome: 'Maricá',
      });
      
      expect(resCria.statusCode).toEqual(StatusCodes.CREATED);
      
      const resApaga = await testServer.delete(`/cidades/${resCria.body}`).send();
      
      expect(resApaga.statusCode).toEqual(StatusCodes.NO_CONTENT);
      
  });

  it('Tenta excluir registro inexistente', async () => {

    const response = await testServer.delete(`/cidades/99999`)
    .set({Authorization:`Bearer ${accessToken}`})
    .send();

    expect(response.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(response.body).toHaveProperty('errors.default');
  });
});
