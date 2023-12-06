import { Router } from "express";
import {StatusCodes} from "http-status-codes"
import { CidadesController } from "../controllers";

const router = Router()

//Base routes
router.get("/",)

//Read routes
router.get("/cidades",CidadesController.getAllValidation,CidadesController.getAll);
router.get("/cidades/:id",CidadesController.getByIdValidation,CidadesController.getById);


//Create routes
router.post("/cidades",CidadesController.createValidation,CidadesController.create)


//Update routes
router.put("/cidades/:id",CidadesController.UpdateByIdValidation,CidadesController.UpdateById)


export {router};