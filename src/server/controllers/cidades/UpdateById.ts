
import { Request, RequestHandler, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from 'yup'
import { validation } from "../../shared/middlewares";

const paramsValidation = yup.object({
    id: yup.number().integer().required().moreThan(0),
  });
  
  const bodyValidation = yup.object({
    nome: yup.string().required().min(3),
  });
  
interface IParamsProps extends yup.InferType<typeof paramsValidation> {
    id:number;
  }
  
interface IBodyProps extends yup.InferType<typeof bodyValidation> {
    nome:string;
  }
  


export const UpdateByIdValidation = validation((getSchema)=>({
    params:getSchema<IParamsProps>(paramsValidation),
    body:getSchema<IBodyProps>(bodyValidation),
}));



export const UpdateById= async (req:Request, res:Response) => {
  console.log(req.params);
  console.log(req.body);

  res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Ainda não implementado');
};