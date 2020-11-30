import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-datepicker/dist/react-datepicker.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Routes from "./Routes";
import { BrowserRouter as Router } from "react-router-dom";
import UserProvider from "./context";

function App() {
  return (
    <UserProvider>
    <Router>
      <Navbar/>
          <Routes/>
      <Footer/>
    </Router>
    </UserProvider>
  );
}

export default App;
