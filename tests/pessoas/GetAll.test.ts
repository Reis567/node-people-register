import { testServer } from './../jest.setup';
import { StatusCodes } from 'http-status-codes';


describe('Pessoas - GetAll', ()=>{
    let accessToken = '';
    beforeAll(async()=>{
        const email = 'pessoas-getall@gmail.com';
        await testServer.post('/cadastrar').send({nome:'teste',email,senha:'12345678'})
        const signInRes = await testServer.post('/entrar').send({email,senha:'12345678'});

        accessToken = signInRes.body.accessToken
    })
    let cidadeId :number|undefined = undefined
    beforeAll(async()=>{
        const resCidade = await testServer.post('/cidades').send({nome:'Brumadinho'})
        cidadeId= resCidade.body
    })
    it('Busca todos os registros',async ()=>{
        const resposta1 = await testServer.post('/pessoas').send({
            nomeCompleto: 'Fulano de Tal',
            email: 'fulanogetall@example.com',
            cidadeId, 
        
        })
        expect(resposta1.statusCode).toEqual(StatusCodes.CREATED);
        const resBuscada = await testServer.get('/pessoas').send();

        expect(Number(resBuscada.header['x-total-count'])).toBeGreaterThan(0);
        expect(resBuscada.statusCode).toEqual(StatusCodes.OK);
        expect(resBuscada.body.length).toBeGreaterThan(0)
    });
});