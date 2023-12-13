import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { IPessoa } from "../../models";

export const createPessoa = async (pessoa: Omit<IPessoa, 'id'>): Promise<number | Error> => {
    try {
        const [result] = await Knex(ETableNames.pessoa).insert(pessoa).returning('id');

        if (typeof result === 'object' && 'id' in result) {
            return result.id as number;
        } else {
            return new Error('Erro ao cadastrar registro de pessoa!');
        }
    } catch (error) {
        console.error(error);
        return new Error("Erro ao cadastrar o registro de pessoa!");
    }
};
