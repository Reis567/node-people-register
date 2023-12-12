
import { Request, RequestHandler, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from 'yup'
import { validation } from "../../shared/middlewares";
import { CidadesProvider } from "../../database/providers/cidades";

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
    const result = await CidadesProvider.getAll(req.query.page||1,req.query.limit||7 , req.query.filter|| '', Number(req.query.id));
    const count = await CidadesProvider.count(req.query.filter)



    return res.status(StatusCodes.OK).json([
      result 
    ])
};