import { S3Client, GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";

const s3 = new S3Client({
  region: process.env.NEXT_PUBLIC_AWS_S3_REGION,
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_AWS_S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_S3_SECRET_ACCESS_KEY,
  },
});

const BUCKET_NAME = process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME;
const BLOGS_KEY = "blogs.json";

async function fetchBlogsFromS3() {
  try {
    const data = await s3.send(
      new GetObjectCommand({ Bucket: BUCKET_NAME, Key: BLOGS_KEY })
    );
    const body = await data.Body.transformToString();
    return JSON.parse(body);
  } catch (error) {
    if (error.name === "NoSuchKey") {
      // Se o arquivo não existir, cria um novo arquivo vazio
      console.log("Arquivo blogs.json não encontrado. Criando um novo arquivo vazio.");
      await saveBlogsToS3([]); // Cria o arquivo vazio
      return [];
    }
    throw error;
  }
}

async function saveBlogsToS3(blogs) {
  const blogsString = JSON.stringify(blogs, null, 2);
  await s3.send(
    new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Key: BLOGS_KEY,
      Body: blogsString,
      ContentType: "application/json",
    })
  );
}

export async function GET() {
  try {
    const blogs = await fetchBlogsFromS3();
    return new Response(JSON.stringify(blogs), { status: 200 });
  } catch (error) {
    console.error("Erro ao buscar os blogs do S3:", error);
    return new Response(
      JSON.stringify({ error: "Erro ao buscar posts do S3" }),
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const newBlog = await req.json();
    const blogs = await fetchBlogsFromS3();
    blogs.push(newBlog);
    await saveBlogsToS3(blogs);
    return new Response(JSON.stringify({ message: "Blog salvo com sucesso!" }), {
      status: 200,
    });
  } catch (error) {
    console.error("Erro ao salvar o blog no S3:", error);
    return new Response(
      JSON.stringify({ error: "Erro ao salvar o blog no S3" }),
      { status: 500 }
    );
  }
}