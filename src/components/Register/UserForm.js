import React, { Component } from 'react'
// import UserDetails from './UserDetails.js';
import SignUp from './SignUp.js';
import PersonalDetails from './PersonalDetails.js';

export default class UserForm extends Component {
    state = {
        step: 1,
        username: '',
        email: '',
        password: '',
        phone: '',
        gender: '',
        yob: '',
        address: ''
    }
    
    //proceed to next part
    nextStep = () => {
        const { step } = this.state;
        this.setState({
            step: step + 1
        })
    }

    //proceed to previous part
    prevStep = () => {
        const { step } = this.state;
        this.setState({
            step: step - 1
        })
    }

    //handle fields change
    handleChange = input => e => {
        this.setState({[input]: e.target.value})
    }

    render() {
        const { step } = this.state
        const { email, password, phone, username, gender,
                dob, address } = this.state
        const values = { email, password, phone, username, gender,
            dob, address }
        
        switch(step) {
            case 1:
                return (
                   <SignUp 
                        nextStep = {this.nextStep}
                        handleChange = {this.handleChange}
                        values = {values}
                   /> 
                )
            case 2: 
                return (
                    <PersonalDetails 
                        nextStep = {this.nextStep}
                        prevStep = {this.prevStep}
                        handleChange = {this.handleChange}
                        values = {values}
                    />     
                )
            case 3: 
                return <h1>Confirm</h1>
            case 4: 
                return <h1>success</h1>
        }
     }
}
