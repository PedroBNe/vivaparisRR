'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"

// Dados de exemplo para leads
const leads = [
  { id: 1, name: 'João Silva', email: 'joao@example.com', phone: '(11) 98765-4321', status: 'Novo', source: 'Website' },
  { id: 2, name: 'Maria Santos', email: 'maria@example.com', phone: '(21) 99876-5432', status: 'Em contato', source: 'Referência' },
  { id: 3, name: 'Carlos Oliveira', email: 'carlos@example.com', phone: '(31) 97654-3210', status: 'Qualificado', source: 'LinkedIn' },
  { id: 4, name: 'Ana Rodrigues', email: 'ana@example.com', phone: '(41) 96543-2109', status: 'Novo', source: 'Facebook' },
  { id: 5, name: 'Pedro Ferreira', email: 'pedro@example.com', phone: '(51) 95432-1098', status: 'Perdido', source: 'Instagram' },
]

export default function LeadsPage() {
  const [selectedLead, setSelectedLead] = useState(null)
  const [isAddingLead, setIsAddingLead] = useState(false)
  const [newLead, setNewLead] = useState({ name: '', email: '', phone: '', status: 'Novo', source: '' })

  const handleAddLead = () => {
    // Aqui você adicionaria a lógica para salvar o novo lead
    console.log('Novo lead:', newLead)
    setIsAddingLead(false)
    setNewLead({ name: '', email: '', phone: '', status: 'Novo', source: '' })
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-5">Gerenciamento de Leads</h1>
      <Tabs defaultValue="all-leads" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="all-leads">Todos os Leads</TabsTrigger>
          <TabsTrigger value="new-leads">Leads Novos</TabsTrigger>
          <TabsTrigger value="qualified-leads">Leads Qualificados</TabsTrigger>
        </TabsList>
        <TabsContent value="all-leads">
          <Card>
            <CardHeader>
              <CardTitle>Todos os Leads</CardTitle>
              <CardDescription>Visualize e gerencie todos os seus leads</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between mb-4">
                <Input className="max-w-sm" placeholder="Pesquisar leads..." />
                <Dialog open={isAddingLead} onOpenChange={setIsAddingLead}>
                  <DialogTrigger asChild>
                    <Button>Adicionar Lead</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Adicionar Novo Lead</DialogTitle>
                      <DialogDescription>Preencha as informações do novo lead abaixo.</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">Nome</Label>
                        <Input id="name" className="col-span-3" value={newLead.name} onChange={(e) => setNewLead({...newLead, name: e.target.value})} />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="email" className="text-right">Email</Label>
                        <Input id="email" className="col-span-3" value={newLead.email} onChange={(e) => setNewLead({...newLead, email: e.target.value})} />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="phone" className="text-right">Telefone</Label>
                        <Input id="phone" className="col-span-3" value={newLead.phone} onChange={(e) => setNewLead({...newLead, phone: e.target.value})} />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="source" className="text-right">Origem</Label>
                        <Input id="source" className="col-span-3" value={newLead.source} onChange={(e) => setNewLead({...newLead, source: e.target.value})} />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button onClick={handleAddLead}>Adicionar Lead</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
              <ScrollArea className="h-[600px]">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nome</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Telefone</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Origem</TableHead>
                      <TableHead>Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {leads.map((lead) => (
                      <TableRow key={lead.id}>
                        <TableCell>{lead.name}</TableCell>
                        <TableCell>{lead.email}</TableCell>
                        <TableCell>{lead.phone}</TableCell>
                        <TableCell>{lead.status}</TableCell>
                        <TableCell>{lead.source}</TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm" onClick={() => setSelectedLead(lead)}>
                            Ver Detalhes
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="new-leads">
          <Card>
            <CardHeader>
              <CardTitle>Leads Novos</CardTitle>
              <CardDescription>Visualize e gerencie seus leads recém-adquiridos</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Telefone</TableHead>
                    <TableHead>Origem</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {leads.filter(lead => lead.status === 'Novo').map((lead) => (
                    <TableRow key={lead.id}>
                      <TableCell>{lead.name}</TableCell>
                      <TableCell>{lead.email}</TableCell>
                      <TableCell>{lead.phone}</TableCell>
                      <TableCell>{lead.source}</TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm" onClick={() => setSelectedLead(lead)}>
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
        <TabsContent value="qualified-leads">
          <Card>
            <CardHeader>
              <CardTitle>Leads Qualificados</CardTitle>
              <CardDescription>Visualize e gerencie seus leads qualificados</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Telefone</TableHead>
                    <TableHead>Origem</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {leads.filter(lead => lead.status === 'Qualificado').map((lead) => (
                    <TableRow key={lead.id}>
                      <TableCell>{lead.name}</TableCell>
                      <TableCell>{lead.email}</TableCell>
                      <TableCell>{lead.phone}</TableCell>
                      <TableCell>{lead.source}</TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm" onClick={() => setSelectedLead(lead)}>
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
      </Tabs>
      {selectedLead && (
        <Card className="mt-4">
          <CardHeader>
            <CardTitle>Detalhes do Lead</CardTitle>
            <CardDescription>Informações detalhadas sobre o lead selecionado</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Nome</Label>
                <Input value={selectedLead.name} readOnly />
              </div>
              <div>
                <Label>Email</Label>
                <Input value={selectedLead.email} readOnly />
              </div>
              <div>
                <Label>Telefone</Label>
                <Input value={selectedLead.phone} readOnly />
              </div>
              <div>
                <Label>Status</Label>
                <Select defaultValue={selectedLead.status}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Novo">Novo</SelectItem>
                    <SelectItem value="Em contato">Em contato</SelectItem>
                    <SelectItem value="Qualificado">Qualificado</SelectItem>
                    <SelectItem value="Perdido">Perdido</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Origem</Label>
                <Input value={selectedLead.source} readOnly />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={() => setSelectedLead(null)}>Fechar</Button>
            <Button>Atualizar Lead</Button>
          </CardFooter>
        </Card>
      )}
    </div>
  )
}