import { Knex } from "./server/database/knex";
import { server } from "./server/server";


const startServer = () =>{

    console.log(`http://localhost:${process.env.PORT || 3333}`)
    
    server.listen(process.env.PORT || 3333,()=>console.log(`App rodando na porta - ${process.env.PORT || 3333} `))
}


Knex.migrate.latest().then(()=>{
    startServer();
})