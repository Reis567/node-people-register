import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';

describe('Usuarios - Signin', () => {
    it('Autentica usuário com credenciais válidas', async () => {
        // Suponha que você já tenha um usuário de teste no banco de dados
        // com email 'test@example.com' e senha 'senha123'
        const resposta1 = await testServer.post('/signin').send({
            email: 'test@example.com',
            senha: 'senha123',
        });

        expect(resposta1.statusCode).toEqual(StatusCodes.OK);
        expect(resposta1.body).toHaveProperty('accessToken');
    });

    it('Tenta autenticar usuário com credenciais inválidas', async () => {
        const resposta2 = await testServer.post('/signin').send({
            email: 'usuario_inexistente@example.com',
            senha: 'senha_incorreta',
        });

        expect(resposta2.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
        expect(resposta2.body).toHaveProperty('errors.default', 'Credenciais inválidas');
    });
});
