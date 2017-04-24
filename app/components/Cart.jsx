import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { removeItem } from '../reducers/order'

class Cart extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    console.log('props in cart', this.props)
    const items = this.props.order.items || []
    return (
    <div>
      <h3>Shopping Cart</h3>
      <table className="table">
        <thead>
          <tr>
            <th>Item Name</th>
            <th>Item Qty</th>
            <th>Price</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) =>
            <tr key={item.id}>
              <td>{item.product.title}</td>
              <td>{item.qty}</td>
              <td>{item.price}</td>
              <td>
                <button onClick={(evt) =>
                  this.removeSubmit(evt, item.order_id, item.product_id)}
                        className="btn btn-default btn-xs">
                  <span className="glyphicon glyphicon-trash">
                  </span>
                </button>
              </td>
            </tr>)}
        </tbody>
      </table>
      <Link to={'/checkout'} >
        <button>Checkout</button>
      </Link>
    </div>
    )
  }
  removeSubmit(evt, oId, pId) {
    evt.stopPropagation()
    this.props.removeItem(oId, pId)
  }
}

/* ------------- CONTAINER --------------- */

const mapStateToProps = ({order}) => ({order})
const mapDispatch = { removeItem }

export default connect(mapStateToProps, mapDispatch)(Cart)
