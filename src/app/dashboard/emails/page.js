'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"

// Dados mockados para emails cadastrados
const registeredEmails = [
  { id: 1, email: 'alice@example.com', registrationDate: '2024-01-01', status: 'Ativo' },
  { id: 2, email: 'bob@example.com', registrationDate: '2024-02-15', status: 'Inativo' },
  { id: 3, email: 'carol@example.com', registrationDate: '2024-03-30', status: 'Ativo' },
  { id: 4, email: 'david@example.com', registrationDate: '2024-04-10', status: 'Inativo' },
  { id: 5, email: 'eve@example.com', registrationDate: '2024-05-20', status: 'Ativo' },
]

export default function RegisteredEmailsPage() {
  const [selectedEmail, setSelectedEmail] = useState(null)
  const [search, setSearch] = useState('')

  // Função para filtrar emails com base na busca
  const filteredEmails = registeredEmails.filter((email) =>
    email.email.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-5">Emails Cadastrados</h1>
      <div className="grid grid-cols-12 gap-4">
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Pastas</CardTitle>
          </CardHeader>
          <CardContent>
            <nav className="space-y-2">
              <Button variant="ghost" className="w-full justify-start">
                Emails Ativos
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                Emails Inativos
              </Button>
            </nav>
          </CardContent>
        </Card>
        <Card className="col-span-9">
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-1">
              <TabsTrigger value="all">Todos os Emails</TabsTrigger>
            </TabsList>
            <TabsContent value="all">
              <div className="p-4 flex items-center gap-2">
                <Input
                  placeholder="Buscar email..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full"
                />
                <Button onClick={() => setSearch('')}>Limpar</Button>
              </div>
              <ScrollArea className="h-[400px]">
                {filteredEmails.length > 0 ? (
                  filteredEmails.map((email) => (
                    <div key={email.id} className="p-4 cursor-pointer hover:bg-accent" onClick={() => setSelectedEmail(email)}>
                      <div className="flex justify-between items-center mb-2">
                        <div className="font-semibold">{email.email}</div>
                        <div className="text-sm text-muted-foreground">{email.registrationDate}</div>
                      </div>
                      <div className="text-sm text-muted-foreground">Status: {email.status}</div>
                      <Separator className="my-2" />
                    </div>
                  ))
                ) : (
                  <div className="p-4 text-center text-muted-foreground">
                    Nenhum email encontrado.
                  </div>
                )}
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
      {selectedEmail && (
        <Card className="mt-4">
          <CardHeader>
            <CardTitle>Detalhes do Email</CardTitle>
          </CardHeader>
          <CardContent>
            <p><strong>Email:</strong> {selectedEmail.email}</p>
            <p><strong>Data de Cadastro:</strong> {selectedEmail.registrationDate}</p>
            <p><strong>Status:</strong> {selectedEmail.status}</p>
          </CardContent>
          <CardFooter className="justify-end space-x-2">
            <Button variant="outline" onClick={() => setSelectedEmail(null)}>Fechar</Button>
          </CardFooter>
        </Card>
      )}
    </div>
  )
}
