import { execute, query } from './db'
import type { Role, User } from './types'

interface DBUserRow {
  id: number
  full_name: string
  email: string
  role: Role
  department: string | null
  created_at: Date
  password: string
}

function mapUser(row: DBUserRow): User {
  return {
    id: row.id,
    fullName: row.full_name,
    email: row.email,
    role: row.role,
    department: row.department,
    createdAt: row.created_at.toISOString(),
  }
}

export async function findUserByEmail(email: string) {
  const rows = await query<DBUserRow>('SELECT * FROM users WHERE email = ?', [email])
  return rows.length ? rows[0] : null
}

export async function findUserById(id: number) {
  const rows = await query<DBUserRow>('SELECT * FROM users WHERE id = ?', [id])
  return rows.length ? rows[0] : null
}

export async function listUsers(): Promise<User[]> {
  const rows = await query<DBUserRow>('SELECT * FROM users ORDER BY created_at DESC')
  return rows.map(mapUser)
}

export async function listTeachers(): Promise<User[]> {
  const rows = await query<DBUserRow>("SELECT * FROM users WHERE role = 'TEACHER' ORDER BY full_name")
  return rows.map(mapUser)
}

export async function createUser({
  fullName,
  email,
  password,
  role,
  department,
}: {
  fullName: string
  email: string
  password: string
  role: Role
  department?: string | null
}): Promise<User> {
  const result = await execute(
    'INSERT INTO users (full_name, email, password, role, department) VALUES (?, ?, ?, ?, ?)',
    [fullName, email, password, role, department ?? null],
  )

  const insertId = (result as any).insertId as number
  const user = await findUserById(insertId)
  if (!user) {
    throw new Error('Unable to load created user')
  }
  return mapUser(user)
}

export async function updateUserRole(id: number, role: Role) {
  await execute('UPDATE users SET role = ? WHERE id = ?', [role, id])
  const updated = await findUserById(id)
  return updated ? mapUser(updated) : null
}

export async function updateUserProfile(id: number, {
  fullName,
  department,
}: {
  fullName?: string
  department?: string | null
}) {
  await execute(
    'UPDATE users SET full_name = COALESCE(?, full_name), department = COALESCE(?, department) WHERE id = ?',
    [fullName ?? null, department ?? null, id],
  )
  const updated = await findUserById(id)
  return updated ? mapUser(updated) : null
}

export async function getPassword(id: number) {
  const rows = await query<Pick<DBUserRow, 'password'>>('SELECT password FROM users WHERE id = ?', [id])
  return rows.length ? rows[0].password : null
}
