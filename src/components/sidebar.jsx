'use client'

import { Home, BarChart2, Users, Settings, Mail, BookOpenText, Archive, Siren, NotebookPen, TvMinimal, PictureInPicture2, Contact, HandPlatter, FileText, MessageCircle } from 'lucide-react'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar'

const menuItems = [
  { icon: Home, label: 'Home', href: '/dashboard' },
  { icon: BarChart2, label: 'Analytics', href: '/dashboard/analytics' },
  { icon: Users, label: 'clientes', href: '/dashboard/clientes' },
  { icon: Settings, label: 'Configurações', href: '/dashboard/configuracoes' },
  { icon: Mail, label: 'E-mails', href: '/dashboard/emails' },
  { icon: BookOpenText, label: 'Formulários', href: '/dashboard/formularios' },
  { icon: Archive, label: 'Leads', href: '/dashboard/leads' },
  { icon: Siren, label: 'Lgpd', href: '/dashboard/lgpd' },
  { icon: NotebookPen, label: 'Página blog', href: '/dashboard/blog' },
  { icon: TvMinimal, label: 'Página inicial', href: '/dashboard/inicial' },
  { icon: PictureInPicture2, label: 'Pop-up', href: '/dashboard/popup' },
  { icon: Contact, label: 'Redes sociais', href: '/dashboard/sociais' },
  { icon: HandPlatter, label: 'Serviços', href: '/dashboard/servicos' },
  { icon: FileText, label: 'Textos e imagens', href: '/dashboard/textosimagens' },
  { icon: MessageCircle, label: 'Whatsapp', href: '/dashboard/whatsapp' },
]

export const CustomSidebar = () => {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton asChild>
                    <a href={item.href}>
                      <item.icon className="mr-2 h-4 w-4" />
                      {item.label}
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}