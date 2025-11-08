"use client"

import { ArrowLeft, X, Settings, Trash2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"

export default function NotificationsPage() {
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
          <h1 className="text-xl font-bold">Notificaciones</h1>
          <Button variant="ghost" size="icon" className="text-white hover:bg-red-700">
            <Settings className="h-5 w-5" />
          </Button>
        </div>
      </header>

      {/* Action Buttons */}
      <div className="p-4 bg-white border-b">
        <div className="flex justify-between">
          <Button variant="outline" size="sm">
            <Trash2 className="h-4 w-4 mr-2" />
            Borrar Todo
          </Button>
          <Button variant="outline" size="sm">
            Ver Historial
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <main className="p-4 space-y-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <p className="text-sm">
                  Tu reserva del Salón 301 para el 15 de marzo a las 10:00 AM ha sido confirmada.
                </p>
                <p className="text-xs text-gray-500 mt-2">Hace 2 horas</p>
              </div>
              <div className="w-3 h-3 bg-green-500 rounded-full ml-2 mt-1"></div>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                Marcar leído
              </Button>
              <Button variant="ghost" size="sm" className="text-red-600">
                Eliminar
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <p className="text-sm">
                  Tu solicitud para el Salón 202 fue rechazada. Razón: Conflicto de horario.
                </p>
                <p className="text-xs text-gray-500 mt-2">Hace 3 horas</p>
              </div>
              <div className="w-3 h-3 bg-red-500 rounded-full ml-2 mt-1"></div>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                Marcar leído
              </Button>
              <Button variant="ghost" size="sm" className="text-red-600">
                Eliminar
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <p className="text-sm">
                  Tienes una reserva programada mañana en el Salón 105 a las 3:00 PM.
                </p>
                <p className="text-xs text-gray-500 mt-2">Hace 5 horas</p>
              </div>
              <div className="w-3 h-3 bg-blue-500 rounded-full ml-2 mt-1"></div>
            </div>
            <div className="flex space-x-2">
              <Button variant="ghost" size="sm" className="text-red-600">
                Eliminar
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <p className="text-sm">
                  Mantenimiento en el Bloque A el 20 de marzo. Algunos salones estarán cerrados.
                </p>
                <p className="text-xs text-gray-500 mt-2">Hace 6 horas</p>
              </div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full ml-2 mt-1"></div>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                Marcar leído
              </Button>
              <Button variant="ghost" size="sm" className="text-red-600">
                Eliminar
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
