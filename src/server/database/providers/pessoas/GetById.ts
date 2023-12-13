import { ETableNames } from '../../ETableNames';
import { IPessoa } from '../../models';
import { Knex } from '../../knex';

export const getPessoaById = async (id: number): Promise<IPessoa | Error> => {
    try {
        const result = await Knex(ETableNames.pessoa)
            .select('*')
            .where('id', '=', id)
            .first();

        if (result) {
            return result;
        }

        return new Error('Registro não encontrado');
    } catch (error) {
        console.error(error);
        return new Error('Erro ao consultar os registros');
    }
};
