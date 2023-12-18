import { StatusCodes } from 'http-status-codes';
import { testServer } from "../jest.setup";

describe('Cidades - Create', ()=>{
    let accessToken = '';
    beforeAll(async()=>{
        const email = 'cidades-create@gmail.com';
        await testServer.post('/cadastrar').send({nome:'teste',email,senha:'12345678'})
        const signInRes = await testServer.post('/entrar').send({email,senha:'12345678'});

        accessToken = signInRes.body.accessToken
    })
    it('Cria registro',async ()=>{
        const resposta1 = await testServer.post('/cidades')
            .set({Authorization:`Bearer ${accessToken}`})
            .send({
        
            nome:'Maricá',
        
        })
        expect(resposta1.statusCode).toEqual(StatusCodes.CREATED);
        expect(typeof resposta1.body).toEqual('number');
    });


    it('Tenta criar registro sem token',async ()=>{
        const resposta1 = await testServer.post('/cidades')
            .send({
        
            nome:'Maricá',
        
        })
        expect(resposta1.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
        expect(resposta1.body).toHaveProperty('errors.default');
    });



    it('Tenta Criar registro com nome curto',async ()=>{
        const resposta1 = await testServer.post('/cidades')
        .set({Authorization:`Bearer ${accessToken}`})
        .send({
        
            nome:'Ma',
        
        })
        expect(resposta1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(resposta1.body).toHaveProperty('errors.body.nome');
    });
});