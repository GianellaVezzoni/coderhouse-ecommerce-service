export default class Order {
  id;
  orderNumber;
  products;
  total;
  createdAt;
  status;
  userId;
  email

  constructor({id,orderNumber, products, total, createdAt, status, userId, email}) {
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