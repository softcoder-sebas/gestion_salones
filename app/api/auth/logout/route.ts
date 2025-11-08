import { NextResponse } from 'next/server'
import { clearSessionCookie } from '@/lib/auth'
import type { ApiResponse } from '@/lib/types'

export async function POST() {
  const response = NextResponse.json<ApiResponse<null>>({ success: true })
  clearSessionCookie(response)
  return response
}
