import { NextRequest, NextResponse } from 'next/server';
import { requireUser } from '@/lib/auth';
import { listUsers } from '@/lib/users';
import type { ApiResponse, User } from '@/lib/types';

export async function GET(request: NextRequest) {
  const { user, response } = await requireUser(request, ['ADMIN'])
  if (!user) {
    return response
  }

  const users = await listUsers()
  return NextResponse.json<ApiResponse<User[]>>({ success: true, data: users })
}
