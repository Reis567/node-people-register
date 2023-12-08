import { testServer } from './../jest.setup';
import { StatusCodes } from 'http-status-codes';

it('Tenta editar registro inexistente', async () => {

    const response = await testServer.put(`/cidades/99999`).send({
        nome:'Maricá'
    });

    expect(response.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(response.body).toHaveProperty('errors.default');
  });