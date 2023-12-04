import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from 'yup'

const bodyValidation = yup.object({
    nome: yup.string().required().min(3),
  });
  
interface ICidade extends yup.InferType<typeof bodyValidation> {
    nome:string,
  }

export const create = async (req:Request<{},{},ICidade>, res:Response)=>{
    let validatedData : ICidade | undefined = undefined;

    try {
        validatedData = await bodyValidation.validate(req.body,{abortEarly:false})
    } catch (err) {
        const yupError = err as yup.ValidationError;
        const errors : Record<string,string> = {};

        yupError.inner.forEach(error=>{
            if(error.path === undefined) return;
            errors[error.path] = error.message
        })

        return res.status(StatusCodes.BAD_REQUEST).json({
            errors:errors
        })
    }

    return res.send(req.body)
};