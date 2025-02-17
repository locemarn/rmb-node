import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '@prisma/client'

const connectionString = `${process.env.DATABASE_URL}`

const pool: Pool = new Pool({
  connectionString,
  max: 5,
  idleTimeoutMillis: 5000,
})
const adapter: PrismaPg = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

// Error handling
prisma
  .$connect()
  .then(() => console.log('Successfully connected to the database'))
  .catch((error) => console.error('Failed to connect to the database:', error))

// Proper shutdown
process.on('SIGINT', async () => {
  await prisma.$disconnect()
  await pool.end()
  process.exit(0)
})

export default prisma
