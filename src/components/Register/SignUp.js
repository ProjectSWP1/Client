import React, { Component } from 'react'
// import UserDetails from './UserDetails.js';
import UserForm from './UserForm.js';
import PersonalForm from './PersonalForm.js';
import Confirm from './Confirm.js';
import dayjs from 'dayjs';

export default class SignUp extends Component {
    state = {
        step: 1,
        email: '',
        password: '',
        phone: '',
        gender: 'male',
        dob: '',
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
        const { email, password, phone, gender,
            dob, address } = this.state
        const values = { email, password, phone, gender,
            dob, address }
        
        switch(step) {
            case 1:
                return (
                   <UserForm 
                        nextStep = {this.nextStep}
                        handleChange = {this.handleChange}
                        values = {values}
                   /> 
                )
            case 2: 
                return (
                    <PersonalForm 
                        nextStep = {this.nextStep}
                        prevStep = {this.prevStep}
                        handleChange = {this.handleChange}
                        values = {values}
                    />     
                )
            case 3: 
                return (
                    <Confirm 
                        nextStep = {this.nextStep}
                        prevStep = {this.prevStep}
                        handleChange = {this.handleChange}
                        values = {values}
                    />     
                )
            case 4: 
                return <h1>success</h1>
        }
     }
}
