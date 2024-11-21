"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";

export default function EditJsonPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  // Buscar os dados do JSON
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/json");
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error("Erro ao carregar os dados:", error);
      }
    };

    fetchData();
  }, []);

  // Atualizar o estado dos dados
  const handleChange = (pageIndex, section, key, value) => {
    const updatedData = [...data];
    if (key) {
      updatedData[pageIndex][section][key] = value;
    } else {
      updatedData[pageIndex][section] = value;
    }
    setData(updatedData);
  };
  

  const handleArrayChange = (pageIndex, section, index, key, value) => {
    const updatedData = [...data];
    updatedData[pageIndex][section][index][key] = value;
    setData(updatedData);
  };

  const handleUpload = async (file, pageIndex, section, key) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const { url } = await response.json();
        handleChange(pageIndex, section, key, url); // Atualiza o JSON com a URL retornada
      } else {
        alert("Erro ao fazer upload da imagem.");
      }
    } catch (error) {
      console.error("Erro ao fazer upload:", error);
    }
  };

  // Salvar os dados no bucket S3
  const handleSave = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/json", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert("Dados salvos com sucesso!");
      } else {
        alert("Erro ao salvar os dados.");
      }
    } catch (error) {
      console.error("Erro ao salvar os dados:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!data) {
    return <p>Carregando...</p>;
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-5">Editor de JSON</h1>
      <div className="space-y-10">
        {data.map((page, pageIndex) => (
          <div key={page.id} className="space-y-6">
            <h2 className="text-xl font-semibold">{page.page.toUpperCase()}</h2>

            {/* Banner */}
            {page.banner && (
              <div>
                <h3 className="font-semibold">Banner</h3>
                <Input
                  value={page.banner.title}
                  onChange={(e) =>
                    handleChange(pageIndex, "banner", "title", e.target.value)
                  }
                  placeholder="Título"
                />
                <Textarea
                  value={page.banner.subtitle}
                  onChange={(e) =>
                    handleChange(pageIndex, "banner", "subtitle", e.target.value)
                  }
                  placeholder="Subtítulo"
                />
                <div className="space-y-2">
                  <label className="block font-medium">Imagem do Banner</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      handleUpload(e.target.files[0], pageIndex, "banner", "image")
                    }
                  />
                  {page.banner.image && (
                    <Image
                      src={page.banner.image}
                      alt="Pré-visualização"
                      width={300}
                      height={200}
                      className="w-full max-w-md mt-2"
                    />
                  )}
                </div>
              </div>
            )}

            {/* Travels */}
            {page.travels && (
              <div>
                <h3 className="font-semibold">Viagens</h3>
                {page.travels.map((travel, index) => (
                  <div key={index} className="space-y-2">
                    <Input
                      value={travel.title}
                      onChange={(e) =>
                        handleArrayChange(
                          pageIndex,
                          "travels",
                          index,
                          "title",
                          e.target.value
                        )
                      }
                      placeholder="Título da Viagem"
                    />
                    <Textarea
                      value={travel.text}
                      onChange={(e) =>
                        handleArrayChange(
                          pageIndex,
                          "travels",
                          index,
                          "text",
                          e.target.value
                        )
                      }
                      placeholder="Descrição da Viagem"
                    />
                    <div className="space-y-2">
                      <label className="block font-medium">Imagem da Viagem</label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) =>
                          handleUpload(
                            e.target.files[0],
                            pageIndex,
                            "travels",
                            "img",
                            index
                          )
                        }
                      />
                      {travel.img && (
                        <Image
                          src={travel.img}
                          alt="Pré-visualização"
                          width={300}
                          height={200}
                          className="w-full max-w-md mt-2"
                        />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Destiny */}
            {page.destiny && (
              <div>
                <h3 className="font-semibold">Destinos</h3>
                {page.destiny.map((destino, index) => (
                  <div key={destino.id} className="space-y-2">
                    <Input
                      value={destino.destino}
                      onChange={(e) =>
                        handleArrayChange(
                          pageIndex,
                          "destiny",
                          index,
                          "destino",
                          e.target.value
                        )
                      }
                      placeholder="Destino"
                    />
                    <Input
                      value={destino.local}
                      onChange={(e) =>
                        handleArrayChange(
                          pageIndex,
                          "destiny",
                          index,
                          "local",
                          e.target.value
                        )
                      }
                      placeholder="Local"
                    />
                    <div className="space-y-2">
                      <label className="block font-medium">Imagem do Destino</label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) =>
                          handleUpload(
                            e.target.files[0],
                            pageIndex,
                            "destiny",
                            "img",
                            index
                          )
                        }
                      />
                      {destino.img && (
                        <Image
                          src={destino.img}
                          alt="Pré-visualização"
                          width={300}
                          height={200}
                          className="w-full max-w-md mt-2"
                        />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Gallery */}
            {page.galery && (
              <div>
                <h3 className="font-semibold">Galeria</h3>
                {page.galery.map((item, index) => (
                  <div key={item.id} className="space-y-2">
                    <Input
                      value={item.destino}
                      onChange={(e) =>
                        handleArrayChange(
                          pageIndex,
                          "galery",
                          index,
                          "destino",
                          e.target.value
                        )
                      }
                      placeholder="Destino"
                    />
                    <Input
                      value={item.local}
                      onChange={(e) =>
                        handleArrayChange(
                          pageIndex,
                          "galery",
                          index,
                          "local",
                          e.target.value
                        )
                      }
                      placeholder="Local"
                    />
                    <div className="space-y-2">
                      <label className="block font-medium">Imagem da Galeria</label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) =>
                          handleUpload(
                            e.target.files[0],
                            pageIndex,
                            "galery",
                            "img",
                            index
                          )
                        }
                      />
                      {item.img && (
                        <Image
                          src={item.img}
                          alt="Pré-visualização"
                          width={300}
                          height={200}
                          className="w-full max-w-md mt-2"
                        />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Plan */}
            {page.plan && (
              <div>
                <h3 className="font-semibold">Plano</h3>
                <div className="space-y-2">
                  <label className="block font-medium">Imagem do Plano</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      handleUpload(e.target.files[0], pageIndex, "plan", "image")
                    }
                  />
                  {page.plan.image && (
                    <Image
                      src={page.plan.image}
                      alt="Pré-visualização"
                      width={300}
                      height={200}
                      className="w-full max-w-md mt-2"
                    />
                  )}
                </div>
                <Input
                  value={page.plan.title1}
                  onChange={(e) =>
                    handleChange(pageIndex, "plan", "title1", e.target.value)
                  }
                  placeholder="Título 1"
                />
                <Textarea
                  value={page.plan.subtitle1}
                  onChange={(e) =>
                    handleChange(pageIndex, "plan", "subtitle1", e.target.value)
                  }
                  placeholder="Subtítulo 1"
                />
                <Input
                  value={page.plan.title2}
                  onChange={(e) =>
                    handleChange(pageIndex, "plan", "title2", e.target.value)
                  }
                  placeholder="Título 2"
                />
                <Textarea
                  value={page.plan.subtitle2}
                  onChange={(e) =>
                    handleChange(pageIndex, "plan", "subtitle2", e.target.value)
                  }
                  placeholder="Subtítulo 2"
                />
              </div>
            )}

            {/* Colors */}
            {page.colorPrimary && (
              <div>
                <h3 className="font-semibold">Cores</h3>
                <Input
                  type="color"
                  value={page.colorPrimary}
                  onChange={(e) =>
                    handleChange(pageIndex, "colorPrimary", null, e.target.value)
                  }
                  placeholder="Cor Primária"
                />
                <Input
                  type="color"
                  value={page.colorSecondary}
                  onChange={(e) =>
                    handleChange(
                      pageIndex,
                      "colorSecondary",
                      null,
                      e.target.value
                    )
                  }
                  placeholder="Cor Secundária"
                />
              </div>
            )}

            {/* About Page */}
            {page.firstPlace && (
              <div>
                <h3 className="font-semibold">Primeiro Lugar</h3>
                <div className="space-y-2">
                  <label className="block font-medium">Imagem do Primeiro Lugar</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      handleUpload(
                        e.target.files[0],
                        pageIndex,
                        "firstPlace",
                        "image"
                      )
                    }
                  />
                  {page.firstPlace.image && (
                    <Image
                      src={page.firstPlace.image}
                      alt="Pré-visualização"
                      width={300}
                      height={200}
                      className="w-full max-w-md mt-2"
                    />
                  )}
                </div>
                <Input
                  value={page.firstPlace.title2}
                  onChange={(e) =>
                    handleChange(pageIndex, "firstPlace", "title2", e.target.value)
                  }
                  placeholder="Título 2"
                />
                <Input
                  value={page.firstPlace.title1}
                  onChange={(e) =>
                    handleChange(pageIndex, "firstPlace", "title1", e.target.value)
                  }
                  placeholder="Título 1"
                />
                <Textarea
                  value={page.firstPlace.text}
                  onChange={(e) =>
                    handleChange(pageIndex, "firstPlace", "text", e.target.value)
                  }
                  placeholder="Texto"
                />
              </div>
            )}
          </div>
        ))}

        {/* Botão de Salvar */}
        <Button onClick={handleSave} disabled={loading}>
          {loading ? "Salvando..." : "Salvar Alterações"}
        </Button>
      </div>
    </div>
  );
}
