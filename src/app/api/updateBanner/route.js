import { S3Client, GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { NextResponse } from "next/server";

// Configuração do S3
const s3Client = new S3Client({
  region: process.env.NEXT_PUBLIC_AWS_S3_REGION,
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_AWS_S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_S3_SECRET_ACCESS_KEY,
  },
});

const bucketName = process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME;
const fileKey = "data.json";

// Helper para transformar stream em string
async function streamToString(stream) {
  const chunks = [];
  for await (const chunk of stream) {
    chunks.push(chunk);
  }
  return Buffer.concat(chunks).toString("utf-8");
}

// GET: Retorna o banner
export async function GET() {
  try {
    const command = new GetObjectCommand({
      Bucket: bucketName,
      Key: fileKey,
    });
    const response = await s3Client.send(command);
    const fileContents = await streamToString(response.Body);

    const data = JSON.parse(fileContents);
    return NextResponse.json(data[0].banner); // Envia apenas a seção de banner
  } catch (error) {
    console.error("Error reading banner data from S3:", error);
    return NextResponse.json({ message: "Error reading banner data" }, { status: 500 });
  }
}

// POST: Atualiza o banner
export async function POST(req) {
  const { title, subtitle } = await req.json();

  try {
    // Obter o arquivo atual do S3
    const getCommand = new GetObjectCommand({
      Bucket: bucketName,
      Key: fileKey,
    });
    const getResponse = await s3Client.send(getCommand);
    const fileContents = await streamToString(getResponse.Body);
    const data = JSON.parse(fileContents);

    // Atualizar os dados do banner
    data[0].banner.title = title;
    data[0].banner.subtitle = subtitle;

    // Subir o arquivo atualizado para o S3
    const putCommand = new PutObjectCommand({
      Bucket: bucketName,
      Key: fileKey,
      Body: JSON.stringify(data, null, 2),
      ContentType: "application/json",
    });
    await s3Client.send(putCommand);

    return NextResponse.json({ message: "Banner updated successfully!" });
  } catch (error) {
    console.error("Error updating banner data in S3:", error);
    return NextResponse.json({ message: "Error updating banner data" }, { status: 500 });
  }
}
