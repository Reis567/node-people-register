
import { Request, RequestHandler, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from 'yup'
import { validation } from "../../shared/middlewares";
import { ICidade } from "../../database/models";
import { CidadesProvider } from "../../database/providers/cidades";


const bodyValidation = yup.object({
    nome: yup.string().required().min(3).max(150),
  });

interface IBodyProps extends Omit<ICidade,'id'>{ }
  


export const createValidation = validation((getSchema)=>({
    body:getSchema<IBodyProps>(bodyValidation),
}));


export const create:RequestHandler  = async (req:Request<{},{},IBodyProps>, res:Response)=>{
    const result = await CidadesProvider.create(req.body);

    if (result instanceof Error){
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors:{
                default:result.message
            }
        })
    }

    return res.status(StatusCodes.CREATED).json(result);
};