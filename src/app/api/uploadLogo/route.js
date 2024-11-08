import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { NextResponse } from 'next/server';

export async function POST(req) {
  const data = await req.formData();
  const file = data.get('file');

  if (!file) {
    return NextResponse.json({ message: 'No file provided' }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  
  try {
    const filePath = path.join(process.cwd(), 'public', 'logo.png');
    
    // Define uma altura maior para preservar qualidade e calcula a largura para manter a proporção 1.6
    const desiredHeight = 600;  // Aumenta a altura para preservar a qualidade
    const desiredWidth = Math.round(desiredHeight * 1.6);

    // Usa o Sharp para redimensionar mantendo a proporção 1.6
    await sharp(buffer)
      .resize({
        width: desiredWidth,
        height: desiredHeight,
        fit: 'cover',           // Garante que a imagem preencha o contêiner, cortando se necessário
        position: 'center'      // Centraliza a imagem no caso de corte
      })
      .toFile(filePath);

    return NextResponse.json({ message: 'Logo updated successfully!' });
  } catch (error) {
    console.error("Error resizing and saving logo:", error);
    return NextResponse.json({ message: 'Error processing image' }, { status: 500 });
  }
}
