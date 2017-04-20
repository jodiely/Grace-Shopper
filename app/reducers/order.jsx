import axios from 'axios'

/* ------------- ACTIONS ---------------- */

const GET = 'GET_ORDER'
const REMOVE = 'REMOVE_ITEM'

/* ------------- ACTION CREATER ---------------- */

const get = order => ({type: GET, order})
const remove = id => ({type: REMOVE, id})

/* ------------- REDUCERS ---------------- */

export default function reducer(order = [], action) {
  switch (action.type) {
  case GET:
    return action.order
  case REMOVE:
    return order.items.filter(item =>
        item.productId !== action.id)
  default:
    return order
  }
}

/* ------------- DISPATCHERS ---------------- */

export const fetchOrder = (id) => dispatch => {
  axios.get(`/api/cart`)
  .then(res => {
    dispatch(get(res.data))
  })
  .catch(err => console.error('Error fetchItems', err))
}

export const removeItem = id => dispatch => {
  dispatch(remove(id))
  axios.delete(`/api/cart/${id}`)
    .then(res => res.data)
    .catch(err => console.error('Error removeItem', err))
}
