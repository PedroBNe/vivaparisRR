import { HeaderDashboard } from '@/components/dashboard/header';
import { CustomSidebar } from '@/components/sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import React from 'react';

export default function DashboardLayout({ children }) {
  return (
    <div className="dashboard-layout z-10">
      <HeaderDashboard />

      {/* Conteúdo do dashboard */}
      <main className="flex z-10">
        <aside className='z-10'>
          <SidebarProvider> {/* Envolvendo o CustomSidebar com SidebarProvider */}
            <CustomSidebar /> 
          </SidebarProvider>
        </aside>
        <div className='z-10 bg-white'>
          {children}
        </div>
      </main>
    </div>
  );
}
