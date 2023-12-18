import { testServer } from './../jest.setup';
import { StatusCodes } from 'http-status-codes';


describe('Pessoas - UpdateById',()=>{
  let accessToken = '';
  beforeAll(async()=>{
      const email = 'pessoas-update@gmail.com';
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


    it('Edita registro existente', async () => {
        const resCria = await testServer.post('/pessoas')
        .set({Authorization:`Bearer ${accessToken}`})
        .send({
            nomeCompleto: 'Fulano de Tal',
            email: 'fulano@example.com',
            cidadeId, 
          });
          
          expect(resCria.statusCode).toEqual(StatusCodes.CREATED);
          
          const resAtualiza = await testServer
          .put(`/pessoas/${resCria.body}`)
          .set({Authorization:`Bearer ${accessToken}`})
          .send({
            nomeCompleto: 'Fulano de Tal2',
            email: 'fulano2@example.com',
            cidadeId: 2, 
          });
          
          expect(resAtualiza.statusCode).toEqual(StatusCodes.NO_CONTENT);
          
      });
    
    it('Tenta editar registro inexistente', async () => {
    
        const response = await testServer
        .put(`/pessoas/99999`)
        .set({Authorization:`Bearer ${accessToken}`})
        .send({
            nomeCompleto: 'Fulano de Tal',
            email: 'fulano@example.com',
            cidadeId, 
        });
    
        expect(response.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
        expect(response.body).toHaveProperty('errors.default');
      });

})