
import { Request, RequestHandler, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from 'yup'
import { validation } from "../../shared/middlewares";

const bodyValidation = yup.object({
    id: yup.number().optional().integer().moreThan(0),
    page: yup.number().optional().moreThan(0),
    limit: yup.number().optional().moreThan(0),
    filter: yup.string().optional(),
  });
  
interface IQueryProps extends yup.InferType<typeof bodyValidation> {
    id?:number;
    page?:number;
    limit?:number;
    filter?:string;
  }
  


export const getAllValidation = validation((getSchema)=>({
    query:getSchema<IQueryProps>(bodyValidation),
}));


export const getAll:RequestHandler  = async (req:Request<{},{},{},IQueryProps>, res:Response)=>{
    console.log(req.query)
    res.setHeader('access-control-expose-headers','x-total-count');
    res.setHeader('x-total-count',1)

    return res.status(StatusCodes.OK).json([
      {
        id:1,
        nome:'Maricá'
      }
    ])
};