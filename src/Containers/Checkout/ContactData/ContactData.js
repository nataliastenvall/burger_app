import React, { Component } from 'react';
import Button from '../../../Components/UI/Button/Button';
import classes from './ContactData.css';
import Spinner from '../../../Components/UI/Spinner/Spinner';
import axios from '../../../axios-orders';

class ContactData extends Component {
  state = {
    name: '',
    email: '',
    address: {
      street: '',
      postalCode: ''
    },
    loading: false
  }

  orderHandler = (event) =>{
    event.preventDefault();
    this.setState({ loading: true});
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      customer: {
        name: 'Natalia Koroleva',
        address: {
          street: 'Vesilinnantie 1',
          sity: 'Porvoo'
        },
        email: 'test@test.com',
      },
      deliveryMethod: 'fastest'
    }
    axios.post('/orders.json', order)
    .then(response => {
      this.setState({ loading: false });
    } )
    .catch(error => {
      this.setState({ loading: false });
    });

  }

  render () {
    let form = (
      <form>
          <input type='text' className={classes.Input} name='name' placeholder='Your Name' />
          <input type='email' className={classes.Input} name='email' placeholder='Your Email' />
          <input type='text' className={classes.Input} name='sity' placeholder='Your Sity' />
          <Button btnType='Success' clicked={this.orderHandler}>ORDER</Button>
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

export default ContactData;
