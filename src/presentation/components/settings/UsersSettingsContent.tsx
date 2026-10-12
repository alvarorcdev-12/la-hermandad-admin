import { useState } from 'react';
import { Link } from 'react-router';

import { ExternalLink, UserShield } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { buttonVariants } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { AdminTitle } from '../admin/AdminTitle';
import { cn } from 'cn';

import { useUsers } from '@/presentation/hooks/users/useUsers';
import { Spinner } from '@/components/ui/spinner';

const statusLabel = (role: string): string => {
  switch (role) {
    case 'OWNER':
      return 'Propietario de la tienda.';
    case 'MANAGER':
      return 'Gerente';
    case 'CASHIER':
      return 'Cajero';
    default:
      return '';
  }
};

export const UsersSettingsContent = () => {
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

  const { data, isLoading } = useUsers({ page: 1, limit: 20 });

  const users = data?.results || [];

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedUsers(users.map((u) => u.id));
    } else {
      setSelectedUsers([]);
    }
  };

  const handleSelectOne = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedUsers((prev) => [...prev, id]);
    } else {
      setSelectedUsers((prev) => prev.filter((item) => item !== id));
    }
  };

  const isAllSelected = selectedUsers.length === users.length;

  return (
    <div className="space-y-6">
      {/* Header con Título y Acciones (Exportar / Agregar usuarios) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <AdminTitle title="Usuarios" Icon={UserShield} />

        <Link
          to="/admin/settings/organization/new"
          className={buttonVariants({ size: 'sm' })}
        >
          Agregar usuarios
        </Link>
      </div>
      <Card className="p-0">
        <CardContent className="p-0">
          {isLoading ? (
            <div className="flex items-center justify-center h-96">
              <Spinner />
            </div>
          ) : (
            <Table>
              <TableHeader className="bg-muted/50">
                <TableRow className="border-border hover:bg-transparent">
                  <TableHead className="w-12 text-center">
                    <Checkbox
                      checked={isAllSelected}
                      onCheckedChange={handleSelectAll}
                      aria-label="Seleccionar todos"
                    />
                  </TableHead>
                  <TableHead className="font-semibold text-muted-foreground">
                    Usuario
                  </TableHead>
                  <TableHead className="font-semibold text-muted-foreground">
                    Estado
                  </TableHead>
                  <TableHead className="font-semibold text-muted-foreground">
                    Rol
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => {
                  const isSelected = selectedUsers.includes(user.id);

                  return (
                    <TableRow
                      key={user.id}
                      className="border-border hover:bg-muted/30 transition-colors"
                    >
                      <TableCell className="text-center">
                        <Checkbox
                          checked={isSelected}
                          onCheckedChange={(checked) =>
                            handleSelectOne(user.id, !!checked)
                          }
                          aria-label={`Seleccionar ${user.name}`}
                        />
                      </TableCell>
                      <TableCell className="font-medium text-foreground">
                        {user.name}
                      </TableCell>
                      <TableCell className="">
                        <div className="flex items-center gap-2">
                          <Badge
                            variant="outline"
                            className={cn(
                              'text-[11px] font-medium rounded-full px-2.5 py-0.5',
                              user.isActive
                                ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                                : 'border-red-500/30 bg-red-500/10 text-red-600 dark:text-red-400',
                            )}
                          >
                            {user.isActive ? 'Activo' : 'Suspendido'}
                          </Badge>
                          {/* {user.hasWarning && (
                          <ShieldAlert className="size-3.5 text-rose-500" />
                        )} */}
                        </div>
                      </TableCell>
                      <TableCell className="">
                        {statusLabel(user.role)}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Enlace de información adicional */}
      <div className="pt-2 text-center">
        <a
          href="#"
          className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors hover:underline"
        >
          <span>Más información sobre usuarios</span>
          <ExternalLink className="size-3 text-muted-foreground" />
        </a>
      </div>
    </div>
  );
};
