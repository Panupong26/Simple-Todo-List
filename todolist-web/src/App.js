import React from 'react';
import './App.css';
import PrivateRoute from './config/privateroute';
import { useState } from 'react';
import localstorage from './tokenCheck/localstorage'


 


function App() {
  const [status, setStatus] = useState(localstorage.getStatus());

  return (
    <div className='App'>
      <PrivateRoute status = {status} setStatus = {setStatus}/>
    </div>
  )
}

export default App ;