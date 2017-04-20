'use strict'

const db = require('APP/db')
const Product = db.model('products')
const Order = db.model('orders')
const Item = db.model('items')

module.exports = require('express').Router()
  .get('/', (req, res, next) => {
    if (req.user) {
      Order.findOne({
        where: {
          user_id: req.user.id,
          status: 'pending'
        },
        include: [Item, Product]
      })
        .then(order => res.json(order))
        .catch(next)
    } else {
      res.status(200).json(req.session.cart)
    }
  })
  .post('/', (req, res, next) => {
    if (req.user) {
      Order.findOrCreate(
        req.body,
        {
          where: {
            user_id: req.user.id,
            status: 'pending'
          },
          include: [Item]
        }
      )
      .then(order => res.json(order))
      .catch(next)
    } else {
      if (req.session.cart) {
        req.session.cart.push(req.body)
      } else {
        req.session.cart = [req.body]
      }
    }
  })
  .delete('/:pId', (req, res, send) => {
    var pId = req.params.pId
    var items = req.session.cart.items
    if (req.user) {
      Item.destroy({
        where: { product_id: pId }
      })
        .then(() => res.sendStatus(204))
    } else {
      var idx = -1
      for (var i = 0; i < items.length; i++) {
        if (items[i].productId === pId) idx = i
      }
      items.splice(idx, 1)
      res.sendStatus(204)
    }
  })
