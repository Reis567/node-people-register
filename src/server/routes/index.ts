import { Router } from "express";
import {StatusCodes} from "http-status-codes"
import { CidadesController, PessoasController } from "../controllers";
import { UsuariosController } from "../controllers/usuarios";
import { ensureAuthenticated } from "../shared/middlewares";

const router = Router()

//Base routes
router.get("/",)

// Rotas de Cidades

//Read routes
router.get("/cidades",ensureAuthenticated,CidadesController.getAllValidation,CidadesController.getAll);
router.get("/cidades/:id",ensureAuthenticated,CidadesController.getByIdValidation,CidadesController.getById);
//Create routes
router.post("/cidades",ensureAuthenticated,CidadesController.createValidation,CidadesController.create)
//Update routes
router.put("/cidades/:id",ensureAuthenticated,CidadesController.UpdateByIdValidation,CidadesController.UpdateById)
//Delete routes
router.delete("/cidades/:id",ensureAuthenticated,CidadesController.DeleteByIdValidation,CidadesController.DeleteById)

// Rotas de Pessoas

//Read routes
router.get("/pessoas",ensureAuthenticated,PessoasController.getAllValidation,PessoasController.getAll);
router.get("/pessoas/:id",ensureAuthenticated,PessoasController.getByIdValidation,PessoasController.getById);
//Create routes
router.post("/pessoas",ensureAuthenticated,PessoasController.createValidation,PessoasController.create)
//Update routes
router.put("/pessoas/:id",ensureAuthenticated,PessoasController.updateByIdValidation,PessoasController.updateById)
//Delete routes
router.delete("/pessoas/:id",ensureAuthenticated,PessoasController.deleteByIdValidation,PessoasController.deleteById)


/// Rotas de autenticação

//Register
router.post('/cadastrar',UsuariosController.signupValidation,UsuariosController.signup)

//Login 
router.post('/entrar',UsuariosController.signinValidation,UsuariosController.signin)

export {router};