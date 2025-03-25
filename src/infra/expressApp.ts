/* eslint-disable @typescript-eslint/no-explicit-any */
import express, { NextFunction, Response, Request } from 'express'
const app = express()
import config from './configs'
import userRouter from '../modules/user/infra/api/user.router'
import authRouter from '../modules/auth/infra/api/login.router'
import cors from 'cors'
import postRouter from '../modules/post/infra/api/post.router'

import gql from "graphql-tag";
import { ApolloServer } from '@apollo/server';
import { buildSubgraphSchema } from '@apollo/subgraph';
import { expressMiddleware } from '@apollo/server/express4';
import { readFileSync } from "fs";

import { resolvers } from '../utils/libs/graphql/resolvers'

const prefixRoute = config.route.prefix
const graphqlPrefixRoute = config.route.graphqlPrefix
// const graphqlPostController = new GraphqlPostController()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.get('/', (req: Request, res: Response): any => {
  return res.status(200).json({
    message: 'everything works well.',
  })
})

// Routes
app.use(`${prefixRoute}/users`, userRouter)
app.use(`${prefixRoute}/auth/login`, authRouter)
app.use(`${prefixRoute}/posts`, postRouter)

const typeDefs = gql(
  readFileSync("./src/domain/schemas/schema.graphql", {
    encoding: "utf-8",
  })
);

export const server = new ApolloServer({
  schema: buildSubgraphSchema({
    typeDefs,
    resolvers,
  }),
  formatError: (formattedError) => {
    return formattedError;
  }
});

export const startExpressServer = async () => {
  await server.start();  
  app.use(
    `${graphqlPrefixRoute}`,
    cors(),
    express.json(),
    expressMiddleware(server) as unknown as express.RequestHandler,
  );
};

// check errors
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack)
  res.status(500).send({ error: true, message: err })
  next(err)
})

export default app

