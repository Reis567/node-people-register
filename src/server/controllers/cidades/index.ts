import * as getAll  from './GetAll';
import * as create from "./Create"
import * as getById from './GetById'
import * as UpdateById from './UpdateById'

export const CidadesController = {
    ...create,
    ...getAll,
    ...getById,
    ...UpdateById,
}