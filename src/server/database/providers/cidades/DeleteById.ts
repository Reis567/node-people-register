import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";

export const deleteById = async (id: number): Promise<void | Error> => {
    try {
        const result = await Knex(ETableNames.cidade)
        .where('id','=',id).del();

        if(result>0) return;
        
        if (result === 0) {
            return new Error('Registro não encontrado');
        }

        console.log(`Registro com ID ${id} excluído com sucesso.`);
    } catch (error) {
        console.error('Erro ao excluir o registro:', error);
        return new Error('Erro ao excluir o registro!');
    }
};
