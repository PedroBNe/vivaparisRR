'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Switch } from "@/components/ui/switch"

// Dados de exemplo para solicitações de titulares de dados
const dataRequests = [
  { id: 1, type: 'Acesso', status: 'Pendente', date: '2023-06-01' },
  { id: 2, type: 'Exclusão', status: 'Concluído', date: '2023-05-28' },
  { id: 3, type: 'Retificação', status: 'Em Progresso', date: '2023-05-30' },
  { id: 4, type: 'Portabilidade', status: 'Pendente', date: '2023-06-02' },
]

// Dados de exemplo para atividades de processamento
const processingActivities = [
  { id: 1, activity: 'Coleta de dados de clientes', purpose: 'Prestação de serviços', dataCategories: 'Dados pessoais, contato' },
  { id: 2, activity: 'Análise de comportamento do usuário', purpose: 'Melhoria de serviços', dataCategories: 'Dados de uso, preferências' },
  { id: 3, activity: 'Envio de newsletter', purpose: 'Marketing', dataCategories: 'E-mail, nome' },
]

export default function LGPDPage() {
  const [isAddingRequest, setIsAddingRequest] = useState(false)
  const [newRequest, setNewRequest] = useState({ type: '', description: '' })
  const [consentSettings, setConsentSettings] = useState({
    marketing: true,
    analytics: true,
    thirdParty: false,
  })

  const handleAddRequest = () => {
    // Aqui você adicionaria a lógica para salvar a nova solicitação
    console.log('Nova solicitação:', newRequest)
    setIsAddingRequest(false)
    setNewRequest({ type: '', description: '' })
  }

  const handleConsentChange = (setting) => {
    setConsentSettings(prev => ({ ...prev, [setting]: !prev[setting] }))
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-5">Gerenciamento LGPD</h1>
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="consent">Consentimento</TabsTrigger>
          <TabsTrigger value="requests">Solicitações</TabsTrigger>
          <TabsTrigger value="processing">Atividades de Processamento</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          <Card>
            <CardHeader>
              <CardTitle>Visão Geral da LGPD</CardTitle>
              <CardDescription>Resumo da conformidade com a LGPD</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold">Status de Conformidade</h3>
                  <p>Seu site está atualmente em conformidade com as principais exigências da LGPD.</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Próximos Passos</h3>
                  <ul className="list-disc pl-5">
                    <li>Revisar e atualizar a política de privacidade</li>
                    <li>Conduzir uma auditoria de segurança de dados</li>
                    <li>Treinar a equipe sobre as melhores práticas da LGPD</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Recursos</h3>
                  <ul className="list-disc pl-5">
                    <li><a href="#" className="text-blue-600 hover:underline">Guia Completo da LGPD</a></li>
                    <li><a href="#" className="text-blue-600 hover:underline">Modelo de Política de Privacidade</a></li>
                    <li><a href="#" className="text-blue-600 hover:underline">Checklist de Conformidade</a></li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="consent">
          <Card>
            <CardHeader>
              <CardTitle>Gerenciamento de Consentimento</CardTitle>
              <CardDescription>Configure as opções de consentimento para os usuários</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="marketing-consent">Consentimento para Marketing</Label>
                    <p className="text-sm text-muted-foreground">Permite o envio de e-mails promocionais e ofertas</p>
                  </div>
                  <Switch
                    id="marketing-consent"
                    checked={consentSettings.marketing}
                    onCheckedChange={() => handleConsentChange('marketing')}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="analytics-consent">Consentimento para Analytics</Label>
                    <p className="text-sm text-muted-foreground">Permite a coleta de dados de uso para melhorar o serviço</p>
                  </div>
                  <Switch
                    id="analytics-consent"
                    checked={consentSettings.analytics}
                    onCheckedChange={() => handleConsentChange('analytics')}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="third-party-consent">Compartilhamento com Terceiros</Label>
                    <p className="text-sm text-muted-foreground">Permite o compartilhamento de dados com parceiros</p>
                  </div>
                  <Switch
                    id="third-party-consent"
                    checked={consentSettings.thirdParty}
                    onCheckedChange={() => handleConsentChange('thirdParty')}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Salvar Configurações de Consentimento</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="requests">
          <Card>
            <CardHeader>
              <CardTitle>Solicitações de Titulares de Dados</CardTitle>
              <CardDescription>Gerencie as solicitações dos titulares de dados</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between mb-4">
                <Input className="max-w-sm" placeholder="Pesquisar solicitações..." />
                <Dialog open={isAddingRequest} onOpenChange={setIsAddingRequest}>
                  <DialogTrigger asChild>
                    <Button>Nova Solicitação</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Adicionar Nova Solicitação</DialogTitle>
                      <DialogDescription>Preencha os detalhes da nova solicitação do titular de dados.</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="request-type" className="text-right">Tipo</Label>
                        <Input
                          id="request-type"
                          className="col-span-3"
                          value={newRequest.type}
                          onChange={(e) => setNewRequest({...newRequest, type: e.target.value})}
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="request-description" className="text-right">Descrição</Label>
                        <Textarea
                          id="request-description"
                          className="col-span-3"
                          value={newRequest.description}
                          onChange={(e) => setNewRequest({...newRequest, description: e.target.value})}
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button onClick={handleAddRequest}>Adicionar Solicitação</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
              <ScrollArea className="h-[400px]">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Tipo</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Data</TableHead>
                      <TableHead>Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {dataRequests.map((request) => (
                      <TableRow key={request.id}>
                        <TableCell>{request.id}</TableCell>
                        <TableCell>{request.type}</TableCell>
                        <TableCell>{request.status}</TableCell>
                        <TableCell>{request.date}</TableCell>
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
        <TabsContent value="processing">
          <Card>
            <CardHeader>
              <CardTitle>Registro de Atividades de Processamento</CardTitle>
              <CardDescription>Visualize e gerencie as atividades de processamento de dados</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Atividade</TableHead>
                    <TableHead>Finalidade</TableHead>
                    <TableHead>Categorias de Dados</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {processingActivities.map((activity) => (
                    <TableRow key={activity.id}>
                      <TableCell>{activity.activity}</TableCell>
                      <TableCell>{activity.purpose}</TableCell>
                      <TableCell>{activity.dataCategories}</TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">Editar</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter>
              <Button>Adicionar Nova Atividade</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}