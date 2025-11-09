import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { createUser, findUserByEmail } from '@/lib/users'
import { createSessionToken, setSessionCookie } from '@/lib/auth'
import type { ApiResponse, User } from '@/lib/types'

const registerSchema = z.object({
  fullName: z.string().min(3, 'El nombre es obligatorio'),
  email: z.string().email('Correo electrónico inválido'),
  password: z.string().min(8, 'La contraseña debe tener al menos 8 caracteres'),
  department: z.string().min(2).max(120).optional().nullable(),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const parsed = registerSchema.safeParse(body)

    if (!parsed.success) {
      const message = parsed.error.errors.map((error) => error.message).join(', ')
      return NextResponse.json<ApiResponse<User>>({ success: false, error: message }, { status: 400 })
    }

    const fullName = parsed.data.fullName.trim()
    const email = parsed.data.email.trim().toLowerCase()
    const department = parsed.data.department?.trim() ?? null

    const existing = await findUserByEmail(email)
    if (existing) {
      return NextResponse.json<ApiResponse<User>>({ success: false, error: 'El correo ya está registrado' }, { status: 409 })
    }

    const user = await createUser({
      fullName,
      email,
      password: parsed.data.password,
      department,
      role: 'TEACHER',
    })

    const response = NextResponse.json<ApiResponse<User>>({ success: true, data: user }, { status: 201 })
    const token = createSessionToken({ id: user.id, role: user.role })
    setSessionCookie(response, token)
    return response
  } catch (error) {
    console.error('Register error', error)
    return NextResponse.json<ApiResponse<User>>({ success: false, error: 'No fue posible registrar al profesor' }, { status: 500 })
  }
}
