import React from 'react';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';

export default class DynamicForm extends React.Component {
  state={
    fields: this.props.formFields,
  };

  submitForm = event => {
    event.preventDefault();
    const {fields, ...inputFields} = this.state;
    console.log(inputFields);
    // alert(Object.keys(inputFields))
    // post data to server
    axios.post("http://localhost:9000/api/submit",inputFields).then(
      console.log('successfull submission')
    )

  };

  _handleChange  = event =>{
    this.setState({
      [event.currentTarget.name]:event.currentTarget.value
    });
  };

  render() {
    const {fields} = this.state;
      return (
        

<form onSubmit={this.submitForm}>
          {fields.map(field => {
            if(field.options === undefined){
              if (field.type != "Location"){
                return(
                  <InputTextField 
                    type={field.type}
                    title={field.title}
                    name={field.name}
                    required={field.required}
                    key={field.name}
                    _handleChange={this._handleChange}
                  />
                );
              }
               
            }else{
              
              return(
                <DropDownSelect 
                name={field.name}
                title={field.title}
                required={field.required}
                val={field.options}
                key={field.name}
                _handleChange={this._handleChange}
              />
              );
            }
            
          })}

          <input type="submit" />
        </form>
        
      
      );
    }

}


const InputTextField = ({type, title, name, required, _handleChange}) => (
  <div>
    <label>{title}</label>
    <input
      type={type}
      name = {name}
      required= {required}
      autoComplete = "off"
      onChange = {_handleChange}
      variant="outlined"
      fullWidth
      autoFocus
    />
  </div>
);



const DropDownSelect = ({name, title, required, val, _handleChange}) => (
  <div>
    <label>{title}</label>
      <select name = {name} required= {required} onChange = {_handleChange} >
        <option value="">select an option</option>
        {val.map(values => <option value={values.value} key={values.label}>{values.label}</option>)}
    </select>
  </div>
);


