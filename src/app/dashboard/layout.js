import { HeaderDashboard } from '@/components/dashboard/header';
import { CustomSidebar } from '@/components/sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import React from 'react';

export default function DashboardLayout({ children }) {
  return (
    <div className="dashboard-layout">
      <HeaderDashboard />

      {/* Conteúdo do dashboard */}
      <main className="flex">
      <aside>
        <SidebarProvider> {/* Envolvendo o CustomSidebar com SidebarProvider */}
          <CustomSidebar /> 
        </SidebarProvider>
      </aside>
        {children}
      </main>
    </div>
  );
}
