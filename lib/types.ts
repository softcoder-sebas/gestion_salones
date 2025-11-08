export type Role = 'ADMIN' | 'TEACHER' | 'GUEST'

export interface User {
  id: number
  fullName: string
  email: string
  role: Role
  department: string | null
  createdAt: string
}

export interface Subject {
  id: number
  code: string
  name: string
  description: string | null
}

export interface Room {
  id: number
  code: string
  name: string
  location: string
  capacity: number
  resources: string | null
  defaultSubjectId: number | null
  defaultTeacherId: number | null
  defaultTeacherName?: string | null
  defaultSubjectName?: string | null
}

export type ReservationStatus = 'PENDING' | 'APPROVED' | 'REJECTED' | 'CANCELLED'

export interface Reservation {
  id: number
  roomId: number
  roomName: string
  teacherId: number
  teacherName: string
  subjectId: number | null
  subjectName: string | null
  status: ReservationStatus
  startTime: string
  endTime: string
  notes: string | null
  approvedBy: number | null
  approvedByName?: string | null
  createdAt: string
  updatedAt: string
}

export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
}

export interface SessionPayload {
  sub: number
  role: Role
  exp: number
}
