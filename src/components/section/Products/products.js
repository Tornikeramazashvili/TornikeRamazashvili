import { Component } from "react";
import "./products.css";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import { connect } from "react-redux";
import getProductPrice from "../../../helpers/price";

class Products extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: {},
      activeImg: null,
      sizes: [],
      activeSize: null,
    };
  }

  fetchProductsById = (id) => {
    const client = new ApolloClient({
      uri: "http://localhost:4000",
      cache: new InMemoryCache(),
    });

    client
      .query({
        query: gql`
               query Product {
                    product(id: "${id}") {
                         id,
                          name,
                          description,
                          prices {
                            amount,
                            currency {
                              label,
                              symbol
                            }
                          },
                          gallery,
                          brand,
                          attributes {
                              id,
                              items {
                                displayValue,
                                value
                              }
                          }
                    }
                     
               }
            `,
      })
      .then((result) => {
        this.setState({
          product: result.data.product,
          activeImg:
            result.data.product?.gallery.length > 0 &&
            result.data.product.gallery[0],
        });
      })
      .catch((e) => {
        console.log(e);
      });
  };

  componentDidMount() {
    this.fetchProductsById(this.props.match.params.product);
  }

  render() {
    return (
      <>
        <div className="products-category">
          <div className="products-variety">
            {this.state.product?.gallery?.map((gallery) => (
              <img
                src={gallery}
                onClick={() =>
                  this.setState({
                    activeImg: gallery,
                  })
                }
                className="products-variety-images"
              />
            ))}
          </div>
          <div className="products-chosen">
            <img
              src={this.state.activeImg}
              className="products-chosen-images"
            />
          </div>
          <div className="products-description">
            <h3 className="products-description-title">
              {this.state.product.name}
            </h3>
            <h4 className="products-description-classification">
              {this.state.brand}
            </h4>
            <h5 className="products-description-size">size:</h5>
            <div className="products-size">
              <span className="products-size-xs">XS</span>
              <span className="products-size-s">S</span>
              <span className="products-size-m">M</span>
              <span className="products-size-l">L</span>
            </div>
            <h5 className="products-price-title">Price</h5>
            <span className="products-current-price">
              {this.state.product?.prices &&
                getProductPrice(this.state.product?.prices).currency.symbol +
                  " " +
                  getProductPrice(this.state.product?.prices).amount}
            </span>
            {/* <Link to="/cart" className="add-to-cart-button"> */}
            <button
              className="products-add-to-cart"
              onClick={() =>
                this.props.addToCart({
                  ...this.state.product,
                  ...{ size: this.state.activeSize },
                })
              }
            >
              ADD TO CART
            </button>
            {/* </Link> */}
            <p className="products-content">
              Find stunning women's cocktail dresses and party dresses. Stand
              out in lace and metallic cocktail dresses and party dresses from
              all your favorite brands.
            </p>
          </div>
        </div>
      </>
    );
  }
}

function mapStateToProps(state) {
  const currency = state.currency;
  return {
    currency,
  };
}

const addToCart = (product) => {
  return {
    type: "ADD_TO_CART",
    product,
  };
};

export default connect(mapStateToProps, { addToCart })(Products);
