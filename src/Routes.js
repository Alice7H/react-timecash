import { Switch, Route } from "react-router-dom";
import Default from "./components/Default";
import Home from "./components/Home";
import Login from "./components/Login";
// import SignUp from "./components/SignUp";
// import ForgotPassword from "./components/ForgotPassword";
import Result from "./components/notes/Result";
import Product from "./components/products/Product";
import ProductEdit from "./components/products/ProductEdit";
import ServiceEdit from "./components/services/ServiceEdit";
import User from "./components/user/User";
import AuthRoute from "./AuthRoute";
import SharedService from "./components/SharedService";

export default function Routes() {
    return (
        <Switch>
            <Route path="/" component={Home} exact />
            <Route path="/login" component={Login} />
            <Route path="/shared-service/:id" component={SharedService}/>
            {/* <Route path="/signup" component={SignUp} />
            <Route path="/forgot-password" component={ForgotPassword}/>   */}
        
            <AuthRoute path="/user" component={User} />
            <AuthRoute path="/note-result/:id" component={Result} />
            <AuthRoute path="/product/:id" component={Product}  />
            <AuthRoute path="/product-edit/:id/:prodId" component={ProductEdit}  />
            <AuthRoute path="/service-edit/:id" component={ServiceEdit} />     
            <Route path="*" component={Default} />
        </Switch>
    )
}
