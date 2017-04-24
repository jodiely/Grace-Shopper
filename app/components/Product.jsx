import React from 'react'
import { connect } from 'react-redux'
import { Link, browserHistory } from 'react-router'
import { createItem } from '../reducers/order'

class Product extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedQty: 0
    }
    this.handleChange = this.handleChange.bind(this)
    this.addSubmit = this.addSubmit.bind(this)
  }

  render() {
    const product = this.props.selectedProduct
    const qty = product.invQty
    const reviews= this.props.reviews
    return (
      <div>
        <div className="col-md-6" id="productImage">
          <h2> {product.title} </h2>
          <img src={product.image} />
            <div>
              <span className="price">${product.price}</span>
            </div>
        </div>
        <div className="col-md-6">
          <h3>Description: </h3>
            <p>{product.description}</p>
          <label> Quantity: </label>
          <select onChange={this.handleChange}>
            <option> </option>
            {generateOptions(qty)}
          </select>
          <div>
            <button type='submit' className='btn btn-success' onClick={this.addSubmit}> Add To Cart </button>
          </div>
        </div>
        <table className='table table-striped table-hover'>
          <thead>
            <tr>
              <th> User Name </th>
              <th> Rating </th>
              <th> Review Details</th>
            </tr>
            </thead>
            <tbody>
              {reviews && reviews.map(
                review => <tr key={review.id}>
                  <td> {review.user.name} </td>
                  <td> {review.starRating} </td>
                  <td> {review.text} </td>
                  </tr>
              ) }
            </tbody>
        </table>
      </div>
    )
  }

  handleChange(evt) {
    this.setState({
      selectedQty: evt.target.value
    })
  }

  addSubmit(evt) {
    evt.preventDefault()
    const qty = this.state.selectedQty
    const product = this.props.selectedProduct
    const itemToAdd = {
      product_id: product.id,
      price: product.price,
      qty: qty,
      order_id: this.props.order.id
    }
    this.props.createItem(itemToAdd)
    browserHistory.push('/cart')
  }
}

// It generates a drop down menu for the available qty of the product.
const generateOptions = (qty) => {
  const result = []
  let i = 1
  while (i <= qty) {
    result.push(<option key={i} className='qty'> {i} </option>)
    i++
  }
  return result
}


const mapStateToProps = (state) => {
  // console.log('state.order in products', state)
  return {
    selectedProduct: state.products.selectedProduct,
    reviews: state.reviews.reviews,
    order: state.order
  }
}

const mapDispatchToProps = { createItem }

export default connect(
  mapStateToProps, mapDispatchToProps
)(Product)
