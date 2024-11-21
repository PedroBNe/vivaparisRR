'use client'

import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Image from 'next/image'
import { useEffect, useState } from 'react'

// Dados de exemplo para os posts do blog
const featuredPost = {
  title: "Os Principais Pontos Turísticos de Paris",
  excerpt: "Descubra os locais mais icônicos de Paris, desde a Torre Eiffel até o Louvre, e aprenda como aproveitar ao máximo cada visita.",
  date: "10 de Junho, 2023",
  category: "Turismo",
  image: "/blog/image.png"
};

const recentPosts = [
  {
    title: "Um Guia Gastronômico para Paris: Onde Comer e Beber",
    excerpt: "Explore os melhores restaurantes, cafés e bistrôs de Paris, onde você pode saborear desde croissants autênticos até alta gastronomia francesa.",
    date: "5 de Junho, 2023",
    category: "Estilo de Vida",
    image: "/blog/image2.png"
  },
  {
    title: "Passeios Românticos em Paris para Casais",
    excerpt: "Conheça os lugares mais românticos de Paris, perfeitos para casais. Inclui dicas de piqueniques no Sena, passeios de barco e vistas inesquecíveis.",
    date: "1 de Junho, 2023",
    category: "Curiosidade",
    image: "/blog/image3.png"
  },
  {
    title: "Paris com um Orçamento Limitado: Dicas de Viagem Econômica",
    excerpt: "Descubra como aproveitar Paris sem gastar muito, com dicas de atrações gratuitas, passeios a pé, e opções de alimentação econômica.",
    date: "28 de Maio, 2023",
    category: "Turismo",
    image: "/blog/image4.png"
  }
];

// Defina as categorias dentro do escopo do componente ou em um nível superior no arquivo
const categories = [
  "Turismo", "Curiosidade", "Estilo de Vida"
];

function useWindowSize() {
  const [width, setWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 0);

  useEffect(() => {
      const handleResize = () => setWidth(window.innerWidth);

      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
  }, []);

  return width;
}

export default function BlogHomePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <main className="grid gap-8 md:grid-cols-3">
        <section className="md:col-span-2">
          <h2 className="text-2xl font-semibold mb-4">Post em Destaque</h2>
          <Card>
            <CardHeader>
              <Image src={featuredPost.image} alt={featuredPost.title} width={800} height={450} className="rounded-t-lg" />
              <CardTitle>{featuredPost.title}</CardTitle>
              <CardDescription>
                <Badge>{featuredPost.category}</Badge>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">{featuredPost.excerpt}</p>
              <div className="flex items-center">
                <div>
                  <p className="text-sm text-muted-foreground">{featuredPost.date}</p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button asChild>
                <Link href={`/post/${featuredPost.title.toLowerCase().replace(/ /g, '-')}`}>
                  Ler mais
                </Link>
              </Button>
            </CardFooter>
          </Card>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Posts Recentes</h2>
          <div className="space-y-4">
            {recentPosts.map((post, index) => (
              <Card key={index}>
                <CardHeader>
                  <Image src={post.image} alt={post.title} width={800} height={450} className="rounded-t-lg" />
                  <CardTitle>{post.title}</CardTitle>
                  <CardDescription>
                    <Badge>{post.category}</Badge>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">{post.excerpt}</p>
                  <div className="flex items-center">
                    <div>
                      <p className="text-sm text-muted-foreground">{post.date}</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" asChild>
                    <Link href={`/post/${post.title.toLowerCase().replace(/ /g, '-')}`}>
                      Ler mais
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>

        <aside className={`${useWindowSize() <= 768 ? "hidden" : ""}`}>
          <Card>
            <CardHeader>
              <CardTitle>Categorias</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {categories.map((category, index) => (
                  <Badge key={index} variant="secondary">
                    <Link href={`/category/${category.toLowerCase()}`}>
                      {category}
                    </Link>
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="mt-4">
            <CardHeader>
              <CardTitle>Sobre o Blog</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Bem-vindo ao nosso blog! Aqui compartilhamos insights sobre Viagem, Turismo e muito mais.</p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" asChild>
                <Link href="/about">Saiba mais</Link>
              </Button>
            </CardFooter>
          </Card>
        </aside>
      </main>
    </div>
  )
}
