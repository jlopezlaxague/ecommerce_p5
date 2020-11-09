import React, { Component, useEffect } from "react";
import AllProducts from "../components/AllProducts";
import { connect } from "react-redux";
import { fetchAllProducts } from "../actions/allProducts";
import { userCart, allCart, addVirtualCart } from "../actions/cart";

class AllProductsContainer extends Component {
  constructor(props) {
    super(props);
    this.handleCart = this.handleCart.bind(this);
  }

  componentDidMount() {
    this.props.fetchAllProducts();
  }

  handleCart(product) {
    console.log("en el handle");
    if (!this.props.user.id) {
      console.log("entra al if");
      let virtualCartVariable = [];
      if (localStorage.length === 0) {
        //crea un nuevo elemento en el localstorage
        let newArrayVirtualCart = [];
        let newProduct = product;
        newProduct.CartProductQuant = { quantity: 1 };
        newArrayVirtualCart.push(newProduct);
        localStorage.setItem("cart", JSON.stringify(newArrayVirtualCart));
      } else {
        //Si hay productos buscar y sumar, sino agregar uno nuevo
        let arrayVirtualCart = JSON.parse(localStorage.getItem("cart"));
        let flag = false;
        let indice = "";
        arrayVirtualCart.map((elem, index) => {
          if (elem.id === product.id) {
            flag = true;
            indice = index;
          }
        });
        if (flag === true) {
          arrayVirtualCart[indice].CartProductQuant.quantity =
            arrayVirtualCart[indice].CartProductQuant.quantity + 1;
          localStorage.setItem("cart", JSON.stringify(arrayVirtualCart));
        } else {
          let newProduct = product;
          newProduct.CartProductQuant = { quantity: 1 };
          let addArrayVirtualCart = JSON.parse(localStorage.getItem("cart"));
          addArrayVirtualCart.push(newProduct);
          localStorage.setItem("cart", JSON.stringify(addArrayVirtualCart));
        }
      }
      virtualCartVariable = JSON.parse(localStorage.getItem("cart"));
      this.props.addVirtualCart(virtualCartVariable);
    } else {
      console.log("else", product);
      this.props.userCart(product, this.props.user).then(() => {
        console.log("this props all cart");
        this.props.allCart(this.props.user.id);
      });
    }
  }

  render() {
    return (
      <div>
        <AllProducts
          handleCart={this.handleCart}
          allProducts={this.props.allProducts}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log("state", state);
  return {
    allProducts: state.allProducts.allProducts,
    user: state.user.user,
  };
};

export default connect(mapStateToProps, {
  fetchAllProducts,
  userCart,
  allCart,
  addVirtualCart,
})(AllProductsContainer);
