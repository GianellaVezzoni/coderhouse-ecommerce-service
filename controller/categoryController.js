import Category from "../models/Category.js";
import Products from '../models/Product.js';

export const getCategories = async (_, res) => {
  try {
    const categories = await Category.find({});
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
      const categoryObj = new Category({name});
      const category = await categoryObj.save();
      res.status(201).json({
        msg: 'Categoria creada',
        data: category
      })
  } catch (err) {
      res.status(400).json({
        msg: 'Error al crear la categoria',
        err: err
      });
  }
}

export const getCategoryById = async (req, res) => {
  try {
    const {categoryId} = req.params;
    const categoryFounded = await Category.findById(categoryId);
    const products = await Products.find({
      categories: categoryId
    });
    if(!categoryFounded){
      return res.status(404).json({
        msg: 'Categoria no encontrada',
      });
    }
    res.status(200).json({
      msg: 'Categoria encontrada',
      data: {
        category: categoryFounded,
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
    const categoryDeleted = await Category.findByIdAndDelete(categoryId);
      if(!categoryDeleted){
        return res.status(404).json({
          msg: 'Categoria no encontrada',
        });
      }
    res.status(200).json({
      msg: 'Categoria eliminada'
    });
  } catch (err) {
    res.status(400).json({
      msg: 'Error al eliminar la categoria',
      err: err
    })
  }
}