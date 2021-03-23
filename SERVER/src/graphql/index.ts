import { GraphQLSchema } from "graphql";
import { mergeSchemas } from "graphql-tools";
import 'graphql-import-node';
import game from './schemas/game.graphql';
import character from './schemas/character.graphql';

import {characterResolver} from './resolvers/character';
import {gameResolver} from './resolvers/game';


export const schema: GraphQLSchema = mergeSchemas({
    schemas:[
        game,
        character
    ],
    resolvers:[
        characterResolver,
        gameResolver
    ]
})