import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";

export const count = async (filter = ''): Promise<number | Error> => {
    try {
        const [{ count }] = await Knex(ETableNames.pessoa)
            .where('nomeCompleto', 'like', `%${filter}%`)
            .count<[{ count: number }]>('id as count');

        if (Number.isInteger(Number(count))) return Number(count);

        return new Error('Erro ao consultar a quantidade total de registros de pessoas');
    } catch (error) {
        console.error(error);
        return new Error('Erro ao consultar a quantidade total de registros de pessoas');
    }
};
