import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Movies from "./components/Movies";
import MovieDetail from "./components/MovieDetail";
import Nav from "./components/Nav";

class App extends Component {
  render() {
    return (
      <Router>
      <div overflow='hidden'>
        <Switch>        
          <Route exact path="/" component={Movies} />
          <Route exact path="/detail" component={MovieDetail} />
        </Switch>
        <Nav />
      </div>
      </Router>
    );
  }
}

export default App;