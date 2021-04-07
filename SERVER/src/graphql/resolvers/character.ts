import { IResolvers  } from "graphql-tools";
import data from "../../data/data.json";
import {Db, ObjectId} from "mongodb";
import {CHARACTERS_COLLECTION, GAMES_COLLECTION} from '../../mongo/collections'
import { ICharacter } from "../../interfaces/ICharacters";

export const characterResolver:IResolvers = {
    Query:{
        async getCharacters(root:void, args:void, context: Db){
            try {
                return await context.collection(CHARACTERS_COLLECTION)
                .find()
                .toArray();
            } catch (error) {
                console.error();
            }
        },
        async getCharacter(root:void, args:any, context: Db){
            try {
                const found = await context.collection(CHARACTERS_COLLECTION)
                .findOne({_id: new ObjectId(args._id)})
                return found;
            } catch (error) {   
                console.error();
            }
            
        }
    },
    Mutation:{
        async createCharacter(root:void,args:any, context:Db ){
           try {
               const regexp = new RegExp(args.character.name, 'i');
               const exists = await context.collection(CHARACTERS_COLLECTION)
               .findOne({name: regexp});

               if (exists) {
                return 'Character already exists';   
               }

               await context.collection(CHARACTERS_COLLECTION).insertOne(args.character);
               return 'Character added successfuly';
           } catch (error) {
               console.error();
           }
        },
        async editCharacter(oot:void,{_id,character}:{_id:string, character:ICharacter}, context:Db){
            try {
                const exist = await context.collection(CHARACTERS_COLLECTION)
                .findOne({_id: new ObjectId(_id)});
                if(exist){
                    await context.collection(CHARACTERS_COLLECTION)
                    .updateOne(
                        {_id: new ObjectId(_id)},
                        {$set: character }
                    )
                    return 'Character updated'
                }
                throw new Error("Character does not exist");
            } catch (error) {
                console.log(error);
                return error.message;
            }
        }

    },
    Character:{
        async games(parent:ICharacter,args:void,context:Db) {

            const gameList = parent.games.map(async (gameId)=>
                await context.collection(GAMES_COLLECTION)
                .findOne({_id: new ObjectId(gameId)})
            )
            return gameList;
        }
    }
 }