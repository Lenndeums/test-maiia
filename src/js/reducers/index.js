import {combineReducers} from 'redux'
import {connectRouter} from 'connected-react-router'

import products from './products'

export default history => combineReducers({
    router: connectRouter(history),
    products
})