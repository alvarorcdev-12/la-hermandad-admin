import { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';

import {
  ChevronDown,
  CirclePause,
  Eye,
  EyeOff,
  Pencil,
  Trash,
  UserShield,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Field,
  FieldGroup,
  FieldLegend,
  FieldSet,
} from '@/components/ui/field';
import {
  NativeSelect,
  NativeSelectOption,
} from '@/components/ui/native-select';
import { UserFormDialog } from '@/presentation/components/user/UserFormDialog';
import { AdminTitle } from '@/presentation/components/admin/AdminTitle';
import { getUserByIdAction } from '@/actions/users/get-user-by-id.action';

import { cn } from 'cn';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { getUserPosPinAction } from '@/actions/users/get-user-pos-pin.action';

const ProfileUserStaffPage = () => {
  const { id } = useParams();

  const [showPin, setShowPin] = useState(false);
  const [posPin, setPosPin] = useState('');

  const [isOpenDialog, setIsOpenDialog] = useState(false);

  const {
    data: user,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['user', { id }],
    queryFn: () => getUserByIdAction(id || ''),
    staleTime: 1000 * 60 * 5,
    retry: false,
  });

  useEffect(() => {
    getUserPosPinAction(id || '')
      .then((resp) => setPosPin(resp.pin))
      .catch(() => setPosPin(''));
  }, [id]);
  if (isError) {
    return <Navigate to="/admin/users" replace />;
  }

  if (isLoading) {
    return <h1>Cargando...</h1>;
  }

  if (!user) {
    return <Navigate to="/admin/users" replace />;
  }

  return (
    <>
      <div className="max-w-6xl w-full mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <AdminTitle
              title={user.name}
              Icon={UserShield}
              prevHref="/admin/users"
            />
            <Badge
              className={cn(
                user.isActive
                  ? 'text-emerald-800 bg-emerald-200 dark:text-emerald-200 dark:bg-emerald-800/40'
                  : 'text-red-800 bg-red-200 dark:text-red-200 dark:bg-red-800/40',
              )}
            >
              {user.isActive ? 'Activo' : 'Inactivo'}
            </Badge>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <Button variant="outline" size="sm">
                  Acciones
                  <ChevronDown />
                </Button>
              }
            />
            <DropdownMenuContent className="w-auto p-1" align="center">
              <DropdownMenuItem onClick={() => {}}>
                <CirclePause />
                Suspender
              </DropdownMenuItem>
              <DropdownMenuItem variant="destructive" onClick={() => {}}>
                <Trash /> Eliminar
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="mt-4">
          <div className="space-y-5">
            <Card>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {/* Imagen */}
                    <Avatar className="size-12">
                      <AvatarFallback>{user.initials}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold text-base">{user.name}</p>
                      <div className="text-muted-foreground inline-flex items-center gap-1.5 text-base">
                        <span className="text-sm font-medium">PIN:</span>
                        <span className="text-sm font-medium select-none">
                          {showPin ? posPin : '••••••'}
                        </span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon-xs"
                          className="size-6 text-muted-foreground hover:text-foreground transition-colors"
                          onClick={() => setShowPin((prev) => !prev)}
                          title={showPin ? 'Ocultar PIN' : 'Mostrar PIN'}
                        >
                          {showPin ? (
                            <EyeOff className="size-3.5" />
                          ) : (
                            <Eye className="size-3.5" />
                          )}
                          <span className="sr-only">
                            {showPin ? 'Ocultar PIN' : 'Mostrar PIN'}
                          </span>
                        </Button>
                      </div>
                    </div>
                  </div>
                  <Button
                    size="icon-sm"
                    className="text-muted-foreground"
                    variant="ghost"
                    onClick={() => setIsOpenDialog(true)}
                  >
                    <Pencil />
                  </Button>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <FieldSet>
                  <FieldLegend>Rol</FieldLegend>
                </FieldSet>
                <FieldGroup>
                  <Field>
                    <NativeSelect>
                      <NativeSelectOption>Cajero</NativeSelectOption>
                    </NativeSelect>
                  </Field>
                </FieldGroup>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <UserFormDialog
        className="sm:max-w-2xl"
        open={isOpenDialog}
        onOpenChange={setIsOpenDialog}
        user={user}
        posPin={posPin}
      />
    </>
  );
};

export default ProfileUserStaffPage;
