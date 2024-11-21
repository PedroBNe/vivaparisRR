import AWS from "aws-sdk";

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const bucketName = process.env.S3_BUCKET_NAME;
const fileKey = "data.json";

export async function GET(req) {
  try {
    const data = await s3
      .getObject({
        Bucket: bucketName,
        Key: fileKey,
      })
      .promise();

    const jsonData = JSON.parse(data.Body.toString("utf-8"));

    return new Response(JSON.stringify(jsonData), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Erro ao acessar o S3:", error);
    return new Response(
      JSON.stringify({ error: "Erro ao acessar o S3" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

export async function PUT(req) {
  try {
    const body = await req.json(); // Dados enviados no corpo da requisição

    // Converta os dados recebidos para JSON
    const jsonData = JSON.stringify(body, null, 2);

    // Substitua o arquivo no bucket
    await s3
      .putObject({
        Bucket: bucketName,
        Key: fileKey,
        Body: jsonData,
        ContentType: "application/json",
      })
      .promise();

    return new Response(JSON.stringify({ message: "Arquivo atualizado com sucesso!" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Erro ao editar o arquivo no S3:", error);
    return new Response(
      JSON.stringify({ error: "Erro ao editar o arquivo no S3" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
