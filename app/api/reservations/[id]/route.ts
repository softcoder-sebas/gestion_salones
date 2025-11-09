import { NextRequest, NextResponse } from 'next/server'
import { requireUser } from '@/lib/auth'
import {
  cancelReservation,
  deleteReservation,
  getReservationById,
  updateReservation,
} from '@/lib/reservations'
import type { ApiResponse, Reservation } from '@/lib/types'
import { reservationBodySchema, toMySqlDatetime } from '@/lib/validation/reservation'

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const { user, response } = await requireUser(request, ['ADMIN', 'TEACHER'])
  if (!user) {
    return response
  }

  const reservationId = Number(params.id)
  if (Number.isNaN(reservationId)) {
    return NextResponse.json<ApiResponse<Reservation>>({ success: false, error: 'Identificador de reserva inválido' }, { status: 400 })
  }

  const reservation = await getReservationById(reservationId)
  if (!reservation) {
    return NextResponse.json<ApiResponse<Reservation>>({ success: false, error: 'Reserva no encontrada' }, { status: 404 })
  }

  if (user.role === 'TEACHER' && reservation.teacherId !== user.id) {
    return NextResponse.json<ApiResponse<Reservation>>({ success: false, error: 'No tienes permisos para consultar esta reserva' }, { status: 403 })
  }

  return NextResponse.json<ApiResponse<Reservation>>({ success: true, data: reservation })
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  const { user, response } = await requireUser(request, ['ADMIN', 'TEACHER'])
  if (!user) {
    return response
  }

  const reservationId = Number(params.id)
  if (Number.isNaN(reservationId)) {
    return NextResponse.json<ApiResponse<Reservation>>({ success: false, error: 'Identificador de reserva inválido' }, { status: 400 })
  }

  const existingReservation = await getReservationById(reservationId)
  if (!existingReservation) {
    return NextResponse.json<ApiResponse<Reservation>>({ success: false, error: 'Reserva no encontrada' }, { status: 404 })
  }

  if (user.role === 'TEACHER') {
    if (existingReservation.teacherId !== user.id) {
      return NextResponse.json<ApiResponse<Reservation>>({ success: false, error: 'No tienes permisos para editar esta reserva' }, { status: 403 })
    }
    if (existingReservation.status !== 'PENDING') {
      return NextResponse.json<ApiResponse<Reservation>>({ success: false, error: 'Solo puedes editar reservas pendientes' }, { status: 400 })
    }
  }

  try {
    const body = await request.json()
    const parsed = reservationBodySchema.safeParse(body)
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

    await updateReservation({
      reservationId,
      roomId: parsed.data.roomId,
      subjectId: parsed.data.subjectId ?? null,
      startTime: toMySqlDatetime(startDate),
      endTime: toMySqlDatetime(endDate),
      notes: parsed.data.notes ?? null,
      teacherId:
        user.role === 'ADMIN'
          ? parsed.data.teacherId ?? existingReservation.teacherId
          : undefined,
    })

    return NextResponse.json<ApiResponse<null>>({ success: true })
  } catch (error) {
    console.error('Update reservation error', error)
    return NextResponse.json<ApiResponse<Reservation>>({ success: false, error: 'No fue posible actualizar la reserva' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const { user, response } = await requireUser(request, ['ADMIN', 'TEACHER'])
  if (!user) {
    return response
  }

  const reservationId = Number(params.id)

  try {
    if (user.role === 'ADMIN') {
      await deleteReservation(reservationId)
    } else {
      await cancelReservation(reservationId, user.id)
    }

    return NextResponse.json<ApiResponse<null>>({ success: true })
  } catch (error) {
    console.error('Delete reservation error', error)
    return NextResponse.json<ApiResponse<null>>({ success: false, error: 'No fue posible cancelar la reserva' }, { status: 500 })
  }
}
