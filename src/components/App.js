import "bootstrap/dist/css/bootstrap.min.css";
import "react-datepicker/dist/react-datepicker.css";
import "../styles/App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AuthProvider from "../contexts/AuthContext";
import Login from "./Login";
import Signup from "./Signup";
import ForgotPassword from "./ForgotPassword";
import PrivateRoute from "./PrivateRoute";
import Navbar from "./Navbar";
import Dashboard from "./Dashboard";
import UpdateProfile from "./UpdateProfile";
import ProductCreate from "./ProductCreate";
import ServiceEdit from "./ServiceEdit";
import ServiceShow from "./ServiceShow";
import NotFoundPage from "./NotFoundPage";
import Footer from "./Footer";

function App() { 

  return (
      <AuthProvider>
        <Navbar />
            <Router>
              <Switch>
                <PrivateRoute exact path="/" component={Dashboard} />
                <PrivateRoute path="/service-show/:id" component={ServiceShow} />
                <PrivateRoute path="/service-edit/:id" component={ServiceEdit} />
                <PrivateRoute path="/product-create/:id" component={ProductCreate} />
                <PrivateRoute exact path="/update-profile" component={UpdateProfile} />    
                <Route exact path="/signup" component={Signup} />
                <Route exact path="/login" component={Login}/>
                <Route exact path="/forgot-password" component={ForgotPassword}/>
                <Route path="*" component={NotFoundPage} />
              </Switch>
            </Router>
        <Footer/>
      </AuthProvider>
  )
}

export default App;
