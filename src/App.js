import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import Menu from './components/menu/Menu';
import Carrito from './components/carrito/Carrito';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route path='/' component={Carrito} />
          <Route path='/direccion-envio' component={Menu} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
