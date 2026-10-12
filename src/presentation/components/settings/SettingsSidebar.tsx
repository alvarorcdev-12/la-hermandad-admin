import * as React from 'react';
import { NavLink, useLocation } from 'react-router';
import { Building2, Users, Store, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

interface SubSectionItem {
  to: string;
  label: string;
}

interface SettingsSectionItem {
  to: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  subItems?: SubSectionItem[];
}

const SETTINGS_SECTIONS: SettingsSectionItem[] = [
  { to: '/admin/settings/general', label: 'General', icon: Building2 },
  // { to: '/admin/settings/plan', label: 'Plan', icon: CreditCard },
  // { to: '/admin/settings/billing', label: 'Facturación', icon: Receipt },
  {
    to: '/admin/settings/organization',
    label: 'Usuarios',
    icon: Users,
    // subItems: [
    //   { to: '/admin/settings/organization/roles', label: 'Roles' },
    //   { to: '/admin/settings/organization/security', label: 'Seguridad' },
    // ],
  },
  // { to: '/admin/settings/payments', label: 'Pagos', icon: PaymentIcon },
  // { to: '/admin/settings/shipping', label: 'Envío y entrega', icon: Truck },
  // { to: '/admin/settings/taxes', label: 'Impuestos y aranceles', icon: Percent },
  { to: '/admin/settings/locations', label: 'Sucursales', icon: Store },
  // { to: '/admin/settings/markets', label: 'Mercados', icon: Globe },
  // { to: '/admin/settings/apps', label: 'Apps y canales de ventas', icon: LayoutGrid },
  // { to: '/admin/settings/channels', label: 'Canales de ventas', icon: Radio },
  // { to: '/admin/settings/notifications', label: 'Notificaciones', icon: Bell },
  // { to: '/admin/settings/custom-data', label: 'Metacampos y metaobjetos', icon: Sliders },
  // { to: '/admin/settings/languages', label: 'Idiomas', icon: Languages },
  // { to: '/admin/settings/privacy', label: 'Privacidad del cliente', icon: ShieldCheck },
  // { to: '/admin/settings/policies', label: 'Políticas', icon: FileText },
];

export const SettingsSidebar: React.FC = () => {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = React.useState('');

  const filteredSections = React.useMemo(() => {
    return SETTINGS_SECTIONS.filter(
      (section) =>
        section.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
        section.subItems?.some((sub) =>
          sub.label.toLowerCase().includes(searchQuery.toLowerCase()),
        ),
    );
  }, [searchQuery]);

  return (
    <div className="flex flex-col h-full bg-sidebar text-sidebar-foreground select-none">
      {/* Cabecera de la Tienda / Negocio */}
      <div className="p-4 border-b border-sidebar-border flex items-center gap-3">
        <Avatar className="h-10 w-10 rounded-lg border border-sidebar-border bg-primary text-primary-foreground font-medium">
          <AvatarFallback className="bg-primary text-primary-foreground font-semibold text-xs">
            LH
          </AvatarFallback>
        </Avatar>
        <div className="min-w-0 flex-1">
          <h2 className="text-sm font-semibold truncate text-foreground">
            La Hermandad
          </h2>
          <p className="text-xs text-muted-foreground truncate">
            la-hermandad.admin
          </p>
        </div>
      </div>

      {/* Buscador dentro de Configuración */}
      <div className="p-3">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 size-4 text-muted-foreground pointer-events-none" />
          <Input
            type="search"
            placeholder="Buscar"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8 h-9 text-xs bg-background border-input placeholder:text-muted-foreground focus-visible:ring-1 focus-visible:ring-ring"
          />
        </div>
      </div>

      {/* Lista de Secciones Navegables con React Router */}
      <div className="flex-1 overflow-y-auto px-2 pb-3 space-y-0.5 scrollbar-thin">
        {filteredSections.map((item) => {
          const Icon = item.icon;
          const isParentActive =
            location.pathname === item.to ||
            location.pathname.startsWith(item.to + '/');

          return (
            <div key={item.to} className="flex flex-col">
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  cn(
                    'w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-colors text-left group',
                    isActive || (isParentActive && !item.subItems)
                      ? 'bg-sidebar-accent text-sidebar-accent-foreground font-semibold shadow-xs'
                      : 'text-sidebar-foreground/80 hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground',
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    <Icon
                      className={cn(
                        'size-4 shrink-0 transition-colors',
                        isActive || isParentActive
                          ? 'text-sidebar-accent-foreground'
                          : 'text-muted-foreground group-hover:text-sidebar-accent-foreground',
                      )}
                    />
                    <span className="truncate">{item.label}</span>
                  </>
                )}
              </NavLink>

              {/* Sub-items (Roles, Seguridad, etc.) */}
              {item.subItems && isParentActive && (
                <div className="flex flex-col gap-0.5 mt-0.5 pl-7 border-l border-sidebar-border ml-4.5 my-1">
                  {item.subItems.map((sub) => (
                    <NavLink
                      key={sub.to}
                      to={sub.to}
                      className={({ isActive }) =>
                        cn(
                          'px-2.5 py-1.5 rounded-md text-[11px] font-medium transition-colors',
                          isActive
                            ? 'bg-sidebar-accent text-sidebar-accent-foreground font-semibold'
                            : 'text-muted-foreground hover:text-sidebar-accent-foreground hover:bg-sidebar-accent/40',
                        )
                      }
                    >
                      {sub.label}
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
          );
        })}

        {filteredSections.length === 0 && (
          <div className="px-3 py-6 text-center text-xs text-muted-foreground">
            No se encontraron secciones
          </div>
        )}
      </div>

      {/* Footer de Usuario */}
      <div className="p-3 border-t border-sidebar-border bg-sidebar-accent/20 flex items-center gap-2.5">
        <Avatar className="h-8 w-8 rounded-full border border-sidebar-border bg-secondary text-secondary-foreground">
          <AvatarFallback className="text-xs font-medium">AD</AvatarFallback>
        </Avatar>
        <div className="min-w-0 flex-1">
          <p className="text-xs font-medium truncate text-foreground">
            Administrador
          </p>
          <p className="text-[11px] text-muted-foreground truncate">
            admin@lahermandad.com
          </p>
        </div>
      </div>
    </div>
  );
};
