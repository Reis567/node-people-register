import {Knex} from "knex"
import path from 'path'


export const development:Knex.Config = {
    client:'sqlite3',
    useNullAsDefault:true,
    connection:{
        filename: path.resolve(__dirname,'..','..','..','..','database.sqlite')
    }
}

export const test:Knex.Config = {}

export const production:Knex.Config = {}