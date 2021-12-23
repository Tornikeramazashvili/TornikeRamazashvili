import { Component } from "react";
import "./women.css";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import styled from "styled-components";
import getProductPrice from "../../../helpers/price";

const ProductImg = styled.div`
  width: 100%;
  height: 361px;
  border: none;
  ${(props) =>
    props.img && `background: url(${props.img}) top center no-repeat;`}
  background-size: contain;
`;

class ProductList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
    };
  }

  fetchProductById = (id) => {
    const client = new ApolloClient({
      uri: "http://localhost:4000",
      cache: new InMemoryCache(),
    });

    return client
      .query({
        query: gql`
             query Category {
                  category(input : {title: "${id}"} ) {
                       name,
                        products {
                        id,
                        name,
                        prices {
                          amount,
                          currency {
                            label,
                            symbol
                          }
                          
                        },
                        gallery
                      }
                  }
                   
             }
          `,
      })
      .then((result) => {
        return result;
      })
      .catch((e) => {
        console.log(e);
      });
  };

  fetchProducts = (id) => {
    this.fetchProductById(id).then((r) =>
      this.setState({
        products: r.data.category.products,
      })
    );
  };

  componentDidUpdate(prevProps) {
    if (this.props.match.params.category !== prevProps.match.params.category) {
      this.fetchProducts(this.props.match.params.category);
    }
  }

  componentDidMount() {
    this.fetchProducts(this.props.match.params.category);
  }

  render() {
    return (
      <>
        <div className="women-category">
          <div className="women-category-title-box">
            <h1 className="women-category-title">Category name</h1>
          </div>

          <div className="women-category-box">
            {this.state.products.map((product) => (
              <div className="product-item">
                <Link
                  to={
                    "/category/" +
                    this.props.match.params.category +
                    "/product/" +
                    product.id
                  }
                >
                  <ProductImg img={product.gallery[0]} />
                  <div className="women-category-images-description">
                    <h3>{product.name}</h3>
                    <h4>
                      {getProductPrice(product.prices)?.currency?.symbol}
                      {getProductPrice(product.prices).amount}
                    </h4>
                  </div>
                </Link>
              </div>
            ))}
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

export default connect(mapStateToProps, null)(ProductList);
