import { CartReducer } from "./cart";
import { CurrencyReducer } from "./currency";
import { combineReducers } from "redux";

const index = combineReducers({
  cart: CartReducer,
  currency: CurrencyReducer,
});

export default index;
