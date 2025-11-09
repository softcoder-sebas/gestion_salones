import { z } from 'zod'
import type { ReservationStatus } from '@/lib/types'

export const validReservationStatuses: ReservationStatus[] = ['PENDING', 'APPROVED', 'REJECTED', 'CANCELLED']

export const datetimeLocalSchema = z
  .string()
  .min(1, 'La fecha y hora son obligatorias')
  .refine((value) => !Number.isNaN(new Date(value).getTime()), 'Fecha y hora inválidas')

export const reservationBodySchema = z.object({
  roomId: z.number().int().positive(),
  subjectId: z.number().int().positive().optional().nullable(),
  teacherId: z.number().int().positive().optional(),
  startTime: datetimeLocalSchema,
  endTime: datetimeLocalSchema,
  notes: z.string().max(255).optional().nullable(),
})

export function toMySqlDatetime(date: Date) {
  return date.toISOString().slice(0, 19).replace('T', ' ')
}
