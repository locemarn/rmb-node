// import {
//   GraphQLObjectType,
//   GraphQLString,
//   GraphQLEnumType,
//   GraphQLInputObjectType,
//   GraphQLID,
//   GraphQLInt,
//   GraphQLBoolean,
//   GraphQLList,
//   GraphQLNonNull,
// } from 'graphql'

// export const UserType = new GraphQLObjectType({
//   name: 'User',
//   fields: {
//     id: { type: GraphQLID },
//     username: { type: GraphQLString },
//     email: { type: GraphQLString },
//     password: { type: GraphQLString },
//     role: {
//       type: new GraphQLEnumType({
//         name: 'UserType_ROLE',
//         values: {
//           superuser: { value: 'superuser' },
//           admin: { value: 'admin' },
//           reader: { value: 'reader' },
//           editor: { value: 'editor' },
//           tester: { value: 'tester' },
//         },
//       }),
//     },
//     created_at: { type: GraphQLString },
//     updated_at: { type: GraphQLString },
//   },
// })

// export const InputCreateUser = new GraphQLInputObjectType({
//   name: 'InputCreateUser',
//   fields: {
//     username: { type: GraphQLString },
//     email: { type: GraphQLString },
//     password: { type: GraphQLString },
//     role: {
//       type: new GraphQLEnumType({
//         name: 'InputCreateUser_ROLE',
//         values: {
//           superuser: { value: 'superuser' },
//           admin: { value: 'admin' },
//           reader: { value: 'reader' },
//           editor: { value: 'editor' },
//           tester: { value: 'tester' },
//         },
//       }),
//     },
//   },
// })

// export const InputUpdateUser = new GraphQLInputObjectType({
//   name: 'InputUpdateUser',
//   fields: {
//     id: { type: GraphQLInt },
//     username: { type: GraphQLString },
//     email: { type: GraphQLString },
//     password: { type: GraphQLString },
//     role: {
//       type: new GraphQLEnumType({
//         name: 'InputUpdateUser_ROLE',
//         values: {
//           superuser: { value: 'superuser' },
//           admin: { value: 'admin' },
//           reader: { value: 'reader' },
//           editor: { value: 'editor' },
//           tester: { value: 'tester' },
//         },
//       }),
//     },
//   },
// })

// export const PostType = new GraphQLObjectType({
//   name: 'Post',
//   fields: {
//     id: { type: GraphQLID },
//     title: { type: GraphQLString },
//     content: { type: GraphQLString },
//     authorId: { type: GraphQLInt }, 
//     published: { type: GraphQLBoolean },
//     categoryId: { type: new GraphQLList(new GraphQLNonNull(GraphQLInt)) },
//     created_at: { type: GraphQLString },
//     updated_at: { type: GraphQLString },
//   },
// })

// export const InputCreatePost = new GraphQLInputObjectType({
//   name: 'InputCreatePost',
//   fields: {
//     title: { type: GraphQLString },
//     content: { type: GraphQLString },
//     published: { type: GraphQLBoolean },
//     authorId: { type: GraphQLInt },
//     categoryId: { type: new GraphQLList(new GraphQLNonNull(GraphQLInt)) },
//   },
// })

// export const InputUpdatePost = new GraphQLInputObjectType({
//   name: 'InputUpdatePost',
//   fields: {
//     id: { type: GraphQLInt },
//     title: { type: GraphQLString },
//     content: { type: GraphQLString },
//     authorId: { type: GraphQLInt },
//     categoryId: { type: GraphQLInt },
//     published: { type: GraphQLBoolean },
//   },
// })
