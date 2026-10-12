import { useState } from 'react';
import { Link } from 'react-router';

import { ExternalLink, ShieldAlert, UserShield } from 'lucide-react';
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

interface MockUser {
  id: string;
  name: string;
  email?: string;
  status: 'Activo' | 'Inactivo' | 'Invitado';
  role: string;
  hasWarning?: boolean;
}

const MOCK_USERS: MockUser[] = [
  {
    id: '1',
    name: 'alejandro@google.com',
    status: 'Activo',
    role: 'Propietario de la organización, Pro...',
    hasWarning: true,
  },
  {
    id: '2',
    name: 'Alejandro Ruiz',
    status: 'Activo',
    role: 'Cajero',
  },
  {
    id: '3',
    name: 'Juan Perez',
    status: 'Activo',
    role: 'Cajero',
  },
];

export const UsersSettingsContent = () => {
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedUsers(MOCK_USERS.map((u) => u.id));
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

  const isAllSelected = selectedUsers.length === MOCK_USERS.length;

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

      {/* Tabla de Usuarios estilo Card */}
      <Card className="p-0">
        <CardContent className="p-0">
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
              {MOCK_USERS.map((user) => {
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
                    <TableCell className="font-medium text-foreground py-3.5">
                      {user.name}
                    </TableCell>
                    <TableCell className="py-3.5">
                      <div className="flex items-center gap-2">
                        <Badge
                          variant="outline"
                          className="text-[11px] font-medium border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-full px-2.5 py-0.5"
                        >
                          {user.status}
                        </Badge>
                        {user.hasWarning && (
                          <ShieldAlert className="size-3.5 text-rose-500" />
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground py-3.5">
                      {user.role}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
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
