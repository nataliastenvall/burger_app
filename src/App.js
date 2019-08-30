import React, { Component } from 'react';
import Layout from './Components/Layout/Layout';
import BurgerBuilder from './Containers/BurgerBuilder/BurgerBuilder';
import './App.css';
import Checkout from './Containers/Checkout/Checkout'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Layout>
        <BurgerBuilder />
        <Checkout />
        </Layout>
      </div>
    );
  }
}

export default App;
