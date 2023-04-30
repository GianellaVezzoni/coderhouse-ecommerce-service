export default class ProductDTO {
  constructor({id, name, description, price, productFile, stock, categories}) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.price = price;
    this.productFile = productFile;
    this.stock = stock;
    this.categories = categories;
  }
}

export function transformToDTO_Product(products){
  if(Array.isArray(products)) {
    return products.map( product => new ProductDTO(product));
  } else {
      return new ProductDTO(products)
  }
}