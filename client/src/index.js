
  import React from 'react';
  import ReactDOM from 'react-dom';
  import './index.css';
  import App from './App';
  import Jumbo from './Jumbotron';
  import * as serviceWorker from './serviceWorker';


  
  ReactDOM.render(<Jumbo />, document.getElementById('header'));
  ReactDOM.render(<App />, document.getElementById('root'));
  
  // If you want your app to work offline and load faster, you can change
  // unregister() to register() below. Note this comes with some pitfalls.
  // Learn more about service workers: https://bit.ly/CRA-PWA
  serviceWorker.unregister();


/*
import React, {Component} from 'react';
import ReactDOM from 'react-dom';

//Create a `class component` called App
  //? `class component` is more prefered than `function component` for this app
class App extends Component {
  render() { //render() is a method that returns HTML
    return (
      <h1>Hello Tracy</h1>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
*/