import React from 'react';

export default function DashboardLayout({ children }) {
  return (
    <div className="dashboard-layout">
      {/* Cabeçalho específico do dashboard */}
      <header className="dashboard-header">
        <h1>Dashboard</h1>
        {/* Navegação ou links específicos do dashboard */}
        <nav>
          <a href="/dashboard">Home</a>
          <a href="/dashboard/settings">Configurações</a>
          <a href="/dashboard/profile">Perfil</a>
        </nav>
      </header>

      {/* Conteúdo do dashboard */}
      <main className="dashboard-content">
        {children}
      </main>

      {/* Rodapé específico do dashboard */}
      <footer className="dashboard-footer">
        <p>Footer do Dashboard</p>
      </footer>
    </div>
  );
}
