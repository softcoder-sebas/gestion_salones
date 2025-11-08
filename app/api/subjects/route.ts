import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { requireUser } from '@/lib/auth';
import { createSubject, listSubjects } from '@/lib/subjects';
import type { ApiResponse, Subject } from '@/lib/types';

const subjectSchema = z.object({
  code: z.string().min(2).max(45),
  name: z.string().min(3),
  description: z.string().optional().nullable(),
})

export async function GET() {
  const subjects = await listSubjects()
  return NextResponse.json<ApiResponse<Subject[]>>({ success: true, data: subjects })
}

export async function POST(request: NextRequest) {
  const { user, response } = await requireUser(request, ['ADMIN'])
  if (!user) {
    return response
  }

  try {
    const body = await request.json()
    const parsed = subjectSchema.safeParse(body)
    if (!parsed.success) {
      const message = parsed.error.errors.map((error) => error.message).join(', ')
      return NextResponse.json<ApiResponse<Subject>>({ success: false, error: message }, { status: 400 })
    }

    await createSubject(parsed.data)
    return NextResponse.json<ApiResponse<null>>({ success: true }, { status: 201 })
  } catch (error) {
    console.error('Create subject error', error)
    return NextResponse.json<ApiResponse<Subject>>({ success: false, error: 'No fue posible crear la materia' }, { status: 500 })
  }
}
