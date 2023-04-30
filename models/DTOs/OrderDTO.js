export default class OrderDTO {
  constructor({id, orderNumber, products, total, createdAt, status, userId, email}) {
    this.id = id;
    this.orderNumber = orderNumber;
    this.products = products;
    this.total = total;
    this.createdAt = createdAt;
    this.status = status;
    this.userId = userId;
    this.email = email;
  }
}

export function transformToDTO_Orders(orders){
  if(Array.isArray(orders)) {
    return orders.map( order => new OrderDTO(order));
  } else {
      return new OrderDTO(orders)
  }
}