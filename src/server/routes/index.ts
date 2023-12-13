import { Router } from "express";
import {StatusCodes} from "http-status-codes"
import { CidadesController, PessoasController } from "../controllers";

const router = Router()

//Base routes
router.get("/",)

// Rotas de Cidades

//Read routes
router.get("/cidades",CidadesController.getAllValidation,CidadesController.getAll);
router.get("/cidades/:id",CidadesController.getByIdValidation,CidadesController.getById);
//Create routes
router.post("/cidades",CidadesController.createValidation,CidadesController.create)
//Update routes
router.put("/cidades/:id",CidadesController.UpdateByIdValidation,CidadesController.UpdateById)
//Delete routes
router.delete("/cidades/:id",CidadesController.DeleteByIdValidation,CidadesController.DeleteById)

// Rotas de Pessoas

//Read routes
router.get("/pessoas",PessoasController.getAllValidation,PessoasController.getAll);
router.get("/pessoas/:id",PessoasController.getByIdValidation,PessoasController.getById);
//Create routes
router.post("/pessoas",PessoasController.createValidation,PessoasController.create)

export {router};