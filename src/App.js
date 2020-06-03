import React, { Component } from 'react';
import AxiosComponent from './components/HomeComponent';
import FormComponent from './components/FormComponent';

//react router
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { apiResponse: "" };
}

  render() {
    return(
    <Router>
          <Switch>
          <Route exact path="/" component={AxiosComponent} />
          <Route path="/form/:formId" component={FormComponent} />
          </Switch> 
        </Router> 
    
    )
  }
}

export default App;