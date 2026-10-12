import * as React from 'react';
import { Link } from 'react-router';
import { cn } from '@/lib/utils';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  to?: string;
  showSubtitle?: boolean;
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({
  size = 'md',
  to = '/',
  showSubtitle = false,
  className,
}) => {
  const sizeConfig = {
    sm: {
      iconSize: 'size-7',
      svgSize: 'size-4',
      textSize: 'text-base',
      subSize: 'text-[9px]',
    },
    md: {
      iconSize: 'size-9',
      svgSize: 'size-5',
      textSize: 'text-lg',
      subSize: 'text-[10px]',
    },
    lg: {
      iconSize: 'size-11',
      svgSize: 'size-6',
      textSize: 'text-xl',
      subSize: 'text-xs',
    },
  }[size];

  const content = (
    <div className={cn('inline-flex items-center gap-2.5 group select-none', className)}>
      {/* Icono / Emblema 'LH' Geométrico con Glow compatible con Light y Dark mode */}
      <div
        className={cn(
          sizeConfig.iconSize,
          'relative rounded-xl flex items-center justify-center shrink-0',
          // Fondo gradiente adaptado a Light / Dark
          'bg-linear-to-br from-emerald-500/10 via-card to-blue-500/10 dark:from-emerald-500/20 dark:via-card dark:to-blue-500/20',
          // Bordes y sombras adaptadas
          'border border-emerald-500/30 dark:border-emerald-500/30 group-hover:border-emerald-500/60 shadow-xs shadow-emerald-500/5 dark:shadow-emerald-500/15',
          'transition-all duration-300 group-hover:scale-105 group-hover:shadow-emerald-500/20'
        )}
      >
        <div className="absolute inset-0 rounded-xl bg-linear-to-tr from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

        {/* Isotipo SVG de La Hermandad: color esmeralda contrastado en Light (emerald-600) y Dark (emerald-400) */}
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={cn(
            sizeConfig.svgSize,
            'text-emerald-600 dark:text-emerald-400 group-hover:text-emerald-700 dark:group-hover:text-emerald-300 transition-colors'
          )}
        >
          {/* Estructura geométrica entrelazada representando hermandad y punto de venta */}
          <path d="M4 7l8-4 8 4-8 4-8-4z" />
          <path d="M4 12l8 4 8-4" />
          <path d="M4 17l8 4 8-4" />
          <path d="M12 3v18" className="opacity-40" />
        </svg>
      </div>

      {/* Tipografía de la marca: sin estilos rígidos que fallen al cambiar de tema */}
      <div className="flex flex-col leading-tight">
        <div className="flex items-center gap-1.5">
          <span
            className={cn(
              sizeConfig.textSize,
              'font-bold tracking-tight text-foreground transition-colors group-hover:text-emerald-600 dark:group-hover:text-emerald-400'
            )}
          >
            La Hermandad
          </span>
          <span className="text-[10px] font-semibold tracking-wider uppercase px-1.5 py-0.5 rounded-md bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20 dark:border-emerald-500/30">
            POS
          </span>
        </div>
        {showSubtitle && (
          <span className={cn(sizeConfig.subSize, 'text-muted-foreground font-medium')}>
            Sistema de Ventas & Gestión
          </span>
        )}
      </div>
    </div>
  );

  if (to) {
    return (
      <Link to={to} className="focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring rounded-lg">
        {content}
      </Link>
    );
  }

  return content;
};
