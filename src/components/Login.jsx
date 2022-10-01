import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authModel from '../models/auth';
import './login.css';

export default function Login({setToken}) {
    const navigate = useNavigate();
    const [user, setUser] = useState({});

    function changeHandler(event) {
        let newObject = {};

        newObject[event.target.name] = event.target.value;

        setUser({...user, ...newObject});
    }

    async function register() {
        const registerResult = await authModel.register(user);

        if (registerResult) {
            alert("User successfully created!");
            login();
        }
    }

    async function login() {
        const loginResult = await authModel.login(user);

        if (loginResult.data.token) {
            setToken(loginResult.data.token);
            navigate('/editor');
        }
    }
    return (
        <form>
            <div className='form-container'>
                <label htmlFor="username">Email</label>
                <input
                    placeholder='Enter email'
                    type="email"
                    minLength={6}
                    name="username"
                    id="username"
                    // value={userName}
                    onChange={changeHandler}
                />
                <label htmlFor="password">Password</label>
                <input
                    placeholder='Enter password'
                    type="password"
                    minLength={6}
                    name="password"
                    id="password"
                    // value={userName}
                    onChange={changeHandler}
                />
                <div className='form-button-container'>
                    <button className='register-button' onClick={register}>REGISTER</button>
                    <button onClick={login}>SIGN IN</button>
                </div>
            </div>
        </form>
    );
}
