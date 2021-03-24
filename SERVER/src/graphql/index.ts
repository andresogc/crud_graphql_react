import { GraphQLSchema } from "graphql";
import { mergeSchemas } from "graphql-tools";
import 'graphql-import-node';
import game from './schemas/game.graphql';
import character from './schemas/character.graphql';
import developer from './schemas/developer.graphql'
import {characterResolver} from './resolvers/character';
import {gameResolver} from './resolvers/game';
import {developerResolver} from './resolvers/developer';


export const schema: GraphQLSchema = mergeSchemas({
    schemas:[
        game,
        character,
        developer
    ],
    resolvers:[
        characterResolver,
        gameResolver,
        developerResolver
    ]
})