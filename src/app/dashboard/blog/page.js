'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Dados de exemplo para categorias
const categories = ["Turismo", "Curiosidade", "Estilo de Vida"]

export default function BlogPage() {
  const [blogPosts, setBlogPosts] = useState([])
  const [isAddingPost, setIsAddingPost] = useState(false)
  const [newPost, setNewPost] = useState({ title: '', content: '', category: '', status: 'Rascunho' })
  const [selectedPost, setSelectedPost] = useState(null)
  const [loading, setLoading] = useState(false)

  // Buscar os dados do S3 ao carregar a página
  useEffect(() => {
    const fetchBlogPosts = async () => {
      setLoading(true)
      try {
        const response = await fetch('/api/blogs', { method: 'GET' })
        if (!response.ok) throw new Error("Erro ao buscar posts do S3")
        const data = await response.json()
        setBlogPosts(data)
      } catch (error) {
        console.error("Erro ao carregar os posts:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchBlogPosts()
  }, [])

  // Adicionar novo post
  const handleAddPost = async () => {
    const newPostWithDate = {
      ...newPost,
      id: blogPosts.length + 1,
      date: new Date().toLocaleDateString('pt-BR'),
    }

    try {
      const response = await fetch('/api/blogs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPostWithDate),
      })

      if (!response.ok) throw new Error("Erro ao salvar o post")

      // Atualiza a lista de posts
      setBlogPosts((prevPosts) => [...prevPosts, newPostWithDate])
      setIsAddingPost(false)
      setNewPost({ title: '', content: '', category: '', status: 'Rascunho' })
    } catch (error) {
      console.error("Erro ao salvar o post:", error)
    }
  }

  // Editar post existente
  const handleEditPost = async () => {
    try {
      const response = await fetch(`/api/blogs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(selectedPost),
      })

      if (!response.ok) throw new Error("Erro ao editar o post")

      const updatedPosts = blogPosts.map((post) =>
        post.id === selectedPost.id ? selectedPost : post
      )
      setBlogPosts(updatedPosts)
      setSelectedPost(null)
    } catch (error) {
      console.error("Erro ao editar o post:", error)
    }
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-5">Gerenciamento do Blog</h1>
      <Tabs defaultValue="posts" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="posts">Posts</TabsTrigger>
        </TabsList>
        <TabsContent value="posts">
          <Card>
            <CardHeader>
              <CardTitle>Posts do Blog</CardTitle>
              <CardDescription>Gerencie seus posts do blog</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between mb-4">
                <Input className="max-w-sm" placeholder="Pesquisar posts..." />
                <Dialog open={isAddingPost} onOpenChange={setIsAddingPost}>
                  <DialogTrigger asChild>
                    <Button>Novo Post</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[625px]">
                    <DialogHeader>
                      <DialogTitle>Criar Novo Post</DialogTitle>
                      <DialogDescription>Crie um novo post para o seu blog. Clique em salvar quando terminar.</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="title" className="text-right">Título</Label>
                        <Input
                          id="title"
                          className="col-span-3"
                          value={newPost.title}
                          onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                          required
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="category" className="text-right">Categoria</Label>
                        <Select
                          value={newPost.category}
                          onValueChange={(value) => setNewPost({ ...newPost, category: value })}
                        >
                          <SelectTrigger className="col-span-3">
                            <SelectValue placeholder="Selecione uma categoria" />
                          </SelectTrigger>
                          <SelectContent>
                            {categories.map((category) => (
                              <SelectItem key={category} value={category}>{category}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="content" className="text-right">Conteúdo</Label>
                        <Textarea
                          id="content"
                          className="col-span-3"
                          rows={10}
                          value={newPost.content}
                          onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                          required
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button onClick={handleAddPost}>Salvar Post</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
              {loading ? (
                <p>Carregando posts...</p>
              ) : (
                <ScrollArea className="h-[400px]">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Título</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Data</TableHead>
                        <TableHead>Categoria</TableHead>
                        <TableHead>Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {blogPosts.map((post) => (
                        <TableRow key={post.id}>
                          <TableCell>{post.title}</TableCell>
                          <TableCell>{post.status}</TableCell>
                          <TableCell>{post.date}</TableCell>
                          <TableCell>{post.category}</TableCell>
                          <TableCell>
                            <Button variant="outline" size="sm" onClick={() => setSelectedPost(post)}>Editar</Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </ScrollArea>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        {/* Restante das abas como Categorias e Estatísticas */}
      </Tabs>
    </div>
  )
}
