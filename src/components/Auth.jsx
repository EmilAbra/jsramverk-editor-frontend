import React from 'react';
import Login from './Login';

export default function Auth({setToken}) {
    return (
        <div className='auth-container'>
             <h2>Sign in or register to use the text editor</h2>

            <Login setToken={setToken} />
        </div>
    );
}
