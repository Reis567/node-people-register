import { RequestHandler } from "express"
import { ObjectSchema } from "yup";
import * as yup from 'yup'
import { StatusCodes } from "http-status-codes";

type TProperty = 'body'|'header'|'params'|'query';

type TAllSchemas = Record<TProperty,ObjectSchema<any>>

type TValidation = (schemas : Partial<TAllSchemas>) => RequestHandler;

export const validation:TValidation = (schemas) => async (req,res,next)=>{

        console.log(schemas)
        const errorsResult : Record<string, Record<string,string>> = {

        };



        Object.entries(schemas).forEach(([key,schema])=>{
            try {
                schema.validateSync(req[key as TProperty],{abortEarly:false});
            } catch (err) {
                const yupError = err as yup.ValidationError;
                const errors : Record<string,string> = {};
                
                yupError.inner.forEach(error=>{
                    if(error.path === undefined) return;
                    errors[error.path] = error.message
                })
                
                errorsResult[key]=errors
            }
        })

        if (Object.entries(errorsResult).length === 0) {
            
            return next()
        } else {
            
            return res.status(StatusCodes.BAD_REQUEST).json({
                errors:errorsResult
            })
        }
        
    }