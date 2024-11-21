import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Image from 'next/image';
import { CalendarIcon, TagIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const API_ENDPOINT = '/api/blogs';

// Função para buscar os posts do endpoint
async function fetchPosts() {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000';
  const response = await fetch(`${baseUrl}/api/blogs`, { cache: 'no-store' });
  if (!response.ok) {
    throw new Error('Erro ao buscar posts');
  }
  return response.json();
}

// Gerar parâmetros estáticos
export async function generateStaticParams() {
  try {
    const posts = await fetchPosts();
    return posts.map((post) => ({
      id: post.id.toString(),
    }));
  } catch (error) {
    console.error('Erro ao gerar parâmetros estáticos:', error);
    return [];
  }
}

// Gerar metadados dinamicamente
export async function generateMetadata({ params }) {
  try {
    const posts = await fetchPosts();
    const post = posts.find((post) => post.id.toString() === params.id);

    if (!post) {
      return {
        title: 'Post não encontrado',
      };
    }

    return {
      title: post.title,
      description: post.excerpt,
    };
  } catch (error) {
    console.error('Erro ao gerar metadados:', error);
    return {
      title: 'Erro ao carregar o post',
    };
  }
}

export default async function BlogPostPage({ params }) {
  try {
    const posts = await fetchPosts();
    const post = posts.find((post) => post.id.toString() === params.id);

    if (!post) {
      notFound();
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
            <div className="prose max-w-none">{post.content}</div>
          </CardContent>
        </Card>
      </div>
    );
  } catch (error) {
    console.error('Erro ao carregar a página do post:', error);
    notFound();
  }
}
