import axios from 'axios'

/* ------------- ACTIONS ---------------- */

const GET = 'GET_ORDER'
const REMOVE = 'REMOVE_ITEM'
const CREATE = 'CREATE_ITEM'

/* ------------- ACTION CREATER ---------------- */

const get = order => ({type: GET, order})
const remove = (oId, pId) => ({type: REMOVE, oId, pId})
const create = item => ({type: CREATE, item})

/* ------------- REDUCERS ---------------- */

export default function reducer(order = {items: [{product: {}}]}, action) {
  switch (action.type) {
  case GET:
    return action.order
  case REMOVE:
    const newItems = order.items.filter(item =>
        item.product_id !== action.pId)
    return { items: newItems }
  case CREATE:
    return { items: [...order.items, action.item] }
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

export const removeItem = (oId, pId) => dispatch => {
  dispatch(remove(oId, pId))
  axios.delete(`/api/cart/${oId}/${pId}`)
    .then(res => res.data)
    .catch(err => console.error('Error removeItem', err))
}

export const createItem = item => dispatch => {
  axios.post('/api/cart', item)
  .then(res => dispatch(create(res.data)))
  .catch(err => console.error('error adding item to cart', err))
}
