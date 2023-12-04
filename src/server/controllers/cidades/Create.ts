import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from 'yup'

const bodyValidation = yup.object({
    nome: yup.string().required().min(3),
  });
  
interface ICidade extends yup.InferType<typeof bodyValidation> {
    nome:string
  }

export const create = async (req:Request<{},{},ICidade>, res:Response)=>{

    try {
        await bodyValidation.validate(req.body)
    } catch (error) {
        console.log(error)
    }

    console.log(req.body.nome)
    return res.send(req.body)
};