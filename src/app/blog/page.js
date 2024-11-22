'use client'

import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Image from 'next/image'
import { useEffect, useState } from 'react'

// Defina as categorias dentro do escopo do componente ou em um nível superior no arquivo
const categories = ["Turismo", "Curiosidade", "Estilo de Vida"];

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
  const [blogs, setBlogs] = useState([]);
  const [featuredPost, setFeaturedPost] = useState(null);
  const [recentPosts, setRecentPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const windowWidth = useWindowSize();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch('/api/blogs', { method: 'GET' });
        if (!response.ok) throw new Error("Erro ao carregar os blogs");

        const data = await response.json();
        if (data.length > 0) {
          setFeaturedPost(data[0]); // O primeiro post como destaque
          setRecentPosts(data.slice(1)); // O restante como posts recentes
        }
      } catch (error) {
        console.error("Erro ao buscar os blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) {
    return <p className="text-center py-8">Carregando...</p>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <main className="grid gap-8 md:grid-cols-3">
        <section className="md:col-span-2">
          {featuredPost && (
            <>
              <h2 className="text-2xl font-semibold mb-4">Post em Destaque</h2>
              <Card>
                <CardHeader>
                  <Image
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    width={800}
                    height={450}
                    className="rounded-t-lg"
                  />
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
                    <Link href={`/blog/${featuredPost.id}`}>Ler mais</Link>
                  </Button>
                </CardFooter>
              </Card>
            </>
          )}

          <h2 className="text-2xl font-semibold mt-8 mb-4">Posts Recentes</h2>
          <div className="space-y-4">
            {recentPosts.map((post) => (
              <Card key={post.id}>
                <CardHeader>
                  <Image
                    src={post.image}
                    alt={post.title}
                    width={800}
                    height={450}
                    className="rounded-t-lg"
                  />
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
                    <Link href={`/blog/${post.id}`}>Ler mais</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>

        {windowWidth > 768 && (
        <aside>
          <Card>
            <CardHeader>
              <CardTitle>Categorias</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {categories.map((category, index) => (
                  <Badge key={index} variant="secondary">
                    <Link href={`/category/${category.toLowerCase()}`}>{category}</Link>
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
        )}
      </main>
    </div>
  );
}
