import React from "react";
import { connect } from "react-redux";
import NavbarContainer from "./containers/NavbarContainer";
import { Redirect, Route, Switch } from "react-router-dom";
import ProductsContainer from "./containers/ProductsContainer";
import RegisterContainer from "./containers/RegisterContainer";
import LoginContainer from "./containers/LoginContainer";
import SingleProductContainer from "./containers/SingleProductContainer";
import { isLog } from "./actions/users";
import CartContainer from "./containers/CartContainer";
import CheckoutContainer from "./containers/CheckoutContainer";
import Jumbotron from "react-bootstrap/Jumbotron";
import OrdersContainer from "./containers/OrdersContainer";
import SidebarContainer from "./containers/SidebarContainer";
import AdminUserContainer from "./containers/AdminUserContainer";
import AdminProductContainer from "./containers/AdminProductContainer";
import NewProductContainer from "./containers/NewProductContainer";
import AdminCategoryContainer from "./containers/AdminCategoryContainer";
import AdminNewCategoryContainer from "./containers/AdminNewCategoryContainer";
import EditProductContainer from "./containers/EditProductContainer";
import SingleOrderContainer from "./containers/SingleOrderContainer";
import Confirmacion from "./components/ConfirmacionCompra";
import ConfirmacionReview from "./components/ConfirmReview";

class Main extends React.Component {
  //ACA RENDERIZAREMOS LAS RUTAS DE NUESTRA APP

  componentDidMount() {
    this.props.isLog();
  }

  render() {
    return (
      <div id="Main">
        {/* Vamos a tener que borrar. Solo para prueba. */}

        <Route path="/" component={NavbarContainer} />

        <Jumbotron className="jumbo">
          <h1 style={{ color: "grey" }}>Canal Musical</h1>
          <p style={{ color: "grey" }}>by Canal Cultural</p>
        </Jumbotron>
        <Route path="/" component={SidebarContainer} />
        <Switch>
          <Route exact path="/products" component={ProductsContainer} />
          <Route
            exact
            path="/products/:id"
            component={SingleProductContainer}
          />
          <Route path="/register" component={RegisterContainer} />
          <Route path="/login" component={LoginContainer} />
          <Route path="/cart" component={CartContainer} />
          <Route path="/checkout" component={CheckoutContainer} />
          <Route exact path="/orders" component={OrdersContainer} />
          <Route exact path="/orders/:id" component={SingleOrderContainer} />
          <Route exact path="/admin/users" component={AdminUserContainer} />
          <Route
            exact
            path="/admin/product"
            component={AdminProductContainer}
          />
          <Route
            exact
            path="/admin/newproduct"
            component={NewProductContainer}
          />
          <Route
            exact
            path="/admin/newcategory"
            component={AdminNewCategoryContainer}
          />
          <Route
            exact
            path="/admin/category"
            component={AdminCategoryContainer}
          />
          <Route
            exact
            path="/admin/product/:id"
            component={EditProductContainer}
          />
          <Route exact path="/confirmacion" component={Confirmacion} />
          <Route
            exact
            path="/confirmacionreview"
            component={ConfirmacionReview}
          />
          <Redirect to="/products" />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    isLog: () => dispatch(isLog()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
