import { Order } from "./order";
import { OrderDetail } from "./orderDetail";

export interface NewOrder {
  order:Order;
  orderDetail: OrderDetail;
  
}