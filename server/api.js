'use strict'

const api = module.exports = require('express').Router()

api
  .get('/heartbeat', (req, res) => res.send({ok: true}))
  .use('/auth', require('./auth'))
  .use('/users', require('./users'))
  .use('/planets', require('./planets'))
  .use('/cart', require('./cart'))
  // Add item to session manually
  .get('/session', (req, res, next) => {
    req.session.cart = {
      id: 1,
      items: [{product: {title: 'Mars Hotel'}, productId: 1, qty: 1, price: 3.99}]
    }
    res.send(JSON.stringify(req.session.cart))
  })
  .use('/products', require('./products'))

// No routes matched? 404.
api.use((req, res) => res.status(404).end())
