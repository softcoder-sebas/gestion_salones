import { NextRequest, NextResponse } from 'next/server';
import { requireUser } from '@/lib/auth';
import { listTeachers } from '@/lib/users';
import type { ApiResponse, User } from '@/lib/types';

export async function GET(request: NextRequest) {
  const { user, response } = await requireUser(request, ['ADMIN', 'TEACHER'])
  if (!user) {
    return response
  }

  const teachers = await listTeachers()
  return NextResponse.json<ApiResponse<User[]>>({ success: true, data: teachers })
}
