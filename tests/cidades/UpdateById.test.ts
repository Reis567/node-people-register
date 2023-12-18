import { testServer } from './../jest.setup';
import { StatusCodes } from 'http-status-codes';
describe('Cidades - UpdateById',()=>{
  let accessToken = '';
  beforeAll(async()=>{
      const email = 'cidades-update@gmail.com';
      await testServer.post('/cadastrar').send({nome:'teste',email,senha:'12345678'})
      const signInRes = await testServer.post('/entrar').send({email,senha:'12345678'});

      accessToken = signInRes.body.accessToken
  })
    it('Edita registro existente', async () => {
        const resCria = await testServer.post('/cidades')
        .set({Authorization:`Bearer ${accessToken}`})
        .send({
            nome: 'Maricá',
          });
          
          expect(resCria.statusCode).toEqual(StatusCodes.CREATED);
          
          const resAtualiza = await testServer.put(`/cidades/${resCria.body}`).send({
            nome:'Marica2'
          });
          
          expect(resAtualiza.statusCode).toEqual(StatusCodes.NO_CONTENT);
          
      });
    
    it('Tenta editar registro inexistente', async () => {
    
        const response = await testServer.put(`/cidades/99999`)
        .set({Authorization:`Bearer ${accessToken}`})
        .send({
            nome:'Maricá'
        });
    
        expect(response.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
        expect(response.body).toHaveProperty('errors.default');
      });

})