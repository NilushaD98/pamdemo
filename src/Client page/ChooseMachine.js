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


function ChooseMachine() {
const [selectedMachine, setSelectedMachine] = useState('');

const handleMachineChange = (e) => {
    setSelectedMachine(e.target.value);
  };
const[machineName,setMachineName] = useState('')
const[machineNames,setMachineNames]= useState([]);


const getUsersNameAndMachineNames = () =>{
    fetch(
        'https://pamapp-704ebd397b20.herokuapp.com/api/v1/users/getAllMachinesname',
        {
            method:'GET',
            header:{'Accept': 'application/json','Content-Type':'application/json'},
            headers:{
                'AUTHORIZATION':'Bearer '+JSON.parse(localStorage.getItem('Token1')).jwt
            }
        }
    ).then(response =>{
        response.json().then(data =>{
            setMachineNames(data.data)
        })
    }).catch(error =>console.log(error))
}

const getMachineDetails = () =>{
    fetch(
        'https://pamapp-704ebd397b20.herokuapp.com/api/v1/users/getMachineDetailsByName?machineName='+selectedMachine,
        {
            method:'GET',
            header:{'Accept': 'application/json','Content-Type':'application/json'},
            headers:{
                'AUTHORIZATION':'Bearer '+JSON.parse(localStorage.getItem('Token1')).jwt
            }
        }
    ).then(respone =>{
        respone.json().then(
            data =>{
                console.log(data.data);
            }
        )
    }).catch(error =>
        console.log(error))
}

const {dispatch} = useAuthContext();
const navigate = useNavigate();

const handleClickUsername = e => 
{
e.preventDefault();
getMachineDetails();
};

useEffect(() => {
getUsersNameAndMachineNames();
}, []);



return (
<div className='login_main_container'>

<div className="login_form_container" >
<Card
sx={{width:'320px'}}
>
<CardContent className='title_container'>
<Typography className='title_container_text' gutterBottom variant="h4" component="div">
Select Machine
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
    <div style={{display:'flex', justifyContent: 'center'}}>
        <table>
            <tr>
                <td>
                <select 
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
                    value={selectedMachine}
                    onChange={handleMachineChange}
                >
                {machineNames.map(item => (
                <option style={{textAlign:'center'}}key={Math.random()}>
                {item.machineName}
                </option>
                ))}
                </select>
                </td>
            </tr>
        </table>
    </div>
<div>
<FormControl sx={{ m: 1}} variant="outlined" size="small"  className='text_feild'>


</FormControl>
</div>
<div style={{display: 'flex', alignItems: 'center',justifyContent: 'center',marginTop:'40px'}}>
<button  className = 'login_button'type='submit'>Connect</button>
</div>

</Box>

</CardContent>

</Card>
</div>

</div>
)
}

export default ChooseMachine


