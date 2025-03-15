import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLEnumType,
  GraphQLInputObjectType,
  GraphQLID,
  GraphQLInt,
} from 'graphql'

export const UserType = new GraphQLObjectType({
  name: 'User',
  fields: {
    id: { type: GraphQLID },
    username: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    role: {
      type: new GraphQLEnumType({
        name: 'UserType_ROLE',
        values: {
          superuser: { value: 'superuser' },
          admin: { value: 'admin' },
          reader: { value: 'reader' },
          editor: { value: 'editor' },
          tester: { value: 'tester' },
        },
      }),
    },
    created_at: { type: GraphQLString },
    updated_at: { type: GraphQLString },
  },
})

export const InputCreateUser = new GraphQLInputObjectType({
  name: 'InputCreateUser',
  fields: {
    username: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    role: {
      type: new GraphQLEnumType({
        name: 'InputCreateUser_ROLE',
        values: {
          superuser: { value: 'superuser' },
          admin: { value: 'admin' },
          reader: { value: 'reader' },
          editor: { value: 'editor' },
          tester: { value: 'tester' },
        },
      }),
    },
  },
})

export const InputUpdateUser = new GraphQLInputObjectType({
  name: 'InputUpdateUser',
  fields: {
    id: { type: GraphQLInt },
    username: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    role: {
      type: new GraphQLEnumType({
        name: 'InputUpdateUser_ROLE',
        values: {
          superuser: { value: 'superuser' },
          admin: { value: 'admin' },
          reader: { value: 'reader' },
          editor: { value: 'editor' },
          tester: { value: 'tester' },
        },
      }),
    },
  },
})
