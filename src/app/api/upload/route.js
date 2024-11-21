import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from "uuid";

const s3Client = new S3Client({
  region: process.env.AWS_S3_REGION,
  credentials: {
    accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
  },
});

const bucketName = process.env.AWS_S3_BUCKET_NAME;

// Helper function to convert ReadableStream to Buffer
async function streamToBuffer(stream) {
  const chunks = [];
  for await (const chunk of stream) {
    chunks.push(chunk);
  }
  return Buffer.concat(chunks);
}

export async function POST(req) {
  try {
    const form = await req.formData();
    const file = form.get("file");

    if (!file) {
      return new Response(JSON.stringify({ error: "No file uploaded" }), {
        status: 400,
      });
    }

    const fileStream = file.stream();
    const fileBuffer = await streamToBuffer(fileStream); // Convert stream to Buffer
    const fileExtension = file.name.split(".").pop();
    const fileName = `${uuidv4()}.${fileExtension}`;
    const filePath = `uploads/${fileName}`;

    const command = new PutObjectCommand({
      Bucket: bucketName,
      Key: filePath,
      Body: fileBuffer,
      ContentType: file.type,
    });

    await s3Client.send(command);

    const url = `https://${bucketName}.s3.${process.env.AWS_S3_REGION}.amazonaws.com/${filePath}`;

    return new Response(JSON.stringify({ url }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Erro ao fazer upload:", error);
    return new Response(JSON.stringify({ error: "Erro ao fazer upload" }), {
      status: 500,
    });
  }
}