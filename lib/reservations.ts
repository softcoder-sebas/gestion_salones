import { execute, query } from './db'
import type { Reservation, ReservationStatus } from './types'

interface DBReservationRow {
  id: number
  room_id: number
  start_time: Date
  end_time: Date
  status: ReservationStatus
  notes: string | null
  teacher_id: number
  subject_id: number | null
  approved_by: number | null
  created_at: Date
  updated_at: Date
  room_name: string
  teacher_name: string
  subject_name: string | null
  approver_name: string | null
}

function mapReservation(row: DBReservationRow): Reservation {
  return {
    id: row.id,
    roomId: row.room_id,
    roomName: row.room_name,
    teacherId: row.teacher_id,
    teacherName: row.teacher_name,
    subjectId: row.subject_id,
    subjectName: row.subject_name,
    status: row.status,
    startTime: row.start_time.toISOString(),
    endTime: row.end_time.toISOString(),
    notes: row.notes,
    approvedBy: row.approved_by,
    approvedByName: row.approver_name,
    createdAt: row.created_at.toISOString(),
    updatedAt: row.updated_at.toISOString(),
  }
}

export async function listReservations({
  teacherId,
  status,
  includeAll,
}: {
  teacherId?: number
  status?: ReservationStatus
  includeAll?: boolean
} = {}): Promise<Reservation[]> {
  const filters: string[] = []
  const params: any[] = []

  if (!includeAll && teacherId) {
    filters.push('r.teacher_id = ?')
    params.push(teacherId)
  }

  if (status) {
    filters.push('r.status = ?')
    params.push(status)
  }

  const where = filters.length ? `WHERE ${filters.join(' AND ')}` : ''

  const rows = await query<DBReservationRow>(
    `SELECT r.*, rm.name AS room_name, u.full_name AS teacher_name,
            s.name AS subject_name, approver.full_name AS approver_name
     FROM reservations r
     INNER JOIN rooms rm ON rm.id = r.room_id
     INNER JOIN users u ON u.id = r.teacher_id
     LEFT JOIN subjects s ON s.id = r.subject_id
     LEFT JOIN users approver ON approver.id = r.approved_by
     ${where}
     ORDER BY r.start_time DESC`,
    params,
  )

  return rows.map(mapReservation)
}

export async function getReservationById(reservationId: number): Promise<Reservation | null> {
  const rows = await query<DBReservationRow>(
    `SELECT r.*, rm.name AS room_name, u.full_name AS teacher_name,
            s.name AS subject_name, approver.full_name AS approver_name
     FROM reservations r
     INNER JOIN rooms rm ON rm.id = r.room_id
     INNER JOIN users u ON u.id = r.teacher_id
     LEFT JOIN subjects s ON s.id = r.subject_id
     LEFT JOIN users approver ON approver.id = r.approved_by
     WHERE r.id = ?
     LIMIT 1`,
    [reservationId],
  )

  if (!rows.length) {
    return null
  }

  return mapReservation(rows[0])
}

export async function createReservation({
  roomId,
  teacherId,
  subjectId,
  startTime,
  endTime,
  notes,
}: {
  roomId: number
  teacherId: number
  subjectId?: number | null
  startTime: string
  endTime: string
  notes?: string | null
}) {
  await execute(
    `INSERT INTO reservations (room_id, teacher_id, subject_id, start_time, end_time, notes)
     VALUES (?, ?, ?, ?, ?, ?)` ,
    [roomId, teacherId, subjectId ?? null, startTime, endTime, notes ?? null],
  )
}

export async function updateReservation({
  reservationId,
  roomId,
  subjectId,
  startTime,
  endTime,
  notes,
  teacherId,
}: {
  reservationId: number
  roomId: number
  subjectId?: number | null
  startTime: string
  endTime: string
  notes?: string | null
  teacherId?: number
}) {
  const updates = ['room_id = ?', 'subject_id = ?', 'start_time = ?', 'end_time = ?', 'notes = ?']
  const params: (number | string | null)[] = [roomId, subjectId ?? null, startTime, endTime, notes ?? null]

  if (typeof teacherId === 'number') {
    updates.push('teacher_id = ?')
    params.push(teacherId)
  }

  updates.push('updated_at = CURRENT_TIMESTAMP')

  await execute(
    `UPDATE reservations
     SET ${updates.join(', ')}
     WHERE id = ?`,
    [...params, reservationId],
  )
}

export async function updateReservationStatus({
  reservationId,
  status,
  approverId,
  notes,
}: {
  reservationId: number
  status: ReservationStatus
  approverId: number
  notes?: string | null
}) {
  if (typeof notes === 'undefined') {
    await execute(
      `UPDATE reservations
       SET status = ?, approved_by = ?, updated_at = CURRENT_TIMESTAMP
       WHERE id = ?`,
      [status, approverId, reservationId],
    )
  } else {
    await execute(
      `UPDATE reservations
       SET status = ?, approved_by = ?, notes = ?, updated_at = CURRENT_TIMESTAMP
       WHERE id = ?`,
      [status, approverId, notes, reservationId],
    )
  }
}

export async function cancelReservation(reservationId: number, userId: number) {
  await execute(
    `UPDATE reservations SET status = 'CANCELLED', approved_by = ?, updated_at = CURRENT_TIMESTAMP
     WHERE id = ? AND teacher_id = ?`,
    [userId, reservationId, userId],
  )
}

export async function deleteReservation(reservationId: number) {
  await execute('DELETE FROM reservations WHERE id = ?', [reservationId])
}
