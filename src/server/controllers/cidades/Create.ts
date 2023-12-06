
import { Request, RequestHandler, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from 'yup'
import { validation } from "../../shared/middlewares";

const bodyValidation = yup.object({
    nome: yup.string().required().min(3),
  });
  
interface ICidade extends yup.InferType<typeof bodyValidation> {
    nome:string,
  }
  


export const createValidation = validation((getSchema)=>({
    body:getSchema<ICidade>(bodyValidation),
}));


export const create:RequestHandler  = async (req:Request<{},{},ICidade>, res:Response)=>{
    console.log(req.body)

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Ainda não implementado')
};