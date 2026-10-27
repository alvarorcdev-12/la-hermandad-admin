import { useState } from 'react';
import {
  Home,
  Inbox,
  Menu,
  Settings,
  Tag,
  User,
  UserShield,
} from 'lucide-react';

import { NavItem } from './NavItem';
import { Button } from '@/components/ui/button';
import { Logo } from '../shared/Logo';

export const Sidebar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNavigation = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <Button
        variant="ghost"
        className="lg:hidden fixed top-4 left-4 z-70"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        <Menu className="size-5 text-neutral-600 dark:text-neutral-300" />
      </Button>
      <nav
        className={`
                fixed inset-y-0 left-0 z-50 w-64 bg-background transform transition-transform duration-200 ease-in-out
                lg:translate-x-0 lg:static lg:w-64 border-r
                ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
            `}
      >
        <div className="h-full flex flex-col">
          <div className="h-16 px-6 flex items-center border-b">
            <Logo size="sm" to="/" />
          </div>

          <div className="flex-1 overflow-y-auto py-4 px-4">
            <div className="space-y-6">
              <div>
                <div className="px-3 mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  General
                </div>
                <div className="space-y-1">
                  <NavItem
                    to="/admin"
                    Icon={Home}
                    onNavigation={handleNavigation}
                  >
                    Inicio
                  </NavItem>
                  <NavItem
                    to="/admin/orders"
                    Icon={Inbox}
                    onNavigation={handleNavigation}
                  >
                    Pedidos
                  </NavItem>
                  <NavItem
                    to="/admin/products"
                    Icon={Tag}
                    onNavigation={handleNavigation}
                    subItems={[
                      {
                        to: '/admin/categories',
                        children: 'Categorías',
                      },
                    ]}
                  >
                    Productos
                  </NavItem>
                  <NavItem
                    to="/admin/customers"
                    Icon={User}
                    onNavigation={handleNavigation}
                  >
                    Clientes
                  </NavItem>
                  <div className="px-3 mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Grupo
                  </div>
                  <NavItem to="/admin/users" Icon={UserShield}>
                    Usuarios
                  </NavItem>
                </div>
              </div>
            </div>
          </div>

          <div className="px-4 py-4 border-t">
            <div className="space-y-1">
              <NavItem
                to="/admin/settings"
                Icon={Settings}
                onNavigation={handleNavigation}
              >
                Ajustes
              </NavItem>
            </div>
          </div>
        </div>
      </nav>

      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-65 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
};
