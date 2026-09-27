import type { Order } from '@/domain/entities/order.entity';
import type { OrderDB } from '../interfaces/orders-response.interface';

export class OrderMapper {
  static orderDBToEntity(orderDB: OrderDB): Order {
    return {
      ...orderDB,
      customer: {
        id: orderDB.customer.id,
        displayName: `${orderDB.customer.firstName} ${orderDB.customer.lastName}`,
        firstName: orderDB.customer.firstName,
        lastName: orderDB.customer.lastName,
        email: orderDB.customer.email,
        phone: orderDB.customer.phone,
        note: orderDB.customer.note,
        amountSpent: '0',
        lastOrder: null,
        numberOfOrders: 0,
        createdAt: orderDB.customer.createdAt,
        canDelete: false,
      },
    };
  }
}
