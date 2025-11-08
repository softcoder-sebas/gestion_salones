import mysql from 'mysql2/promise'

const DEFAULT_POOL_SIZE = parseInt(process.env.DB_POOL_SIZE ?? '10', 10)

let pool: mysql.Pool | null = null

function createPool() {
  if (process.env.DATABASE_URL) {
    return mysql.createPool({
      uri: process.env.DATABASE_URL,
      waitForConnections: true,
      connectionLimit: DEFAULT_POOL_SIZE,
      namedPlaceholders: true,
    })
  }

  const host = process.env.DB_HOST ?? 'localhost'
  const port = parseInt(process.env.DB_PORT ?? '3306', 10)
  const user = process.env.DB_USER ?? 'root'
  const password = process.env.DB_PASSWORD ?? ''
  const database = process.env.DB_NAME ?? 'gestion_salones'

  return mysql.createPool({
    host,
    port,
    user,
    password,
    database,
    waitForConnections: true,
    connectionLimit: DEFAULT_POOL_SIZE,
    namedPlaceholders: true,
    timezone: 'Z',
    supportBigNumbers: true,
  })
}

export function getPool() {
  if (!pool) {
    pool = createPool()
  }
  return pool
}

export async function query<T = any>(sql: string, params: any[] | Record<string, any> = []): Promise<T[]> {
  const [rows] = await getPool().query<T[]>(sql, params)
  return rows
}

export async function execute(sql: string, params: any[] | Record<string, any> = []) {
  const [result] = await getPool().execute(sql, params)
  return result
}
