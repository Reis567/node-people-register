
import { Request, RequestHandler, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from 'yup'
import { validation } from "../../shared/middlewares";

const bodyValidation = yup.object({
    page: yup.number().optional().moreThan(0),
    limit: yup.number().optional().moreThan(0),
    filter: yup.string().optional(),
  });
  
interface IQueryProps extends yup.InferType<typeof bodyValidation> {
    page?:number;
    limit?:number;
    filter?:string;
  }
  


export const getAllValidation = validation((getSchema)=>({
    query:getSchema<IQueryProps>(bodyValidation),
}));


export const getAll:RequestHandler  = async (req:Request<{},{},IQueryProps>, res:Response)=>{
    console.log(req.body)

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Ainda não implementado')
};