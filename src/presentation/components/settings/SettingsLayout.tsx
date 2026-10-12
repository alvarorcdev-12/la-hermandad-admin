import * as React from 'react';
import { Outlet, useNavigate } from 'react-router';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { SettingsSidebar } from './SettingsSidebar';

export const SettingsLayout: React.FC = () => {
  const navigate = useNavigate();

  const handleClose = () => {
    navigate('/admin');
  };

  return (
    <Dialog open={true} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent
        showCloseButton={false}
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[calc(100vw-1rem)] sm:w-[calc(100vw-2rem)] sm:max-w-[calc(100vw-2rem)] xl:max-w-380 h-[calc(100vh-1.5rem)] sm:h-[calc(100vh-2.5rem)] max-h-[calc(100vh-2.5rem)] p-0 gap-0 overflow-hidden rounded-2xl bg-card border border-border shadow-2xl flex flex-col z-50 focus:outline-hidden"
      >
        <DialogTitle className="sr-only">Configuración del Sistema</DialogTitle>

        {/* Botón flotante superior derecho para cerrar y volver al admin */}
        <div className="absolute top-3 right-3 z-30">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleClose}
            className="h-8 w-8 rounded-lg hover:bg-accent text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="size-4" />
            <span className="sr-only">Cerrar configuración</span>
          </Button>
        </div>

        {/* Estructura dividida en 2 columnas */}
        <div className="flex flex-1 h-full w-full overflow-hidden">
          {/* Columna Izquierda: Barra de navegación interna con React Router */}
          <aside className="w-64 sm:w-72 md:w-80 border-r border-border bg-sidebar flex flex-col shrink-0">
            <SettingsSidebar />
          </aside>

          {/* Columna Derecha: Renderiza la ruta activa a través del Outlet */}
          <main className="flex-1 h-full overflow-y-auto bg-muted dark:bg-background p-6 md:p-8 scrollbar-thin">
            <div className="mt-7 space-y-6 pb-12">
              <Outlet />
            </div>
          </main>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsLayout;
