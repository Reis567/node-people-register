import { StatusCodes } from 'http-status-codes';
import { testServer } from "../jest.setup";

describe('Cidades - Create', ()=>{
    it('Cria registro',async ()=>{
        const resposta1 = await testServer.post('/cidades').send({
        
            nome:'Maricá',
        
        })
        expect(resposta1.statusCode).toEqual(StatusCodes.CREATED);
        expect(typeof resposta1.body).toEqual('number');
    });
    it('Tenta Criar registro com nome curto',async ()=>{
        const resposta1 = await testServer.post('/cidades').send({
        
            nome:'Ma',
        
        })
        expect(resposta1.statusCode).toEqual(StatusCodes.CREATED);
        expect(resposta1.body).toHaveProperty('errors.body.nome');
    });
});