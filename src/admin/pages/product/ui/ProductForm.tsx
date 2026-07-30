import { Link } from 'react-router';
import { useForm, useWatch } from 'react-hook-form';
import {
  AlertCircle,
  CircleQuestionMark,
  CloudUpload,
  Save,
  X,
} from 'lucide-react';
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
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import { Button, buttonVariants } from '@/components/ui/button';
import {
  NativeSelect,
  NativeSelectOption,
} from '@/components/ui/native-select';
import { Switch } from '@/components/ui/switch';
import { Spinner } from '@/components/ui/spinner';
import { ProfitCalculator } from './ProfitCalculator';
import type { Product } from '@/products/interfaces/product.interface';
import type { Category } from '@/categories/interfaces/category.interface';

interface Props {
  product?: Product;
  isPending: boolean;
  categories: Category[];

  onSubmit: (
    productLike: Partial<Product> & { categoryId: string | null },
  ) => Promise<void>;
}

interface FormInputs extends Product {
  categoryId: string | null;
}

export const ProductForm = ({
  product,
  categories,
  isPending,
  onSubmit,
}: Props) => {
  const {
    register,
    control,
    formState: { errors },
    setValue,
    handleSubmit,
  } = useForm<FormInputs>({
    defaultValues: {
      ...product,
      categoryId: product?.category?.id ?? null,
    },
  });

  const price = useWatch({
    control,
    name: 'price',
  });

  const costPrice = useWatch({
    control,
    name: 'costPrice',
  });

  const trackInventory = useWatch({
    control,
    name: 'trackInventory',
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        <div className="md:col-span-8 space-y-4">
          {/* Informacion general */}
          <Card>
            <CardContent>
              <FieldGroup>
                <Field>
                  <FieldLabel>Título</FieldLabel>
                  <Input
                    type="text"
                    placeholder="Empanada de Carne"
                    {...register('title', {
                      required: 'El título es requerido',
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
                  {/* bg-transparent dark:bg-input/30 */}
                  <div className="border border-dashed border-input flex flex-col items-center justify-center gap-4 rounded-xl p-6 text-balance bg-transparent dark:bg-input/30 hover:bg-muted/40 dark:hover:bg-input/20">
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
                    {categories.map((category) => (
                      <NativeSelectOption
                        key={category.id}
                        value={category.id}
                        className="capitalize"
                      >
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
                    {/* <Input type="text" placeholder="0.00" /> */}
                    <InputGroup>
                      <InputGroupAddon>Bs</InputGroupAddon>
                      <InputGroupInput
                        type="number"
                        placeholder="0.00"
                        {...register('price', {
                          required: 'El precio es requerido',
                          min: {
                            value: 0,
                            message: 'El precio debe ser mayor a 0',
                          },
                        })}
                        aria-invalid={!!errors.price}
                        min={0}
                        step={0.01}
                      />
                    </InputGroup>
                    {errors.price && (
                      <p className="text-sm text-destructive animate-in fade-in slide-in-from-top-1">
                        {errors.price.message}
                      </p>
                    )}
                  </Field>
                  <FieldSeparator />
                  <Field className="w-fit">
                    <FieldLabel>Precio de comparación</FieldLabel>
                    {/* <Input type="text" placeholder="0.00" /> */}
                    <InputGroup>
                      <InputGroupAddon>Bs</InputGroupAddon>
                      <InputGroupAddon align="inline-end">
                        <HoverCard>
                          <HoverCardTrigger>
                            <Button
                              variant="ghost"
                              size="icon"
                              type="button"
                              className="text-muted-foreground"
                            >
                              <CircleQuestionMark />
                            </Button>
                          </HoverCardTrigger>
                          <HoverCardContent>
                            El precio de comparación debe ser mayor al precio
                            del producto.
                          </HoverCardContent>
                        </HoverCard>
                      </InputGroupAddon>
                      <InputGroupInput
                        type="number"
                        placeholder="0.00"
                        min={0}
                        step={0.01}
                        {...register('compareAtPrice')}
                        aria-invalid={!!errors.compareAtPrice}
                      />
                    </InputGroup>
                    {errors.compareAtPrice && (
                      <p className="text-sm text-destructive animate-in fade-in slide-in-from-top-1">
                        {errors.compareAtPrice.message}
                      </p>
                    )}
                  </Field>
                  <hr />
                  {/* Costo, Beneficio, margen */}
                  <ProfitCalculator
                    costPrice={costPrice}
                    price={price}
                    register={register('costPrice')}
                  />
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
        <div className="md:col-span-4 space-y-4">
          <Card>
            <CardContent>
              <FieldGroup>
                <Field>
                  <FieldLabel>Estado</FieldLabel>
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
            </CardContent>
          </Card>
        </div>
      </div>
      <div className="flex items-center justify-end gap-2 mt-4">
        <Link
          to="/admin/products"
          className={buttonVariants({ variant: 'outline' })}
          type="button"
        >
          <X />
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
