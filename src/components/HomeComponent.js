import React from 'react';
import axios from 'axios';

import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';


import {
  BrowserRouter as Router,
  Link
} from "react-router-dom";

export default class HomeComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
  }

  componentDidMount() {
    axios.get('http://localhost:9000/api/forms')
      .then(
        (result) => { 
          this.setState({
            isLoaded: true,
            items: result.data.items,
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  render() {
    const { error, isLoaded, items } = this.state;
    
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <Container component="main" maxWidth="xs">         
          <Typography component="h1" variant="h5">
            List of Forms
          </Typography>         
          <ul>
          
             {items.map(item => (
              <li key={item.id}>{[<Link to={`/form/${item.id}`}> {item.title} </Link>]}</li>
            ))}
         
          </ul>
        </Container>  
        
      );
    }
  }
}


