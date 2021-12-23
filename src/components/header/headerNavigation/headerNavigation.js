import { Component } from "react";
import { NavLink } from "react-router-dom";
import "./headerNavigation.css";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

export default class headerNavigation extends Component {

  constructor(props) {
    super(props);
    this.state = {
      menuList: [],
    };
  }

  componentDidMount() {
    const client = new ApolloClient({
      uri: "http://localhost:4000",
      cache: new InMemoryCache(),
    });

    client
      .query({
        query: gql`
          query categories {
            categories {
              name
              products {
                name
              }
            }
          }
        `,
      })
      .then((result) =>
        this.setState({
          menuList: result.data.categories,
        })
      )
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    return (
      <>
        <div className="header-navigation">
          <nav className="nav">
            <ul className="nav-ul">
              {this.state.menuList.map((menu) => (
                <li className="nav-li">
               <NavLink to={"/category/" + menu.name} activeClassName="active-category">
                {menu.name}
                </NavLink>
              </li>
              ))}
            </ul>
          </nav>
        </div>
      </>
    );
  }
}

