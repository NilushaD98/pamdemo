
import {createContext, useReducer,useState} from 'react';

const initialState = {
    isAuthenticated: localStorage.getItem('Token') ? true : false,
    jwt: localStorage.getItem('Token') ? JSON.parse(localStorage.getItem('Token')).user : null
}


export const AuthContext = createContext(null);

const authReducer = (state, action) => {
    
    switch(action.type) {
        case 'LOGIN_SUCCESS':
            const loggedInState = {isAuthenticated: true, user: action.payload}
            // update the local storage
            localStorage.setItem('Token', JSON.stringify(loggedInState));
            return loggedInState;

        case 'LOGOUT_SUCCESS':

            // remove current user from local storage
            localStorage.removeItem('Token');
            localStorage.removeItem('Token1');
            return {...state, isAuthenticated: false, user: null}; 

        default:
            return;
    }
}

const AuthContextProvider = ({children}) => {

    const [authState, dispatch] = useReducer(authReducer, initialState);
    

    return (
        <AuthContext.Provider value={{auth: authState, dispatch}}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;

