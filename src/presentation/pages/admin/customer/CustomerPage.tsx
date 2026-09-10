import { useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router';
import { ChevronDown, Trash, User } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { toast } from '@/components/ui/toast';
import { AdminTitle } from '@/presentation/components/admin/AdminTitle';
import { CustomConfirmDialog } from '@/presentation/components/shared/CustomConfirmDialog';
import { CustomerForm } from './ui/CustomerForm';
import { LoadingScreen } from '@/presentation/components/shared/LoadingScreen';

import { useCustomer } from '@/presentation/hooks/customer/useCustomer';

import type { Customer } from '@/domain/entities/customer.entity';

const CustomerPage = () => {
  const { id } = useParams();

  const navigate = useNavigate();
  const {
    data: customer,
    isLoading,
    isError,
    mutation,
  } = useCustomer(id || '');

  const [openDialog, setOpenDialog] = useState(false);

  const isCreating = id === 'new';

  const handleSubmit = async (customerForm: Partial<Customer>) => {
    await mutation.mutateAsync(customerForm, {
      onSuccess: (data) => {
        toast.add({
          type: 'success',
          title: 'Cliente guardado',
        });
        navigate(`/admin/customers/${data.id}`, { replace: true });
      },
      onError: () => {
        toast.add({
          type: 'error',
          title: 'Error al guardar cliente',
        });
      },
    });
  };

  if (isError) {
    return <Navigate to="/admin/customers" replace />;
  }

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!customer) {
    return <Navigate to="/admin/customers" replace />;
  }

  const title = isCreating
    ? 'Nuevo cliente'
    : customer?.displayName || 'Editar cliente';

  return (
    <>
      <div className="max-w-6xl w-full mx-auto">
        <div className="flex items-center justify-between">
          <AdminTitle title={title} Icon={User} prevHref="/admin/customers" />

          {!isCreating && (
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <Button variant="outline" size="sm">
                    Más acciones
                    <ChevronDown />
                  </Button>
                }
              />
              <DropdownMenuContent className="w-48" align="center">
                <DropdownMenuItem
                  variant="destructive"
                  onClick={() => {
                    setOpenDialog(true);
                  }}
                >
                  <Trash /> Eliminar cliente
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
        <div className="mt-4">
          <CustomerForm
            customer={customer}
            isPending={mutation.isPending}
            onSubmit={handleSubmit}
          />
        </div>
      </div>
      <CustomConfirmDialog
        className="sm:max-w-xl"
        open={openDialog}
        onOpenChange={setOpenDialog}
        title={`¿Eliminar ${customer.displayName}?`}
        description={`Si eliminas ${customer.displayName}, esto no se puede deshacer.`}
        onAction={() => {}}
        actionText="Eliminar cliente"
      />
    </>
  );
};

export default CustomerPage;
