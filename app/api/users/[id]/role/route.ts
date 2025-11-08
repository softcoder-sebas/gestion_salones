import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { requireUser } from '@/lib/auth';
import { updateUserRole } from '@/lib/users';
import type { ApiResponse, Role, User } from '@/lib/types';

const roleSchema = z.object({
  role: z.enum(['ADMIN', 'TEACHER', 'GUEST']),
})

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  const { user, response } = await requireUser(request, ['ADMIN'])
  if (!user) {
    return response
  }

  try {
    const body = await request.json()
    const parsed = roleSchema.safeParse(body)
    if (!parsed.success) {
      const message = parsed.error.errors.map((error) => error.message).join(', ')
      return NextResponse.json<ApiResponse<User>>({ success: false, error: message }, { status: 400 })
    }

    const updated = await updateUserRole(Number(params.id), parsed.data.role as Role)
    if (!updated) {
      return NextResponse.json<ApiResponse<User>>({ success: false, error: 'Usuario no encontrado' }, { status: 404 })
    }

    return NextResponse.json<ApiResponse<User>>({ success: true, data: updated })
  } catch (error) {
    console.error('Update role error', error)
    return NextResponse.json<ApiResponse<User>>({ success: false, error: 'No fue posible actualizar el rol' }, { status: 500 })
  }
}
