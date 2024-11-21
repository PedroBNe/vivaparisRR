import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import Image from 'next/image'
import { CalendarIcon, TagIcon } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

// Dados dos posts (pode mover para um arquivo separado, se preferir)
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

const allPosts = [featuredPost, ...recentPosts]

export async function generateStaticParams() {
  return allPosts.map((post) => ({
    id: post.id.toString(),
  }))
}

export async function generateMetadata({ params } ) {
  const postId = parseInt(params.id)
  const post = allPosts.find((post) => post.id === postId)

  if (!post) {
    return {
      title: 'Post não encontrado',
    }
  }

  return {
    title: post.title,
    description: post.excerpt,
  }
}

export default function BlogPostPage({ params }) {
  const postId = parseInt(params.id)
  const post = allPosts.find((post) => post.id === postId)

  if (!post) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="overflow-hidden">
        <div className="relative h-64 w-full">
          <Image
            src={post.image}
            alt={post.title}
            layout="fill"
            objectFit="cover"
            priority
          />
        </div>
        <CardHeader>
          <CardTitle className="text-3xl font-bold">{post.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-4">
            <div className="flex items-center">
              <CalendarIcon className="mr-1 h-4 w-4" />
              {post.date}
            </div>
            <div className="flex items-center">
              <TagIcon className="mr-1 h-4 w-4" />
              {post.category}
            </div>
          </div>
          <p className="text-lg mb-6">{post.excerpt}</p>
          <div className="prose max-w-none">
            {post.content}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}