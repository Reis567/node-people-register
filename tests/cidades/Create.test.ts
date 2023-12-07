import { StatusCodes } from 'http-status-codes';
import { testServer } from "../jest.setup";

describe('Cidades - Create', ()=>{
    it('Cria registro',async ()=>{
        const resposta1 = await testServer.post('/cidades').send({
        
            nome:'Maricá',
        
        })
        expect(resposta1.statusCode).toEqual(StatusCodes.CREATED);
    });
});