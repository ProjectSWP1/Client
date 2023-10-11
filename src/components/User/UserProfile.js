import React from 'react'
import './UserProfile.css'

export default function UserProfile() {
    return (
        <div className='profile-container'>
            <div className='profile'>
                <p className='profile-title'>User Profile</p>
                <form className='profile-form'>
                    Username <input type='text' placeholder='' />
                    Phone number <input type='text'/>
                    Email <input type='text'/>
                    <p className='profile-gender'>
                        <span style={{paddingRight: '50px'}}>Gender: </span> 
                        Male <input name='gender' value={'Male'} type='radio' style={{width: '10%'}}/>
                        Female <input name='gender' value={'Female'} type='radio' style={{width: '10%'}}/>
                    </p>
                    Birthdate <input type='date'/>
                    Address <input type='text'/>
                </form>
            </div>
        </div>
    )
}
