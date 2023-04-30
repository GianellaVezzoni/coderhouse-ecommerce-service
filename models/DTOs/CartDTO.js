export default class CartDTO {
  constructor({id, userId,products,total, createdAt}) {
    this.id = id;
    this.userId = userId;
    this.products = products;
    this.total = total;
    this.createdAt = createdAt;
  }
}

export function transformToDTO_Carts(carts) {
  if(Array.isArray(carts)) {
    return carts.map(cart => new CartDTO(cart));
  }else{
    return new CartDTO(carts)
  }
}