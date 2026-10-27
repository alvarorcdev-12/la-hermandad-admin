import { useState } from 'react';
import { Link } from 'react-router';

import { UserShield } from 'lucide-react';
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

import { cn } from 'cn';

import { useUsers } from '@/presentation/hooks/users/useUsers';
import { Spinner } from '@/components/ui/spinner';
import { AdminTitle } from '@/presentation/components/admin/AdminTitle';

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

const UsersPage = () => {
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
                      className="border-border transition-colors"
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
                        <Link
                          to={`/admin/settings/organization/${user.id}`}
                          className="hover:underline"
                        >
                          {user.name}
                        </Link>
                      </TableCell>
                      <TableCell className="">
                        <div className="flex items-center gap-2">
                          <Badge
                            variant="outline"
                            className={cn(
                              'text-[11px] font-medium rounded-full px-2.5 py-0.5',
                              user.isActive
                                ? 'text-emerald-800 bg-emerald-200 dark:text-emerald-200 dark:bg-emerald-800/40'
                                : 'text-red-800 bg-red-200 dark:text-red-200 dark:bg-red-800/40',
                            )}
                          >
                            {user.isActive ? 'Activo' : 'Suspendido'}
                          </Badge>
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
    </div>
  );
};

export default UsersPage;
