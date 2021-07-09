import React, { Component } from 'react';
// import './App.css';
import { BrowserRouter as Router, Route, Link, IndexRoute, hashHistory, browserHistory, Switch} from 'react-router-dom';
import Movies from "./components/Movies";
// import PuzzleDetail from "./components/PuzzleDetail";
// import Header from "./components/Header";
// import Playmat from "./components/Playmat";
// import axios from 'axios';
import Nav from "./components/Nav";

class App extends Component {
  render() {
    return (
      <Router>
      <div overflow='hidden'>
        <Nav />
        <Switch>        
          <Route exact path="/" component={Movies} />
{/*          <Route exact path="/:id" component={PuzzleDetail} /> */}
        </Switch>
      </div>
      </Router>
    );
  }
}

export default App;