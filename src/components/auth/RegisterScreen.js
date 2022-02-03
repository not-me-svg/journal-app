import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setError, removeError } from '../../actions/ui';
import validator from "validator";
import { useForm } from '../../hooks/useForm';
import { startRegisterWithEmailPasswordName } from '../../actions/auth';

export const RegisterScreen = () => {

    const dispatch = useDispatch();
    const { msgError, loading } = useSelector( state => state.ui );

    const [ formValues, handleInputchange ] = useForm({
        name: '',
        email: '',
        password: '',
        password2: ''
    });

    const { name, email, password, password2 } = formValues;

    const handleRegister = (e) => {
        e.preventDefault();

        if ( isFormValid() ) {
            dispatch( startRegisterWithEmailPasswordName(email, password, name) );
        }
    }

    const isFormValid = () => {
        
        if ( name.trim().length === 0 ) {
            dispatch( setError('Name is required') )
            return false;
        } else if ( !validator.isEmail( email ) ) {
            dispatch( setError('Email is not valid') )
            return false;
        } else if ( password !== password2 || password.length < 5 ) {
            dispatch( setError('Password should be at least 6 characters and match each other') )
            return false
        }
        
        dispatch( removeError() );
       return true;
    }

    return (
        <>
            <h3>Register</h3>

            <br />

            <form onSubmit={ handleRegister }>
                <div className="ja__register_form d-flex flex-column">
                    
                    {
                        msgError &&
                        (
                            <div>
                                <br />
                                <div className="msg msg--error msg--full-width">
                                    { msgError }
                                </div>
                                <br />
                            </div>
                        )
                    }

                    <input 
                        className="input"
                        type="text"
                        placeholder="Name"
                        name="name"
                        value={ name }
                        onChange={ handleInputchange }
                        autoComplete="off" />

                    <input 
                        className="input"
                        type="text"
                        placeholder="Email"
                        name="email"
                        value={ email }
                        onChange={ handleInputchange }
                        autoComplete="off" />

                    <input 
                        className="input"
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={ password }
                        onChange={ handleInputchange } />

                    <input 
                        className="input"
                        type="password"
                        placeholder="Confirm password"
                        name="password2"
                        value={ password2 }
                        onChange={ handleInputchange } />
                        
                    <button 
                        className="btn btn--secondary btn--full-width" 
                        type="submit" 
                        disabled={ loading } >
                        Register
                    </button>

                    <br />

                    <Link to="/auth/login">
                        <span className="text--sm">Already registered?</span>
                    </Link>
                </div>
            </form>
        </>
    );
};
