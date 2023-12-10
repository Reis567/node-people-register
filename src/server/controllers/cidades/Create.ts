
import { Request, RequestHandler, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from 'yup'
import { validation } from "../../shared/middlewares";
import { ICidade } from "../../database/models";


const bodyValidation = yup.object({
    nome: yup.string().required().min(3),
  });

interface IBodyProps extends Omit<ICidade,'id'>{ }
  


export const createValidation = validation((getSchema)=>({
    body:getSchema<IBodyProps>(bodyValidation),
}));


export const create:RequestHandler  = async (req:Request<{},{},IBodyProps>, res:Response)=>{
    console.log(req.body)

    return res.status(StatusCodes.CREATED).json(1);
};