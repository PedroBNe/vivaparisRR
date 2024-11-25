import { HeaderDashboard } from '@/components/dashboard/header';
import { CustomSidebar } from '@/components/sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import React from 'react';
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

// Configuração do cliente S3
const s3 = new S3Client({
  region: process.env.NEXT_PUBLIC_AWS_S3_REGION,
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_AWS_S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_S3_SECRET_ACCESS_KEY,
  },
});

async function loadSiteInfo() {
  const bucketName = process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME;
  const key = 'data/informacoes.json';

  try {
    const command = new GetObjectCommand({ Bucket: bucketName, Key: key });
    const data = await s3.send(command);

    if (data.Body) {
      const chunks = [];
      for await (const chunk of data.Body) {
        chunks.push(chunk);
      }
      const bodyContents = Buffer.concat(chunks).toString('utf-8');
      const siteInfo = JSON.parse(bodyContents);
      return siteInfo.nomeSite || "Dashboard";
    }
  } catch (error) {
    console.error("Erro ao carregar 'informacoes.json' do S3:", error);
    return "Dashboard"; // Fallback para o valor padrão
  }
}

export default async function DashboardLayout({ children }) {
  const token = cookies().get('token')?.value;

  // Redireciona para login se o token não estiver presente
  if (!token) {
    redirect('/login');
  }

  try {
    // Verifica a validade do token
    jwt.verify(token, process.env.JWT_SECRET);

    // Carrega as informações do site
    const nomeSite = await loadSiteInfo();

    return (
      <div className="dashboard-layout z-10">
        <HeaderDashboard siteName={nomeSite} />
        <main className="flex z-10">
          <aside className="z-10">
            <SidebarProvider>
              <CustomSidebar />
            </SidebarProvider>
          </aside>
          <div className="z-10 w-full bg-white">{children}</div>
        </main>
      </div>
    );
  } catch (err) {
    console.error("Erro na autenticação:", err);
    return <p>Você não está autenticado. Faça login. {err}</p>;
  }
}
