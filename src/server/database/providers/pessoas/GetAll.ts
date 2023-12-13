import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { IPessoa } from "../../models";

export const getAll = async (page: number, limit: number, filter: string): Promise<IPessoa[] | Error> => {
    try {
        let query = Knex(ETableNames.pessoa)
            .select('*')
            .where('nomeCompleto', 'like', `%${filter}%`)
            .offset((page - 1) * limit)
            .limit(limit);

        const result = await query;


        return result;
    } catch (error) {
        console.error(error);
        return new Error('Erro ao consultar registros de pessoas');
    }
};
