import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from 'yup';
import { validation } from "../../shared/middlewares";
import { IUsuario } from "../../database/models";
import { UsuariosProvider } from "../../database/providers/usuarios";
import { JWTService, PasswordCrypto } from "../../shared/services";



interface IBodyProps extends Omit<IUsuario, 'id'|'nome'> { }

const signinValidationSchema = yup.object({
    email: yup.string().required().email().min(6),
    senha: yup.string().required().min(6),
});

export const signinValidation = validation((getSchema) => ({
    body: getSchema<IBodyProps>(signinValidationSchema),
}));

export const signin: RequestHandler = async (req, res) => {
    const { email, senha } = req.body;
    const usuario = await UsuariosProvider.getByEmail(email);

    if (usuario instanceof Error) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
            errors: {
                default: 'Credenciais inválidas',
            },
        });
    }
    const passwordMatch = await PasswordCrypto.verifyPassword(senha, usuario.senha)

    if (!passwordMatch) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
            errors: {
                default: 'Credenciais inválidas',
            },
        });
    }else{
        const accessToken = JWTService.sign({uid : usuario.id})


        return res.status(StatusCodes.OK).json({accessToken:'teste'})
    }



    

    return res.status(StatusCodes.OK).json({
        usuario,
    });
};
