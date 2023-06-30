import {useContext} from 'react';
import {AuthContext} from '../context/AuthContext';

const useAuthContext = () => {

    const {auth, dispatch} = useContext(AuthContext);

    return {auth, dispatch};
}

export default useAuthContext;



