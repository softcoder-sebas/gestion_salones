import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { createSessionToken, setSessionCookie } from '@/lib/auth'
import { verifyPassword } from '@/lib/passwords'
import { findUserByEmail } from '@/lib/users'
import type { ApiResponse, User } from '@/lib/types'

const loginSchema = z.object({
  email: z.string().email('Correo inválido'),
  password: z.string().min(6, 'Contraseña obligatoria'),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const parsed = loginSchema.safeParse(body)

    if (!parsed.success) {
      const message = parsed.error.errors.map((error) => error.message).join(', ')
      return NextResponse.json<ApiResponse<User>>({ success: false, error: message }, { status: 400 })
    }

    const email = parsed.data.email.trim().toLowerCase()
    const userRecord = await findUserByEmail(email)
    if (!userRecord) {
      return NextResponse.json<ApiResponse<User>>({ success: false, error: 'Credenciales inválidas' }, { status: 401 })
    }

    const validPassword = verifyPassword(parsed.data.password, userRecord.password)
    if (!validPassword) {
      return NextResponse.json<ApiResponse<User>>({ success: false, error: 'Credenciales inválidas' }, { status: 401 })
    }

    const createdAt =
      userRecord.created_at instanceof Date
        ? userRecord.created_at.toISOString()
        : new Date(userRecord.created_at).toISOString()

    const user: User = {
      id: userRecord.id,
      fullName: userRecord.full_name,
      email: userRecord.email,
      role: userRecord.role,
      department: userRecord.department,
      createdAt,
    }

    const response = NextResponse.json<ApiResponse<User>>({ success: true, data: user })
    const token = createSessionToken({ id: user.id, role: user.role })
    setSessionCookie(response, token)

    return response
  } catch (error) {
    console.error('Login error', error)
    return NextResponse.json<ApiResponse<User>>({ success: false, error: 'No fue posible iniciar sesión' }, { status: 500 })
  }
}
