import { execute, query } from './db'
import type { Room } from './types'

interface DBRoomRow {
  id: number
  code: string
  name: string
  location: string
  capacity: number
  resources: string | null
  default_subject_id: number | null
  default_teacher_id: number | null
  created_at: Date
  teacher_name?: string | null
  subject_name?: string | null
}

function mapRoom(row: DBRoomRow): Room {
  return {
    id: row.id,
    code: row.code,
    name: row.name,
    location: row.location,
    capacity: row.capacity,
    resources: row.resources,
    defaultSubjectId: row.default_subject_id,
    defaultTeacherId: row.default_teacher_id,
    defaultTeacherName: row.teacher_name ?? null,
    defaultSubjectName: row.subject_name ?? null,
  }
}

export async function listRooms(): Promise<Room[]> {
  const rows = await query<DBRoomRow>(
    `SELECT r.*, u.full_name AS teacher_name, s.name AS subject_name
     FROM rooms r
     LEFT JOIN users u ON u.id = r.default_teacher_id
     LEFT JOIN subjects s ON s.id = r.default_subject_id
     ORDER BY r.name`,
  )
  return rows.map(mapRoom)
}

export async function createRoom({
  code,
  name,
  location,
  capacity,
  resources,
  defaultSubjectId,
  defaultTeacherId,
}: {
  code: string
  name: string
  location: string
  capacity: number
  resources?: string | null
  defaultSubjectId?: number | null
  defaultTeacherId?: number | null
}) {
  await execute(
    `INSERT INTO rooms (code, name, location, capacity, resources, default_subject_id, default_teacher_id)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [code, name, location, capacity, resources ?? null, defaultSubjectId ?? null, defaultTeacherId ?? null],
  )
}

export async function updateRoom(
  id: number,
  {
    name,
    location,
    capacity,
    resources,
    defaultSubjectId,
    defaultTeacherId,
  }: {
    name?: string
    location?: string
    capacity?: number
    resources?: string | null
    defaultSubjectId?: number | null
    defaultTeacherId?: number | null
  },
) {
  await execute(
    `UPDATE rooms SET
      name = COALESCE(?, name),
      location = COALESCE(?, location),
      capacity = COALESCE(?, capacity),
      resources = COALESCE(?, resources),
      default_subject_id = ?,
      default_teacher_id = ?
     WHERE id = ?`,
    [name ?? null, location ?? null, capacity ?? null, resources ?? null, defaultSubjectId ?? null, defaultTeacherId ?? null, id],
  )
}

export async function deleteRoom(id: number) {
  await execute('DELETE FROM rooms WHERE id = ?', [id])
}
