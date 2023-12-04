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
    let validatedData : ICidade | undefined = undefined;

    try {
        validatedData = await bodyValidation.validate(req.body)
    } catch (error) {
        console.log(error)
    }

    console.log(validatedData)
    return res.send(req.body)
};