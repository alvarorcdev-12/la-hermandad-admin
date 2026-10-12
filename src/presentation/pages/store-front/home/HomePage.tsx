import * as React from 'react';
import { Link } from 'react-router';
import {
  ArrowRight,
  LogIn,
  TrendingUp,
  ShieldCheck,
  Database,
  Tags,
  Boxes,
  Users,
  Store,
  Smartphone,
  Calendar,
  Layers,
  ArrowUpRight,
} from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Logo } from '@/presentation/components/shared/Logo';

export const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-background text-foreground dark relative selection:bg-emerald-500/30 selection:text-emerald-200 overflow-x-hidden">
      {/* Fondo con Gradientes y Orbes Luminosos (Identidad compartida con AuthLayout) */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-32 -left-32 w-150 h-150 bg-emerald-500/10 rounded-full blur-[140px] animate-pulse duration-1000" />
        <div className="absolute top-1/4 -right-32 w-165.5 h-165.5 bg-blue-500/10 rounded-full blur-[150px]" />
        <div className="absolute -bottom-32 left-1/3 w-175 h-175 bg-emerald-600/5 rounded-full blur-[160px]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(16,185,129,0.06),transparent_70%)]" />
      </div>

      {/* 1. Header / Navbar de Navegación */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-background/80 border-b border-border/60 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo del sistema administrativo */}
          <Logo size="md" showSubtitle />

          {/* Enlaces de Navegación del Panel Web */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
            <a
              href="#dashboard"
              className="hover:text-foreground transition-colors hover:underline underline-offset-4"
            >
              Dashboard & Métricas
            </a>
            <a
              href="#modulos"
              className="hover:text-foreground transition-colors hover:underline underline-offset-4"
            >
              Módulos de Gestión
            </a>
            <a
              href="#ecosistema"
              className="hover:text-foreground transition-colors hover:underline underline-offset-4"
            >
              Web & App Móvil
            </a>
          </nav>

          {/* Único botón: Iniciar Sesión al Panel */}
          <div className="flex items-center gap-3">
            <Link
              to="/auth/login"
              className={buttonVariants({
                className:
                  'h-10 px-5 text-xs sm:text-sm font-semibold bg-primary text-primary-foreground hover:bg-primary/90 shadow-md shadow-primary/10 transition-all duration-200 group',
              })}
            >
              <span>Acceso Administrativo</span>
              <LogIn className="size-4 ml-2 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      </header>

      {/* 2. Hero Section: Centro de Gestión Central */}
      <section className="relative z-10 pt-16 sm:pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        {/* Pill Badge de Contexto */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs font-semibold mb-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
          <Store className="size-3.5" />
          <span>
            Panel de Administración Central & Backoffice · La Hermandad
          </span>
        </div>

        {/* Título Principal */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-foreground max-w-5xl mx-auto leading-[1.1] text-balance">
          Control total de catálogo, sucursales y ganancias de{' '}
          <span className="bg-linear-to-r from-emerald-400 via-teal-300 to-blue-400 bg-clip-text text-transparent">
            La Hermandad
          </span>
        </h1>

        {/* Subtítulo Descriptivo: Web para gestión vs Móvil para caja */}
        <p className="mt-6 text-base sm:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed text-balance font-normal">
          Centro de comando web para administrar productos, categorías, clientes
          y sucursales. Analiza ganancias diarias o por rango de fechas,
          mientras tus cajeros cobran ágilmente desde la aplicación móvil.
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
            <span>Ingresar al Panel de Gestión</span>
            <ArrowRight className="size-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>

          <a
            href="#dashboard"
            className={buttonVariants({
              variant: 'outline',
              className:
                'w-full sm:w-auto h-12 px-8 text-sm font-medium border-border/80 hover:bg-card/80 transition-all',
            })}
          >
            Ver Dashboard & Reportes
          </a>
        </div>

        {/* Micro-indicadores de valor del panel web */}
        <div className="mt-12 pt-8 border-t border-border/40 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto text-xs text-muted-foreground">
          <div className="flex items-center justify-center gap-2">
            <TrendingUp className="size-4 text-emerald-400 shrink-0" />
            <span>Análisis de ingresos y ganancias por fecha</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Boxes className="size-4 text-blue-400 shrink-0" />
            <span>Gestión centralizada de catálogo y stock</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Smartphone className="size-4 text-teal-400 shrink-0" />
            <span>Sincronización en tiempo real con cajas móviles</span>
          </div>
        </div>
      </section>

      {/* 3. Hero Preview: Mockup del Dashboard Administrativo Web */}
      <section
        id="dashboard"
        className="relative z-10 py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto"
      >
        <div className="relative rounded-2xl border border-border/80 bg-card/60 backdrop-blur-xl p-4 sm:p-6 shadow-2xl shadow-emerald-500/5 overflow-hidden">
          {/* Luz ambiental detrás del mockup */}
          <div className="absolute top-0 right-1/4 w-96 h-32 bg-emerald-500/10 blur-3xl pointer-events-none" />

          {/* Barra superior del Dashboard Web */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-border/60 gap-3">
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5">
                <span className="size-3 rounded-full bg-rose-500/80 inline-block" />
                <span className="size-3 rounded-full bg-amber-500/80 inline-block" />
                <span className="size-3 rounded-full bg-emerald-500/80 inline-block" />
              </div>
              <div className="h-4 w-px bg-border" />
              <div className="flex items-center gap-2 text-xs font-semibold text-foreground">
                <Store className="size-3.5 text-emerald-400" />
                <span>Panel de Control · Vista General del Negocio</span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs">
              <span className="px-2.5 py-1 rounded-md bg-muted/60 border border-border text-muted-foreground flex items-center gap-1.5 font-medium">
                <Calendar className="size-3 text-emerald-400" />
                <span>Rango: Hoy (12 de Octubre)</span>
              </span>
              <Badge
                variant="outline"
                className="text-[11px] font-medium border-emerald-500/30 text-emerald-400 bg-emerald-500/10"
              >
                2 Sucursales Activas
              </Badge>
            </div>
          </div>

          {/* Tarjetas de Métricas Administrativas */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 pt-5">
            {/* Ganancias Totales */}
            <div className="p-3.5 sm:p-4 rounded-xl border border-border/70 bg-card/80 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-medium text-muted-foreground">
                  Ganancias Hoy
                </span>
                <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded flex items-center gap-0.5">
                  <ArrowUpRight className="size-3" /> +18.4%
                </span>
              </div>
              <p className="text-xl sm:text-2xl font-extrabold text-foreground tracking-tight">
                Bs. 4,850.00
              </p>
              <p className="text-[10px] text-muted-foreground">
                Margen neto consolidado
              </p>
            </div>

            {/* Ventas desde App Móvil */}
            <div className="p-3.5 sm:p-4 rounded-xl border border-border/70 bg-card/80 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-medium text-muted-foreground">
                  Ventas Realizadas
                </span>
                <span className="text-[10px] font-semibold text-blue-400 bg-blue-500/10 px-1.5 py-0.5 rounded">
                  App Móvil
                </span>
              </div>
              <p className="text-xl sm:text-2xl font-extrabold text-foreground tracking-tight">
                142 pedidos
              </p>
              <p className="text-[10px] text-muted-foreground">
                En cajas de sucursales
              </p>
            </div>

            {/* Catálogo Activo */}
            <div className="p-3.5 sm:p-4 rounded-xl border border-border/70 bg-card/80 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-medium text-muted-foreground">
                  Catálogo Activo
                </span>
                <span className="text-[10px] font-semibold text-teal-400 bg-teal-500/10 px-1.5 py-0.5 rounded">
                  12 Categorías
                </span>
              </div>
              <p className="text-xl sm:text-2xl font-extrabold text-foreground tracking-tight">
                384 productos
              </p>
              <p className="text-[10px] text-muted-foreground">
                Stock total sincronizado
              </p>
            </div>

            {/* Clientes Registrados */}
            <div className="p-3.5 sm:p-4 rounded-xl border border-border/70 bg-card/80 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-medium text-muted-foreground">
                  Clientes Atendidos
                </span>
                <span className="text-[10px] font-semibold text-purple-400 bg-purple-500/10 px-1.5 py-0.5 rounded">
                  Base Activa
                </span>
              </div>
              <p className="text-xl sm:text-2xl font-extrabold text-foreground tracking-tight">
                96 clientes
              </p>
              <p className="text-[10px] text-muted-foreground">
                Historial de compras
              </p>
            </div>
          </div>

          {/* Gráfico y Resumen de Sucursales Simulado */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 pt-5">
            {/* Gráfico de Ventas por Días de la Semana */}
            <div className="lg:col-span-8 p-4 rounded-xl border border-border/70 bg-muted/20 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <TrendingUp className="size-4 text-emerald-400" />
                  <span className="text-xs font-semibold text-foreground">
                    Tendencia de Ganancias por Fechas
                  </span>
                </div>
                <span className="text-[10px] text-muted-foreground font-mono">
                  Últimos 7 días
                </span>
              </div>

              {/* Barras de ventas simuladas */}
              <div className="pt-4 grid grid-cols-7 gap-2 items-end h-32">
                {[
                  { day: 'Lun', height: 'h-16', val: 'Bs. 2.1k' },
                  { day: 'Mar', height: 'h-20', val: 'Bs. 2.8k' },
                  { day: 'Mié', height: 'h-14', val: 'Bs. 1.9k' },
                  { day: 'Jue', height: 'h-24', val: 'Bs. 3.4k' },
                  { day: 'Vie', height: 'h-28', val: 'Bs. 4.2k' },
                  { day: 'Sáb', height: 'h-32', val: 'Bs. 4.8k', active: true },
                  { day: 'Dom', height: 'h-22', val: 'Bs. 3.1k' },
                ].map((item) => (
                  <div
                    key={item.day}
                    className="flex flex-col items-center gap-1.5 h-full justify-end"
                  >
                    <span className="text-[9px] text-muted-foreground font-mono hidden sm:block">
                      {item.val}
                    </span>
                    <div
                      className={`w-full max-w-10 ${item.height} rounded-md transition-all ${
                        item.active
                          ? 'bg-emerald-500 shadow-sm shadow-emerald-500/30'
                          : 'bg-muted-foreground/20 hover:bg-muted-foreground/30'
                      }`}
                    />
                    <span className="text-[10px] font-medium text-muted-foreground">
                      {item.day}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Estado de Sucursales y Canales */}
            <div className="lg:col-span-4 p-4 rounded-xl border border-border/70 bg-card space-y-3.5">
              <span className="text-xs font-semibold text-foreground flex items-center gap-2">
                <Store className="size-4 text-blue-400" />
                Monitoreo por Sucursal
              </span>

              <div className="space-y-2.5 pt-1">
                <div className="p-2.5 rounded-lg border border-border/60 bg-muted/30 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold text-foreground">
                      Sucursal Central
                    </p>
                    <p className="text-[10px] text-muted-foreground">
                      Caja 01 y 02 activas
                    </p>
                  </div>
                  <span className="text-xs font-bold text-emerald-400">
                    Bs. 3,120
                  </span>
                </div>

                <div className="p-2.5 rounded-lg border border-border/60 bg-muted/30 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold text-foreground">
                      Sucursal Norte
                    </p>
                    <p className="text-[10px] text-muted-foreground">
                      Caja 01 activa
                    </p>
                  </div>
                  <span className="text-xs font-bold text-emerald-400">
                    Bs. 1,730
                  </span>
                </div>
              </div>

              {/* Indicador de conexión con app móvil */}
              <div className="pt-2 border-t border-border/50 flex items-center gap-2 text-[11px] text-muted-foreground">
                <Smartphone className="size-3.5 text-teal-400 shrink-0" />
                <span>Cajeros registrando ventas desde App Móvil</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Módulos de Gestión del Sistema Web */}
      <section
        id="modulos"
        className="relative z-10 py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
      >
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge
            variant="outline"
            className="border-emerald-500/30 text-emerald-400 bg-emerald-500/10 mb-3"
          >
            Módulos Administrativos
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground text-balance">
            Todo lo que necesitas para gobernar el negocio desde la web
          </h2>
          <p className="mt-4 text-sm sm:text-base text-muted-foreground">
            Herramientas centrales diseñadas para la gerencia y administración
            de La Hermandad.
          </p>
        </div>

        {/* Grid de 6 Tarjetas de Módulos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* 1. Ganancias y Métricas por Fecha */}
          <Card className="rounded-2xl border-border/70 bg-card/60 backdrop-blur-md shadow-xs hover:border-emerald-500/40 transition-all duration-300 group">
            <CardContent className="p-6 space-y-4">
              <div className="size-12 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center group-hover:scale-105 transition-transform">
                <TrendingUp className="size-6" />
              </div>
              <h3 className="text-lg font-semibold text-foreground group-hover:text-emerald-300 transition-colors">
                Ganancias & Reportes por Fecha
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Supervisa ingresos, costos y márgenes de ganancia filtrando por
                día, semana, mes o rangos personalizados para tomar decisiones
                con información real.
              </p>
            </CardContent>
          </Card>

          {/* 2. Catálogo & Productos */}
          <Card className="rounded-2xl border-border/70 bg-card/60 backdrop-blur-md shadow-xs hover:border-emerald-500/40 transition-all duration-300 group">
            <CardContent className="p-6 space-y-4">
              <div className="size-12 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20 flex items-center justify-center group-hover:scale-105 transition-transform">
                <Boxes className="size-6" />
              </div>
              <h3 className="text-lg font-semibold text-foreground group-hover:text-blue-300 transition-colors">
                Gestión de Productos & Stock
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Creación completa de artículos, variantes, precios de compra y
                venta, fotos, códigos de barra y alertas preventivas de
                inventario crítico.
              </p>
            </CardContent>
          </Card>

          {/* 3. Categorías */}
          <Card className="rounded-2xl border-border/70 bg-card/60 backdrop-blur-md shadow-xs hover:border-emerald-500/40 transition-all duration-300 group">
            <CardContent className="p-6 space-y-4">
              <div className="size-12 rounded-xl bg-teal-500/10 text-teal-400 border border-teal-500/20 flex items-center justify-center group-hover:scale-105 transition-transform">
                <Tags className="size-6" />
              </div>
              <h3 className="text-lg font-semibold text-foreground group-hover:text-teal-300 transition-colors">
                Categorización Inteligente
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Organiza tu mercadería en familias y categorías estructuradas,
                permitiendo que los cajeros las encuentren de inmediato en la
                app móvil.
              </p>
            </CardContent>
          </Card>

          {/* 4. Clientes */}
          <Card className="rounded-2xl border-border/70 bg-card/60 backdrop-blur-md shadow-xs hover:border-emerald-500/40 transition-all duration-300 group">
            <CardContent className="p-6 space-y-4">
              <div className="size-12 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20 flex items-center justify-center group-hover:scale-105 transition-transform">
                <Users className="size-6" />
              </div>
              <h3 className="text-lg font-semibold text-foreground group-hover:text-purple-300 transition-colors">
                Administración de Clientes
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Base centralizada de clientes con historial de compras,
                información de contacto y comportamiento de consumo para planes
                de fidelización.
              </p>
            </CardContent>
          </Card>

          {/* 5. Control Multi-Sucursal */}
          <Card className="rounded-2xl border-border/70 bg-card/60 backdrop-blur-md shadow-xs hover:border-emerald-500/40 transition-all duration-300 group">
            <CardContent className="p-6 space-y-4">
              <div className="size-12 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center justify-center group-hover:scale-105 transition-transform">
                <Store className="size-6" />
              </div>
              <h3 className="text-lg font-semibold text-foreground group-hover:text-amber-300 transition-colors">
                Control Multi-Sucursal
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Supervisa múltiples puntos de venta físicos de La Hermandad,
                transfiriendo inventario y auditando el rendimiento individual
                de cada local.
              </p>
            </CardContent>
          </Card>

          {/* 6. Roles y Seguridad */}
          <Card className="rounded-2xl border-border/70 bg-card/60 backdrop-blur-md shadow-xs hover:border-emerald-500/40 transition-all duration-300 group">
            <CardContent className="p-6 space-y-4">
              <div className="size-12 rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/20 flex items-center justify-center group-hover:scale-105 transition-transform">
                <ShieldCheck className="size-6" />
              </div>
              <h3 className="text-lg font-semibold text-foreground group-hover:text-rose-300 transition-colors">
                Usuarios, Roles & Permisos
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Asigna privilegios específicos para administradores web y
                credenciales para los cajeros que operan la aplicación móvil de
                caja.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* 5. Arquitectura del Ecosistema: Web vs Móvil */}
      <section
        id="ecosistema"
        className="relative z-10 py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-border/40"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <Badge
              variant="outline"
              className="border-blue-500/30 text-blue-400 bg-blue-500/10"
            >
              Arquitectura del Sistema
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground text-balance">
              El panel web gestiona y supervisa; la app móvil atiende y cobra
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              Una sinergia pensada para que la administración tenga control
              total de inventarios y ganancias sin entorpecer el ritmo rápido de
              cobro que el cajero necesita en mostrador.
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3 p-3.5 rounded-xl border border-border/70 bg-card">
                <Layers className="size-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    Sistema Web (Este Portal)
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Para dueños y administradores: catálogo, categorías,
                    clientes, sucursales y análisis financiero por fechas.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-xl border border-border/70 bg-card">
                <Smartphone className="size-5 text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    Aplicación Móvil (Caja & POS)
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Para los cajeros en mostrador: registro veloz de pedidos,
                    cobros con Efectivo/QR, emisión de tickets y apertura de
                    turnos.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Tarjeta de Resumen Operativo */}
          <div className="rounded-2xl border border-border/80 bg-linear-to-br from-card via-background to-card p-8 shadow-xl space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-border/60">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Capacidades Administrativas
              </span>
              <span className="flex items-center gap-1.5 text-xs text-emerald-400 font-medium">
                <Database className="size-3.5" /> Base Centralizada
              </span>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-1">
                <p className="text-2xl sm:text-3xl font-extrabold text-foreground">
                  Por Fecha
                </p>
                <p className="text-xs text-muted-foreground">
                  Filtro de ganancias y ventas
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-2xl sm:text-3xl font-extrabold text-emerald-400">
                  Multi-Sucursal
                </p>
                <p className="text-xs text-muted-foreground">
                  Supervisión integral de locales
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-2xl sm:text-3xl font-extrabold text-blue-400">
                  100%
                </p>
                <p className="text-xs text-muted-foreground">
                  Control de stock y precios
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-2xl sm:text-3xl font-extrabold text-foreground">
                  Auditoría
                </p>
                <p className="text-xs text-muted-foreground">
                  Trazabilidad de cada venta
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
                <span>Acceder al Panel de Gestión</span>
                <ArrowRight className="size-4 ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Call To Action Final (Acceso al Panel Web) */}
      <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center">
        <div className="relative rounded-3xl border border-border/80 bg-linear-to-br from-card via-background to-card p-8 sm:p-14 overflow-hidden shadow-2xl">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight text-balance">
              Accede al Centro de Control de La Hermandad
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground text-balance">
              Inicia sesión con tu cuenta de administrador para gestionar
              productos, sucursales, clientes y revisar el balance de ganancias.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/auth/login"
                className={buttonVariants({
                  className:
                    'w-full sm:w-auto h-12 px-8 font-semibold bg-emerald-500 hover:bg-emerald-600 text-neutral-950 shadow-lg shadow-emerald-500/25 transition-all group',
                })}
              >
                <span>Iniciar Sesión en el Panel Administrativo</span>
                <LogIn className="size-4 ml-2 group-hover:translate-x-1 transition-transform" />
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
            © {new Date().getFullYear()} La Hermandad. Panel Web de Gestión
            Central, Catálogo & Finanzas.
          </p>
          <div className="flex items-center gap-6">
            <Link
              to="/auth/login"
              className="hover:text-foreground transition-colors font-medium"
            >
              Acceso Administrativo
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};
