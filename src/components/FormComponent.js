import React from 'react';
import axios from 'axios';
import Form from './DynamicForm';



export default class FormComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      fields: [],
      title:null,
      id : null,
    };
  }

  componentDidMount() {
    const {formId} = this.props.match.params;
    
    axios.get(`http://localhost:9000/api/forms/${formId}`)
      .then(
        (result) => { 
          this.setState({
            isLoaded: true,
            fields: result.data.fields,
            title : result.data.title,
            id : result.data.id,
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
    const { error, isLoaded, fields } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (

        <Form formFields={this.state.fields} />
      );
    }
  }

}