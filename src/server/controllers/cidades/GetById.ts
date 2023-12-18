
import { Request, RequestHandler, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from 'yup'
import { validation } from "../../shared/middlewares";
import { CidadesProvider } from "../../database/providers/cidades";

const paramsValidation = yup.object({
    id: yup.number().integer().required().moreThan(0),
  });
  
interface IParamsProps extends yup.InferType<typeof paramsValidation> {
    id:number;
  }
  


export const getByIdValidation = validation((getSchema)=>({
    params:getSchema<IParamsProps>(paramsValidation),
}));



export const getById: RequestHandler<{ id: string }> = async (req, res) => {
  if (!req.params.id){
    return res.status(StatusCodes.BAD_REQUEST).json({
      errors:{
        default:'O parâmetro "id" precisa ser informado ! '
      }
    });
    
  }

  const idNumber:number = parseInt(req.params.id)

  if (isNaN(idNumber)) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      errors: {
        default: 'O parâmetro "id" deve ser um número válido!',
      },
    });
  }

  const result = await CidadesProvider.getById(idNumber);

  if(result instanceof Error){
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors:{
        default:result.message
      }
    })
  }
  return res.status(StatusCodes.OK).json({
      result
  });
};