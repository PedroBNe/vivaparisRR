'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Switch } from "@/components/ui/switch"

// Componente fictício de ColorPicker
const ColorPicker = ({ color, onChange }) => (
  <Input type="color" value={color} onChange={(e) => onChange(e.target.value)} />
)

export default function LandingPageCustomizationPage() {
  const [headerConfig, setHeaderConfig] = useState({
    title: 'Bem-vindo à Nossa Incrível Plataforma',
    subtitle: 'Transforme sua experiência online com nossa solução inovadora',
    ctaText: 'Comece Agora',
    backgroundImage: '/placeholder.svg?height=400&width=800',
  })

  const [featuresConfig, setFeaturesConfig] = useState([
    { title: 'Recurso 1', description: 'Descrição do recurso 1' },
    { title: 'Recurso 2', description: 'Descrição do recurso 2' },
    { title: 'Recurso 3', description: 'Descrição do recurso 3' },
  ])

  const [ctaConfig, setCtaConfig] = useState({
    title: 'Pronto para começar?',
    description: 'Junte-se a milhares de usuários satisfeitos hoje mesmo!',
    buttonText: 'Inscreva-se',
  })

  const [footerConfig, setFooterConfig] = useState({
    companyName: 'Sua Empresa',
    links: [
      { text: 'Sobre', url: '#' },
      { text: 'Termos', url: '#' },
      { text: 'Privacidade', url: '#' },
    ],
  })

  const [colorScheme, setColorScheme] = useState({
    primary: '#3b82f6',
    secondary: '#10b981',
    background: '#ffffff',
    text: '#1f2937',
  })

  const handleImageUpload = (event, section) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        if (section === 'header') {
          setHeaderConfig({ ...headerConfig, backgroundImage: reader.result })
        }
        // Adicione mais condições para outras seções, se necessário
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-5">Customização da Landing Page</h1>
      <Tabs defaultValue="header" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="header">Cabeçalho</TabsTrigger>
          <TabsTrigger value="features">Recursos</TabsTrigger>
          <TabsTrigger value="cta">CTA</TabsTrigger>
          <TabsTrigger value="footer">Rodapé</TabsTrigger>
          <TabsTrigger value="design">Design</TabsTrigger>
        </TabsList>
        <TabsContent value="header">
          <Card>
            <CardHeader>
              <CardTitle>Configuração do Cabeçalho</CardTitle>
              <CardDescription>Personalize o cabeçalho da sua landing page</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="header-title">Título</Label>
                <Input
                  id="header-title"
                  value={headerConfig.title}
                  onChange={(e) => setHeaderConfig({ ...headerConfig, title: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="header-subtitle">Subtítulo</Label>
                <Textarea
                  id="header-subtitle"
                  value={headerConfig.subtitle}
                  onChange={(e) => setHeaderConfig({ ...headerConfig, subtitle: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="header-cta">Texto do CTA</Label>
                <Input
                  id="header-cta"
                  value={headerConfig.ctaText}
                  onChange={(e) => setHeaderConfig({ ...headerConfig, ctaText: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="header-image">Imagem de Fundo</Label>
                <Input
                  id="header-image"
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, 'header')}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="features">
          <Card>
            <CardHeader>
              <CardTitle>Configuração dos Recursos</CardTitle>
              <CardDescription>Adicione e edite os recursos da sua landing page</CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {featuresConfig.map((feature, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger>Recurso {index + 1}</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor={`feature-title-${index}`}>Título</Label>
                          <Input
                            id={`feature-title-${index}`}
                            value={feature.title}
                            onChange={(e) => {
                              const newFeatures = [...featuresConfig]
                              newFeatures[index].title = e.target.value
                              setFeaturesConfig(newFeatures)
                            }}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`feature-description-${index}`}>Descrição</Label>
                          <Textarea
                            id={`feature-description-${index}`}
                            value={feature.description}
                            onChange={(e) => {
                              const newFeatures = [...featuresConfig]
                              newFeatures[index].description = e.target.value
                              setFeaturesConfig(newFeatures)
                            }}
                          />
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
            <CardFooter>
              <Button onClick={() => setFeaturesConfig([...featuresConfig, { title: 'Novo Recurso', description: 'Descrição do novo recurso' }])}>
                Adicionar Recurso
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="cta">
          <Card>
            <CardHeader>
              <CardTitle>Configuração do CTA</CardTitle>
              <CardDescription>Personalize a seção de chamada para ação</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="cta-title">Título</Label>
                <Input
                  id="cta-title"
                  value={ctaConfig.title}
                  onChange={(e) => setCtaConfig({ ...ctaConfig, title: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cta-description">Descrição</Label>
                <Textarea
                  id="cta-description"
                  value={ctaConfig.description}
                  onChange={(e) => setCtaConfig({ ...ctaConfig, description: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cta-button">Texto do Botão</Label>
                <Input
                  id="cta-button"
                  value={ctaConfig.buttonText}
                  onChange={(e) => setCtaConfig({ ...ctaConfig, buttonText: e.target.value })}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="footer">
          <Card>
            <CardHeader>
              <CardTitle>Configuração do Rodapé</CardTitle>
              <CardDescription>Personalize o rodapé da sua landing page</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="footer-company">Nome da Empresa</Label>
                <Input
                  id="footer-company"
                  value={footerConfig.companyName}
                  onChange={(e) => setFooterConfig({ ...footerConfig, companyName: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Links do Rodapé</Label>
                {footerConfig.links.map((link, index) => (
                  <div key={index} className="flex space-x-2">
                    <Input
                      value={link.text}
                      onChange={(e) => {
                        const newLinks = [...footerConfig.links]
                        newLinks[index].text = e.target.value
                        setFooterConfig({ ...footerConfig, links: newLinks })
                      }}
                      placeholder="Texto do link"
                    />
                    <Input
                      value={link.url}
                      onChange={(e) => {
                        const newLinks = [...footerConfig.links]
                        newLinks[index].url = e.target.value
                        setFooterConfig({ ...footerConfig, links: newLinks })
                      }}
                      placeholder="URL"
                    />
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={() => setFooterConfig({ ...footerConfig, links: [...footerConfig.links, { text: '', url: '' }] })}>
                Adicionar Link
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="design">
          <Card>
            <CardHeader>
              <CardTitle>Configuração de Design</CardTitle>
              <CardDescription>Personalize as cores e o estilo da sua landing page</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="color-primary">Cor Primária</Label>
                <ColorPicker
                  color={colorScheme.primary}
                  onChange={(color) => setColorScheme({ ...colorScheme, primary: color })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="color-secondary">Cor Secundária</Label>
                <ColorPicker
                  color={colorScheme.secondary}
                  onChange={(color) => setColorScheme({ ...colorScheme, secondary: color })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="color-background">Cor de Fundo</Label>
                <ColorPicker
                  color={colorScheme.background}
                  onChange={(color) => setColorScheme({ ...colorScheme, background: color })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="color-text">Cor do Texto</Label>
                <ColorPicker
                  color={colorScheme.text}
                  onChange={(color) => setColorScheme({ ...colorScheme, text: color })}
                />
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="dark-mode" />
                <Label htmlFor="dark-mode">Habilitar Modo Escuro</Label>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      <div className="mt-8">
        <Button>Salvar Alterações</Button>
        <Button variant="outline" className="ml-2">Pré-visualizar</Button>
      </div>
    </div>
  )
}