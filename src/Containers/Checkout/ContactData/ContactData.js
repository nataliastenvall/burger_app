import React, { Component } from 'react';
import Button from '../../../Components/UI/Button/Button';
import classes from './ContactData.css'

class ContactData extends Component {
  state = {
    name: '',
    email: '',
    address: {
      street: '',
      postalCode: ''
    }
  }

  render () {
    return (
      <div className={classes.ContactData}>
          <h4>Enter your contact information</h4>
          <form>
              <input type='text' className={classes.Input} name='name' placeholder='Your Name' />
              <input type='email' className={classes.Input} name='email' placeholder='Your Email' />
              <input type='text' className={classes.Input} name='sity' placeholder='Your Sity' />
              <Button btnType='Success'>ORDER</Button>
          </form>
      </div>
    );
  }
}

export default ContactData;
