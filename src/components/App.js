import "bootstrap/dist/css/bootstrap.min.css";
import "react-datepicker/dist/react-datepicker.css";
import "../styles/App.css";
import "../styles/Form.css";
import "../styles/Button.css";
import "../styles/Table.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AuthProvider from "../contexts/AuthContext";
import LoginContainer from "./user/LoginContainer";
import SignupContainer from "./user/SignupContainer";
import UpdateProfileContainer from "./user/UpdateProfileContainer";
import ForgotPasswordContainer from "./user/ForgotPasswordContainer";
import PrivateRoute from "./PrivateRoute";
import NavbarContainer from "./NavbarContainer";
import HomeContainer from "./HomeContainer";
import ProductShowContainer from "./product/ProductShowContainer";
import ProductCreateContainer from "./product/ProductCreateContainer";
import ProductEditContainer from "./product/ProductEditContainer";
import ServiceEditContainer from "./service/ServiceEditContainer";
import ServiceShowContainer from "./service/ServiceShowContainer";
import NotFoundPage from "./presentational/NotFoundPage";
import Footer from "./presentational/Footer";
import ErrorConnection from './presentational/ErrorConnection';

function App() {

  return (
    <AuthProvider>
      <NavbarContainer />
      {!navigator.onLine
        ? <ErrorConnection />
        : <Router>
          <Switch>
            <PrivateRoute exact path="/" component={HomeContainer} />
            <PrivateRoute path="/service-show" component={ServiceShowContainer} />
            <PrivateRoute path="/service-edit/:id" component={ServiceEditContainer} />
            <PrivateRoute path="/product-show" component={ProductShowContainer} />
            <PrivateRoute path="/product-create/:id" component={ProductCreateContainer} />
            <PrivateRoute path="/product-edit/:id" component={ProductEditContainer} />
            <PrivateRoute exact path="/update-profile" component={UpdateProfileContainer} />
            <Route exact path="/signup" component={SignupContainer} />
            <Route exact path="/login" component={LoginContainer} />
            <Route exact path="/forgot-password" component={ForgotPasswordContainer} />
            <Route path="*" component={NotFoundPage} />
          </Switch>
        </Router>
      }
      <Footer />
    </AuthProvider>
  )
}

export default App;
