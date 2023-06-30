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


function AddUser() {

const [username, setUserName] = useState('');
const [password, setPassword] = useState('');
const [email,setEmail]= useState('')
const [role,setRole]=useState('');
const [nic,setNic]=useState('');

const [selectedRole, setSelectedRole] = useState('');

const handleRoleChange = (e) => {
    setSelectedRole(e.target.value);
  };

const {dispatch} = useAuthContext();
const navigate = useNavigate();
const addUser = () =>
{
    
    fetch('https://pamapp-704ebd397b20.herokuapp.com/api/v1/admin/addUser',
        {
            method :'POST',
            header:{
                'Accept': 'text/plain;charset=UTF-8','Content-Type':'application/json',
            },
            headers :{
                'Content-Type': 'application/json',
                'AUTHORIZATION':'Bearer '+JSON.parse(localStorage.getItem('Token1')).jwt
                },
            body:JSON.stringify(
                {
                    "username":username,
                    "password":password,
                    "email":email,
                    "role":selectedRole,
                    "nic":nic
                }
            )
        }
    )
    .then(resp => {
        
        if(resp.status === 201){
            resp.json().then(data => {
                    Swal.fire({
                    icon: 'success',
                    title: 'Successful !',
                    text: data.data+' Added Successfully !',
                    customClass: {
                    confirmButton: 'my-button-class'
                    },
                    buttonsStyling: false
                    });
                    });
                    navigate('/userGetDetails');
        }else{
            Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'something went wrong!',
            });
        }
    
    }
    )
    .catch(error => {
    }
    );

}
const handleClickUsername = e => 
{
e.preventDefault();
addUser();
};

return (
<div className='login_main_container'>

<div className="login_form_container" >
<Card
sx={{width:'320px'}}
>
<CardContent className='title_container'>
<Typography className='title_container_text' gutterBottom variant="h4" component="div">
Add User
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
                    borderWidth:'3px',
                    borderColor:'darkred',
                    '::placeholder': { color: 'red' },
                }}
                />
            </td>
        </tr>
        <tr>
            <td>
                <input
                type="text"
                placeholder="Password"
                onChange={e => setPassword(e.target.value)}
                style={{
                    display:'flex',
                    justifyContent:'center',
                    width:'250px',
                    height:'30px',
                    textAlign:'center',
                    fontSize:'15px',
                    borderRadius:'10px',
                    borderWidth:'3px',
                    borderColor:'darkred',
                    '::placeholder': { color: 'red' },
                }}
                />
            </td>
        </tr>
        <tr>
            <td>
                <input
                type="text"
                placeholder="E-mail"
                onChange={e => setEmail(e.target.value)}
                style={{
                    display:'flex',
                    justifyContent:'center',
                    width:'250px',
                    height:'30px',
                    textAlign:'center',
                    fontSize:'15px',
                    borderRadius:'10px',
                    borderWidth:'3px',
                    borderColor:'darkred',
                    '::placeholder': { color: 'red' },
                }}
                />
            </td>
        </tr>
        <tr>
            <td>
                <select 
                    value={selectedRole}
                    onChange={handleRoleChange}
                    style={{
                        display:'flex',
                        justifyContent:'center',
                        width:'255px',
                        height:'35px',
                        textAlign:'center',
                        fontSize:'15px',
                        borderRadius:'10px',
                        borderWidth:'3px',
                        borderColor:'darkred',
                        '::placeholder': { color: 'red' },
                    }}
                    
                    >
                <option value="" disabled selected hidden>Select Role</option>
                <option key={Math.random()}>ADMIN</option>
                <option key={Math.random()}>USER</option>
                </select>    
            </td>
        </tr>
        <tr>
            <td>
                <input
                type="text"
                placeholder="NIC"
                onChange={e => setNic(e.target.value)}
                style={{
                    display:'flex',
                    justifyContent:'center',
                    width:'250px',
                    height:'30px',
                    textAlign:'center',
                    fontSize:'15px',
                    borderWidth:'3px',
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
<button  className = 'login_button'type='submit'>Add User</button>
</div>

</Box>

</CardContent>

</Card>
</div>

</div>
)
}

export default AddUser


