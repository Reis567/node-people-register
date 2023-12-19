import { Router } from "express";
import { StatusCodes } from "http-status-codes";
import { CidadesController, PessoasController } from "../controllers";
import { UsuariosController } from "../controllers/usuarios";
import { ensureAuthenticated } from "../shared/middlewares";

const router = Router();

// Rota base
/**
 * @route GET /
 * @description Get information about the API
 * @access Public
 */
router.get("/", (req, res) => {
  res.status(StatusCodes.OK).json({ message: "API is running" });
});

// Rotas de Cidades
/**
 * @route GET /cidades
 * @description Get all cities
 * @access Private (requires authentication)
 */
router.get("/cidades", ensureAuthenticated, CidadesController.getAllValidation, CidadesController.getAll);

/**
 * @route GET /cidades/:id
 * @description Get city by ID
 * @access Private (requires authentication)
 */
router.get("/cidades/:id", ensureAuthenticated, CidadesController.getByIdValidation, CidadesController.getById);

/**
 * @route POST /cidades
 * @description Create a new city
 * @access Private (requires authentication)
 */
router.post("/cidades", ensureAuthenticated, CidadesController.createValidation, CidadesController.create);

/**
 * @route PUT /cidades/:id
 * @description Update city by ID
 * @access Private (requires authentication)
 */
router.put("/cidades/:id", ensureAuthenticated, CidadesController.UpdateByIdValidation, CidadesController.UpdateById);

/**
 * @route DELETE /cidades/:id
 * @description Delete city by ID
 * @access Private (requires authentication)
 */
router.delete("/cidades/:id", ensureAuthenticated, CidadesController.DeleteByIdValidation, CidadesController.DeleteById);

// Rotas de Pessoas
/**
 * @route GET /pessoas
 * @description Get all people
 * @access Private (requires authentication)
 */
router.get("/pessoas", ensureAuthenticated, PessoasController.getAllValidation, PessoasController.getAll);

/**
 * @route GET /pessoas/:id
 * @description Get person by ID
 * @access Private (requires authentication)
 */
router.get("/pessoas/:id", ensureAuthenticated, PessoasController.getByIdValidation, PessoasController.getById);

/**
 * @route POST /pessoas
 * @description Create a new person
 * @access Private (requires authentication)
 */
router.post("/pessoas", ensureAuthenticated, PessoasController.createValidation, PessoasController.create);

/**
 * @route PUT /pessoas/:id
 * @description Update person by ID
 * @access Private (requires authentication)
 */
router.put("/pessoas/:id", ensureAuthenticated, PessoasController.updateByIdValidation, PessoasController.updateById);

/**
 * @route DELETE /pessoas/:id
 * @description Delete person by ID
 * @access Private (requires authentication)
 */
router.delete("/pessoas/:id", ensureAuthenticated, PessoasController.deleteByIdValidation, PessoasController.deleteById);

/// Rotas de autenticação

/**
 * @route POST /cadastrar
 * @description Register a new user
 * @access Public
 */
router.post('/cadastrar', UsuariosController.signupValidation, UsuariosController.signup);

/**
 * @route POST /entrar
 * @description Login
 * @access Public
 */
router.post('/entrar', UsuariosController.signinValidation, UsuariosController.signin);

export { router };
