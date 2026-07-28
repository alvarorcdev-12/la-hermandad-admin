import { Navigate, useNavigate, useParams } from 'react-router';
import { User } from 'lucide-react';
import { AdminTitle } from '@/admin/components/AdminTitle';
import { CustomerForm } from './ui/CustomerForm';
import { useCustomer } from '@/customers/hooks/useCustomer';
import type { Customer } from '@/customers/interfaces/customer.interface';
import { toast } from 'sonner';

const CustomerPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    data: customer,
    isLoading,
    isError,
    mutation,
  } = useCustomer(id || '');

  const title =
    id === 'new'
      ? 'Nuevo cliente'
      : (customer?.displayName ?? 'Editar cliente');

  const handleSubmit = async (customerLike: Partial<Customer>) => {
    await mutation.mutateAsync(customerLike, {
      onSuccess: (data) => {
        toast.success('Cliente creado');
        navigate(`/admin/customers/${data.id}`);
      },
      onError: () => {
        toast.error('Error al crear el cliente');
      },
    });
  };

  if (isError) {
    return <Navigate to="/admin/customers" replace />;
  }

  if (isLoading) {
    return <h1>Cargando...</h1>;
  }

  if (!customer) {
    return <Navigate to="/admin/customers" replace />;
  }

  return (
    <div className="max-w-5xl mx-auto w-full">
      <AdminTitle title={title} Icon={User} prevHref="/admin/customers" />
      <div className="mt-3">
        <CustomerForm
          customer={customer}
          onSubmit={handleSubmit}
          isPending={mutation.isPending}
        />
      </div>
    </div>
  );
};

export default CustomerPage;
