const db = require('APP/db')
const Category = db.model('categories')
const Product = db.model('products')

module.exports = require('express').Router()
  .get('/', (req, res, next) => {
    Category.findAll({})
        .then(planets => {
          res.json(planets)
        })
        .catch(next)
  })
  .get('/:categoryId', (req, res, next) => {
    Product.findAll({
      where: {
        category_id: req.params.categoryId
      }
    })
    .then(products => res.json(products))
    .catch(next)
  })
