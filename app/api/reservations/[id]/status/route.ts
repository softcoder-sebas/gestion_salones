import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { requireUser } from '@/lib/auth';
import { updateReservationStatus } from '@/lib/reservations';
import type { ApiResponse, ReservationStatus } from '@/lib/types';

const statusSchema = z.object({
  status: z.enum(['PENDING', 'APPROVED', 'REJECTED', 'CANCELLED']),
  notes: z.string().max(255).optional().nullable(),
})

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { user, response } = await requireUser(request, ['ADMIN'])
  if (!user) {
    return response
  }

  try {
    const { id } = await params
    const body = await request.json()
    const parsed = statusSchema.safeParse(body)
    if (!parsed.success) {
      const message = parsed.error.errors.map((error) => error.message).join(', ')
      return NextResponse.json<ApiResponse<null>>({ success: false, error: message }, { status: 400 })
    }

    await updateReservationStatus({
      reservationId: Number(id),
      status: parsed.data.status as ReservationStatus,
      approverId: user.id,
      notes: parsed.data.notes ?? null,
    })

    return NextResponse.json<ApiResponse<null>>({ success: true })
  } catch (error) {
    console.error('Update reservation status error', error)
    return NextResponse.json<ApiResponse<null>>({ success: false, error: 'No fue posible actualizar el estado' }, { status: 500 })
  }
}
