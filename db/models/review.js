'use strict'

const {STRING, TEXT} = require('sequelize')

module.exports = db => db.define('reviews', {
  starRating: STRING(1),
  text: {
    type: TEXT,
    validate: {
      min: 20,
    }
  }
})

module.exports.associations = (Review, {User}) => {
  Review.belongsTo(User)
}
