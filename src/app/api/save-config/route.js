import AWS from 'aws-sdk';

export async function POST(request) {
  const body = await request.json();

  const s3 = new AWS.S3({
    region: process.env.AWS_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  });

  const params = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: 'data.json',
    Body: JSON.stringify(body),
    ContentType: 'application/json',
  };

  try {
    await s3.putObject(params).promise();
    return new Response(JSON.stringify({ message: 'Configuração salva com sucesso!' }), { status: 200 });
  } catch (error) {
    console.error('Erro ao salvar configuração no S3:', error);
    return new Response(JSON.stringify({ message: 'Erro ao salvar configuração', error }), { status: 500 });
  }
}
