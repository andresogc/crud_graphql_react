import express from "express";
import cors from 'cors';
import {ApolloServer} from 'apollo-server-express';
import { schema} from './graphql';
import MongoLib from './mongo';
import config from './config';
const app = express();

app.use(cors());

const server = new ApolloServer({
    schema,
    playground:true,
    introspection:true,
    context:async()=> new MongoLib().connect() //para cunado se inicie el servidor de graphql nos pngen context la isntancia de mongolib que esta coenctada a la base de datos
});

server.applyMiddleware({ app });

app.listen(5000, ()=>{
    console.log(`http://localhost:${config.port}/graphql`);
})