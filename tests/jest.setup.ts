import supertest from "supertest";
import { server } from "../src/server/server";
import { Knex } from "../src/server/database/knex";


beforeAll(async()=>{
    await Knex.migrate.latest();
});


export const testServer = supertest(server)