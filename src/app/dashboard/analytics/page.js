'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AreaChart, BarChart, LineChart, PieChart } from 'recharts'

export default function AnalyticsPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Análise de Tráfego</h2>
      </div>
      <Tabs defaultValue="visao-geral" className="space-y-4">
        <TabsList>
          <TabsTrigger value="visao-geral">Visão Geral</TabsTrigger>
          <TabsTrigger value="paginas">Páginas</TabsTrigger>
          <TabsTrigger value="origem">Origem do Tráfego</TabsTrigger>
        </TabsList>
        <TabsContent value="visao-geral" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Visualizações de Página
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">684,239</div>
                <p className="text-xs text-muted-foreground">
                  +15.8% em relação ao mês passado
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Sessões
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">245,128</div>
                <p className="text-xs text-muted-foreground">
                  +23.1% em relação ao mês passado
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Contatos via Formulário</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,543</div>
                <p className="text-xs text-muted-foreground">
                  +5.2% em relação ao mês passado
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Tempo Médio na Página</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2m 37s</div>
                <p className="text-xs text-muted-foreground">
                  +0.3% em relação ao mês passado
                </p>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Visualizações de Página ao Longo do Tempo</CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                <AreaChart />
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Sessões por Dispositivo</CardTitle>
                <CardDescription>
                  Distribuição de sessões por tipo de dispositivo
                </CardDescription>
              </CardHeader>
              <CardContent>
                <PieChart />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="paginas" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Páginas Mais Visitadas</CardTitle>
              <CardDescription>
                Top 10 páginas por número de visualizações
              </CardDescription>
            </CardHeader>
            <CardContent>
              <BarChart />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="origem" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Origem do Tráfego</CardTitle>
              <CardDescription>
                Distribuição de sessões por fonte de tráfego
              </CardDescription>
            </CardHeader>
            <CardContent>
              <LineChart />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}