
import { Request, RequestHandler, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from 'yup'
import { validation } from "../../shared/middlewares";

const paramsValidation = yup.object({
    id: yup.number().integer().required().moreThan(0),
  });
  
interface IParamsProps extends yup.InferType<typeof paramsValidation> {
    id:number;
  }


export const DeleteByIdValidation = validation((getSchema)=>({
    params:getSchema<IParamsProps>(paramsValidation),
}));



export const DeleteById= async (req:Request, res:Response) => {
  console.log(req.params);
  if(Number(req.params.id) === 99999) return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    errors:{
      default:'Registro não encontrado'
    }
  })

  res.status(StatusCodes.NO_CONTENT).send('Ainda não implementado');
};