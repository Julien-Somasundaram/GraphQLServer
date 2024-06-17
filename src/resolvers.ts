import { GraphQLError } from "graphql";

import { Resolvers, Speciality } from "./types.js"
import { createUser } from "./mutations/user/createUser.js";

const doctorsData = [
    {
      id: '1',
      name: 'Samia Mekame',
      speciality: Speciality.Ophtalmologist,
    },
    {
      id: '2',
      name: 'Catherine Bedoy',
      speciality: Speciality.Psychologist,
    },
  ];

export const resolvers:Resolvers = {
  Query: {
    doctors: (parent, args, context, info) => {
      const {specialities} = args
      return doctorsData.filter(doctor => (specialities ?? []).includes(doctor.speciality))
    },
    doctor: (parent, args, context, info) => {
      const id = args.id
      return doctorsData.find(d => d.id === id) ?? null
    },
    divide: (parent, args, context, info) => {
        const { number1, number2 } = args
        if (number2 === 0) {
            throw new GraphQLError('Cannot divide by zero')
        }
        return number1 / number2
    },
    getTracks: (parent,args, {dataSources}, info) => {
        return dataSources.trackAPI.getTracks()
        },

    getFilms: (parent,args,{dataSources},info) => {
        return dataSources.GhibliAPI.getFilms()
    },
    getPeople: (parent,args,{dataSources},info) => {
        return dataSources.GhibliAPI.getPeoples()
    }
    },
    Mutation: {
      async incrementTrackLikes(_, {id}, context, info) {
        try {
          const track = await context.dataSources.trackAPI.incrementTrackLikes(id)
          const message = `Successfully incremented number of Likes for track ${id}`
    
          return {
            code: 200,
            message,
            success: Boolean(track),
            track,
          }
        } catch(err) {
          return {
            code: 304,
            message: (err as Error)?.message ?? 'Resource not modified, an internal error occured',
            success: false,
            track: null,
          }
        }
      },
      createUser: createUser
    },
    

  
    Doctor: {
      addresses: (parent, args, context, info) => {
        return []
      }
    },
    Track: {
        author: (parent, args, {dataSources},info) => {
          return dataSources.trackAPI.getAuthorBy(parent.authorId)  
        }
      },
    Film: {
        people: (parent, args, {dataSources},info) => {
            return dataSources.GhibliAPI.getPeopleBy(parent.people) 
        }
    },
    People: {
      films: (parent, args, {dataSources},info) => {
          return dataSources.GhibliAPI.getFilmBy(parent.films) 
      }
  }
   };
  