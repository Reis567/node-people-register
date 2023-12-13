import { ETableNames } from '../../ETableNames';
import { IPessoa } from '../../models';
import { Knex } from '../../knex';

export const updateById = async (id: number, pessoa: Omit<IPessoa, 'id'>): Promise<void | Error> => {
    try {
        const result = await Knex(ETableNames.pessoa)
            .update(pessoa)
            .where('id', '=', id);

        if (result > 0) {
            return;
        }

        return new Error('Erro ao atualizar registro');
    } catch (error) {
        console.error(error);
        return new Error('Erro ao atualizar registro');
    }
};