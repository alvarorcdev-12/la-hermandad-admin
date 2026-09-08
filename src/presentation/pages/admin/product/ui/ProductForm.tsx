import { Link } from 'react-router';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { AlertCircle, CloudUpload, Save, XIcon } from 'lucide-react';

import { Button, buttonVariants } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import {
  NativeSelect,
  NativeSelectOption,
} from '@/components/ui/native-select';
import { Spinner } from '@/components/ui/spinner';
import { PriceInput } from '@/presentation/components/shared/PriceInput';
import { ProfitCalculator } from './ProfitCalculator';

import type { Product } from '@/domain/entities/product.entity';

interface FormInputs extends Product {
  categoryId: string | null;
}

interface Props {
  categories: any[];
  product: Product;
  isPending: boolean;

  onSubmit: (productForm: FormInputs) => Promise<void>;
}

export const ProductForm = ({
  categories,
  product,
  isPending,
  onSubmit,
}: Props) => {
  const {
    control,
    register,
    formState: { errors },
    setValue,
    handleSubmit,
  } = useForm<FormInputs>({
    defaultValues: {
      ...product,
    },
  });

  const costPrice = useWatch({ name: 'costPrice', control });
  const price = useWatch({ name: 'price', control });
  const trackInventory = useWatch({ name: 'trackInventory', control });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <div className="lg:col-span-8 space-y-6">
          {/* Informacion General */}
          <Card>
            <CardContent>
              <FieldGroup>
                <Field>
                  <FieldLabel>Título</FieldLabel>
                  <Input
                    type="text"
                    placeholder="Empanada de carne"
                    {...register('title', {
                      required: 'El título es obligatorio',
                      minLength: {
                        value: 3,
                        message: 'El título debe tener al menos 3 caracteres',
                      },
                    })}
                    aria-invalid={!!errors.title}
                  />
                  {errors.title && (
                    <p className="text-sm text-destructive animate-in fade-in slide-in-from-top-1">
                      {errors.title.message}
                    </p>
                  )}
                </Field>
                <Field>
                  <FieldLabel>Descripción</FieldLabel>
                  <Textarea
                    placeholder="Descripción del producto"
                    className="min-h-40 max-h-40"
                    {...register('description')}
                    aria-invalid={!!errors.description}
                  ></Textarea>
                </Field>
                <Field>
                  <FieldLabel>Media</FieldLabel>
                  <div className="border border-dashed flex flex-col items-center justify-center gap-4 rounded-xl p-6 text-balance bg-transparent dark:bg-input/30 hover:bg-muted/40 dark:hover:bg-input/20">
                    <div className="flex max-w-sm flex-col items-center gap-2">
                      <div className="mb-2 shrink-0 rounded-lg bg-muted text-foreground size-8 flex items-center justify-center">
                        <CloudUpload className="size-4" />
                      </div>
                      <p className="text-sm font-semibold">
                        Arrastra y suelta archivos aquí
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Imágenes (JPG, PNG, GIF)
                      </p>
                    </div>
                    <div>
                      <Button variant="outline" size="sm" type="button">
                        Subir archivo
                      </Button>
                    </div>
                  </div>
                </Field>
                <Field>
                  <FieldLabel>Categoría</FieldLabel>
                  <NativeSelect
                    {...register('categoryId')}
                    aria-invalid={!!errors.categoryId}
                  >
                    <NativeSelectOption value="" disabled>
                      Elija una categoría de producto
                    </NativeSelectOption>
                    {categories?.map((category) => (
                      <NativeSelectOption key={category.id} value={category.id}>
                        {category.name}
                      </NativeSelectOption>
                    ))}
                  </NativeSelect>
                </Field>
              </FieldGroup>
            </CardContent>
          </Card>
          {/* Precio */}
          <Card>
            <CardContent>
              <FieldSet>
                <FieldLegend>Precio</FieldLegend>
                <FieldGroup>
                  <Field className="w-fit">
                    <Controller
                      name="price"
                      control={control}
                      rules={{
                        required: 'El precio es obligatorio',
                        min: {
                          value: 0,
                          message: 'El precio debe ser mayor o igual a 0',
                        },
                        pattern: {
                          value: /^\d+(\.\d{0,2})?$/,
                          message:
                            'Ingrese un número válido con hasta 2 decimales.',
                        },
                      }}
                      render={({ field }) => (
                        <PriceInput
                          value={field.value}
                          onValueChange={field.onChange}
                          onValueBlur={field.onBlur}
                          isError={!!errors.price}
                        />
                      )}
                    />
                    {errors.price && (
                      <p className="text-sm text-destructive animate-in fade-in slide-in-from-top-1">
                        {errors.price.message}
                      </p>
                    )}
                  </Field>
                  <FieldSeparator />
                  <Field className="w-fit">
                    <FieldLabel>Precio de comparación</FieldLabel>
                    <Controller
                      name="compareAtPrice"
                      control={control}
                      rules={{
                        min: {
                          value: 0,
                          message: 'El precio debe ser mayor o igual a 0',
                        },
                        pattern: {
                          value: /^\d+(\.\d{0,2})?$/,
                          message:
                            'Ingrese un número válido con hasta 2 decimales.',
                        },
                      }}
                      render={({ field }) => (
                        <PriceInput
                          value={field.value}
                          onValueChange={field.onChange}
                          onValueBlur={field.onBlur}
                          isError={!!errors.compareAtPrice}
                          helpText="Para mostrar un precio rebajado, introduce un valor superior a tu precio. A menudo se muestra tachado."
                        />
                      )}
                    />
                    {errors.compareAtPrice && (
                      <p className="text-sm text-destructive animate-in fade-in slide-in-from-top-1">
                        {errors.compareAtPrice.message}
                      </p>
                    )}
                  </Field>
                  <hr />
                  {/* Costo, Beneficio, margen */}
                  <div className="flex items-center gap-2">
                    <Field className="w-fit">
                      <Controller
                        name="costPrice"
                        control={control}
                        rules={{
                          min: {
                            value: 0,
                            message: 'El precio debe ser mayor o igual a 0',
                          },
                          pattern: {
                            value: /^\d+(\.\d{0,2})?$/,
                            message:
                              'Ingrese un número válido con hasta 2 decimales.',
                          },
                        }}
                        render={({ field }) => (
                          <div className="border border-input px-2 py-0.5 rounded-lg">
                            <div className="flex items-center gap-2">
                              <span>Costo</span>
                              <PriceInput
                                className="max-w-30"
                                value={field.value}
                                onValueChange={field.onChange}
                                onValueBlur={field.onBlur}
                                isError={!!errors.costPrice}
                              />
                            </div>
                          </div>
                        )}
                      />
                      {errors.costPrice && (
                        <p className="text-sm text-destructive animate-in fade-in slide-in-from-top-1">
                          {errors.costPrice.message}
                        </p>
                      )}
                    </Field>
                    <ProfitCalculator costPrice={costPrice} price={price} />
                  </div>
                </FieldGroup>
              </FieldSet>
            </CardContent>
          </Card>
          {/* Inventario */}
          <Card>
            <CardContent>
              <FieldSet>
                <div className="flex items-center justify-between">
                  <FieldLegend>Inventario</FieldLegend>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground inline-flex items-center gap-1">
                      {trackInventory ? (
                        'Inventario con seguimiento'
                      ) : (
                        <>
                          Inventario sin seguimiento{' '}
                          <AlertCircle className="size-3" />
                        </>
                      )}
                    </span>
                    <Switch
                      size="sm"
                      checked={trackInventory}
                      onCheckedChange={(value) =>
                        setValue('trackInventory', value)
                      }
                    />
                  </div>
                </div>
                <FieldGroup>
                  {trackInventory && (
                    <div className="border rounded-xl">
                      <div className="px-3 py-1.5 flex items-center justify-between bg-muted/50 rounded-t-xl">
                        <span className="text-sm text-muted-foreground">
                          Cantidad
                        </span>
                        <span className="text-sm text-muted-foreground">
                          Cantidad
                        </span>
                      </div>
                      <div className="px-3 py-1.5 flex items-center justify-between rounded-b-xl">
                        <span>Shop location</span>
                        <Input
                          type="number"
                          placeholder="0"
                          className="w-30"
                          {...register('inventoryQuantity', {
                            min: {
                              value: 0,
                              message: 'La cantidad debe ser mayor o igual a 0',
                            },
                          })}
                          aria-invalid={!!errors.inventoryQuantity}
                        />
                      </div>
                    </div>
                  )}

                  <FieldSeparator />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <Field>
                      <FieldLabel>SKU (Código de artículo)</FieldLabel>
                      <Input
                        type="text"
                        {...register('sku', {
                          pattern: {
                            value: /^[A-Za-z0-9_-]+$/,
                            message:
                              'El SKU solo puede contener letras, números, guiones (-) y guiones bajos (_).',
                          },
                        })}
                      />
                      {errors.sku && (
                        <p className="text-sm text-destructive animate-in fade-in slide-in-from-top-1">
                          {errors.sku.message}
                        </p>
                      )}
                    </Field>
                    <Field>
                      <FieldLabel>Código de barras</FieldLabel>
                      <Input type="text" disabled />
                    </Field>
                  </div>
                </FieldGroup>
              </FieldSet>
            </CardContent>
          </Card>
        </div>
        <div className="lg:col-span-4">
          <Card>
            <CardContent>
              <FieldSet>
                <FieldLegend>Estado</FieldLegend>
                <FieldGroup>
                  <Field>
                    <NativeSelect {...register('status')}>
                      <NativeSelectOption value="ACTIVE">
                        Activo
                      </NativeSelectOption>
                      <NativeSelectOption value="DRAFT">
                        Borrador
                      </NativeSelectOption>
                      <NativeSelectOption value="ARCHIVED">
                        Archivado
                      </NativeSelectOption>
                    </NativeSelect>
                  </Field>
                </FieldGroup>
              </FieldSet>
            </CardContent>
          </Card>
        </div>
      </div>
      <div className="flex items-center justify-end gap-2 my-5">
        <Link
          to="/admin/products"
          className={buttonVariants({ variant: 'outline' })}
          type="button"
        >
          <XIcon />
          Cancelar
        </Link>
        <Button type="submit" disabled={isPending}>
          {isPending ? <Spinner /> : <Save />}
          {isPending ? 'Guardando' : 'Guardar'}
        </Button>
      </div>
    </form>
  );
};
