import { server } from "./server/server";


console.log(`http://localhost:${process.env.PORT || 3333}`)

server.listen(process.env.PORT || 3333,()=>console.log(`App rodando na porta - ${process.env.PORT || 3333} `))