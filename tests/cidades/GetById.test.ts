import { testServer } from './../jest.setup';
import { StatusCodes } from 'http-status-codes';


describe('Cidades - GetBy Id', ()=>{
    let accessToken = '';
    beforeAll(async()=>{
        const email = 'cidades-getbyid@gmail.com';
        await testServer.post('/cadastrar').send({nome:'teste',email,senha:'12345678'})
        const signInRes = await testServer.post('/entrar').send({email,senha:'12345678'});

        accessToken = signInRes.body.accessToken
    })
    it('Busca registro existente',async ()=>{
        const resCria = await testServer.post('/cidades')
        .set({Authorization:`Bearer ${accessToken}`})
        .send({
            nome: 'Maricá',
          });
          
          expect(resCria.statusCode).toEqual(StatusCodes.CREATED);
          
          const resBusca = await testServer.get(`/cidades/${resCria.body}`)
          .set({Authorization:`Bearer ${accessToken}`})
          .send();
          
          expect(resBusca.statusCode).toEqual(StatusCodes.OK);
    });

    it('Tenta consultar sem usar token de autenticação', async () => {
        const res1 = await testServer
          .get('/cidades/1')
          .send();
        expect(res1.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
        expect(res1.body).toHaveProperty('errors.default');
      });
      
    it('Tenta Busca registro inexistente',async ()=>{
        const response = await testServer.get(`/cidades/99999`)
        .set({Authorization:`Bearer ${accessToken}`})
        .send();

        expect(response.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
        expect(response.body).toHaveProperty('errors.default');
    });
});