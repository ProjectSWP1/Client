import React, { Component } from 'react'
import UserForm from './UserForm.js';
import PersonalForm from './PersonalForm.js';
import Confirm from './Confirm.js';

export default class SignUp extends Component {
    state = {
        step: 1,
        email: '',
        password: '',
        phone: '',
        gender: 'male',
        address: '',
        dob: '',
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
    handleChange = (input) => e => {
        this.setState({[input]: (input == 'dob') ? `${e.$M + 1}/${e.$D}/${e.$y}` : e.target.value})
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
        }
     }
}
