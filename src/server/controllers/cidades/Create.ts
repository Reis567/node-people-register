
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
  

const queryValidation = yup.object({
    filter: yup.string().min(3),
  });
  
interface IFilter extends yup.InferType<typeof queryValidation> {
    filter:string,
  }


export const createValidation = validation({
    body:bodyValidation,
    query:queryValidation
});


export const create:RequestHandler  = async (req:Request<{},{},ICidade>, res:Response)=>{
    console.log(req.body)

    return res.send(req.body)
};