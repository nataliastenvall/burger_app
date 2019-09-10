import React, { Component } from 'react';
import Button from '../../../Components/UI/Button/Button';
import classes from './ContactData.css';
import Spinner from '../../../Components/UI/Spinner/Spinner';
import axios from '../../../axios-orders';
import Input from '../../../Components/UI/Input/Input';
import { connect } from 'react-redux';

class ContactData extends Component {
  state = {
  orderForm: {
        name: {
          elementType: 'input',
          elementConfig: {
            type: 'text',
            placeholder: 'Your Name'
          },
          value: '',
          validation: {
            required: true,
            minLength: 2
          },
          valid: false,
          touched: false
        },
        street: {
          elementType: 'input',
          elementConfig: {
            type: 'text',
            placeholder: 'Street'
          },
          value: '',
          validation: {
            required: true,
            minLength: 2
          },
          valid: false,
          touched: false
        },
        email: {
          elementType: 'input',
          elementConfig: {
            type: 'email',
            placeholder: 'Your email'
          },
          value: '',
          validation: {
            required: true,
            minLength: 3
          },
          valid: false,
          touched: false
        },
        deliveryMethod: {
          elementType: 'select',
          elementConfig: {
              options: [
              {value: 'fastest', displayValue: 'Fastest'},
              {value: 'cheapest', displayValue: 'Cheapest'}
            ]
          },
          value: 'fastest',
          validation: {
            required: false
          }
        },
        // formIsValid: false,
        // loading: false
  },
  formIsValid: false,
  loading: false
}

  orderHandler = (event) => {
    event.preventDefault();
    this.setState({ loading: true});
    const formData = {};
    for (let formElementIdentifier in this.state.orderForm) {
      formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
    }
    const order = {
      ingredients: this.props.ings,
      price: this.props.price,
      orderData: formData
    }

    axios.post('/orders.json', order)
    .then(response => {
      this.setState({ loading: false });

    })
    .catch(error => {
      this.setState({ loading: false });
    });

  }

  checkValidity(value, rules){
    let isValid = true;
    console.log('rules: ', rules)
    if(rules.required) {
      isValid = value.trim() !== ' ' && isValid;
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }

    return isValid;
  }

  inputChangedHandler = (event, inputIdentifier) => {
    const updatedOrderForm = {
      ...this.state.orderForm
    };
    console.log('updatedOrderForm: ', updatedOrderForm)
    const updatedFormElement = {
      ...updatedOrderForm[inputIdentifier]
    };
    console.log('updatedFormElement: ', updatedFormElement)
    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = this.checkValidity(updatedFormElement.value,
      updatedFormElement.validation);
    updatedFormElement.touched = true;
    updatedOrderForm[inputIdentifier] = updatedFormElement;
    let formIsValid = true;
    for (let inputIdentifier in updatedOrderForm) {
        formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
      }
    this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid});
    this.setState({orderForm: updatedOrderForm});
  }

  render () {
    const formElementsArray = [];
    for (let key in this.state.orderForm) {
      formElementsArray.push({
        id: key,
        config: this.state.orderForm[key]
      });
    }
    let form = (
      <form onSubmit ={this.orderHandler}>
          {formElementsArray.map(formElement => (
            <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            invalid={!formElement.config.valid}
            touched={formElement.config.touched}
            shouldValidate={formElement.config.validation}
            changed={(event) => this.inputChangedHandler(event, formElement.id)}/>
          ))}
          <Button btnType='Success' disabled={!this.state.formIsValid}>ORDER</Button>

      </form>
    );
    if (this.state.loading) {
      form = <Spinner />;
    }
    return (
      <div className={classes.ContactData}>
          <h4>Enter your contact information</h4>
          {form}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
      ings: state.ingredients,
      price: state.totalPrice
  }
};

export default connect(mapStateToProps)(ContactData);
