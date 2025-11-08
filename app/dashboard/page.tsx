"use client"

import { Bell, Calendar, Home, User, Plus } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-red-600 text-white p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold">UMB Salones</h1>
          <Link href="/notifications">
            <Button variant="ghost" size="icon" className="text-white hover:bg-red-700">
              <Bell className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-4 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Reservar Salón</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">Solicita un salón para tus actividades académicas</p>
              <Link href="/reserve">
                <Button className="w-full bg-red-600 hover:bg-red-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Nueva Reserva
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Mis Reservas</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">Gestiona tus reservas activas</p>
              <Link href="/my-reservations">
                <Button variant="outline" className="w-full">
                  Ver Reservas
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Reservas Recientes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div>
                  <p className="font-semibold">Salón 301</p>
                  <p className="text-sm text-gray-600">15 Mar 2025 • 2:00 PM</p>
                </div>
                <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                  Confirmada
                </span>
              </div>
              <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                <div>
                  <p className="font-semibold">Salón 405</p>
                  <p className="text-sm text-gray-600">17 Mar 2025 • 10:00 AM</p>
                </div>
                <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">
                  Pendiente
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <div className="grid grid-cols-3 h-16">
          <Link href="/dashboard" className="flex items-center justify-center text-red-600">
            <Home className="h-6 w-6" />
          </Link>
          <Link href="/my-reservations" className="flex items-center justify-center text-gray-400">
            <Calendar className="h-6 w-6" />
          </Link>
          <Link href="/profile" className="flex items-center justify-center text-gray-400">
            <User className="h-6 w-6" />
          </Link>
        </div>
      </nav>
    </div>
  )
}
