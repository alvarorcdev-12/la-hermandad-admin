import { useState } from 'react';
import { useNavigate } from 'react-router';

import { UserShield } from 'lucide-react';
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
  FieldSet,
  FieldTitle,
} from '@/components/ui/field';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

import { UserAdminForm } from '../user/UserAdminForm';
import { UserPOSForm } from '../user/UserPOSForm';

export const NewUserSettingContent = () => {
  const [typeUser, setTypeUser] = useState<'admin' | 'pos'>('admin');
  const navigate = useNavigate();

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
          <Button type="button" size="sm">
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
              {typeUser === 'admin' ? <UserAdminForm /> : <UserPOSForm />}
              <Field orientation="horizontal" className="justify-end">
                <Button size="sm" disabled>
                  Guardar
                </Button>
              </Field>
            </FieldGroup>
          </FieldSet>
        </CardContent>
      </Card>
      {/* Card para contrase para los usuarios ADMIN? */}
    </div>
  );
};
