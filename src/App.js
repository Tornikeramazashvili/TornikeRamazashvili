import "./App.css";
import { Component } from "react";
import Header from "./components/header/header";
import Section from "./components/section/section";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import { connect } from "react-redux";

class App extends Component {
  componentDidMount() {
    if (!localStorage.getItem("activeCurrency")) {
      const client = new ApolloClient({
        uri: "http://localhost:4000",
        cache: new InMemoryCache(),
      });

      return client
        .query({
          query: gql`
            query Category {
              currencies {
                label
                symbol
              }
            }
          `,
        })
        .then((result) => {
          let currencies = result.data.currencies;
          currencies.forEach((currency, index) => {
            if (index === 0) {
              localStorage.setItem("activeCurrency", JSON.stringify(currency));
            }
          });

          localStorage.setItem(
            "currencies",
            JSON.stringify(result.data.currencies)
          );

          this.changeCurrencyRedux();
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      this.changeCurrencyRedux();
    }
  }

  changeCurrencyRedux = () => {
    this.props.changeCurrency(
      JSON.parse(localStorage.getItem("activeCurrency"))
    );
  };

  render() {
    return (
      <>
        <Header />
        <Section />
      </>
    );
  }
}

const changeCurrency = (currency) => {
  return {
    type: "SET_CURRENCY",
    currency,
  };
};

export default connect(null, { changeCurrency })(App);
