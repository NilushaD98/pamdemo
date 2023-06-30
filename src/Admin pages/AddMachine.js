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
const [machineIP,setmachineIP] = useState('');
const [machineName,setmachineName] = useState('')    
const [username, setUsername] = useState('');
const [password, setPassword] = useState('');
const [machineOS,setMachineOS]= useState('')

const [selectedOS, setSelectedOS] = useState('');

const handleOSChange = (e) => {
    setSelectedOS(e.target.value);
  };

const {dispatch} = useAuthContext();
const navigate = useNavigate();
const addUser = () =>
{
    
    fetch('https://pamapp-704ebd397b20.herokuapp.com/api/v1/admin/addMachine',
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
                    "machineIP":machineIP,
                    "machineName":machineName,
                    "username":username,
                    "password":password,
                    "machineOS":selectedOS
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
                    navigate('/machineDetails');
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
Add Machine
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
                placeholder="Machine IP"
                onChange={e => setmachineIP(e.target.value)}
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
                type="text"
                placeholder="Machinename"
                onChange={e => setmachineName(e.target.value)}
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
                type="text"
                placeholder="Machine's Username"
                onChange={e => setUsername(e.target.value)}
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
                type="text"
                placeholder="Machine's Password"
                onChange={e => setPassword(e.target.value)}
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
                <select
                    value={selectedOS}
                    onChange={handleOSChange} 
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
                <option value="" disabled selected hidden>Operating System</option>
                <option key={Math.random()}>Linux</option>
                <option key={Math.random()}>Windows</option>
                <option key={Math.random()}>macOS</option>
                </select>    
            </td>
        </tr>
    </table>

<div>
<FormControl sx={{ m: 1}} variant="outlined" size="small"  className='text_feild'>


</FormControl>
</div>
<div className = 'login_button_div'>
<button  className = 'login_button'type='submit'>Add Machine</button>
</div>

</Box>

</CardContent>

</Card>
</div>

</div>
)
}

export default AddUser


