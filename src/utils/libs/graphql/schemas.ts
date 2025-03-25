// import {
//   GraphQLSchema,
//   GraphQLObjectType,
//   GraphQLList,
//   GraphQLNonNull,
//   GraphQLInt,
//   GraphQLString,
// } from 'graphql'
// import {
//   UserType,
//   InputCreateUser,
//   InputUpdateUser,
//   PostType,
//   InputCreatePost,
//   InputUpdatePost,
// } from './types'

// export const UserSchema = new GraphQLSchema({
//   query: new GraphQLObjectType({
//     name: 'Query',
//     fields: {
//       getUsers: { type: new GraphQLList(new GraphQLNonNull(UserType)) },
//     },
//   }),
//   mutation: new GraphQLObjectType({
//     name: 'Mutation',
//     fields: {
//       createUser: {
//         type: UserType,
//         args: {
//           user: {
//             type: InputCreateUser,
//           },
//         },
//       },
//       updateUser: {
//         type: UserType,
//         args: {
//           user: {
//             type: InputUpdateUser,
//           },
//         },
//       },
//       getUserById: {
//         type: UserType,
//         args: {
//           id: { type: GraphQLInt },
//         },
//       },
//       deleteUser: {
//         type: UserType,
//         args: {
//           id: { type: GraphQLInt },
//         },
//       },
//     },
//   }),
// })

// export const PostSchema = new GraphQLSchema({
//   query: new GraphQLObjectType({
//     name: 'Query',
//     fields: {
//       getPosts: { type: new GraphQLList(new GraphQLNonNull(PostType)) },
//     },
//   }),
//   mutation: new GraphQLObjectType({
//     name: 'Mutation',
//     fields: {
//       createPost: {
//         type: PostType,
//         args: {
//           post: {
//             type: InputCreatePost,
//           },
//         },
//       },
//       updatePost: {
//         type: PostType,
//         args: {
//           post: {
//             type: InputUpdatePost,
//           },
//         },
//       },
//       getPostById: {
//         type: PostType,
//         args: {
//           id: { type: GraphQLInt },
//         },
//       },

//       deletePost: {
//         type: PostType,
//         args: {
//           id: { type: GraphQLInt },
//         },
//       },

//       getPostsByTitle: {
//         type: new GraphQLList(new GraphQLNonNull(PostType)),
//         args: {
//           title: { type: GraphQLString },
//         },
//       },
//     },
//   }),
// })

// export type PostSchemaType = typeof PostSchema


// export const resolvers = {
//   Query: {
//     getPostsTest: (parent: unknown, args: unknown, context: unknown, info: unknown) => {
//       console.log('getPosts parent', parent)
//       console.log('getPosts args', args)
//       console.log('getPosts context', context)
//       console.log('getPosts info', info)
//       // const posts = await prisma.post.findMany()
//       // return users
//     },
//   }
// }