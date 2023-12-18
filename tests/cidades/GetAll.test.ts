import { testServer } from './../jest.setup';
import { StatusCodes } from 'http-status-codes';


describe('Cidades - GetAll', ()=>{
    let accessToken = '';
    beforeAll(async()=>{
        const email = 'cidades-getall@gmail.com';
        await testServer.post('/cadastrar').send({nome:'teste',email,senha:'12345678'})
        const signInRes = await testServer.post('/entrar').send({email,senha:'12345678'});

        accessToken = signInRes.body.accessToken
    })
    it('Busca todos os registros',async ()=>{
        const resposta1 = await testServer.post('/cidades')
        .set({Authorization:`Bearer ${accessToken}`})
        .send({
        
            nome:'Maricá',
        
        })
        expect(resposta1.statusCode).toEqual(StatusCodes.CREATED);
        const resBuscada = await testServer.get('/cidades')
        .set({Authorization:`Bearer ${accessToken}`})
        .send()

        expect(Number(resBuscada.header['x-total-count'])).toBeGreaterThan(0);
        expect(resBuscada.statusCode).toEqual(StatusCodes.OK);
        expect(resBuscada.body.length).toBeGreaterThan(0)
    });
});