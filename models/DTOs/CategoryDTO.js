export default class CategoryDTO {
  constructor({id, name}) {
    this.id = id;
    this.name = name;
  }
}

export function transformToDTO_Category(categories){
  if(Array.isArray(categories)) {
    return categories.map( category => new CategoryDTO(category));
  } else {
    return new CategoryDTO(categories);
  }
}
  