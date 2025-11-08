import { NextRequest, NextResponse } from 'next/server';
import { requireUser } from '@/lib/auth';
import { cancelReservation, deleteReservation } from '@/lib/reservations';
import type { ApiResponse } from '@/lib/types';

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
