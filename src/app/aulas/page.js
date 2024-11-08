'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from 'next/image'

const courses = [
  {
    id: 1,
    title: "Introdução à Programação",
    description: "Aprenda os fundamentos da programação com Python. Este curso abrange conceitos básicos de lógica de programação, estruturas de dados e algoritmos simples.",
    category: "Tecnologia",
    duration: "8 semanas",
    level: "Iniciante",
    instructor: "Ana Silva",
    image: "/placeholder.svg?height=200&width=300"
  },
  {
    id: 2,
    title: "História da Arte Moderna",
    description: "Explore os movimentos artísticos do século XX, desde o Impressionismo até a Arte Contemporânea. Analise obras-primas e entenda o contexto histórico.",
    category: "Arte",
    duration: "10 semanas",
    level: "Intermediário",
    instructor: "Carlos Oliveira",
    image: "/placeholder.svg?height=200&width=300"
  },
  {
    id: 3,
    title: "Marketing Digital Avançado",
    description: "Domine as estratégias e ferramentas mais recentes de marketing online. Aprenda sobre SEO, marketing de conteúdo, análise de dados e muito mais.",
    category: "Marketing",
    duration: "12 semanas",
    level: "Avançado",
    instructor: "Mariana Costa",
    image: "/placeholder.svg?height=200&width=300"
  },
  {
    id: 4,
    title: "Física Quântica para Iniciantes",
    description: "Descubra os conceitos fascinantes da mecânica quântica. Este curso introdutório aborda os princípios fundamentais e as aplicações modernas.",
    category: "Ciência",
    duration: "6 semanas",
    level: "Iniciante",
    instructor: "Dr. Ricardo Ferreira",
    image: "/placeholder.svg?height=200&width=300"
  },
  {
    id: 5,
    title: "Yoga e Meditação",
    description: "Aprenda técnicas de yoga e meditação para melhorar sua saúde física e mental. Ideal para iniciantes que buscam equilíbrio e bem-estar.",
    category: "Saúde",
    duration: "8 semanas",
    level: "Iniciante",
    instructor: "Juliana Mendes",
    image: "/placeholder.svg?height=200&width=300"
  }
]

const categories = ["Todas", "Tecnologia", "Arte", "Marketing", "Ciência", "Saúde"]

export default function CoursePresentationPage() {
  const [selectedCategory, setSelectedCategory] = useState("Todas")
  const [searchTerm, setSearchTerm] = useState("")

  const filteredCourses = courses.filter(course => 
    (selectedCategory === "Todas" || course.category === selectedCategory) &&
    (course.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
     course.description.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6 text-center">Nossas Aulas</h1>
      
      <div className="mb-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <Select onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Selecione uma categoria" />
          </SelectTrigger>
          <SelectContent>
            {categories.map(category => (
              <SelectItem key={category} value={category}>{category}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div className="relative">
          <Input
            type="search"
            placeholder="Buscar aulas..."
            className="w-full md:w-[300px]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredCourses.map(course => (
          <Card key={course.id} className="flex flex-col">
            <Image
              src={course.image}
              alt={course.title}
              width={300}
              height={200}
              className="w-full h-48 object-cover rounded-t-lg"
            />
            <CardHeader>
              <CardTitle>{course.title}</CardTitle>
              <CardDescription>{course.category}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <Tabs defaultValue="about">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="about">Sobre</TabsTrigger>
                  <TabsTrigger value="details">Detalhes</TabsTrigger>
                </TabsList>
                <TabsContent value="about">
                  <p>{course.description}</p>
                </TabsContent>
                <TabsContent value="details">
                  <ul className="space-y-2">
                    <li><strong>Duração:</strong> {course.duration}</li>
                    <li><strong>Nível:</strong> {course.level}</li>
                    <li><strong>Instrutor:</strong> {course.instructor}</li>
                  </ul>
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Inscrever-se</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}