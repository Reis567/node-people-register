import { Request, RequestHandler, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from 'yup';
import { validation } from "../../shared/middlewares";
import { PessoasProvider } from "../../database/providers/pessoas";
import { IPessoa } from "../../database/models";

const paramsValidation = yup.object({
    id: yup.number().integer().required().moreThan(0),
});

const bodyValidation = yup.object({
    nomeCompleto: yup.string().required().min(3),
    email: yup.string().required().email(),
    cidadeId: yup.number().integer().required(),
});

interface IParamsProps extends yup.InferType<typeof paramsValidation> {
    id: number;
}

interface IBodyProps extends Omit<IPessoa, 'id'> { }

export const updateByIdValidation = validation((getSchema) => ({
    params: getSchema<IParamsProps>(paramsValidation),
    body: getSchema<IBodyProps>(bodyValidation),
}));

export const updateById: RequestHandler = async (req: Request, res: Response) => {
    console.log(req.body);
    console.log(req.params);

    if (!req.params.id) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            errors: {
                default: 'O parâmetro "id" precisa ser informado!',
            },
        });
    }

    const idNumber: number = parseInt(req.params.id);

    if (isNaN(idNumber)) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            errors: {
                default: 'O parâmetro "id" deve ser um número válido!',
            },
        });
    }

    const result = await PessoasProvider.updateById(idNumber, req.body);

    if (result instanceof Error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: result.message,
            },
        });
    }

    res.status(StatusCodes.NO_CONTENT).json(result);
};
