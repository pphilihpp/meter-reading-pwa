//import logo from './logo.svg';
//import './App.css';
import React, {useState, useEffect} from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import { check, watch } from 'is-offline';

import Login from './components/Login';
import Navbar from './components/Navbar';
//import Contract from './components/Contract';
import Faq from './components/Faq/Faq';
import Logout from './components/Logout';
import GlobalStyle from './components/styles/GlobalStyles'
import Accounts from './components/Contracts/Accounts';
import Offline from './components/Offline'
import ConnectionBanner from './components/ConnectionBanner/ConnectionBanner';

if (!window.Promise) {
  window.Promise = Promise;
}

if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/sw.js')
    .then(function () {
      console.log('Service worker registered!');
    })
    .catch(function(err) {
      console.log(err);
    });
}


function App() {

  const [token, setToken] = useState();
  const [fullName, setFullName] = useState();
  const [isOffline, setIsOffline] = useState(false);
  const [gotReconnected, setGotReconnected] = useState(false);
  const [notInitial, setNotInitial] = useState(false)

 
  let offlineStatus = bool => updateState(bool);//setIsOffline(bool);
  check().then(offlineStatus);
  watch(offlineStatus);

  function updateState(bool) {
    if(isOffline!==bool){
      setNotInitial(true);
      setIsOffline(bool);
    }
  }

  useEffect(() => {
    if(!isOffline && notInitial){
        setGotReconnected(true)
    }
  }, [isOffline])

  useEffect(() => {
      if(gotReconnected) {
          const timer = setTimeout(() => {
              setGotReconnected(false);
          }, 3000);
          return () => clearTimeout(timer);
      }
  }, [gotReconnected])


  return (
    <div>
      <BrowserRouter>
        <GlobalStyle />
        {
          token ? 
          <Switch>
            <Route exact path="/" >
              <Navbar />
              {(isOffline || (!isOffline && gotReconnected)) ? <ConnectionBanner isOffline={isOffline} setGotReconnected={setGotReconnected} gotReconnected={gotReconnected}/> : ""}
              <Accounts token={token}/>
            </Route>
            <Route path="/faq">
              <Navbar />
              {(isOffline || (!isOffline && gotReconnected)) ? <ConnectionBanner isOffline={isOffline} setGotReconnected={setGotReconnected} gotReconnected={gotReconnected}/> : ""}
              <Faq />
            </Route>
            <Route path="/logout">
              <Navbar />
              {(isOffline || (!isOffline && gotReconnected)) ? <ConnectionBanner isOffline={isOffline} setGotReconnected={setGotReconnected} gotReconnected={gotReconnected}/> : ""}
              <Logout token={token} setToken={setToken} fullName={fullName}/>
            </Route>
            <Route path="/offline">
              <Navbar />
              {(isOffline || (!isOffline && gotReconnected)) ? <ConnectionBanner isOffline={isOffline} setGotReconnected={setGotReconnected} gotReconnected={gotReconnected}/> : ""}
              <Offline></Offline>
            </Route>
          </Switch>
          :
          <Switch>
            <Route exact path="/offline">
              <Navbar />
              <Offline></Offline>
            </Route>
            <Route path="/">
              {(isOffline || (!isOffline && gotReconnected)) ? <ConnectionBanner isOffline={isOffline} setGotReconnected={setGotReconnected} gotReconnected={gotReconnected}/> : ""}
              <Login setToken={setToken} setFullName={setFullName}/> 
            </Route>
          </Switch>
        }
      </BrowserRouter>
    </div>
  );
}

export default App;
