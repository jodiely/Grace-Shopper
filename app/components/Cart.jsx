import React from 'react'
import { connect } from 'react-redux'
import { removeItem } from '../reducers/order'

class Cart extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.removeSubmit = this.removeSubmit.bind(this)
  }

  render() {
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
            <tr key={item.productId}>
              <td>{item.product.title}</td>
              <td>{item.qty}</td>
              <td>{item.price}</td>
              <td>
                <button id={item.productId}
                        onClick={this.removeSubmit}
                        className="btn btn-default btn-xs">
                  <span id={item.productId}
                        className="glyphicon glyphicon-trash">
                  </span>
                </button>
              </td>
            </tr>)}
        </tbody>
      </table>
    </div>
    )
  }
  removeSubmit(evt) {
    evt.stopPropagation()
    this.props.removeItem(Number(evt.target.id))
  }
}

/* ------------- CONTAINER --------------- */

const mapStateToProps = (order) => (order)
const mapDispatch = { removeItem }

export default connect(mapStateToProps, mapDispatch)(Cart)
