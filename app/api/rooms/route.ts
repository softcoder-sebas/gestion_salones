import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { requireUser } from '@/lib/auth'
import { createRoom, listRooms } from '@/lib/rooms'
import type { ApiResponse, Room } from '@/lib/types'

const roomSchema = z.object({
  code: z.string().min(2).max(45),
  name: z.string().min(3),
  location: z.string().min(3),
  capacity: z.number().int().positive(),
  resources: z.string().optional().nullable(),
  defaultSubjectId: z.number().int().positive().optional().nullable(),
  defaultTeacherId: z.number().int().positive().optional().nullable(),
})

export async function GET() {
  const rooms = await listRooms()
  return NextResponse.json<ApiResponse<Room[]>>({ success: true, data: rooms })
}

export async function POST(request: NextRequest) {
  const { user, response } = await requireUser(request, ['ADMIN'])
  if (!user) {
    return response
  }

  try {
    const body = await request.json()
    const parsed = roomSchema.safeParse(body)
    if (!parsed.success) {
      const message = parsed.error.errors.map((error) => error.message).join(', ')
      return NextResponse.json<ApiResponse<Room>>({ success: false, error: message }, { status: 400 })
    }

    await createRoom(parsed.data)
    return NextResponse.json<ApiResponse<null>>({ success: true }, { status: 201 })
  } catch (error) {
    console.error('Create room error', error)
    return NextResponse.json<ApiResponse<Room>>({ success: false, error: 'No fue posible crear el salón' }, { status: 500 })
  }
}
