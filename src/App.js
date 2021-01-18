//import logo from './logo.svg';
//import './App.css';
import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Contract from './components/Contract';
import Faq from './components/Faq';
import Logout from './components/Logout';
import GlobalStyle from './components/styles/GlobalStyles'
//import Footer from './components/Footer';
//import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
    <GlobalStyle />
      <Switch>
        <Route path="/login" component={Login} />
        <Route exact path="/" >
          <Navbar />
          <Contract />
          {/* <Footer /> */}
        </Route>
        <Route path="/faq">
          <Navbar />
          <Faq />
          {/* <Footer /> */}
        </Route>
        <Route path="/logout">
          <Navbar />
          <Logout />
          {/* <Footer /> */}
        </Route>
      </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
