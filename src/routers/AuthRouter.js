import React from 'react';
import {
    Route,
    Routes
} from "react-router-dom";

import { LoginScreen } from '../components/auth/LoginScreen';
import { RegisterScreen } from '../components/auth/RegisterScreen';

export const AuthRouter = () => {
    return (
        <div className="ja__auth_main h-100vh d-flex jc-center ai-center">
            <div className="theme__box">
                <Routes>
                    <Route 
                        path="/auth/login"
                        element={ <LoginScreen /> } />
                    
                    <Route 
                        path="/auth/register"
                        element={ <RegisterScreen /> } />
                </Routes>
            </div>
        </div>
    );
};
