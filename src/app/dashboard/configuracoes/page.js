'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function SiteSettingsPage() {
  const [maintenanceMode, setMaintenanceMode] = useState(false)
  const [commentsEnabled, setCommentsEnabled] = useState(true)

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-5">Configurações do Site</h1>
      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="general">Geral</TabsTrigger>
          <TabsTrigger value="seo">SEO</TabsTrigger>
          <TabsTrigger value="integrations">Integrações</TabsTrigger>
          <TabsTrigger value="advanced">Avançado</TabsTrigger>
        </TabsList>
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>Configurações Gerais</CardTitle>
              <CardDescription>
                Configure as informações básicas do seu site.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="site-name">Nome do Site</Label>
                <Input id="site-name" defaultValue="Meu Site Incrível" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="site-description">Descrição do Site</Label>
                <Textarea id="site-description" defaultValue="Um site incrível sobre coisas incríveis." />
              </div>
              <div className="space-y-1">
                <Label htmlFor="timezone">Fuso Horário</Label>
                <Select defaultValue="America/Sao_Paulo">
                  <SelectTrigger id="timezone">
                    <SelectValue placeholder="Selecione um fuso horário" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="America/Sao_Paulo">Brasília (GMT-3)</SelectItem>
                    <SelectItem value="America/New_York">Nova York (GMT-4)</SelectItem>
                    <SelectItem value="Europe/London">Londres (GMT+1)</SelectItem>
                    <SelectItem value="Asia/Tokyo">Tóquio (GMT+9)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="maintenance-mode"
                  checked={maintenanceMode}
                  onCheckedChange={setMaintenanceMode}
                />
                <Label htmlFor="maintenance-mode">Modo de Manutenção</Label>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Salvar Configurações</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="seo">
          <Card>
            <CardHeader>
              <CardTitle>Configurações de SEO</CardTitle>
              <CardDescription>
                Otimize seu site para mecanismos de busca.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="meta-title">Título Meta (Meta Title)</Label>
                <Input id="meta-title" defaultValue="Meu Site Incrível | A melhor experiência na web" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="meta-description">Descrição Meta (Meta Description)</Label>
                <Textarea id="meta-description" defaultValue="Descubra o incrível mundo de coisas incríveis em nosso site. Oferecemos a melhor experiência na web para todos os entusiastas." />
              </div>
              <div className="space-y-1">
                <Label htmlFor="keywords">Palavras-chave</Label>
                <Input id="keywords" defaultValue="incrível, web, experiência, descoberta" />
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="robots-index"
                  defaultChecked
                />
                <Label htmlFor="robots-index">Permitir indexação por mecanismos de busca</Label>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Atualizar SEO</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="integrations">
          <Card>
            <CardHeader>
              <CardTitle>Integrações</CardTitle>
              <CardDescription>
                Conecte seu site a serviços externos.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="google-analytics">ID do Google Analytics</Label>
                <Input id="google-analytics" placeholder="UA-XXXXXXXXX-X" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="facebook-pixel">ID do Facebook Pixel</Label>
                <Input id="facebook-pixel" placeholder="XXXXXXXXXXXXXXXXXX" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="mailchimp-api">API Key do Mailchimp</Label>
                <Input id="mailchimp-api" type="password" placeholder="Digite sua API key" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Salvar Integrações</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="advanced">
          <Card>
            <CardHeader>
              <CardTitle>Configurações Avançadas</CardTitle>
              <CardDescription>
                Ajuste configurações avançadas do seu site.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center space-x-2">
                <Switch
                  id="comments-enabled"
                  checked={commentsEnabled}
                  onCheckedChange={setCommentsEnabled}
                />
                <Label htmlFor="comments-enabled">Habilitar comentários</Label>
              </div>
              <div className="space-y-1">
                <Label htmlFor="cache-ttl">Tempo de vida do cache (em segundos)</Label>
                <Input id="cache-ttl" type="number" defaultValue="3600" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="custom-css">CSS Personalizado</Label>
                <Textarea id="custom-css" placeholder="Digite seu CSS personalizado aqui" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="robots-txt">Conteúdo do robots.txt</Label>
                <Textarea id="robots-txt" defaultValue="User-agent: *&#10;Disallow: /admin/&#10;Disallow: /private/" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Salvar Configurações Avançadas</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}