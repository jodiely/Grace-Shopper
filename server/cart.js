'use strict'

const db = require('APP/db')
const Product = db.model('products')
const Order = db.model('orders')
const Item = db.model('items')

module.exports = require('express').Router()
  .use((req, res, next) => {
    if (req.session.cartId) {
      Order.findOne({
        where: {
          id: req.session.cartId
        },
        include: [{ model: Item, include: [Product] }]
      })
      .then((order) => {
        req.cart = order
        // Receiving warning message:
        // a promise was created in a handler but was not returned from it
        // According to docs, it's because we aren't returning:
        // http://bluebirdjs.com/docs/warning-explanations.html#warning-a-promise-was-created-in-a-handler-but-was-not-returned-from-it
        next()
      })
      .catch(next)
    } else {
      Order.create({status: 'pending'})
      .then((order) => {
        req.cart = order
        req.session.cartId = order.id
        next()
      })
      .catch(next)
    }
  })
  .get('/', (req, res, next) => {
    res.status(200).json(req.cart)
  })
  .post('/', (req, res, next) => {
    Item.create(req.body, {include: [Product]})
    .then(item => item)
    .then(item =>
      Item.findOne({
        where: {id: item.id},
        include: [Product]
      })
    )
    .then(item => res.json(item))
    .catch(next)
  })
  .delete('/:oId/:pId', (req, res, next) => {
    Item.destroy({
      where: {
        product_id: req.params.pId,
        order_id: req.params.oId
      }
    })
    .then(() => res.sendStatus(204))
    .catch(next)
  })
