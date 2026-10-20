import { useState } from 'react';
import {
  ChevronDown,
  CirclePause,
  Eye,
  EyeOff,
  Pencil,
  Trash,
  User,
  UserShield,
} from 'lucide-react';
import { AdminTitle } from '../admin/AdminTitle';
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
import { useQuery } from '@tanstack/react-query';
import { Navigate, useParams } from 'react-router';
import { getUserByIdAction } from '@/actions/users/get-user-by-id.action';
import { UserFormDialog } from '../user/UserFormDialog';

const ProfileUserSettingContent = () => {
  const { id } = useParams();

  const [showPin, setShowPin] = useState(false);

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

  if (isError) {
    return <Navigate to="/admin/settings/organization" replace />;
  }

  if (isLoading) {
    return <h1>Cargando...</h1>;
  }

  if (!user) {
    return <Navigate to="/admin/settings/organization" replace />;
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <AdminTitle
            title={user.name}
            Icon={UserShield}
            prevHref="/admin/settings/organization"
          />
          <Badge className="text-emerald-800 bg-emerald-200 dark:text-emerald-200 dark:bg-emerald-800/40">
            Activo
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
                  <div className="w-9 h-9 bg-cyan-400 rounded-lg flex justify-center items-center">
                    <User className="size-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-base">{user.name}</p>
                    <div className="text-muted-foreground inline-flex items-center gap-1.5 text-sm">
                      <span className="text-xs font-medium">PIN:</span>
                      <span className="text-xs font-medium select-none">
                        {showPin ? '12345' : '••••••'}
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
      <UserFormDialog className="sm:max-w-2xl" open={isOpenDialog} onOpenChange={setIsOpenDialog} />
    </>
  );
};

export default ProfileUserSettingContent;
