import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import HeaderFixo from '@/components/common/headerFixo'

// Dados de exemplo para os posts do blog
const featuredPost = {
  title: "O Futuro da Inteligência Artificial",
  excerpt: "Explorando as últimas tendências e inovações no campo da IA...",
  author: {
    name: "Maria Silva",
    avatar: "/placeholder.svg?height=40&width=40"
  },
  date: "10 de Junho, 2023",
  category: "Tecnologia"
}

const recentPosts = [
  {
    title: "10 Dicas para Melhorar sua Produtividade",
    excerpt: "Aprenda como otimizar seu tempo e aumentar sua eficiência no trabalho...",
    author: {
      name: "João Santos",
      avatar: "/placeholder.svg?height=40&width=40"
    },
    date: "5 de Junho, 2023",
    category: "Produtividade"
  },
  {
    title: "A Importância da Sustentabilidade nos Negócios",
    excerpt: "Como empresas estão adotando práticas sustentáveis e seu impacto...",
    author: {
      name: "Ana Oliveira",
      avatar: "/placeholder.svg?height=40&width=40"
    },
    date: "1 de Junho, 2023",
    category: "Negócios"
  },
  {
    title: "Introdução ao Machine Learning",
    excerpt: "Um guia para iniciantes sobre os conceitos básicos de machine learning...",
    author: {
      name: "Carlos Ferreira",
      avatar: "/placeholder.svg?height=40&width=40"
    },
    date: "28 de Maio, 2023",
    category: "Tecnologia"
  }
]

const categories = [
  "Tecnologia", "Produtividade", "Negócios", "Saúde", "Estilo de Vida"
]

export default function BlogHomePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <HeaderFixo />

      <main className="grid gap-8 md:grid-cols-3">
        <section className="md:col-span-2">
          <h2 className="text-2xl font-semibold mb-4">Post em Destaque</h2>
          <Card>
            <CardHeader>
              <CardTitle>{featuredPost.title}</CardTitle>
              <CardDescription>
                <Badge>{featuredPost.category}</Badge>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">{featuredPost.excerpt}</p>
              <div className="flex items-center">
                <Avatar className="mr-2">
                  <AvatarImage src={featuredPost.author.avatar} alt={featuredPost.author.name} />
                  <AvatarFallback>{featuredPost.author.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">{featuredPost.author.name}</p>
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
                  <CardTitle>{post.title}</CardTitle>
                  <CardDescription>
                    <Badge>{post.category}</Badge>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">{post.excerpt}</p>
                  <div className="flex items-center">
                    <Avatar className="mr-2">
                      <AvatarImage src={post.author.avatar} alt={post.author.name} />
                      <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{post.author.name}</p>
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
              <p>Bem-vindo ao nosso blog! Aqui compartilhamos insights sobre tecnologia, produtividade e muito mais.</p>
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