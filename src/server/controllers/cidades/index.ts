import * as getAll  from './GetAll';
import * as create from "./Create"

export const CidadesController = {
    ...create,
    ...getAll,
}