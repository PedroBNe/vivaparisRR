import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Image from 'next/image'

// Dados de exemplo para os posts do blog
const featuredPost = {
  id: 1,
  title: "Os Principais Pontos Turísticos de Paris",
  excerpt: "Descubra os locais mais icônicos de Paris, desde a Torre Eiffel até o Louvre, e aprenda como aproveitar ao máximo cada visita.",
  date: "10 de Junho, 2023",
  category: "Turismo",
  image: "/blog/image.png",
  content: "Conteúdo completo do post aqui..."
}

const recentPosts = [
  {
    id: 2,
    title: "Um Guia Gastronômico para Paris: Onde Comer e Beber",
    excerpt: "Explore os melhores restaurantes, cafés e bistrôs de Paris, onde você pode saborear desde croissants autênticos até alta gastronomia francesa.",
    date: "5 de Junho, 2023",
    category: "Estilo de Vida",
    image: "/blog/image2.png",
    content: "Conteúdo completo do post aqui..."
  },
]

// Defina as categorias dentro do escopo do componente ou em um nível superior no arquivo
const categories = [
  "Turismo", "Curiosidade", "Estilo de Vida"
];

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
                <Link href={`/blog/${featuredPost.id}`}>
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
                    <Link href={`/blog/${post.id}`}>
                      Ler mais
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>

        <aside>
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
