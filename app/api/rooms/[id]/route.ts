import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { requireUser } from '@/lib/auth'
import { deleteRoom, updateRoom } from '@/lib/rooms'
import type { ApiResponse } from '@/lib/types'

const updateSchema = z.object({
  name: z.string().min(3).optional(),
  location: z.string().min(3).optional(),
  capacity: z.number().int().positive().optional(),
  resources: z.string().optional().nullable(),
  defaultSubjectId: z.number().int().positive().optional().nullable(),
  defaultTeacherId: z.number().int().positive().optional().nullable(),
})

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  const { user, response } = await requireUser(request, ['ADMIN'])
  if (!user) {
    return response
  }

  try {
    const body = await request.json()
    const parsed = updateSchema.safeParse(body)
    if (!parsed.success) {
      const message = parsed.error.errors.map((error) => error.message).join(', ')
      return NextResponse.json<ApiResponse<null>>({ success: false, error: message }, { status: 400 })
    }

    await updateRoom(Number(params.id), parsed.data)
    return NextResponse.json<ApiResponse<null>>({ success: true })
  } catch (error) {
    console.error('Update room error', error)
    return NextResponse.json<ApiResponse<null>>({ success: false, error: 'No fue posible actualizar el salón' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const { user, response } = await requireUser(request, ['ADMIN'])
  if (!user) {
    return response
  }

  try {
    await deleteRoom(Number(params.id))
    return NextResponse.json<ApiResponse<null>>({ success: true })
  } catch (error) {
    console.error('Delete room error', error)
    return NextResponse.json<ApiResponse<null>>({ success: false, error: 'No fue posible eliminar el salón' }, { status: 500 })
  }
}
