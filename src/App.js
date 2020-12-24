//import logo from './logo.svg';
//import './App.css';
import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Contract from './components/Contract';
import Footer from './components/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/" >
          <Navbar />
          <Contract />
          <Footer />
        </Route>
      </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
