import * as React from 'react';
import { Link } from 'react-router';
import {
  ArrowRight,
  LogIn,
  Zap,
  ShieldCheck,
  Database,
  ShoppingCart,
  Tags,
  Boxes,
  TrendingUp,
  Receipt,
  Users,
  CheckCircle2,
  Clock,
  Sparkles,
  QrCode,
  CreditCard,
  Banknote,
  Search,
} from 'lucide-react';
import { Button, buttonVariants } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Logo } from '@/presentation/components/shared/Logo';

export const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-background text-foreground dark relative selection:bg-emerald-500/30 selection:text-emerald-200 overflow-x-hidden">
      {/* Fondo con Gradientes y Orbes Luminosos (Identidad compartida con AuthLayout) */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-32 -left-32 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[140px] animate-pulse duration-1000" />
        <div className="absolute top-1/4 -right-32 w-[650px] h-[650px] bg-blue-500/10 rounded-full blur-[150px]" />
        <div className="absolute -bottom-32 left-1/3 w-[700px] h-[700px] bg-emerald-600/5 rounded-full blur-[160px]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(16,185,129,0.06),transparent_70%)]" />
      </div>

      {/* 1. Header / Navbar de Navegación */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-background/80 border-b border-border/60 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo del sistema */}
          <Logo size="md" showSubtitle />

          {/* Enlaces de Navegación del Landing (Ocultos en móvil) */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
            <a
              href="#pos"
              className="hover:text-foreground transition-colors hover:underline underline-offset-4"
            >
              Terminal POS
            </a>
            <a
              href="#modulos"
              className="hover:text-foreground transition-colors hover:underline underline-offset-4"
            >
              Módulos
            </a>
            <a
              href="#beneficios"
              className="hover:text-foreground transition-colors hover:underline underline-offset-4"
            >
              Beneficios
            </a>
          </nav>

          {/* Único botón: Iniciar Sesión (Sin registro) */}
          <div className="flex items-center gap-3">
            <Link
              to="/auth/login"
              className={buttonVariants({
                className:
                  'h-10 px-5 text-xs sm:text-sm font-semibold bg-primary text-primary-foreground hover:bg-primary/90 shadow-md shadow-primary/10 transition-all duration-200 group',
              })}
            >
              <span>Iniciar Sesión</span>
            </Link>
          </div>
        </div>
      </header>

      {/* 2. Hero Section */}
      <section className="relative z-10 pt-16 sm:pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        {/* Pill Badge de Estado */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs font-medium mb-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
          <Sparkles className="size-3.5 animate-spin duration-3000" />
          <span>Sistema Integral de Punto de Venta (POS) & Inventario</span>
        </div>

        {/* Título Principal */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-foreground max-w-5xl mx-auto leading-[1.1] text-balance">
          Control total de tus ventas con la agilidad que necesita{' '}
          <span className="bg-linear-to-r from-emerald-400 via-teal-300 to-blue-400 bg-clip-text text-transparent">
            La Hermandad
          </span>
        </h1>

        {/* Subtítulo Descriptivo */}
        <p className="mt-6 text-base sm:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed text-balance font-normal">
          Diseñado específicamente para optimizar la atención en mostrador,
          administrar productos, categorías y existencias en tiempo real,
          garantizando máxima velocidad y precisión en cada cobro.
        </p>

        {/* Botones de Acción del Hero */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/auth/login"
            className={buttonVariants({
              className:
                'w-full sm:w-auto h-12 px-8 text-sm font-semibold bg-emerald-500 hover:bg-emerald-600 text-neutral-950 shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 transition-all duration-300 group',
            })}
          >
            <span>Acceder al Sistema</span>
            <ArrowRight className="size-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>

          <a
            href="#pos"
            className={buttonVariants({
              variant: 'outline',
              className:
                'w-full sm:w-auto h-12 px-8 text-sm font-medium border-border/80 hover:bg-card/80 transition-all',
            })}
          >
            Ver demostración del POS
          </a>
        </div>

        {/* Micro-indicadores de valor */}
        <div className="mt-12 pt-8 border-t border-border/40 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto text-xs text-muted-foreground">
          <div className="flex items-center justify-center gap-2">
            <Zap className="size-4 text-emerald-400 shrink-0" />
            <span>Cobro en caja en menos de 3 segundos</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Database className="size-4 text-blue-400 shrink-0" />
            <span>Sincronización en tiempo real de inventario</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <ShieldCheck className="size-4 text-teal-400 shrink-0" />
            <span>Control de turnos, arqueo y permisos de cajero</span>
          </div>
        </div>
      </section>

      {/* 3. Hero Preview: Mockup Visual Interactivo del Terminal POS */}
      <section
        id="pos"
        className="relative z-10 py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto"
      >
        <div className="relative rounded-2xl border border-border/80 bg-card/60 backdrop-blur-xl p-3 sm:p-5 shadow-2xl shadow-emerald-500/5 overflow-hidden">
          {/* Luz ambiental detrás del mockup */}
          <div className="absolute top-0 right-1/4 w-96 h-32 bg-emerald-500/10 blur-3xl pointer-events-none" />

          {/* Barra superior de la ventana POS simulada */}
          <div className="flex items-center justify-between pb-4 border-b border-border/60">
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5">
                <span className="size-3 rounded-full bg-rose-500/80 inline-block" />
                <span className="size-3 rounded-full bg-amber-500/80 inline-block" />
                <span className="size-3 rounded-full bg-emerald-500/80 inline-block" />
              </div>
              <div className="h-4 w-px bg-border" />
              <div className="flex items-center gap-2 text-xs font-semibold text-foreground">
                <span className="size-2 rounded-full bg-emerald-400 animate-ping inline-block" />
                <span>Caja 01 · Turno Mañana</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Badge
                variant="outline"
                className="text-[11px] font-medium border-emerald-500/30 text-emerald-400 bg-emerald-500/10 hidden sm:inline-flex"
              >
                Cajero: Alejandro R.
              </Badge>
              <span className="text-xs text-muted-foreground font-mono">
                {new Date().toLocaleDateString('es-BO', {
                  weekday: 'short',
                  day: '2-digit',
                  month: 'short',
                })}
              </span>
            </div>
          </div>

          {/* Cuerpo dividido del POS: Catálogo Izquierda + Carrito/Cobro Derecha */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 pt-4">
            {/* Lado Izquierdo: Catálogo de Productos y Filtro por Categorías */}
            <div className="lg:col-span-7 space-y-3">
              {/* Buscador y Categorías Rápidas */}
              <div className="flex items-center justify-between gap-2 p-2.5 rounded-lg bg-muted/40 border border-border/60">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Search className="size-4" />
                  <span>Buscar por nombre o código de barras...</span>
                </div>
                <kbd className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-background border border-border text-muted-foreground">
                  CTRL + K
                </kbd>
              </div>

              {/* Pills de Categorías */}
              <div className="flex gap-1.5 overflow-x-auto pb-1 text-xs">
                {['Todos', 'Bebidas', 'Snacks', 'Abarrotes', 'Lácteos'].map(
                  (cat, idx) => (
                    <span
                      key={cat}
                      className={`px-3 py-1 rounded-md font-medium cursor-pointer transition-colors shrink-0 ${
                        idx === 0
                          ? 'bg-emerald-500 text-neutral-950 font-semibold'
                          : 'bg-muted/50 text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      {cat}
                    </span>
                  ),
                )}
              </div>

              {/* Grid de Productos Demo */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-1">
                {[
                  {
                    name: 'Refresco Cola 2L',
                    cat: 'Bebidas',
                    price: 'Bs. 12.00',
                    stock: '24 disp.',
                  },
                  {
                    name: 'Papas Fritas Clásicas',
                    cat: 'Snacks',
                    price: 'Bs. 8.50',
                    stock: '15 disp.',
                  },
                  {
                    name: 'Agua Mineral 500ml',
                    cat: 'Bebidas',
                    price: 'Bs. 5.00',
                    stock: '40 disp.',
                  },
                  {
                    name: 'Galletas de Chocolate',
                    cat: 'Snacks',
                    price: 'Bs. 6.00',
                    stock: '18 disp.',
                  },
                  {
                    name: 'Leche Entera 1L',
                    cat: 'Lácteos',
                    price: 'Bs. 7.50',
                    stock: '12 disp.',
                  },
                  {
                    name: 'Jugo Natural Naranja',
                    cat: 'Bebidas',
                    price: 'Bs. 9.00',
                    stock: '8 disp.',
                  },
                ].map((item) => (
                  <div
                    key={item.name}
                    className="p-3 rounded-xl border border-border/70 bg-card hover:border-emerald-500/40 transition-all flex flex-col justify-between group cursor-pointer shadow-xs"
                  >
                    <div>
                      <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">
                        {item.cat}
                      </span>
                      <p className="text-xs font-semibold text-foreground line-clamp-1 mt-0.5 group-hover:text-emerald-300 transition-colors">
                        {item.name}
                      </p>
                    </div>
                    <div className="flex items-center justify-between mt-3 pt-2 border-t border-border/40">
                      <span className="text-xs font-bold text-emerald-400">
                        {item.price}
                      </span>
                      <span className="text-[10px] text-muted-foreground">
                        {item.stock}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Lado Derecho: Ticket en Curso y Pasarela de Pago */}
            <div className="lg:col-span-5 rounded-xl border border-border/70 bg-muted/20 p-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-border/60">
                  <div className="flex items-center gap-2">
                    <ShoppingCart className="size-4 text-emerald-400" />
                    <span className="text-xs font-bold text-foreground">
                      Ticket #0148
                    </span>
                  </div>
                  <Badge
                    variant="outline"
                    className="text-[10px] border-border text-muted-foreground"
                  >
                    3 artículos
                  </Badge>
                </div>

                {/* Ítems del Ticket */}
                <div className="space-y-2.5 py-3 text-xs">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium text-foreground">
                        Refresco Cola 2L
                      </p>
                      <p className="text-[11px] text-muted-foreground">
                        2 × Bs. 12.00
                      </p>
                    </div>
                    <span className="font-semibold text-foreground">
                      Bs. 24.00
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium text-foreground">
                        Papas Fritas Clásicas
                      </p>
                      <p className="text-[11px] text-muted-foreground">
                        1 × Bs. 8.50
                      </p>
                    </div>
                    <span className="font-semibold text-foreground">
                      Bs. 8.50
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium text-foreground">
                        Jugo Natural Naranja
                      </p>
                      <p className="text-[11px] text-muted-foreground">
                        2 × Bs. 9.00
                      </p>
                    </div>
                    <span className="font-semibold text-foreground">
                      Bs. 18.00
                    </span>
                  </div>
                </div>
              </div>

              {/* Totales y Métodos de Cobro Rápido */}
              <div className="pt-3 border-t border-border/60 space-y-3">
                <div className="flex justify-between items-baseline">
                  <span className="text-xs font-medium text-muted-foreground">
                    Total a Cobrar
                  </span>
                  <span className="text-xl font-extrabold text-emerald-400">
                    Bs. 50.50
                  </span>
                </div>

                {/* Botones de Métodos de Pago */}
                <div className="grid grid-cols-3 gap-2">
                  <div className="p-2 rounded-lg border border-emerald-500/40 bg-emerald-500/10 text-center cursor-pointer">
                    <Banknote className="size-3.5 mx-auto text-emerald-400" />
                    <span className="text-[10px] font-semibold text-emerald-300 block mt-1">
                      Efectivo
                    </span>
                  </div>
                  <div className="p-2 rounded-lg border border-border bg-card text-center cursor-pointer hover:border-border/80">
                    <QrCode className="size-3.5 mx-auto text-muted-foreground" />
                    <span className="text-[10px] font-medium text-muted-foreground block mt-1">
                      QR Simple
                    </span>
                  </div>
                  <div className="p-2 rounded-lg border border-border bg-card text-center cursor-pointer hover:border-border/80">
                    <CreditCard className="size-3.5 mx-auto text-muted-foreground" />
                    <span className="text-[10px] font-medium text-muted-foreground block mt-1">
                      Tarjeta
                    </span>
                  </div>
                </div>

                {/* Botón de Acción de Cobro */}
                <Button className="w-full h-10 font-bold bg-emerald-500 hover:bg-emerald-600 text-neutral-950 shadow-md">
                  Cobrar Bs. 50.50 (F12)
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Módulos Principales del Sistema */}
      <section
        id="modulos"
        className="relative z-10 py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
      >
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge
            variant="outline"
            className="border-emerald-500/30 text-emerald-400 bg-emerald-500/10 mb-3"
          >
            Módulos Integrados
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground text-balance">
            Todo lo que necesitas para operar tu negocio con excelencia
          </h2>
          <p className="mt-4 text-sm sm:text-base text-muted-foreground">
            Arquitectura moderna diseñada para simplificar el flujo diario de
            ventas y el control administrativo.
          </p>
        </div>

        {/* Grid de 6 Tarjetas de Funcionalidades */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* 1. Terminal POS */}
          <Card className="rounded-2xl border-border/70 bg-card/60 backdrop-blur-md shadow-xs hover:border-emerald-500/40 transition-all duration-300 group">
            <CardContent className="p-6 space-y-4">
              <div className="size-12 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center group-hover:scale-105 transition-transform">
                <Receipt className="size-6" />
              </div>
              <h3 className="text-lg font-semibold text-foreground group-hover:text-emerald-300 transition-colors">
                Terminal Punto de Venta (POS)
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Cobro acelerado de pedidos, cálculo instantáneo de vuelto,
                soporte para múltiples métodos de pago (Efectivo, QR, Tarjeta) y
                emisión rápida de comprobantes.
              </p>
            </CardContent>
          </Card>

          {/* 2. Creación y Control de Productos */}
          <Card className="rounded-2xl border-border/70 bg-card/60 backdrop-blur-md shadow-xs hover:border-emerald-500/40 transition-all duration-300 group">
            <CardContent className="p-6 space-y-4">
              <div className="size-12 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20 flex items-center justify-center group-hover:scale-105 transition-transform">
                <Boxes className="size-6" />
              </div>
              <h3 className="text-lg font-semibold text-foreground group-hover:text-blue-300 transition-colors">
                Gestión de Productos & Stock
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Creación ágil de artículos con precios de venta, costos, códigos
                de barra, imágenes y seguimiento de existencias con alertas de
                stock mínimo.
              </p>
            </CardContent>
          </Card>

          {/* 3. Organización por Categorías */}
          <Card className="rounded-2xl border-border/70 bg-card/60 backdrop-blur-md shadow-xs hover:border-emerald-500/40 transition-all duration-300 group">
            <CardContent className="p-6 space-y-4">
              <div className="size-12 rounded-xl bg-teal-500/10 text-teal-400 border border-teal-500/20 flex items-center justify-center group-hover:scale-105 transition-transform">
                <Tags className="size-6" />
              </div>
              <h3 className="text-lg font-semibold text-foreground group-hover:text-teal-300 transition-colors">
                Categorización Inteligente
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Estructura tu catálogo por familias de productos. Agiliza la
                búsqueda en pantalla del cajero y segmenta tus métricas de
                ventas por rubro.
              </p>
            </CardContent>
          </Card>

          {/* 4. Arqueo y Control de Ventas */}
          <Card className="rounded-2xl border-border/70 bg-card/60 backdrop-blur-md shadow-xs hover:border-emerald-500/40 transition-all duration-300 group">
            <CardContent className="p-6 space-y-4">
              <div className="size-12 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center justify-center group-hover:scale-105 transition-transform">
                <TrendingUp className="size-6" />
              </div>
              <h3 className="text-lg font-semibold text-foreground group-hover:text-amber-300 transition-colors">
                Cierres de Caja & Estadísticas
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Historial completo de pedidos, arqueo por turno y reportes de
                facturación diaria para evitar discrepancias y fugas de
                efectivo.
              </p>
            </CardContent>
          </Card>

          {/* 5. Control de Usuarios y Permisos */}
          <Card className="rounded-2xl border-border/70 bg-card/60 backdrop-blur-md shadow-xs hover:border-emerald-500/40 transition-all duration-300 group">
            <CardContent className="p-6 space-y-4">
              <div className="size-12 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20 flex items-center justify-center group-hover:scale-105 transition-transform">
                <Users className="size-6" />
              </div>
              <h3 className="text-lg font-semibold text-foreground group-hover:text-purple-300 transition-colors">
                Usuarios, Roles & Seguridad
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Asigna accesos diferenciados para administradores, encargados y
                cajeros. Supervisa la actividad con trazabilidad completa.
              </p>
            </CardContent>
          </Card>

          {/* 6. Alta Concurrencia y Rapidez */}
          <Card className="rounded-2xl border-border/70 bg-card/60 backdrop-blur-md shadow-xs hover:border-emerald-500/40 transition-all duration-300 group">
            <CardContent className="p-6 space-y-4">
              <div className="size-12 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center group-hover:scale-105 transition-transform">
                <Zap className="size-6" />
              </div>
              <h3 className="text-lg font-semibold text-foreground group-hover:text-emerald-300 transition-colors">
                Rendimiento de Última Generación
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Construido con React 19 y arquitectura reactiva para garantizar
                tiempos de respuesta inmediatos incluso en horas pico de alta
                demanda.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* 5. Beneficios / Flujo de Trabajo */}
      <section
        id="beneficios"
        className="relative z-10 py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-border/40"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <Badge
              variant="outline"
              className="border-blue-500/30 text-blue-400 bg-blue-500/10"
            >
              Operación Simple & Fluida
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground text-balance">
              Diseñado pensando en la agilidad de tus cajeros y la tranquilidad
              de tu gerencia
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              En negocios con alta afluencia de clientes, cada segundo cuenta.
              Con La Hermandad POS, eliminas filas innecesarias y mantienes el
              control financiero en cada turno.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="size-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    Configuración rápida del catálogo
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Carga tus productos, asigna precios y empieza a facturar el
                    mismo día.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="size-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    Inventario siempre cuadrado
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Las existencias se descuentan al instante con cada venta
                    confirmada.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="size-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    Cierre de turnos sin errores
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Monitoreo exacto de ingresos por método de pago para
                    auditorías claras.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Tarjeta de Resumen Métricas */}
          <div className="rounded-2xl border border-border/80 bg-linear-to-br from-card via-background to-card p-8 shadow-xl space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-border/60">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Métricas Clave del Sistema
              </span>
              <span className="flex items-center gap-1.5 text-xs text-emerald-400 font-medium">
                <Clock className="size-3.5" /> 100% Operativo
              </span>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-1">
                <p className="text-3xl font-extrabold text-foreground">
                  &lt; 3 seg
                </p>
                <p className="text-xs text-muted-foreground">
                  Tiempo promedio de cobro
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-3xl font-extrabold text-emerald-400">
                  99.9%
                </p>
                <p className="text-xs text-muted-foreground">
                  Disponibilidad en línea
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-3xl font-extrabold text-blue-400">0%</p>
                <p className="text-xs text-muted-foreground">
                  Discrepancias en inventario
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-3xl font-extrabold text-foreground">24/7</p>
                <p className="text-xs text-muted-foreground">
                  Respaldo y seguridad
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-border/60">
              <Link
                to="/auth/login"
                className={buttonVariants({
                  className:
                    'w-full h-11 font-semibold bg-primary text-primary-foreground hover:bg-primary/90',
                })}
              >
                <span>Acceder con tus credenciales</span>
                <ArrowRight className="size-4 ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Call To Action Final (Estilo AuthLayout) */}
      <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center">
        <div className="relative rounded-3xl border border-border/80 bg-linear-to-br from-card via-background to-card p-8 sm:p-14 overflow-hidden shadow-2xl">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight text-balance">
              ¿Listo para comenzar a registrar ventas?
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground text-balance">
              Inicia sesión con tu cuenta de cajero o administrador para
              ingresar a la plataforma y gestionar tu turno de trabajo.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/auth/login"
                className={buttonVariants({
                  className:
                    'w-full sm:w-auto h-12 px-8 font-semibold bg-emerald-500 hover:bg-emerald-600 text-neutral-950 shadow-lg shadow-emerald-500/25 transition-all group',
                })}
              >
                <span>Iniciar Sesión en La Hermandad</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Footer */}
      <footer className="relative z-10 border-t border-border/60 py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <Logo size="sm" />
          <p>
            © {new Date().getFullYear()} La Hermandad POS. Sistema de Punto de
            Venta & Gestión Comercial.
          </p>
          <div className="flex items-center gap-6">
            <Link
              to="/auth/login"
              className="hover:text-foreground transition-colors"
            >
              Acceso Administrativo
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};
