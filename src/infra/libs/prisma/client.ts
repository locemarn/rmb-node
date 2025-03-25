import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '@prisma/client'
import config from '../../configs'

const connectionString = config.db.db_url?.toString()

const pool = new Pool({ connectionString })

const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({
  adapter,
  log: ['info'],
  errorFormat: 'pretty',
})

export default prisma as PrismaClient
