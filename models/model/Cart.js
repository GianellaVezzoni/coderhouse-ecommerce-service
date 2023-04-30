export default class Cart {
  id;
  userId;
  products;
  total;
  createdAt;

  constructor({id, userId,products,total, createdAt}) {
    this.id = id;
    this.userId = userId;
    this.products = products;
    this.total = total;
    this.createdAt = createdAt;
}
}