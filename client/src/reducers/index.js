import { combineReducers } from 'redux'
import { userReducer } from './userReducer'
import { searchReducer } from './searchReducer'
import { cartReducer } from './cartReducer'
import { drawerReducer } from './darwerReducer'
import { couponReducer } from './couponReducer'

export const rootReducer = combineReducers({
    user: userReducer,
    search: searchReducer,
    cart: cartReducer,
    drawer: drawerReducer,
    coupon: couponReducer
})

export default rootReducer;