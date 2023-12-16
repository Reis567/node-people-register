import { Request, RequestHandler, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from 'yup';
import { validation } from "../../shared/middlewares";
import { IUsuario } from "../../database/models";
import { UsuariosProvider } from "../../database/providers/usuarios";


interface IBodyProps extends Omit<IUsuario, 'id'> { }

const bodyValidation = yup.object({
    nome: yup.string().required().min(3),
    email: yup.string().required().email().min(6),
    senha: yup.string().required().min(6), 
});

export const signupValidation = validation((getSchema) => ({
    body: getSchema<IBodyProps>(bodyValidation),
}));

export const signup: RequestHandler = async (req: Request<{}, {}, IBodyProps>, res: Response) => {
    const result = await UsuariosProvider.create(req.body);

    if (result instanceof Error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: result.message,
            },
        });
    }

    return res.status(StatusCodes.CREATED).json(result);
};
