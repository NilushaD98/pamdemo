import React from 'react'
import '../style/navBar.css'
import IsLogging from '../Client page/LoginPage'
import { Navigate, Link, useNavigate } from 'react-router-dom';
import useAuthContext from '../hooks/useAuthContext';
import Swal from 'sweetalert2';

export default function NavigationBar() {

    const {auth, dispatch} = useAuthContext();

    const navigate = useNavigate();

    const handleLogout = () => {

        dispatch({type: 'LOGOUT_SUCCESS'});
        navigate('/');
        
    }

  return (
    <div className='nav_main_container'>
        <div className="navigation_container">
            <div className="logo_container">
            <Link to='/user'><div className="logo"></div></Link>
            </div>

            <div className="link_container">
                 <ul>
                    
                  
                    {/* only show after authenticated */}
                    {auth?.isAuthenticated  && (auth?.user.redirect_status===1) && (<li><Link to='/userGetDetails'>User Details</Link></li>)}
                    {auth?.isAuthenticated  && (auth?.user.redirect_status===1) && (<li><Link to='/machineDetails'>Machine Details</Link></li>)}
                    
                    {auth?.isAuthenticated &&(<li><button onClick={handleLogout} style={{background: 'transparent', border: 'none', color: '#fff'}} >Logout</button></li>)}
                 </ul>
            </div>
        </div>        
    </div>
  )
}
