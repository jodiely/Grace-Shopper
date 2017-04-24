import React from 'react'
import Cart from './Cart'
import { connect } from 'react-redux'
import { Link, browserHistory } from 'react-router'
import { completeOrder } from '../reducers/order'

class Checkout extends React.Component {
    //  (props) => {

    // const handleSubmit = props.handleSubmit
    // // need to set this up^
    constructor(props) {
        super(props)
        this.state = {
            // add states
            name: {
                value: '',
                filledIn: false,
            },
            email: {
                value: '',
                filledIn: false,
            },
            streetAddress: {
                value: '',
                filledIn: false,
            },
            city: {
                value: '',
                filledIn: false,
            },
            state: {
                value: '',
                filledIn: false,
            },
            zip: {
                value: '',
                filledIn: false,
            },
            ccnType: {
                value: '',
                filledIn: false,
            },
            ccnNum: {
                value: '',
                filledIn: false,
            },
            expMonth: {
                value: '',
                filledIn: false,
            },
            expYear: {
                value: '',
                filledIn: false,
            },
            cvv: {
                value: '',
                filledIn: false,
            }

        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.totalPrice = this.totalPrice.bind(this)
        this.disableCheck = this.disableCheck.bind(this)
    }



  handleChange(e) {
    this.setState({ [e.target.name]: { value: e.target.value, filledIn: true } })
  }

  handleSubmit(e) {
    e ? e.preventDefault() : null
    this.props.complete(this.props.order)
    browserHistory.push('/orderConfirmation')
  }

  totalPrice(items) {
    if (items) {
      return items.reduce((acc, item) => acc + item.price, 0)
    }
  }

  disableCheck() {
    for (var key in this.state) {
      if (!this.state[key].filledIn) {
        return true
      }
    }
    return false
  }


    render() {
        return (
            <div>

                <h2>Order Details</h2>
                <div>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Item Name</th>
                                <th>Item Qty</th>
                                <th>Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.props.items && this.props.items.map((item) =>
                                <tr key={item.productId}>
                                    <td>{item.product.title}</td>
                                    <td>{item.qty}</td>
                                    <td>{item.price}</td>
                                </tr>)
                            }
                            <tr>
                                <td></td>
                                <td>Total</td>
                                <td>{this.totalPrice(this.props.items)}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <form className="form-horizontal" onSubmit={this.handleSubmit}>
                    <fieldset>
                        <legend>Payment Details</legend>
                        <div className="form-group">
                            <label className="col-xs-2 control-label">* Name</label>
                            <div className="col-xs-10">
                                <input
                                    className="form-control"
                                    type="text"
                                    name="name"
                                    onChange={this.handleChange}
                                    value={this.state.name.value}
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-xs-2 control-label">* Email</label>
                            <div className="col-xs-10">
                                <input
                                    className="form-control"
                                    type="text"
                                    name="email"
                                    onChange={this.handleChange}
                                    value={this.state.email.value}
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-xs-2 control-label">* Street Address</label>
                            <div className="col-xs-10">
                                <input
                                    className="form-control"
                                    type="text"
                                    name="streetAddress"
                                    onChange={this.handleChange}
                                    value={this.state.streetAddress.value}
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-xs-2 control-label">* City</label>
                            <div className="col-xs-10">
                                <input
                                    className="form-control"
                                    type="text"
                                    name="city"
                                    onChange={this.handleChange}
                                    value={this.state.city.value}
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-xs-2 control-label">* State</label>
                            <div className="col-xs-10">
                                <input
                                    className="form-control"
                                    type="text"
                                    name="state"
                                    onChange={this.handleChange}
                                    value={this.state.state.value}
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-xs-2 control-label">* Zip Code</label>
                            <div className="col-xs-10">
                                <input
                                    className="form-control"
                                    type="text"
                                    name="zip"
                                    onChange={this.handleChange}
                                    value={this.state.zip.value}
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-xs-2 control-label">* Credit Card Type</label>
                            <div className="col-xs-10">
                                <select
                                    type="text"
                                    name="ccnType"
                                    onChange={this.handleChange}
                                    value={this.state.ccnType.value}
                                >
                                    <option></option>
                                    <option>MasterCard</option>
                                    <option>Visa</option>
                                    <option>Amex</option>
                                </select>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-xs-2 control-label">* Credit Card Number</label>
                            <div className="col-xs-10">
                                <input
                                    onChange={this.handleCCN}
                                    className="form-control"
                                    type="text"
                                    name="ccnNum"
                                    onChange={this.handleChange}
                                    value={this.state.ccnNum.value}
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-xs-2 control-label">* Expiration Month</label>
                            <div className="col-xs-10">
                                <input
                                    className="form-control"
                                    type="text"
                                    name="expMonth"
                                    onChange={this.handleChange}
                                    value={this.state.expMonth.value}
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-xs-2 control-label">* Expiration Year</label>
                            <div className="col-xs-10">
                                <input
                                    className="form-control"
                                    type="text"
                                    name="expYear"
                                    onChange={this.handleChange}
                                    value={this.state.expYear.value}
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-xs-2 control-label">* CVV</label>
                            <div className="col-xs-10">
                                <input
                                    className="form-control"
                                    type="text"
                                    name="cvv"
                                    onChange={this.handleChange}
                                    value={this.state.cvv.value}
                                />
                            </div>
                        </div>
                        <div>
                            <p>* Required field</p>
                        </div>
                        <div className="form-group">
                            <div className="col-xs-10 col-xs-offset-2">
                                    <button
                                        type="submit"
                                        className="btn btn-success"
                                        disabled={ this.disableCheck() }
                                    >
                                        Submit Order
                                    </button>
                            </div>
                        </div>
                    </fieldset>
                </form>

            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        order: state.order,
        items: state.order.items
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        complete(order){
            dispatch(completeOrder(order))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout)
