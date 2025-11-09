import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { requireUser } from '@/lib/auth';
import { createReservation, listReservations } from '@/lib/reservations';
import type { ApiResponse, Reservation, ReservationStatus } from '@/lib/types';

const datetimeLocalSchema = z
  .string()
  .min(1, 'La fecha y hora son obligatorias')
  .refine((value) => !Number.isNaN(new Date(value).getTime()), 'Fecha y hora inválidas')

const reservationSchema = z.object({
  roomId: z.number().int().positive(),
  subjectId: z.number().int().positive().optional().nullable(),
  teacherId: z.number().int().positive().optional(),
  startTime: datetimeLocalSchema,
  endTime: datetimeLocalSchema,
  notes: z.string().max(255).optional().nullable(),
})

const validStatuses: ReservationStatus[] = ['PENDING', 'APPROVED', 'REJECTED', 'CANCELLED']

function toMySqlDatetime(date: Date) {
  return date.toISOString().slice(0, 19).replace('T', ' ')
}

export async function GET(request: NextRequest) {
  const { user, response } = await requireUser(request, ['ADMIN', 'TEACHER'])
  if (!user) {
    return response
  }

  const { searchParams } = new URL(request.url)
  const statusParam = searchParams.get('status') as ReservationStatus | null
  const status = statusParam && validStatuses.includes(statusParam) ? statusParam : undefined

  const reservations = await listReservations({
    teacherId: user.role === 'TEACHER' ? user.id : undefined,
    status,
    includeAll: user.role === 'ADMIN',
  })

  return NextResponse.json<ApiResponse<Reservation[]>>({ success: true, data: reservations })
}

export async function POST(request: NextRequest) {
  const { user, response } = await requireUser(request, ['ADMIN', 'TEACHER'])
  if (!user) {
    return response
  }

  try {
    const body = await request.json()
    const parsed = reservationSchema.safeParse(body)
    if (!parsed.success) {
      const message = parsed.error.errors.map((error) => error.message).join(', ')
      return NextResponse.json<ApiResponse<Reservation>>({ success: false, error: message }, { status: 400 })
    }

    const startDate = new Date(parsed.data.startTime)
    const endDate = new Date(parsed.data.endTime)
    if (Number.isNaN(startDate.getTime()) || Number.isNaN(endDate.getTime())) {
      return NextResponse.json<ApiResponse<Reservation>>({ success: false, error: 'Fechas inválidas' }, { status: 400 })
    }
    if (startDate >= endDate) {
      return NextResponse.json<ApiResponse<Reservation>>({ success: false, error: 'La fecha de inicio debe ser menor que la fecha fin' }, { status: 400 })
    }

    await createReservation({
      roomId: parsed.data.roomId,
      teacherId: user.role === 'ADMIN' && parsed.data.teacherId ? parsed.data.teacherId : user.id,
      subjectId: parsed.data.subjectId ?? null,
      startTime: toMySqlDatetime(startDate),
      endTime: toMySqlDatetime(endDate),
      notes: parsed.data.notes ?? null,
    })

    return NextResponse.json<ApiResponse<null>>({ success: true }, { status: 201 })
  } catch (error) {
    console.error('Create reservation error', error)
    return NextResponse.json<ApiResponse<Reservation>>({ success: false, error: 'No fue posible registrar la reserva' }, { status: 500 })
  }
}
