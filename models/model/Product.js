export default class Product {
  id;
  name;
  description;
  price;
  productFile;
  stock;
  categories;

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