import * as getAll  from './GetAll';
import * as create from "./Create"
import * as getById from './GetById'
import * as UpdateById from './UpdateById'
import * as deleteById from './DeleteById'

export const CidadesProvider = {
    ...create,
    ...getAll,
    ...getById,
    ...UpdateById,
    ...deleteById,
}