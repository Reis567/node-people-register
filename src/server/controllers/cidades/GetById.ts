
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
  


export const getByIdValidation = validation((getSchema)=>({
    params:getSchema<IParamsProps>(paramsValidation),
}));


export const getById = async (req:Request<IParamsProps>, res:Response)=>{
    console.log(req.params)

    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Ainda não implementado')
};