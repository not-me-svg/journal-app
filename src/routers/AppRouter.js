import React, { useEffect, useState } from 'react';
import {
    Route,
    Routes
} from "react-router-dom";
import { useDispatch } from "react-redux";

import { AuthRouter } from './AuthRouter';
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";
import { JournalScreen } from '../components/journal/JournalScreen';
import { auth, onAuthStateChanged } from '../firebase/firebase-config';
import { login } from '../actions/auth';
import { LoadingScreen } from '../components/auth/LoadingScreen';
import { startLoadingNotes } from '../actions/notes';

export const AppRouter = () => {

    const dispatch = useDispatch();

    const [ checking, setChecking ] = useState(true);
    const [ isLoggedIn, setIsLoggedIn ] = useState(false);

    useEffect(() => {
        onAuthStateChanged(auth, async (user) => {
            if (user?.uid) {
                dispatch(login(user.uid, user.displayName));
                setIsLoggedIn(true);

                dispatch(startLoadingNotes(user.uid))
            } else {
                setIsLoggedIn(false);
            }

            setChecking(false);
        });
    }, [dispatch, setChecking, setIsLoggedIn]);
    
    if (checking) {
        return (
            <LoadingScreen />
        )
    }

    return (
        <Routes>
            <Route 
                path="/*"
                element={ 
                    <PublicRoute isAuth={ isLoggedIn }>
                        <AuthRouter />
                    </PublicRoute> 
                } 
            />
            
            <Route 
                path="/"
                element={
                    <PrivateRoute isAuth={ isLoggedIn }>
                        <JournalScreen />
                    </PrivateRoute>
                } 
            />
        </Routes>
    );
};
