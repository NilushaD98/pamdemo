import React , {useState,useEffect} from 'react'
import useAuthContext from '../hooks/useAuthContext';
import '../style/login.css'
import { Card,CardContent,Typography } from '@mui/material'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';


function LoginPage() {

const [username, setUserName] = useState('');
const [password, setPassword] = useState('');

const [IsLogging, setLoggingUser] = useState(false);

const {dispatch} = useAuthContext();
const navigate = useNavigate();
const authenticationUser = () =>
{
    
    fetch('https://pamapp-704ebd397b20.herokuapp.com/api/v1/auth/authenticate',
        {
            method :'POST',
            header:{
                'Accept': 'text/plain;charset=UTF-8','Content-Type':'application/json'
            },
            headers :{
                'Content-Type': 'application/json',
                },
            body:JSON.stringify(
                {
                    "username":username,
                    "password":password,
                }
            )
        }
    )
    .then(resp => {
        
        if(resp.ok){
            resp.json().then(data => {
                if(data.redirect_status ==="0"){
                    const authData = {
                        jwt:data.access_token,
                        redirect_status:0
                        }
                        localStorage.setItem('Token1', JSON.stringify(authData));
                    dispatch({
                        type: 'LOGIN_SUCCESS',
                        payload: authData
                        
                    }
                    )
                    navigate('/chooseMachine');
                }else if(data.redirect_status ==="1"){
                    navigate('/userGetDetails');
                    const authData = {
                        jwt:data.access_token,
                        redirect_status:1
                        }
                        localStorage.setItem('Token1', JSON.stringify(authData));
                    dispatch({
                        type: 'LOGIN_SUCCESS',
                        payload: authData
                    })
                    
                    
                }
                    Swal.fire({
                    icon: 'success',
                    title: 'Successful !',
                    text: ' Login Successfully !',
                    customClass: {
                    confirmButton: 'my-button-class'
                    },
                    buttonsStyling: false
                    });
                    });
        }else if(resp.status === 403){
            Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Username or Password wrong!',
            });
        }else if(resp.status === 406){
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Nic wrong!!',
            
                });
        }
        return IsLogging;
    }
    )
    .catch(error => {
    }
    );

}
const handleClickUsername = e => 
{
e.preventDefault();
authenticationUser();
};
useEffect(() => {

}, []);

return (
<div className='login_main_container' style={{backgroundImage:'url(../media/PAMLOGO.png)'}}>

<div className="login_form_container" >
<Card
sx={{width:'320px'}}
>
<CardContent className='title_container'>
<Typography className='title_container_text' gutterBottom variant="h4" component="div">
Login
</Typography>
</CardContent>
<CardContent className='input_feilds'>
<Box component="form"
sx={{maxWidth: 800 ,
'& .MuiTextField-root': { m: 1},
}}
noValidate
autoComplete="off"
onSubmit={handleClickUsername}

>
    <table>
        <tr>
        
        </tr>
        <tr>
            <td>
            <input
                type="text"
                placeholder="Username"
                onChange={e => setUserName(e.target.value)}
                style={{
                    display:'flex',
                    justifyContent:'center',
                    width:'250px',
                    height:'30px',
                    textAlign:'center',
                    fontSize:'15px',
                    borderRadius:'10px',
                    borderColor:'darkred',
                    '::placeholder': { color: 'red' },
                }}
                />
            </td>
        </tr>
        <tr>
            <td>
                <input
                    type="password"
                    placeholder="Password"
                    onChange={e => setPassword(e.target.value)}
                    style={{
                        display:'flex',
                        justifyContent:'center',
                        width:'250px',
                        height:'30px',
                        marginTop:'10px',
                        fontSize:'15px',
                        textAlign:'center',
                        borderRadius:'10px',
                        borderColor:'darkred',
                        '::placeholder': { color: 'red' },
                    }}
                    />
            </td>
        </tr>
    </table>

<div>
<FormControl sx={{ m: 1}} variant="outlined" size="small"  className='text_feild'>


</FormControl>
</div>
<div className = 'login_button_div'>
<button  className = 'login_button'type='submit'>Login</button>
</div>

</Box>

</CardContent>

</Card>
</div>

</div>
)
}

export default LoginPage


