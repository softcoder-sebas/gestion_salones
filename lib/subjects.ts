import { execute, query } from './db'
import type { Subject } from './types'

interface DBSubjectRow {
  id: number
  code: string
  name: string
  description: string | null
  created_at: Date
}

function mapSubject(row: DBSubjectRow): Subject {
  return {
    id: row.id,
    code: row.code,
    name: row.name,
    description: row.description,
  }
}

export async function listSubjects(): Promise<Subject[]> {
  const rows = await query<DBSubjectRow>('SELECT * FROM subjects ORDER BY name')
  return rows.map(mapSubject)
}

export async function createSubject({ code, name, description }: { code: string; name: string; description?: string | null }) {
  await execute('INSERT INTO subjects (code, name, description) VALUES (?, ?, ?)', [code, name, description ?? null])
}

export async function updateSubject(id: number, { name, description }: { name?: string; description?: string | null }) {
  await execute('UPDATE subjects SET name = COALESCE(?, name), description = COALESCE(?, description) WHERE id = ?', [name ?? null, description ?? null, id])
}
