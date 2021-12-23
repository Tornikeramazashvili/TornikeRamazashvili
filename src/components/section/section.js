import { Component } from "react";
import { Route } from "react-router-dom";
import cart from "./cart/cart";
import Kids from "./kids/kids";
import Men from "./men/men";
import ProductList from "./Products/ProductList";
import Products from "./Products/products.js";

export default class Section extends Component {
  render() {
    return (
      <>
        <Route exact path="/category/:category" component={ProductList} />
        <Route
          exact
          path="/category/:category/product/:product"
          component={Products}
        />

        {/* <Route exact path="/" component={Women} /> */}
        <Route exact path="/men" component={Men} />
        <Route exact path="/kids" component={Kids} />
        <Route exact path="/products" component={Products} />
        <Route exact path="/cart" component={cart} />
      </>
    );
  }
}
