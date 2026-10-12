import { Outlet } from 'react-router';
import { TrendingUp, Boxes, Store, Smartphone } from 'lucide-react';
import { Logo } from '../components/shared/Logo';

const systemStats = [
  { value: 'En tiempo real', label: 'Reporte de ganancias' },
  { value: 'Multi-sucursal', label: 'Control centralizado' },
  { value: '100%', label: 'Sincronización móvil' },
];

const systemPillars = [
  { icon: TrendingUp, label: 'Métricas de ventas por fechas' },
  { icon: Boxes, label: 'Catálogo, productos y categorías' },
  { icon: Smartphone, label: 'Conexión directa con app de caja' },
];

const AuthLayout = () => {
  return (
    <div className="bg-background text-foreground dark">
      <div className="min-h-screen flex">
        {/* Panel lateral izquierdo - Contexto de Administración Central La Hermandad */}
        <div className="hidden lg:flex lg:w-1/2 bg-linear-to-br from-card via-background to-card relative overflow-hidden">
          {/* Orbes luminosos de fondo */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/4 -left-20 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-gradient" />
            <div
              className="absolute bottom-1/4 -right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-gradient"
              style={{ animationDelay: '-7s' }}
            />
          </div>

          {/* Contenido del panel de administración */}
          <div className="relative z-10 flex flex-col justify-between p-12 w-full">
            {/* Logo del sistema */}
            <Logo size="lg" showSubtitle />

            {/* Identidad y propósito del sistema web */}
            <div className="space-y-8 my-auto">
              <div className="space-y-4 max-w-lg">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs font-semibold">
                  <Store className="size-3.5" />
                  <span>Panel Administrativo Central</span>
                </div>

                <h1 className="text-3xl font-extrabold tracking-tight text-foreground leading-snug text-balance">
                  Centro de Gestión, Catálogo & Métricas
                </h1>

                <p className="text-base text-muted-foreground leading-relaxed">
                  Plataforma web oficial para la administración de <span className="text-foreground font-semibold">La Hermandad</span>. Gestiona productos, categorías, clientes y sucursales, y supervisa las ganancias en tiempo real generadas desde la aplicación móvil de caja.
                </p>
              </div>

              {/* Indicadores clave del panel web */}
              <div className="flex gap-8 pt-6 border-t border-border">
                {systemStats.map((stat) => (
                  <div key={stat.label}>
                    <p className="text-xl font-extrabold text-foreground tracking-tight">
                      {stat.value}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Pilares administrativos en el pie */}
            <div className="flex flex-wrap gap-6 pt-6 border-t border-border/60">
              {systemPillars.map((pillar) => (
                <div
                  key={pillar.label}
                  className="flex items-center gap-2 text-muted-foreground text-xs"
                >
                  <pillar.icon className="size-4 text-emerald-400 shrink-0" />
                  <span>{pillar.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Área de formulario de inicio de sesión */}
        <main className="flex-1 flex flex-col">
          {/* Header móvil con logo */}
          <div className="lg:hidden p-6 pb-0">
            <Logo size="md" showSubtitle />
          </div>

          <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
            <div className="w-full max-w-md animate-in fade-in slide-in-from-bottom-4 duration-500">
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AuthLayout;
