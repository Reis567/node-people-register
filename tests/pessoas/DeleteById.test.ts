import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';

describe('Pessoas - DeleteById', () => {

  let accessToken = '';
  beforeAll(async()=>{
      const email = 'pessoas-delete@gmail.com';
      await testServer.post('/cadastrar').send({nome:'teste',email,senha:'12345678'})
      const signInRes = await testServer.post('/entrar').send({email,senha:'12345678'});

      accessToken = signInRes.body.accessToken
  })
  let cidadeId :number|undefined = undefined
  beforeAll(async()=>{
      const resCidade = await testServer.post('/cidades')
      .set({Authorization:`Bearer ${accessToken}`})
      .send({nome:'Brumadinho'})
      cidadeId= resCidade.body
  })

  it('Exclui registro existente', async () => {

    const resCria = await testServer.post('/pessoas')
    .set({Authorization:`Bearer ${accessToken}`})
    .send({
        nomeCompleto: 'Cezar maia',
        email: 'fulanodelete@example.com',
        cidadeId, 
      });
      
      expect(resCria.statusCode).toEqual(StatusCodes.CREATED);
      
      const resApaga = await testServer.delete(`/pessoas/${resCria.body}`)
      .set({Authorization:`Bearer ${accessToken}`})
      .send();
      
      expect(resApaga.statusCode).toEqual(StatusCodes.NO_CONTENT);
      
  });

  it('Tenta apagar registro sem usar token de autenticação', async () => {
    const res1 = await testServer
      .delete('/pessoas/1')
      .send();

    expect(res1.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
    expect(res1.body).toHaveProperty('errors.default');
  });

  it('Tenta excluir registro inexistente', async () => {

    const response = await testServer.delete(`/pessoas/99999`)
    .set({Authorization:`Bearer ${accessToken}`})
    .send();

    expect(response.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(response.body).toHaveProperty('errors.default');
  });
});
