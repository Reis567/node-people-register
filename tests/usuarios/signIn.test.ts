import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';

describe('Usuarios - Signin', () => {
    beforeAll(async () => {
        // Antes de iniciar os testes, criamos um usuário de teste no banco de dados
        await testServer.post('/cadastrar').send({
            nome: 'Usuario Teste',
            email: 'test@example.com',
            senha: 'senha123',
        });
    });

    it('Autentica usuário com credenciais válidas', async () => {
        const resposta1 = await testServer.post('/entrar').send({
            email: 'test@example.com',
            senha: 'senha123',
        });

        expect(resposta1.statusCode).toEqual(StatusCodes.OK);
        expect(resposta1.body).toHaveProperty('accessToken');
    });

    it('Tenta autenticar usuário com senha errada', async () => {
        const resposta2 = await testServer.post('/entrar').send({
            email: 'test@example.com',
            senha: 'senha_incorreta',
        });

        expect(resposta2.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
        expect(resposta2.body).toHaveProperty('errors.default', 'Credenciais inválidas');
    });
    it('Tenta autenticar usuário com email errado', async () => {
        const resposta2 = await testServer.post('/entrar').send({
            email: 'testerrado@example.com',
            senha: 'senha123',
        });

        expect(resposta2.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
        expect(resposta2.body).toHaveProperty('errors.default', 'Credenciais inválidas');
    });
    it('Tenta autenticar usuário com email invalido', async () => {
        const resposta2 = await testServer.post('/entrar').send({
            email: 'testeinvalidoarrobaexample!com',
            senha: 'senha123',
        });

        expect(resposta2.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
        expect(resposta2.body).toHaveProperty('errors.default', 'Credenciais inválidas');
    });

    it('Tenta autenticar usuário com senha curta', async () => {
        const resposta2 = await testServer.post('/entrar').send({
            email: 'test@example.com',
            senha: 's',
        });

        expect(resposta2.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
        expect(resposta2.body).toHaveProperty('errors.default', 'Credenciais inválidas');
    });
    
    it('Tenta autenticar usuário sem senha', async () => {
        const resposta2 = await testServer.post('/entrar').send({
            email: 'test@example.com'
        });

        expect(resposta2.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
        expect(resposta2.body).toHaveProperty('errors.default', 'Credenciais inválidas');
    });
    it('Tenta autenticar usuário sem email', async () => {
        const resposta2 = await testServer.post('/entrar').send({
            senha:"senha123"
        });

        expect(resposta2.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
        expect(resposta2.body).toHaveProperty('errors.default', 'Credenciais inválidas');
    });
});
