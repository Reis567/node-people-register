
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
    const result = await CidadesProvider.getAll(req.query.page||1,req.query.limit||10 , req.query.filter|| '', Number(req.query.id));
    const count = await CidadesProvider.count(req.query.filter)


    if (result instanceof Error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        errors: { default: result.message }
      });
    } else if (count instanceof Error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        errors: { default: count.message }
      });
    }

    res.setHeader('access-control-expose-headers', 'x-total-count');
    res.setHeader('x-total-count', count);


    return res.status(StatusCodes.OK).json([
      result 
    ])
};