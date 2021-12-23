import { Component } from "react";
import "./cart.css";
import { connect } from "react-redux";
import getProductPrice from "../../../helpers/price";

class cart extends Component {
  render() {
    return (
      <>
        <div className="cart-box">
          <div className="cart-box-title-box">
            <h3 className="cart-box-title">CART</h3>
          </div>

          {this.props?.cart.map((cart) => (
            <div className="cart-box-added-products">
              <div>
                <div className="cart-box-added-products-title-box">
                  <h3 className="cart-box-added-products-title">{cart.name}</h3>

                  <h3 className="cart-box-added-products-category">
                    {cart.brand}
                  </h3>
                  <span className="cart-box-added-products-price">
                    {getProductPrice(cart.prices)?.currency?.symbol}
                    {(
                      getProductPrice(cart.prices).amount * cart.quantity
                    ).toFixed(2)}
                  </span>
                </div>
                <div className="cart-box-added-products-sizes">
                  <span className="cart-box-added-products-size-box-white">
                    S
                  </span>
                  <span className="cart-box-added-products-size-box-black">
                    M
                  </span>
                </div>
              </div>
              <div className="cart-box-added-products-second-part">
                <div className="cart-box-added-products-add-remove">
                  <button
                    className="cart-box-added-plus-button"
                    onClick={() => this.props.addToCart(cart)}
                  >
                    +
                  </button>
                  <span className="cart-box-added-quantity">
                    {cart.quantity}
                  </span>
                  <button
                    className="cart-box-added-minus-button"
                    onClick={() => this.props.removeFromCart(cart)}
                  >
                    -
                  </button>
                </div>
                <div className="cart-image">
                  <img src={cart.gallery[0]} width="100%" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </>
    );
  }
}

function mapStateToProps(state) {
  const cart = state.cart;
  const currency = state.currency;

  return {
    cart,
    currency,
  };
}

const addToCart = (product) => {
  return {
    type: "ADD_TO_CART",
    product,
  };
};

const removeFromCart = (product) => {
  return {
    type: "REMOVE_FROM_CART",
    product,
  };
};

export default connect(mapStateToProps, { addToCart, removeFromCart })(cart);
