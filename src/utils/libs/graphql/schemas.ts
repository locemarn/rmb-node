import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLInt,
} from 'graphql'
import { UserType, InputCreateUser, InputUpdateUser } from './types'

export const UserSchema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: {
      getUsers: { type: new GraphQLList(new GraphQLNonNull(UserType)) },
    },
  }),
  mutation: new GraphQLObjectType({
    name: 'Mutation',
    fields: {
      createUser: {
        type: UserType,
        args: {
          user: {
            type: InputCreateUser,
          },
        },
      },
      updateUser: {
        type: UserType,
        args: {
          user: {
            type: InputUpdateUser,
          },
        },
      },
      getUserById: {
        type: UserType,
        args: {
          id: { type: GraphQLInt },
        },
      },
      deleteUser: {
        type: UserType,
        args: {
          id: { type: GraphQLInt },
        },
      },
    },
  }),
})
