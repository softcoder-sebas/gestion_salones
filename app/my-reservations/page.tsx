"use client"

import { ArrowLeft, Bell } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"

export default function MyReservationsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-red-600 text-white p-4">
        <div className="flex items-center justify-between">
          <Link href="/dashboard">
            <Button variant="ghost" size="icon" className="text-white hover:bg-red-700">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-xl font-bold">Mis Reservas</h1>
          <Link href="/notifications">
            <Button variant="ghost" size="icon" className="text-white hover:bg-red-700">
              <Bell className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-4 space-y-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="text-lg font-semibold">Salón 301</h3>
                <p className="text-sm text-gray-600">Bloque A, Piso 3</p>
                <div className="flex items-center space-x-2 mt-1">
                  <span className="text-sm">Marzo 15, 2025</span>
                  <span className="w-6 h-6 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center text-xs font-semibold">
                    L
                  </span>
                </div>
                <p className="text-sm text-gray-600">2:00 PM - 4:00 PM</p>
              </div>
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                Confirmada
              </span>
            </div>
            <div className="flex space-x-3">
              <Button variant="outline" className="flex-1">
                Modificar
              </Button>
              <Button variant="destructive" className="flex-1">
                Cancelar
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="text-lg font-semibold">Salón 405</h3>
                <p className="text-sm text-gray-600">Bloque B, Piso 4</p>
                <div className="flex items-center space-x-2 mt-1">
                  <span className="text-sm">Marzo 17, 2025</span>
                  <span className="w-6 h-6 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center text-xs font-semibold">
                    L
                  </span>
                </div>
                <p className="text-sm text-gray-600">10:00 AM - 12:00 PM</p>
              </div>
              <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">
                Pendiente
              </span>
            </div>
            <div className="flex space-x-3">
              <Button variant="outline" className="flex-1">
                Modificar
              </Button>
              <Button variant="destructive" className="flex-1">
                Cancelar
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <div className="grid grid-cols-3 h-16">
          <Link href="/dashboard" className="flex items-center justify-center text-gray-400">
            <div className="w-6 h-6 bg-gray-400 rounded"></div>
          </Link>
          <Link href="/my-reservations" className="flex items-center justify-center text-red-600">
            <div className="w-6 h-6 bg-red-600 rounded"></div>
          </Link>
          <Link href="/profile" className="flex items-center justify-center text-gray-400">
            <div className="w-6 h-6 bg-gray-400 rounded"></div>
          </Link>
        </div>
      </nav>
    </div>
  )
}
