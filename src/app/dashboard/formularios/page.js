'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"

// Dados mockados para formulários cadastrados
const forms = [
  { id: 1, name: 'Contato', createdAt: '2024-01-01', responses: 15, status: 'Ativo' },
  { id: 2, name: 'Feedback', createdAt: '2024-02-10', responses: 20, status: 'Inativo' },
  { id: 3, name: 'Inscrição para Eventos', createdAt: '2024-03-05', responses: 35, status: 'Ativo' },
  { id: 4, name: 'Pesquisa de Satisfação', createdAt: '2024-04-12', responses: 50, status: 'Ativo' },
  { id: 5, name: 'Solicitação de Orçamento', createdAt: '2024-05-20', responses: 12, status: 'Inativo' },
]

export default function FormsPage() {
  const [selectedForm, setSelectedForm] = useState(null)
  const [search, setSearch] = useState('')

  // Função para filtrar formulários com base na busca
  const filteredForms = forms.filter((form) =>
    form.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-5">Formulários Cadastrados</h1>
      <div className="grid grid-cols-12 gap-4">
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Pastas</CardTitle>
          </CardHeader>
          <CardContent>
            <nav className="space-y-2">
              <Button variant="ghost" className="w-full justify-start">
                Formulários Ativos
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                Formulários Inativos
              </Button>
            </nav>
          </CardContent>
          <CardFooter>
            <Button className="w-full" onClick={() => alert('Novo formulário')}>
              Novo Formulário
            </Button>
          </CardFooter>
        </Card>
        <Card className="col-span-9">
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-1">
              <TabsTrigger value="all">Todos os Formulários</TabsTrigger>
            </TabsList>
            <TabsContent value="all">
              <div className="p-4 flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Buscar formulário..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full border rounded p-2"
                />
                <Button onClick={() => setSearch('')}>Limpar</Button>
              </div>
              <ScrollArea className="h-[400px]">
                {filteredForms.length > 0 ? (
                  filteredForms.map((form) => (
                    <div key={form.id} className="p-4 cursor-pointer hover:bg-accent" onClick={() => setSelectedForm(form)}>
                      <div className="flex justify-between items-center mb-2">
                        <div className="font-semibold">{form.name}</div>
                        <div className="text-sm text-muted-foreground">{form.createdAt}</div>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Respostas: {form.responses} | Status: {form.status}
                      </div>
                      <Separator className="my-2" />
                    </div>
                  ))
                ) : (
                  <div className="p-4 text-center text-muted-foreground">
                    Nenhum formulário encontrado.
                  </div>
                )}
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
      {selectedForm && (
        <Card className="mt-4">
          <CardHeader>
            <CardTitle>Detalhes do Formulário</CardTitle>
          </CardHeader>
          <CardContent>
            <p><strong>Nome:</strong> {selectedForm.name}</p>
            <p><strong>Data de Criação:</strong> {selectedForm.createdAt}</p>
            <p><strong>Respostas:</strong> {selectedForm.responses}</p>
            <p><strong>Status:</strong> {selectedForm.status}</p>
          </CardContent>
          <CardFooter className="justify-end space-x-2">
            <Button variant="outline" onClick={() => setSelectedForm(null)}>Fechar</Button>
            <Button variant="outline">Editar</Button>
            <Button variant="danger">Excluir</Button>
          </CardFooter>
        </Card>
      )}
    </div>
  )
}
