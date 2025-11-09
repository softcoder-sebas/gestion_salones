import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import { findUserById } from './users'
import type { Role, SessionPayload, User } from './types'

export const SESSION_COOKIE = 'umb_session'
const SESSION_MAX_AGE = 60 * 60 * 24 * 7 // 7 days

function getSecret() {
  const secret = process.env.AUTH_SECRET ?? process.env.NEXTAUTH_SECRET ?? 'development-secret'
  return secret
}

export function createSessionToken(user: { id: number; role: Role }) {
  const secret = getSecret()
  return jwt.sign({ sub: user.id, role: user.role }, secret, { expiresIn: SESSION_MAX_AGE })
}

export function setSessionCookie(response: NextResponse, token: string) {
  response.cookies.set({
    name: SESSION_COOKIE,
    value: token,
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: SESSION_MAX_AGE,
  })
}

export function clearSessionCookie(response: NextResponse) {
  response.cookies.set({
    name: SESSION_COOKIE,
    value: '',
    path: '/',
    maxAge: 0,
  })
}

function verifyToken(token: string): SessionPayload | null {
  try {
    const secret = getSecret()
    return jwt.verify(token, secret) as SessionPayload
  } catch (error) {
    return null
  }
}

export async function getSessionUser(request: NextRequest): Promise<User | null> {
  const token = request.cookies.get(SESSION_COOKIE)?.value
  if (!token) {
    return null
  }

  const payload = verifyToken(token)
  if (!payload) {
    return null
  }

  const dbUser = await findUserById(payload.sub)
  if (!dbUser) {
    return null
  }

  const createdAt =
    dbUser.created_at instanceof Date
      ? dbUser.created_at.toISOString()
      : new Date(dbUser.created_at).toISOString()

  return {
    id: dbUser.id,
    fullName: dbUser.full_name,
    email: dbUser.email,
    role: dbUser.role,
    department: dbUser.department,
    createdAt,
  }
}

export async function requireUser(request: NextRequest, roles?: Role[]) {
  const user = await getSessionUser(request)
  if (!user) {
    return {
      user: null,
      response: NextResponse.json({ success: false, error: 'No autorizado' }, { status: 401 }),
    }
  }

  if (roles && !roles.includes(user.role)) {
    return {
      user: null,
      response: NextResponse.json({ success: false, error: 'Permisos insuficientes' }, { status: 403 }),
    }
  }

  return { user, response: null as NextResponse | null }
}
