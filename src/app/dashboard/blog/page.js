'use client'

import { useState } from 'react'
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

// Dados de exemplo para posts do blog
const blogPosts = [
  { id: 1, title: 'Introdução ao React', status: 'Publicado', date: '2023-06-01', category: 'Desenvolvimento' },
  { id: 2, title: 'Melhores práticas de SEO', status: 'Rascunho', date: '2023-06-05', category: 'Marketing' },
  { id: 3, title: 'Design responsivo em 2023', status: 'Publicado', date: '2023-05-28', category: 'Design' },
  { id: 4, title: 'Introdução à LGPD', status: 'Rascunho', date: '2023-06-10', category: 'Legal' },
]

// Dados de exemplo para categorias
const categories = ['Desenvolvimento', 'Marketing', 'Design', 'Legal', 'Negócios']

export default function BlogPage() {
  const [isAddingPost, setIsAddingPost] = useState(false)
  const [newPost, setNewPost] = useState({ title: '', content: '', category: '' })
  const [selectedPost, setSelectedPost] = useState(null)

  const handleAddPost = () => {
    // Aqui você adicionaria a lógica para salvar o novo post
    console.log('Novo post:', newPost)
    setIsAddingPost(false)
    setNewPost({ title: '', content: '', category: '' })
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-5">Gerenciamento do Blog</h1>
      <Tabs defaultValue="posts" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="posts">Posts</TabsTrigger>
          <TabsTrigger value="categories">Categorias</TabsTrigger>
          <TabsTrigger value="stats">Estatísticas</TabsTrigger>
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
                          onChange={(e) => setNewPost({...newPost, title: e.target.value})}
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="category" className="text-right">Categoria</Label>
                        <Select
                          value={newPost.category}
                          onValueChange={(value) => setNewPost({...newPost, category: value})}
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
                          onChange={(e) => setNewPost({...newPost, content: e.target.value})}
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button onClick={handleAddPost}>Salvar Post</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
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
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="categories">
          <Card>
            <CardHeader>
              <CardTitle>Categorias</CardTitle>
              <CardDescription>Gerencie as categorias do seu blog</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between mb-4">
                <Input className="max-w-sm" placeholder="Nova categoria..." />
                <Button>Adicionar Categoria</Button>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome da Categoria</TableHead>
                    <TableHead>Número de Posts</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {categories.map((category, index) => (
                    <TableRow key={index}>
                      <TableCell>{category}</TableCell>
                      <TableCell>{Math.floor(Math.random() * 10)}</TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">Editar</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="stats">
          <Card>
            <CardHeader>
              <CardTitle>Estatísticas do Blog</CardTitle>
              <CardDescription>Visualize as estatísticas do seu blog</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Total de Posts</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-4xl font-bold">{blogPosts.length}</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Categorias</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-4xl font-bold">{categories.length}</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Posts Publicados</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-4xl font-bold">{blogPosts.filter(post => post.status === 'Publicado').length}</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Rascunhos</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-4xl font-bold">{blogPosts.filter(post => post.status === 'Rascunho').length}</p>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      {selectedPost && (
        <Dialog open={!!selectedPost} onOpenChange={() => setSelectedPost(null)}>
          <DialogContent className="sm:max-w-[625px]">
            <DialogHeader>
              <DialogTitle>Editar Post</DialogTitle>
              <DialogDescription>Edite os detalhes do post selecionado.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-title" className="text-right">Título</Label>
                <Input
                  id="edit-title"
                  className="col-span-3"
                  value={selectedPost.title}
                  onChange={(e) => setSelectedPost({...selectedPost, title: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-category" className="text-right">Categoria</Label>
                <Select
                  value={selectedPost.category}
                  onValueChange={(value) => setSelectedPost({...selectedPost, category: value})}
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
                <Label htmlFor="edit-status" className="text-right">Status</Label>
                <Select
                  value={selectedPost.status}
                  onValueChange={(value) => setSelectedPost({...selectedPost, status: value})}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Selecione o status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Publicado">Publicado</SelectItem>
                    <SelectItem value="Rascunho">Rascunho</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button onClick={() => setSelectedPost(null)}>Salvar Alterações</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}