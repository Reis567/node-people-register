import { Router } from "express";
import {StatusCodes} from "http-status-codes"

const router = Router()


router.get("/",(req,res) => {

    return res.send("Botafogo de futebol e Regatas" )
    
})

router.post("/create",(req,res) => {

    console.log(req.body)
    return res.json(req.body )
    
})


export {router}