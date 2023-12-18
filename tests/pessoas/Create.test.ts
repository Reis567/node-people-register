import { StatusCodes } from 'http-status-codes';
import { testServer } from "../jest.setup";

describe('Pessoas - Create', () => {
    let accessToken = '';
    beforeAll(async()=>{
        const email = 'pessoas-create@gmail.com';
        await testServer.post('/cadastrar').send({nome:'teste',email,senha:'12345678'})
        const signInRes = await testServer.post('/entrar').send({email,senha:'12345678'});

        accessToken = signInRes.body.accessToken
    })
    let cidadeId: number | undefined = undefined;

    beforeAll(async () => {
        const resCidade = await testServer.post('/cidades')
        .set({Authorization:`Bearer ${accessToken}`})
        .send({ nome: 'Brumadinho' });
        cidadeId = resCidade.body;
    });

    it('Cria registro', async () => {
        const resposta1 = await testServer.post('/pessoas')
        .set({Authorization:`Bearer ${accessToken}`})
        .send({
            nomeCompleto: 'Fulano de Tal',
            email: 'fulanoCreate1@example.com',
            cidadeId,
        });

        expect(resposta1.statusCode).toEqual(StatusCodes.CREATED);
        expect(typeof resposta1.body).toEqual('number');
    });
    it('Cria registro 2', async () => {
        const resposta1 = await testServer.post('/pessoas')
        .set({Authorization:`Bearer ${accessToken}`})
        .send({
            nomeCompleto: 'Fulano o segundo',
            email: 'fulanoCreate2@example.com',
            cidadeId,
        });

        expect(resposta1.statusCode).toEqual(StatusCodes.CREATED);
        expect(typeof resposta1.body).toEqual('number');
    });
    it('Tenta criar registro com email duplicado', async () => {
        const resposta1 = await testServer.post('/pessoas')
        .set({Authorization:`Bearer ${accessToken}`})
        .send({
            nomeCompleto: 'Fulano de Tal',
            email: 'fulanoCreate1222@example.com',
            cidadeId,
        });

        expect(resposta1.statusCode).toEqual(StatusCodes.CREATED);

        const resposta2 = await testServer.post('/pessoas').send({
            nomeCompleto: 'Fulano',
            email: 'fulanoCreate1222@example.com',
            cidadeId,
        });
        expect(resposta2.body).toHaveProperty('errors.default')
    });

    it('Tenta criar registro com Cidade Id inválido', async () => {
        const resposta2 = await testServer.post('/pessoas')
        .set({Authorization:`Bearer ${accessToken}`})
        .send({
            nomeCompleto: 'Juca da Silva',
            email: 'juca222@gmail.com',
            cidadeId: 'teste',
        });

        expect(resposta2.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(resposta2.body).toHaveProperty('errors.body.cidadeId');
    });
    it('Tenta criar registro com nome curto', async () => {
        const resposta2 = await testServer.post('/pessoas')
        .set({Authorization:`Bearer ${accessToken}`})
        .send({
            nomeCompleto: 'Jo',
            email: 'joelintoncreate2@example.com',
            cidadeId,
        });

        expect(resposta2.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(resposta2.body).toHaveProperty('errors.body.nomeCompleto');
    });

    it('Tenta criar registro sem nome', async () => {
        const resposta5 = await testServer.post('/pessoas')
        .set({Authorization:`Bearer ${accessToken}`})
        .send({
            email: 'noName@example.com',
            cidadeId,
        });

        expect(resposta5.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(resposta5.body).toHaveProperty('errors.body.nomeCompleto');
    });

    it('Tenta criar registro sem email', async () => {
        const resposta6 = await testServer.post('/pessoas')
        .set({Authorization:`Bearer ${accessToken}`})
        .send({
            nomeCompleto: 'SemEmail',
            cidadeId,
        });

        expect(resposta6.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(resposta6.body).toHaveProperty('errors.body.email');
    });

    it('Tenta criar registro com email no formato inválido', async () => {
        const resposta7 = await testServer.post('/pessoas')
        .set({Authorization:`Bearer ${accessToken}`})
        .send({
            nomeCompleto: 'EmailInvalido',
            email: 'invalidEmail',
            cidadeId,
        });

        expect(resposta7.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(resposta7.body).toHaveProperty('errors.body.email');
    });
    
    it('Tenta criar registro sem cidadeId', async () => {
        const resposta6 = await testServer.post('/pessoas')
        .set({Authorization:`Bearer ${accessToken}`})
        .send({
            nomeCompleto: 'SemEmail',
            email:'emaicreate@gmail.com'
        });

        expect(resposta6.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(resposta6.body).toHaveProperty('errors.body.cidadeId');
    });

    it('Tenta criar registro sem nenhuma propriedade', async () => {
        const resposta6 = await testServer.post('/pessoas')
        .set({Authorization:`Bearer ${accessToken}`})
        .send({
        });

        expect(resposta6.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(resposta6.body).toHaveProperty('errors.body.cidadeId');
        expect(resposta6.body).toHaveProperty('errors.body.email');
        expect(resposta6.body).toHaveProperty('errors.body.nomeCompleto');
    });
});
