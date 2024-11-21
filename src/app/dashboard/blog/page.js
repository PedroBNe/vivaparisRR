'use client';

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Image from 'next/image';

const categories = ["Turismo", "Curiosidade", "Estilo de Vida"];

export default function BlogPage() {
  const [blogPosts, setBlogPosts] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const [formPost, setFormPost] = useState({ title: '', content: '', category: '', status: 'Rascunho', image: null });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBlogPosts = async () => {
      setLoading(true);
      try {
        const response = await fetch('/api/blogs', { method: 'GET' });
        if (!response.ok) throw new Error("Erro ao buscar posts do S3");
        const data = await response.json();
        setBlogPosts(data);
      } catch (error) {
        console.error("Erro ao carregar os posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPosts();
  }, []);

  const handleImageUpload = async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error("Erro ao fazer upload da imagem");

      const data = await response.json();
      return data.url; // URL da imagem retornada pelo S3
    } catch (error) {
      console.error("Erro ao fazer upload da imagem:", error);
      return '';
    }
  };

  const handleSavePost = async () => {
    setLoading(true);
    try {
      const imageUrl = formPost.image instanceof File ? await handleImageUpload(formPost.image) : formPost.image;
      const postToSave = { ...formPost, image: imageUrl };

      if (editingPost) {
        // Editando um post existente
        const response = await fetch('/api/blogs', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(postToSave),
        });

        if (!response.ok) throw new Error("Erro ao editar o post");

        setBlogPosts((prevPosts) =>
          prevPosts.map((post) => (post.id === postToSave.id ? postToSave : post))
        );
      } else {
        // Criando um novo post
        const newPostWithDate = {
          ...postToSave,
          id: blogPosts.length + 1,
          date: new Date().toLocaleDateString('pt-BR'),
        };

        const response = await fetch('/api/blogs', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newPostWithDate),
        });

        if (!response.ok) throw new Error("Erro ao salvar o post");

        setBlogPosts((prevPosts) => [...prevPosts, newPostWithDate]);
      }

      setIsDialogOpen(false);
      setEditingPost(null);
      setFormPost({ title: '', content: '', category: '', status: 'Rascunho', image: null });
    } catch (error) {
      console.error("Erro ao salvar o post:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePost = async (id) => {
    try {
      const response = await fetch(`/api/blogs`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });

      if (!response.ok) throw new Error("Erro ao excluir o post");

      setBlogPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
    } catch (error) {
      console.error("Erro ao excluir o post:", error);
    }
  };

  const openEditDialog = (post) => {
    setEditingPost(post);
    setFormPost(post);
    setIsDialogOpen(true);
  };

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
                <Button onClick={() => setIsDialogOpen(true)}>Novo Post</Button>
              </div>
              <ScrollArea className="h-[400px]">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Imagem</TableHead>
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
                        <TableCell>
                          {post.image && (
                            <Image
                              src={post.image}
                              alt={post.title}
                              width={64}
                              height={64}
                              className="w-16 h-16 object-cover rounded"
                            />
                          )}
                        </TableCell>
                        <TableCell>{post.title}</TableCell>
                        <TableCell>{post.status}</TableCell>
                        <TableCell>{post.date}</TableCell>
                        <TableCell>{post.category}</TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm" onClick={() => openEditDialog(post)}>Editar</Button>
                          <Button variant="outline" size="sm" color="red" onClick={() => handleDeletePost(post.id)}>Excluir</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[625px]">
          <DialogHeader>
            <DialogTitle>{editingPost ? 'Editar Post' : 'Novo Post'}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">Título</Label>
              <Input
                id="title"
                className="col-span-3"
                value={formPost.title}
                onChange={(e) => setFormPost({ ...formPost, title: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="category" className="text-right">Categoria</Label>
              <Select
                value={formPost.category}
                onValueChange={(value) => setFormPost({ ...formPost, category: value })}
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
                value={formPost.content}
                onChange={(e) => setFormPost({ ...formPost, content: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="image" className="text-right">Imagem</Label>
              <Input
                id="image"
                className="col-span-3"
                type="file"
                accept="image/*"
                onChange={(e) => setFormPost({ ...formPost, image: e.target.files[0] })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleSavePost} disabled={loading}>
              {loading ? 'Salvando...' : 'Salvar'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
