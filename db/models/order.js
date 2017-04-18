'use strict'

const {STRING, INTEGER, DOUBLE} = require('sequelize')

module.exports = db => db.define('orders', {
  orderNumber: STRING,
  status: STRING,
  qty: INTEGER,
  price: DOUBLE
}, {
  getterMethods: {
    getOrdNum: () =>
      `SS-${new Date().toISOString().slice(0, 10)}-${Math.floor(Math.random()*100)+400}`
  },
  instanceMethods: {
    addItem: function(item) {
      item.orderNumber = this.orderNumber
      return db.Order.create(item)
    }
  }
})

module.exports.associations = (Order, {User}) => {
  Order.belongsTo(User)
}
