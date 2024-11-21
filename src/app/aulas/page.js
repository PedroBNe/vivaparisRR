'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { CalendarIcon, ClockIcon, MapPinIcon } from 'lucide-react'

const aulas = [
  { id: 1, titulo: 'Introdução à História de Paris', data: '2023-06-15', horario: '14:00', local: 'Sala Virtual 1', status: 'agendada', imagem: '/banner.png' },
  { id: 2, titulo: 'Explorando a Torre Eiffel', data: '2023-06-16', horario: '10:00', local: 'Sala Virtual 2', status: 'concluída', imagem: '/banner.png' },
  { id: 3, titulo: 'A Arte no Louvre', data: '2023-06-17', horario: '16:00', local: 'Sala Virtual 3', status: 'agendada', imagem: '/banner.png' },
  { id: 4, titulo: 'Culinária Francesa', data: '2023-06-18', horario: '09:00', local: 'Sala Virtual 4', status: 'cancelada', imagem: '/banner.png' },
  { id: 5, titulo: 'Passeio Virtual por Montmartre', data: '2023-06-19', horario: '11:00', local: 'Sala Virtual 5', status: 'agendada', imagem: '/banner.png' },
]

export default function AulasAgendadas() {
  const [filtroStatus, setFiltroStatus] = useState('todas')

  const aulasFiltradas = aulas.filter(aula => 
    filtroStatus === 'todas' || aula.status === filtroStatus
  )

  const getStatusColor = (status) => {
    switch (status) {
      case 'agendada': return 'bg-blue-500'
      case 'concluída': return 'bg-green-500'
      case 'cancelada': return 'bg-red-500'
      default: return 'bg-gray-500'
    }
  }

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-6 text-center text-[#055647]">Curso de Turismo em Paris</h1>
        
        <div className="mb-6 flex justify-between items-center">
          <Select onValueChange={setFiltroStatus} defaultValue="todas">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filtrar por status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todas">Todas as aulas</SelectItem>
              <SelectItem value="agendada">Agendadas</SelectItem>
              <SelectItem value="concluída">Concluídas</SelectItem>
              <SelectItem value="cancelada">Canceladas</SelectItem>
            </SelectContent>
          </Select>
          <div className="text-[#055647]">
            Total de aulas: {aulasFiltradas.length}
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {aulasFiltradas.map(aula => (
            <Card key={aula.id} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="relative h-48">
                <Image
                  src={aula.imagem}
                  alt={aula.titulo}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-[#055647]">{aula.titulo}</span>
                  <Badge className={`${getStatusColor(aula.status)} text-white`}>
                    {aula.status}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center">
                    <CalendarIcon className="mr-2 h-4 w-4 text-[#055647]" />
                    <span>{new Date(aula.data).toLocaleDateString('pt-BR')}</span>
                  </div>
                  <div className="flex items-center">
                    <ClockIcon className="mr-2 h-4 w-4 text-[#055647]" />
                    <span>{aula.horario}</span>
                  </div>
                  <div className="flex items-center">
                    <MapPinIcon className="mr-2 h-4 w-4 text-[#055647]" />
                    <span>{aula.local}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}