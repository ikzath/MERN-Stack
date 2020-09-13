import React, { Component } from 'react';
import AppNavBar from "./components/AppNavBar";
import 'bootstrap/dist/css/bootstrap.min.css' ;
import './App.css';
import ShoppingList from "./components/ShoppingList";
import { Provider } from "react-redux";
import store from "./store";
import { Container } from "reactstrap";
import ItemModel from "./components/ItemModel";
import { loadUser } from "./actions/authActions";


class App extends Component {

componentDidMount() {
  store.dispatch(loadUser());
}

  render() {
  return (
    <Provider store={store}>

        <AppNavBar />   
        <Container>
        <ItemModel/>
        <ShoppingList />     
        </Container>
        </Provider>
  );
}
}

export default App;
