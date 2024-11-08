'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ScrollArea } from "@/components/ui/scroll-area"

// Dados de exemplo para formulários
const forms = [
  { id: 1, name: 'Pesquisa de Satisfação', responses: 150, lastUpdated: '2023-05-15' },
  { id: 2, name: 'Inscrição para Evento', responses: 75, lastUpdated: '2023-05-20' },
  { id: 3, name: 'Feedback de Produto', responses: 200, lastUpdated: '2023-05-18' },
]

export default function FormsPage() {
  const [selectedForm, setSelectedForm] = useState(null)
  const [isCreating, setIsCreating] = useState(false)
  const [newFormFields, setNewFormFields] = useState([{ type: 'text', label: '' }])

  const addField = () => {
    setNewFormFields([...newFormFields, { type: 'text', label: '' }])
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-5">Gerenciamento de Formulários</h1>
      <Tabs defaultValue="all-forms" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="all-forms">Todos os Formulários</TabsTrigger>
          <TabsTrigger value="responses">Respostas</TabsTrigger>
          <TabsTrigger value="create">Criar Formulário</TabsTrigger>
        </TabsList>
        <TabsContent value="all-forms">
          <Card>
            <CardHeader>
              <CardTitle>Formulários Existentes</CardTitle>
              <CardDescription>Gerencie seus formulários existentes</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome do Formulário</TableHead>
                    <TableHead>Respostas</TableHead>
                    <TableHead>Última Atualização</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {forms.map((form) => (
                    <TableRow key={form.id}>
                      <TableCell>{form.name}</TableCell>
                      <TableCell>{form.responses}</TableCell>
                      <TableCell>{form.lastUpdated}</TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm" onClick={() => setSelectedForm(form)}>
                          Ver Detalhes
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="responses">
          <Card>
            <CardHeader>
              <CardTitle>Respostas dos Formulários</CardTitle>
              <CardDescription>Visualize as respostas recebidas</CardDescription>
            </CardHeader>
            <CardContent>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecione um formulário" />
                </SelectTrigger>
                <SelectContent>
                  {forms.map((form) => (
                    <SelectItem key={form.id} value={form.id.toString()}>{form.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <ScrollArea className="h-[400px] mt-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID da Resposta</TableHead>
                      <TableHead>Data</TableHead>
                      <TableHead>Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[...Array(10)].map((_, index) => (
                      <TableRow key={index}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{new Date().toLocaleDateString()}</TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm">Ver Detalhes</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="create">
          <Card>
            <CardHeader>
              <CardTitle>Criar Novo Formulário</CardTitle>
              <CardDescription>Crie um novo formulário personalizado</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div>
                  <Label htmlFor="form-name">Nome do Formulário</Label>
                  <Input id="form-name" placeholder="Digite o nome do formulário" />
                </div>
                <div>
                  <Label htmlFor="form-description">Descrição do Formulário</Label>
                  <Textarea id="form-description" placeholder="Digite uma descrição para o formulário" />
                </div>
                {newFormFields.map((field, index) => (
                  <div key={index} className="space-y-2">
                    <Label htmlFor={`field-${index}`}>Campo {index + 1}</Label>
                    <div className="flex space-x-2">
                      <Select value={field.type} onValueChange={(value) => {
                        const updatedFields = [...newFormFields]
                        updatedFields[index].type = value
                        setNewFormFields(updatedFields)
                      }}>
                        <SelectTrigger>
                          <SelectValue placeholder="Tipo de Campo" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="text">Texto</SelectItem>
                          <SelectItem value="number">Número</SelectItem>
                          <SelectItem value="email">E-mail</SelectItem>
                          <SelectItem value="textarea">Área de Texto</SelectItem>
                        </SelectContent>
                      </Select>
                      <Input
                        id={`field-${index}`}
                        placeholder="Rótulo do campo"
                        value={field.label}
                        onChange={(e) => {
                          const updatedFields = [...newFormFields]
                          updatedFields[index].label = e.target.value
                          setNewFormFields(updatedFields)
                        }}
                      />
                    </div>
                  </div>
                ))}
                <Button type="button" onClick={addField}>Adicionar Campo</Button>
              </form>
            </CardContent>
            <CardFooter>
              <Button>Criar Formulário</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
      {selectedForm && (
        <Card className="mt-4">
          <CardHeader>
            <CardTitle>{selectedForm.name}</CardTitle>
            <CardDescription>Detalhes do formulário</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Total de Respostas: {selectedForm.responses}</p>
            <p>Última Atualização: {selectedForm.lastUpdated}</p>
          </CardContent>
          <CardFooter>
            <Button variant="outline" onClick={() => setSelectedForm(null)}>Fechar</Button>
          </CardFooter>
        </Card>
      )}
    </div>
  )
}