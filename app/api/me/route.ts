import { NextRequest, NextResponse } from 'next/server'
import { getSessionUser, requireUser } from '@/lib/auth'
import { updateUserProfile } from '@/lib/users'
import type { ApiResponse, User } from '@/lib/types'
import { z } from 'zod'

export async function GET(request: NextRequest) {
  const user = await getSessionUser(request)
  if (!user) {
    return NextResponse.json<ApiResponse<User>>({ success: false, error: 'Sesión no encontrada' }, { status: 401 })
  }

  return NextResponse.json<ApiResponse<User>>({ success: true, data: user })
}

const profileSchema = z.object({
  fullName: z.string().min(3).max(120).optional(),
  department: z.string().min(2).max(120).optional().nullable(),
})

export async function PATCH(request: NextRequest) {
  const { user, response } = await requireUser(request)
  if (!user) {
    return response
  }

  try {
    const body = await request.json()
    const parsed = profileSchema.safeParse(body)
    if (!parsed.success) {
      const message = parsed.error.errors.map((error) => error.message).join(', ')
      return NextResponse.json<ApiResponse<User>>({ success: false, error: message }, { status: 400 })
    }

    const updated = await updateUserProfile(user.id, parsed.data)
    return NextResponse.json<ApiResponse<User>>({ success: true, data: updated ?? user })
  } catch (error) {
    console.error('Update profile error', error)
    return NextResponse.json<ApiResponse<User>>({ success: false, error: 'No fue posible actualizar el perfil' }, { status: 500 })
  }
}
