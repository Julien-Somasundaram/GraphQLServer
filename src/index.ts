import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { resolvers } from './resolvers.js';
import { TrackAPI } from './datasources/TrackAPI.js';
import {typeDefs} from './schema.js'
import { GhibliAPI } from './datasources/GhibliAPI.js';

// const typeDefs = `#graphql
//   type Doctor {
//     id: ID!
//     name: String
//     speciality: SPECIALITY
//     addresses: [Address]
//   }

//   type Address {
//     zipCode: String
//   }
 
//   type Query {
//     doctors(specialities:[SPECIALITY!]): [Doctor]
//     doctor(id: ID!): Doctor
//     divide(number1: Int!, number2: Int!): Float
//     getTracks: [Track!]!

//   }
 
//   enum SPECIALITY {
//     PSYCHOLOGIST
//     OPHTALMOLOGIST
//   }
//   type Track {
//     id: ID!
//     title: String!
//     author: Author!
//     thumbnail: String
//   }
//   type Author {
//   id: ID!
//   name: String!
//   photo: String
// }
// `;

// const resolvers = {
//   Query: {
//     doctors: (parent, args, context, info) => doctorsData,
//     doctor: (parent, args, context, info) => {
//       const id = args.id
//       return doctorsData.find(d => d.id === id)
//     },
//   },

//   Doctor: {
//     addresses: (parent, args, context, info) => {
//       return []
//     }
//   }
//  };

 
 const server = new ApolloServer({
  typeDefs,
  resolvers,
});
 
const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async () => {
    const cache = server.cache
    return {
      dataSources: {
        trackAPI: new TrackAPI({cache}),
        GhibliAPI: new GhibliAPI({cache})

      }
    }
  }
});
 
console.log(`🚀  Server ready at: ${url}`);