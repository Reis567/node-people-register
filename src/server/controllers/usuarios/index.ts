import * as signIn from './signIn'
import * as signUp from './signUp'


export const PessoasController = {
    ...signIn,
    ...signUp
}