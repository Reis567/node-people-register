import { Router } from "express";
import {StatusCodes} from "http-status-codes"
import { CidadesController } from "../controllers";

const router = Router()


router.get("/",)

router.get("/cidades",CidadesController.getAllValidation,CidadesController.getAll);
router.get("/cidades/:id",CidadesController.getByIdValidation,CidadesController.getById);

router.post("/cidades",CidadesController.createValidation,CidadesController.create)


export {router};