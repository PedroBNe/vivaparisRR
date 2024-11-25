import { S3Client, GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";

const s3Client = new S3Client({
  region: process.env.NEXT_PUBLIC_AWS_S3_REGION,
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_AWS_S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_S3_SECRET_ACCESS_KEY,
  },
});

const bucketName = process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME;
const fileKey = "data.json";

export async function GET(req) {
  try {
    const command = new GetObjectCommand({
      Bucket: bucketName,
      Key: fileKey,
    });

    const response = await s3Client.send(command);

    const streamToString = (stream) =>
      new Promise((resolve, reject) => {
        const chunks = [];
        stream.on("data", (chunk) => chunks.push(chunk));
        stream.on("error", reject);
        stream.on("end", () => resolve(Buffer.concat(chunks).toString("utf-8")));
      });

    const data = await streamToString(response.Body);

    return new Response(data, {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Erro ao obter dados:", error);
    return new Response(JSON.stringify({ error: "Erro ao carregar os dados" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function POST(req) {
  try {
    const body = await req.json();

    const command = new PutObjectCommand({
      Bucket: bucketName,
      Key: fileKey,
      Body: JSON.stringify(body, null, 2),
      ContentType: "application/json",
    });

    await s3Client.send(command);

    return new Response(JSON.stringify({ message: "Dados salvos com sucesso!" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Erro ao salvar dados:", error);
    return new Response(JSON.stringify({ error: "Erro ao salvar os dados" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
