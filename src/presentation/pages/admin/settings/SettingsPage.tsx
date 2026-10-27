import {
  Save,
  CreditCard,
  Lock,
  Download,
  Upload,
  Settings,
  Store,
  Phone,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { PasswordInput } from '@/components/auth/password-input';
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from '@/components/ui/field';
import { AdminTitle } from '@/presentation/components/admin/AdminTitle';

export const SettingsPage = () => {
  return (
    <div className="max-w-6xl w-full mx-auto">
      <div className="space-y-8">
        {/* Header */}
        <AdminTitle title="Ajustes" Icon={Settings} />

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="locations">Sucursales</TabsTrigger>
            <TabsTrigger value="profile">Perfil</TabsTrigger>
            <TabsTrigger value="security">Seguridad</TabsTrigger>
          </TabsList>

          {/* GeneralContent */}
          <TabsContent value="general" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Detalles de la tienda</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="border rounded-lg px-4">
                  <div className="flex items-center gap-5 border-b py-2.5">
                    <Store className="text-muted-foreground size-5" />
                    <div className="flex flex-col gap-0.5">
                      <span className="text-base font-medium">
                        La Hermandad
                      </span>
                      <span className="font-medium text-sm text-muted-foreground">
                        Sin correo electrónico
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-5 py-2.5">
                    <Phone className="text-muted-foreground size-5" />
                    <div className="flex flex-col gap-0.5">
                      <span className="text-base font-medium">Teléfono</span>
                      <span className="font-medium text-sm text-muted-foreground">
                        Sin numero de teléfono
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>ID de pedido</CardTitle>
                <CardDescription>
                  Se muestra en la pagina de pedidos, las paginas de cliente
                  para identificar el pedido
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <FieldGroup>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Field>
                      <FieldLabel>Prefijo</FieldLabel>
                      <Input type="text" defaultValue="#" />
                    </Field>
                    <Field>
                      <FieldLabel>Sufijo</FieldLabel>
                      <Input type="text" />
                    </Field>
                  </div>
                  <Field>
                    <p>Su ID de pedido aparecerá como #1001, #1002, #1003...</p>
                  </Field>
                  <Field orientation="horizontal" className="justify-end">
                    <Button>
                      <Save className="size-4" />
                      Guardar cambios
                    </Button>
                  </Field>
                </FieldGroup>
              </CardContent>
            </Card>
          </TabsContent>

          {/* LocationsContent*/}
          <TabsContent value="locations" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Billing & Subscription</CardTitle>
                <CardDescription>
                  Manage your subscription and billing information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="font-medium text-neutral-900">Current Plan</h3>
                  <div className="p-4 border border-neutral-200 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-medium text-lg">Pro Plan</div>
                      <Badge
                        variant="secondary"
                        className="bg-purple-100 text-purple-700"
                      >
                        Active
                      </Badge>
                    </div>
                    <div className="text-sm text-neutral-600 mb-4">
                      $29/month • Billed monthly • Next billing: Jan 15, 2025
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        Change Plan
                      </Button>
                      <Button variant="outline" size="sm">
                        Cancel Subscription
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-medium text-neutral-900">
                    Payment Method
                  </h3>
                  <div className="p-4 border border-neutral-200 rounded-lg">
                    <div className="flex items-center gap-3 mb-2">
                      <CreditCard className="w-5 h-5 text-neutral-400" />
                      <div className="font-medium">•••• •••• •••• 4242</div>
                      <Badge variant="secondary">Default</Badge>
                    </div>
                    <div className="text-sm text-neutral-600 mb-4">
                      Expires 12/2027
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        Update Card
                      </Button>
                      <Button variant="outline" size="sm">
                        Add Payment Method
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-medium text-neutral-900">
                    Billing History
                  </h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-3 border border-neutral-200 rounded-lg">
                      <div>
                        <div className="font-medium">Dec 15, 2024</div>
                        <div className="text-sm text-neutral-600">
                          Pro Plan - Monthly
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">$29.00</span>
                        <Button variant="ghost" size="sm">
                          <Download className="size-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-3 border border-neutral-200 rounded-lg">
                      <div>
                        <div className="font-medium">Nov 15, 2024</div>
                        <div className="text-sm text-neutral-600">
                          Pro Plan - Monthly
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">$29.00</span>
                        <Button variant="ghost" size="sm">
                          <Download className="size-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ProfileContent */}
          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Información del perfil</CardTitle>
                <CardDescription>
                  Actualiza tu información personal y la configuración de tu
                  perfil.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <FieldGroup>
                  <div className="flex items-center gap-6">
                    <Avatar className="w-20 h-20">
                      <AvatarImage src="/placeholder.svg?height=80&width=80" />
                      <AvatarFallback className="text-lg">AE</AvatarFallback>
                    </Avatar>
                    <div className="space-y-2">
                      <Button
                        variant="outline"
                        className="gap-2 bg-transparent"
                      >
                        <Upload className="size-4" />
                        Subir foto
                      </Button>
                      <p className="text-sm text-neutral-600">
                        JPG, PNG or GIF. Max size 2MB.
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Field>
                      <Label htmlFor="firstName">Nombre</Label>
                      <Input id="firstName" defaultValue="Alex" />
                    </Field>
                    <Field>
                      <Label htmlFor="lastName">Apellido</Label>
                      <Input id="lastName" defaultValue="Evans" />
                    </Field>
                  </div>
                  <Field>
                    <Label htmlFor="email">Correo electrónico</Label>
                    <Input
                      id="email"
                      type="email"
                      defaultValue="alex@company.com"
                    />
                  </Field>
                  <Field>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      defaultValue="+1 (555) 123-4567"
                    />
                  </Field>
                </FieldGroup>

                <Field orientation="horizontal" className="justify-end">
                  <Button>
                    <Save className="size-4" />
                    Guardar cambios
                  </Button>
                </Field>
              </CardContent>
            </Card>
          </TabsContent>

          {/* SecurityContent */}
          <TabsContent value="security" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Configuración de seguridad</CardTitle>
                <CardDescription>
                  Administra la seguridad y autenticación de tu cuenta.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <FieldSet>
                  <FieldLegend>Contraseña</FieldLegend>
                  <FieldGroup>
                    <Field>
                      <Label htmlFor="currentPassword">Contraseña actual</Label>
                      <PasswordInput
                        id="currentPassword"
                        placeholder="Contraseña actual"
                      />
                    </Field>
                    <Field>
                      <Label htmlFor="newPassword">Nueva contraseña</Label>
                      <PasswordInput
                        id="newPassword"
                        placeholder="Nueva contraseña"
                      />
                    </Field>
                    <Field>
                      <Label htmlFor="confirmPassword">
                        Confirmar nueva contraseña
                      </Label>
                      <PasswordInput
                        id="confirmPassword"
                        placeholder="Confirmar nueva contraseña"
                      />
                    </Field>
                    <Field orientation="horizontal" className="justify-end">
                      <Button>
                        <Lock className="size-4" />
                        Actualizar contraseña
                      </Button>
                    </Field>
                  </FieldGroup>
                </FieldSet>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SettingsPage;
