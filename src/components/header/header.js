import { Component } from "react";
import HeaderNavigation from "./headerNavigation/headerNavigation";
import "./header.css";
import { Link } from "react-router-dom";
import HeaderLogo from "./headerLogo/headerLogo";
import HeaderActionsCart from "./headerActions/headerActionsCart";
import { connect } from "react-redux";
import getProductPrice from "../../helpers/price";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isCurrencySwitcherVisible: false,
      isCartVisible: true,
    };
  }

  activeCurrency = () => {
    const activeCurrency = localStorage.getItem("activeCurrency");
    if (!activeCurrency) {
      return "$";
    }

    return JSON.parse(activeCurrency).symbol;
  };

  changeCurrency = (currency) => {
    this.props.changeCurrency(currency);
    localStorage.setItem("activeCurrency", JSON.stringify(currency));
  };

  productSum = (cart) => {
    let sum = 0;
    cart.map((product) => {
      sum += getProductPrice(product.prices).amount * product.quantity;
    });

    return {
      sum: sum,
      currency: JSON.parse(localStorage.getItem("activeCurrency")),
    };
  };

  render() {
    return (
      <>
        <div className="header">
          <HeaderNavigation />
          <div className="logo">
            <Link to="/">
              <HeaderLogo />
            </Link>
            {this.props.counter}
          </div>
          <div className="actions">
            <div
              className="actions-currency"
              onClick={() =>
                this.setState({
                  isCurrencySwitcherVisible:
                    !this.state.isCurrencySwitcherVisible,
                })
              }
            >
              {this.state.isCurrencySwitcherVisible && (
                <div className="currency-switcher">
                  {JSON.parse(localStorage.getItem("currencies")).map(
                    (currency) => (
                      <div
                        className="currency-switcher-each"
                        onClick={() => this.changeCurrency(currency)}
                      >
                        {currency.symbol} {currency.label}
                      </div>
                    )
                  )}
                </div>
              )}
              {this.activeCurrency()}
            </div>
            <div>
              <div
                onClick={() =>
                  this.setState({
                    isCartVisible: !this.state.isCartVisible,
                  })
                }
              >
                <HeaderActionsCart />
                <div className="cart-container">
                  <div className="cart-quantity">
                    {this.props?.cart?.length}
                  </div>
                </div>
              </div>

              {this.state.isCartVisible && (
                <div className="cart-switcher">
                  <div className="cart-switcher-product">
                    {this.props.cart.map((cart) => (
                      <div className="cart-overlay-box">
                        <div className="cart-overlay">
                          <h2 className="cart-overlay-title">{cart.name}</h2>
                          <h2 className="cart-overlay-category">
                            {cart.brand}
                          </h2>
                          <br />
                          <span className="cart-overlay-price">
                            {getProductPrice(cart.prices)?.currency?.symbol}

                            <span>
                              {" "}
                              {(
                                getProductPrice(cart.prices).amount *
                                cart.quantity
                              ).toFixed(2)}
                            </span>
                          </span>
                          <div className="cart-overlay-sizes">
                            <span className="cart-overlay-size-s">S</span>
                            <span className="cart-overlay-size-m">M</span>
                          </div>
                        </div>
                        <div className="cart-overlay-plus-minus-buttons">
                          <div
                            className="cart-overlay-plus-button"
                            onClick={() => this.props.addToCart(cart)}
                          >
                            +
                          </div>
                          <span>{cart.quantity}</span>
                          <div
                            className="cart-overlay-minus-button"
                            onClick={() => this.props.removeFromCart(cart)}
                          >
                            -
                          </div>
                        </div>
                        <div className="cart-overlay-image">
                          <img src={cart.gallery[0]} width="100%" />
                        </div>
                      </div>
                    ))}
                    <div className="cart-overlay-total-box">
                      <div className="cart-overlay-total">Total</div>
                      <div>
                        <span>
                          {this.productSum(this.props.cart)?.currency?.symbol}
                        </span>
                        <span>
                          {" "}
                          {this.productSum(this.props.cart).sum.toFixed(2)}
                        </span>
                      </div>
                    </div>

                    <div className="cart-switcher-button-box">
                      <Link to="/cart">
                        <button className="cart-switcher-view-bag">
                          View bag
                        </button>
                      </Link>
                      <button className="cart-switcher-check-out">
                        Check out
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
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

const changeCurrency = (currency) => {
  return {
    type: "SET_CURRENCY",
    currency,
  };
};

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

export default connect(mapStateToProps, {
  changeCurrency,
  addToCart,
  removeFromCart,
})(Header);
