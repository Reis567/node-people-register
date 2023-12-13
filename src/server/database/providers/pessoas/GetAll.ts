import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { IPessoa } from "../../models";

export const getAll = async (page: number, limit: number, filter: string, id = 0): Promise<IPessoa[] | Error> => {
    try {
        let query = Knex(ETableNames.pessoa)
            .select('*')
            .where('id',Number(id))
            .orWhere('nomeCompleto', 'like', `%${filter}%`)
            .offset((page - 1) * limit)
            .limit(limit);

        const result = await query;

        if (id > 0 && result.every(item => item.id !== id)) {
            const resultById = await Knex(ETableNames.pessoa)
                .select('*')
                .where('id','=',id)
                .first();

            if (resultById) {
                return [...result, resultById];
            }
        }

        return result;
    } catch (error) {
        console.error(error);
        return new Error('Erro ao consultar registros de pessoas');
    }
};
