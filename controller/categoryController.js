import CategoryService from '../services/Category.js';
const caregoryInstance = new CategoryService();

export const getCategories = async (_, res) => {
  try {
    const categories = await caregoryInstance.getAll();
    res.status(200).json({
      msg: 'Categorias encontradas',
      data: categories
    });
  } catch (err) {
    res.status(400).json({
      msg: 'Error al traer las categorias',
      err: err
    });
  }
}

export const createCategory = async (req, res) => {
  try {
      const { name } = req.body;
      const category = await caregoryInstance.create({name: name});
      res.status(201).json({
        msg: 'Categoria creada',
        data: category
      })
  } catch (err) {
    return res.status(400).json({
      msg: 'Error al crear la categoria',
      err: err
    });
  }
}

export const getCategoryById = async (req, res) => {
  try {
    const {categoryId} = req.params;
    const {category, products} = await caregoryInstance.getOne(categoryId);
    if(category === null){
      return res.status(404).json({
        msg: 'Categoria no encontrada',
      });
    }
    res.status(200).json({
      msg: 'Categoria encontrada',
      data: {
        category: category,
        products: products
      }
    });
  } catch (err) {
    res.status(400).json({
      msg: 'Error al obtener la categoria',
      err: err
    });
  }
}

export const deleteCategory = async (req, res) => {
  try {
    const {categoryId} = req.params;
    const categoryDeleted = await caregoryInstance.deleteOne(categoryId);
    if(!categoryDeleted){
      return res.status(404).json({
        msg: 'Categoria no encontrada',
      });
    }
    return res.status(200).json({
      msg: 'Categoria eliminada'
    });
  } catch (err) {
    res.status(400).json({
      msg: 'Error al eliminar la categoria',
      err: err
    })
  }
}