import { useState } from 'react';
import { Link } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import {
  LayoutDashboard,
  Calendar as CalendarIcon,
  CircleDollarSign,
  Inbox,
  Boxes,
  CheckCircle2,
  ArrowRight,
  Plus,
  Users,
  Tag,
  Store,
  ExternalLink,
} from 'lucide-react';

import { Button, buttonVariants } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

import { AdminTitle } from '@/presentation/components/admin/AdminTitle';
import { OrderStatusBadge } from '@/presentation/components/orders/OrderStatusBadge';
import { OrderFinancialStatusBadge } from '@/presentation/components/orders/OrderFinancialStatusBadge';

import { getOrdersStatsAction } from '@/actions/orders/get-orders-stats.action';
import { getOrdersPaginationAction } from '@/actions/orders/get-orders-pagination.action';
import { useCustomers } from '@/presentation/hooks/customers/useCustomers';
import { useProducts } from '@/presentation/hooks/products/useProducts';

import { Formatter } from '@/utils/formatter';
import { getRangeLabel } from '@/utils/get-range-label';
import { mapDateRangeToApiParams } from '@/utils/date-filters';

import type { DateRange } from 'react-day-picker';

const DashboardPage = () => {
  // 1. Filtro de Fechas
  const [date, setDate] = useState<DateRange | undefined>();
  const dateParams = mapDateRangeToApiParams(date);

  // 2. Datos Reales de Estadísticas (KPIs)
  const { data: stats, isLoading: isLoadingStats } = useQuery({
    queryKey: ['orders-stats', dateParams],
    queryFn: () =>
      getOrdersStatsAction(dateParams.startDate, dateParams.endDate),
  });

  // 3. Datos Reales de Pedidos Recientes
  const { data: recentOrders = [], isLoading: isLoadingOrders } = useQuery({
    queryKey: ['recent-orders'],
    queryFn: () =>
      getOrdersPaginationAction({
        page: 1,
        limit: 5,
        sort: 'createdAt',
        direction: 'desc',
      }),
  });

  // 4. Datos Reales de Clientes Recientes
  const { data: customersData, isLoading: isLoadingCustomers } = useCustomers({
    page: 1,
    limit: 5,
    sort: 'createdAt',
    direction: 'desc',
  });
  const recentCustomers = customersData?.results || [];

  // 5. Datos Reales de Catálogo de Productos
  const { data: productsData, isLoading: isLoadingProducts } = useProducts({
    page: 1,
    limit: 4,
    sort: 'createdAt',
    direction: 'desc',
  });
  const recentProducts = productsData?.results || [];

  return (
    <div className="space-y-6">
      {/* Encabezado del Dashboard con Selector de Fecha y Acciones */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <AdminTitle title="Dashboard" Icon={LayoutDashboard} />

        <div className="flex items-center gap-2.5 flex-wrap">
          {/* Selector de Rango de Fechas */}
          <Popover>
            <PopoverTrigger
              render={
                <Button
                  variant="outline"
                  size="sm"
                  className="h-9 gap-2 text-xs font-medium border-border"
                >
                  <CalendarIcon className="size-3.5 text-muted-foreground" />
                  <span>{getRangeLabel(date)}</span>
                </Button>
              }
            />
            <PopoverContent className="w-auto p-0" align="end">
              <Calendar
                mode="range"
                defaultMonth={date?.from}
                selected={date}
                onSelect={setDate}
              />
            </PopoverContent>
          </Popover>

          {/* Acceso Rápido: Crear Pedido */}
          <Link
            to="/admin/orders/new"
            className={buttonVariants({
              size: 'sm',
              className: 'h-9 text-xs font-semibold gap-1.5 shadow-xs',
            })}
          >
            <Plus className="size-3.5" />
            <span>Nuevo Pedido</span>
          </Link>
        </div>
      </div>

      {/* Grid de KPIs Estadísticos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1: Total Ventas / Ingresos */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <span className="text-xs font-medium text-muted-foreground">
              Ventas Totales
            </span>
            <div className="size-8 rounded-lg bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 flex items-center justify-center">
              <CircleDollarSign className="size-4" />
            </div>
          </CardHeader>
          <CardContent className="p-5 pt-0 space-y-1">
            {isLoadingStats ? (
              <>
                <Skeleton className="h-7 w-28" />
                <Skeleton className="h-3.5 w-36 mt-1" />
              </>
            ) : (
              <>
                <p className="text-2xl font-bold tracking-tight text-foreground">
                  {Formatter.currency(stats?.sales || '0')}
                </p>
                <p className="text-[11px] text-muted-foreground">
                  Facturación en el período
                </p>
              </>
            )}
          </CardContent>
        </Card>

        {/* KPI 2: Cantidad de Pedidos */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <span className="text-xs font-medium text-muted-foreground">
              Pedidos Realizados
            </span>
            <div className="size-8 rounded-lg bg-blue-500/10 text-blue-500 border border-blue-500/20 flex items-center justify-center">
              <Inbox className="size-4" />
            </div>
          </CardHeader>
          <CardContent className="p-5 pt-0 space-y-1">
            {isLoadingStats ? (
              <>
                <Skeleton className="h-7 w-20" />
                <Skeleton className="h-3.5 w-32 mt-1" />
              </>
            ) : (
              <>
                <p className="text-2xl font-bold tracking-tight text-foreground">
                  {stats?.orders || 0}
                </p>
                <p className="text-[11px] text-muted-foreground">
                  Órdenes registradas
                </p>
              </>
            )}
          </CardContent>
        </Card>

        {/* KPI 3: Productos / Items Vendidos */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <span className="text-xs font-medium text-muted-foreground">
              Artículos Despachados
            </span>
            <div className="size-8 rounded-lg bg-teal-500/10 text-teal-500 border border-teal-500/20 flex items-center justify-center">
              <Boxes className="size-4" />
            </div>
          </CardHeader>
          <CardContent className="p-5 pt-0 space-y-1">
            {isLoadingStats ? (
              <>
                <Skeleton className="h-7 w-20" />
                <Skeleton className="h-3.5 w-32 mt-1" />
              </>
            ) : (
              <>
                <p className="text-2xl font-bold tracking-tight text-foreground">
                  {stats?.items || 0}
                </p>
                <p className="text-[11px] text-muted-foreground">
                  Unidades vendidas en total
                </p>
              </>
            )}
          </CardContent>
        </Card>

        {/* KPI 4: Efectividad y Cierres */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <span className="text-xs font-medium text-muted-foreground">
              Pedidos Completados
            </span>
            <div className="size-8 rounded-lg bg-amber-500/10 text-amber-500 border border-amber-500/20 flex items-center justify-center">
              <CheckCircle2 className="size-4" />
            </div>
          </CardHeader>
          <CardContent className="p-5 pt-0 space-y-1">
            {isLoadingStats ? (
              <>
                <Skeleton className="h-7 w-20" />
                <Skeleton className="h-3.5 w-36 mt-1" />
              </>
            ) : (
              <>
                <p className="text-2xl font-bold tracking-tight text-foreground">
                  {stats?.closedOrders || 0}
                </p>
                <p className="text-[11px] text-muted-foreground">
                  {stats?.cancelledOrders || 0} cancelados de{' '}
                  {stats?.orders || 0}
                </p>
              </>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Tablas Principales de Datos Reales: Pedidos y Clientes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Tabla: Pedidos Recientes */}
        <Card className="shadow-xs overflow-hidden flex flex-col">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 border-b border-border/60">
            <div className="space-y-1">
              <CardTitle className="text-base font-semibold text-foreground flex items-center gap-2">
                <Inbox className="size-4 text-muted-foreground" />
                Pedidos Recientes
              </CardTitle>
              <CardDescription className="text-xs text-muted-foreground">
                Últimas órdenes registradas en el sistema
              </CardDescription>
            </div>
            <Link
              to="/admin/orders"
              className={buttonVariants({
                variant: 'ghost',
                size: 'sm',
                className:
                  'text-xs text-muted-foreground hover:text-foreground gap-1 h-8 px-2.5',
              })}
            >
              <span>Ver todos</span>
              <ArrowRight className="size-3.5" />
            </Link>
          </CardHeader>

          <CardContent className="p-0 flex-1 overflow-x-auto">
            {isLoadingOrders ? (
              <div className="p-4 space-y-3">
                {[...Array(5)].map((_, i) => (
                  <Skeleton key={i} className="h-10 w-full rounded-md" />
                ))}
              </div>
            ) : recentOrders.length === 0 ? (
              <div className="py-12 text-center text-xs text-muted-foreground">
                No hay pedidos registrados todavía.
              </div>
            ) : (
              <Table>
                <TableHeader className="bg-muted/40">
                  <TableRow className="border-border hover:bg-transparent">
                    <TableHead className="text-xs font-semibold text-foreground py-2.5">
                      Pedido
                    </TableHead>
                    <TableHead className="text-xs font-semibold text-foreground py-2.5">
                      Cliente
                    </TableHead>
                    <TableHead className="text-xs font-semibold text-foreground py-2.5 text-end">
                      Total
                    </TableHead>
                    <TableHead className="text-xs font-semibold text-foreground py-2.5 text-center">
                      Estado
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentOrders.map((order) => {
                    const customerName = order.customer
                      ? `${order.customer.firstName} ${order.customer.lastName || ''}`.trim()
                      : 'Consumidor final';

                    return (
                      <TableRow
                        key={order.id}
                        className="border-border hover:bg-muted/30 transition-colors group"
                      >
                        <TableCell className="py-3">
                          <Link
                            to={`/admin/orders/${order.id}`}
                            className="text-xs font-semibold text-foreground group-hover:text-primary transition-colors flex items-center gap-1.5"
                          >
                            <span>{order.name}</span>
                            <ExternalLink className="size-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </Link>
                          <span className="text-[11px] text-muted-foreground block">
                            {Formatter.dateTime(order.createdAt)}
                          </span>
                        </TableCell>

                        <TableCell className="py-3 text-xs text-foreground font-medium truncate max-w-35">
                          {customerName}
                        </TableCell>

                        <TableCell className="py-3 text-xs font-bold text-foreground text-end">
                          {Formatter.currency(order.totalPrice)}
                        </TableCell>

                        <TableCell className="py-3 text-center">
                          <div className="flex items-center justify-center gap-1.5 flex-wrap">
                            <OrderFinancialStatusBadge
                              status={order.financialStatus}
                            />
                            <OrderStatusBadge status={order.status} />
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>

        {/* Tabla: Clientes Recientes */}
        <Card className="shadow-xs overflow-hidden flex flex-col">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 border-b border-border/60">
            <div className="space-y-1">
              <CardTitle className="text-base font-semibold text-foreground flex items-center gap-2">
                <Users className="size-4 text-muted-foreground" />
                Clientes Recientes
              </CardTitle>
              <CardDescription className="text-xs text-muted-foreground">
                Clientes registrados con actividad en el negocio
              </CardDescription>
            </div>
            <Link
              to="/admin/customers"
              className={buttonVariants({
                variant: 'ghost',
                size: 'sm',
                className:
                  'text-xs text-muted-foreground hover:text-foreground gap-1 h-8 px-2.5',
              })}
            >
              <span>Ver todos</span>
              <ArrowRight className="size-3.5" />
            </Link>
          </CardHeader>

          <CardContent className="p-0 flex-1 overflow-x-auto">
            {isLoadingCustomers ? (
              <div className="p-4 space-y-3">
                {[...Array(5)].map((_, i) => (
                  <Skeleton key={i} className="h-10 w-full rounded-md" />
                ))}
              </div>
            ) : recentCustomers.length === 0 ? (
              <div className="py-12 text-center text-xs text-muted-foreground">
                No hay clientes registrados todavía.
              </div>
            ) : (
              <Table>
                <TableHeader className="bg-muted/40">
                  <TableRow className="border-border hover:bg-transparent">
                    <TableHead className="text-xs font-semibold text-foreground py-2.5">
                      Cliente
                    </TableHead>
                    <TableHead className="text-xs font-semibold text-foreground py-2.5">
                      Contacto
                    </TableHead>
                    <TableHead className="text-xs font-semibold text-foreground py-2.5 text-center">
                      Pedidos
                    </TableHead>
                    <TableHead className="text-xs font-semibold text-foreground py-2.5 text-end">
                      Total Gastado
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentCustomers.map((customer) => {
                    const initials = (
                      (customer.firstName?.[0] || '') +
                      (customer.lastName?.[0] ||
                        customer.displayName?.[0] ||
                        'C')
                    ).toUpperCase();

                    return (
                      <TableRow
                        key={customer.id}
                        className="border-border hover:bg-muted/30 transition-colors group"
                      >
                        <TableCell className="py-3">
                          <Link
                            to={`/admin/customers/${customer.id}`}
                            className="flex items-center gap-2.5 group-hover:text-primary transition-colors"
                          >
                            <Avatar className="size-7 rounded-full bg-secondary text-secondary-foreground text-[10px] font-semibold flex items-center justify-center shrink-0">
                              <AvatarFallback>{initials}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="text-xs font-semibold text-foreground group-hover:text-primary transition-colors flex items-center gap-1">
                                {customer.displayName}
                                <ExternalLink className="size-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                              </p>
                              <p className="text-[11px] text-muted-foreground">
                                {customer.email || 'Sin correo registrado'}
                              </p>
                            </div>
                          </Link>
                        </TableCell>

                        <TableCell className="py-3 text-xs text-muted-foreground">
                          {customer.phone || 'S/N'}
                        </TableCell>

                        <TableCell className="py-3 text-xs text-center font-medium">
                          <Badge
                            variant="outline"
                            className="text-[11px] font-medium border-border"
                          >
                            {customer.numberOfOrders || 0}
                          </Badge>
                        </TableCell>

                        <TableCell className="py-3 text-xs font-bold text-foreground text-end">
                          {Formatter.currency(customer.amountSpent || '0')}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Fila Inferior: Accesos Rápidos y Catálogo de Productos Recientes */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Catálogo de Productos Recientes (2 columnas) */}
        <Card className="shadow-xs lg:col-span-2 overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 border-b border-border/60">
            <div className="space-y-1">
              <CardTitle className="text-base font-semibold text-foreground flex items-center gap-2">
                <Boxes className="size-4 text-muted-foreground" />
                Catálogo de Productos Recientes
              </CardTitle>
              <CardDescription className="text-xs text-muted-foreground">
                Artículos y existencias del inventario
              </CardDescription>
            </div>
            <Link
              to="/admin/products"
              className={buttonVariants({
                variant: 'ghost',
                size: 'sm',
                className:
                  'text-xs text-muted-foreground hover:text-foreground gap-1 h-8 px-2.5',
              })}
            >
              <span>Ver catálogo</span>
              <ArrowRight className="size-3.5" />
            </Link>
          </CardHeader>

          <CardContent className="p-0">
            {isLoadingProducts ? (
              <div className="p-4 space-y-3">
                {[...Array(4)].map((_, i) => (
                  <Skeleton key={i} className="h-10 w-full rounded-md" />
                ))}
              </div>
            ) : recentProducts.length === 0 ? (
              <div className="py-8 text-center text-xs text-muted-foreground">
                No hay productos cargados en el inventario.
              </div>
            ) : (
              <div className="divide-y divide-border/60">
                {recentProducts.map((product) => (
                  <Link
                    key={product.id}
                    to={`/admin/products/${product.id}`}
                    className="p-3.5 flex items-center justify-between hover:bg-muted/30 transition-colors group"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="size-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0 border border-primary/20">
                        <Tag className="size-4" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-semibold text-foreground truncate group-hover:text-primary transition-colors">
                          {product.title}
                        </p>
                        <p className="text-[11px] text-muted-foreground truncate">
                          {product.category?.name || 'Sin categoría'}
                        </p>
                      </div>
                    </div>

                    <div className="text-end shrink-0 pl-3">
                      <p className="text-xs font-bold text-foreground">
                        {Formatter.currency(product.price)}
                      </p>
                      <span className="text-[10px] text-muted-foreground">
                        Stock: {product.inventoryQuantity ?? 0}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Accesos Rápidos del Negocio (1 columna) */}
        <Card className="shadow-xs flex flex-col justify-between">
          <CardHeader className="space-y-1 border-b border-border/60">
            <CardTitle className="text-base font-semibold text-foreground flex items-center gap-2">
              <Store className="size-4 text-muted-foreground" />
              Gestión Comercial
            </CardTitle>
            <CardDescription className="text-xs text-muted-foreground">
              Accesos directos para la operativa diaria
            </CardDescription>
          </CardHeader>

          <CardContent className="p-4 space-y-2 flex-1">
            <Link
              to="/admin/orders/new"
              className="flex items-center justify-between p-3 rounded-lg border border-border/70 hover:bg-muted/40 transition-colors group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-md bg-emerald-500/10 text-emerald-500">
                  <Plus className="size-4" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-foreground group-hover:text-primary transition-colors">
                    Registrar Venta / Pedido
                  </p>
                  <p className="text-[11px] text-muted-foreground">
                    Crear un nuevo pedido en el sistema
                  </p>
                </div>
              </div>
              <ArrowRight className="size-4 text-muted-foreground group-hover:translate-x-0.5 transition-transform" />
            </Link>

            <Link
              to="/admin/products"
              className="flex items-center justify-between p-3 rounded-lg border border-border/70 hover:bg-muted/40 transition-colors group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-md bg-blue-500/10 text-blue-500">
                  <Tag className="size-4" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-foreground group-hover:text-primary transition-colors">
                    Administrar Catálogo
                  </p>
                  <p className="text-[11px] text-muted-foreground">
                    Ver, editar productos y existencias
                  </p>
                </div>
              </div>
              <ArrowRight className="size-4 text-muted-foreground group-hover:translate-x-0.5 transition-transform" />
            </Link>

            <Link
              to="/admin/categories"
              className="flex items-center justify-between p-3 rounded-lg border border-border/70 hover:bg-muted/40 transition-colors group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-md bg-teal-500/10 text-teal-500">
                  <Boxes className="size-4" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-foreground group-hover:text-primary transition-colors">
                    Familias y Categorías
                  </p>
                  <p className="text-[11px] text-muted-foreground">
                    Estructurar rubros de productos
                  </p>
                </div>
              </div>
              <ArrowRight className="size-4 text-muted-foreground group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;
