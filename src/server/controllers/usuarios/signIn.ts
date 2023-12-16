import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from 'yup';
import { validation } from "../../shared/middlewares";
import { IUsuario } from "../../database/models";
import { UsuariosProvider } from "../../database/providers/usuarios";



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
    const user = await UsuariosProvider.getByEmail(email);

    if (user instanceof Error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: user.message,
            },
        });
    }

    if (!user || user.senha !== senha) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
            errors: {
                default: 'Credenciais inválidas',
            },
        });
    }

    return res.status(StatusCodes.OK).json({
        user,
    });
};
