import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { UserKey, UserShield, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AdminTitle } from '../admin/AdminTitle';
import { Card, CardContent } from '@/components/ui/card';
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldTitle,
} from '@/components/ui/field';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  NativeSelect,
  NativeSelectOption,
} from '@/components/ui/native-select';
import { toast } from '@/components/ui/toast';

import { UserAdminForm } from '../user/UserAdminForm';
import { UserPOSForm } from '../user/UserPOSForm';

import { generatePosPinAction } from '@/actions/users/generate-pos-pin.action';
import { createUserAction } from '@/actions/users/create-user.action';

import type { CreateUserPayload } from '@/infrastructure/interfaces/payload/create-user-payload.interface';

export const NewUserSettingContent = () => {
  const [typeUser, setTypeUser] = useState<'admin' | 'pos'>('admin');
  const navigate = useNavigate();

  const [addUserList, setAddUserList] = useState<Partial<CreateUserPayload>[]>(
    [],
  );

  const queryClient = useQueryClient();

  const createStaffUser = useMutation({
    mutationFn: createUserAction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });

  const handleSubmit = async (
    userForm: Partial<CreateUserPayload & { confirmPassword: string }>,
  ) => {
    const { confirmPassword: _, ...rest } = userForm;
    if (userForm.role === 'CASHIER') {
      const { pin } = await generatePosPinAction();

      setAddUserList([...addUserList, { ...rest, posPin: pin }]);

      toast.add({
        type: 'success',
        title: 'PIN generado.',
      });

      return;
    }

    setAddUserList([...addUserList, { ...rest }]);
    // usuarios gerentes
  };

  const handleRemoveUserList = (index: number) => {
    setAddUserList(addUserList.filter((_u, i) => i !== index));
  };

  const handleCreateStaffUser = async () => {
    await createStaffUser.mutateAsync(addUserList[0], {
      onSuccess: () => {
        toast.add({
          type: 'success',
          title: 'Usuario guardado.',
        });
        navigate('/admin/settings/organization', { replace: true });
      },
    });
  };

  return (
    <div className="space-y-6">
      {/* Header con Botón de Regreso y Título */}
      <div className="flex items-center justify-between">
        <AdminTitle
          title="Agregar usuario"
          Icon={UserShield}
          prevHref="/admin/settings/organization"
        />

        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => navigate('/admin/settings/organization')}
          >
            Cancelar
          </Button>
          <Button
            type="button"
            size="sm"
            onClick={handleCreateStaffUser}
            disabled={addUserList.length === 0}
          >
            Guardar
          </Button>
        </div>
      </div>

      <Card>
        <CardContent>
          <FieldSet>
            <FieldLegend>Información del usuario</FieldLegend>
            <FieldGroup>
              <RadioGroup
                defaultValue="admin"
                className="flex mt-4"
                onValueChange={(value) => setTypeUser(value)}
              >
                <FieldLabel htmlFor="user-admin">
                  <Field orientation="horizontal">
                    <FieldContent>
                      <FieldTitle>Usuario Admin</FieldTitle>
                      <FieldDescription>Admite todo los roles</FieldDescription>
                    </FieldContent>
                    <RadioGroupItem value="admin" id="user-admin" />
                  </Field>
                </FieldLabel>
                <FieldLabel htmlFor="user-pos">
                  <Field orientation="horizontal">
                    <FieldContent>
                      <FieldTitle>Usuario POS</FieldTitle>
                      <FieldDescription>
                        Admite solo el rol de cajero
                      </FieldDescription>
                    </FieldContent>
                    <RadioGroupItem value="pos" id="user-pos" />
                  </Field>
                </FieldLabel>
              </RadioGroup>
              <FieldSeparator />
              {addUserList.length !== 0 ? (
                <>
                  <Field>
                    {addUserList.map((user, index) => (
                      <div
                        className="flex items-center justify-between pt-2 pb-3"
                        key={index}
                      >
                        <div>
                          <span className="font-medium">
                            {user.firstName} {user.lastName}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button size="sm" variant="secondary">
                            <UserKey />
                            {user.posPin}
                          </Button>
                          <Button
                            size="icon-sm"
                            variant="ghost"
                            className="text-muted-foreground"
                            onClick={() => handleRemoveUserList(index)}
                          >
                            <X />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </Field>
                </>
              ) : (
                <>
                  {typeUser === 'admin' ? (
                    <UserAdminForm onSubmit={handleSubmit} />
                  ) : (
                    <UserPOSForm onSubmit={handleSubmit} />
                  )}
                </>
              )}
            </FieldGroup>
          </FieldSet>
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
                <NativeSelectOption>
                  {typeUser == 'admin' ? 'Gerente' : 'Cajero'}
                </NativeSelectOption>
              </NativeSelect>
            </Field>
          </FieldGroup>
        </CardContent>
      </Card>
    </div>
  );
};
