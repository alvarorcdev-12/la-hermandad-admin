import { Navigate, useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';

import { getOrderByIdAction } from '@/actions/orders/get-order-by-id.action';
import { LoadingScreen } from '@/presentation/components/shared/LoadingScreen';

const EditOrderPage = () => {
  const { id } = useParams();

  const {
    data: order,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['order', { id }],
    queryFn: () => getOrderByIdAction(id),
    retry: false,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  if (isError) {
    return <Navigate to="/admin/orders" replace />;
  }

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!order) {
    return <Navigate to="/admin/orders" replace />;
  }

  return (
    <pre>
      <code>{JSON.stringify(order, null, 2)}</code>
    </pre>
  );
};

export default EditOrderPage;
