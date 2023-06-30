import React, { useState, useEffect } from 'react';
import useAuthContext from "../hooks/useAuthContext";
import {Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Paper,Button,} from '@mui/material';
import '../style/userdetails.css'
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate,Link } from 'react-router-dom';
import Swal from 'sweetalert2';


function UserDetailsTable() {


    const navigate = useNavigate();
    const [tableData, setTableData] = useState([]);
      
    const getAllUserDetails = () =>{
        fetch('https://pamapp-704ebd397b20.herokuapp.com/api/v1/admin/getAllMachines',
        {
            method :'GET',
            header:{
                'Accept': 'text/plain;charset=UTF-8','Content-Type':'application/json',
            },
            headers :{
                'Content-Type': 'application/json',
                'AUTHORIZATION':'Bearer '+JSON.parse(localStorage.getItem('Token1')).jwt
                }
        }
    )
    .then(resp => {
        if(resp.status === 200){
            resp.json().then(data => {
                    setTableData(data.data);
                    });
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

    useEffect(() => {
        getAllUserDetails();
    }, []);
        
    const machineDelete = (id) =>
        fetch('https://pamapp-704ebd397b20.herokuapp.com/api/v1/admin/deleteMachine?machineId='+id,
                {
                    method :'DELETE',
                    header:{'Accept': 'application/json','Content-Type':'application/json'},
                    headers :{
                        'Content-Type': 'application/json',
                        'AUTHORIZATION':'Bearer '+JSON.parse(localStorage.getItem('Token1')).jwt
                    }    
                }   
             )
            .then(resp => {
                    if(resp.ok){
                        Swal.fire({
                            icon: 'success',
                            title: 'Successful !',
                            text: id+' Successfully Deleted!',
                            customClass: {
                                confirmButton: 'my-button-class'
                              },
                              buttonsStyling: false
                          });
                          navigate('/machineDetails');
                    }
                    else{
                        Swal.fire({
                          icon: 'error',
                          title: 'Warning !',
                          text: "Something Went Wrong!!!!",
                          customClass: {
                              confirmButton: 'my-button-class'
                            },
                            buttonsStyling: false
                        });
                        navigate('/machineDetails');
                      }
                }
            )
            .catch(error => {
                }
            );
            const handleDelete = (id) => {
                const updatedTableData = tableData.filter((row) => row.machineID !== id);
                setTableData(updatedTableData);
                machineDelete(id);
              };

  return (
    <div className="main_user_table_container">
        
        <div className="user_detail_table_div">
            <TableContainer component={Paper}>
            <Link to="/AddMachine">
                        <button style={{width:'150px',borderRadius:'10px',fontSize:'15px',alignItems:'center',marginTop:'10px',marginLeft:'20px',marginBottom:'10px',background: 'darkred', color: '#fff', border: 'none', padding: '8px 10px', cursor: 'pointer'}} >
                        Add Machine
                        </button>
                </Link>
                <Table sx={{ minWidth: 650 }} aria-label="user table">
                    <TableHead>
                    <TableRow className='table_row_user_table'>
                        <TableCell sx={{color: '#fff'}}>Machine ID</TableCell>
                        <TableCell sx={{color: '#fff'}}>Machine ip</TableCell>
                        <TableCell sx={{color: '#fff'}}>Machine Name</TableCell>
                        <TableCell sx={{color: '#fff'}}>Machine Username</TableCell>
                        <TableCell sx={{color: '#fff'}}>Machine Password</TableCell>
                        <TableCell sx={{color: '#fff'}}>Operating System</TableCell>
                        <TableCell sx={{color: '#fff'}}>DELETE</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {tableData.map((row) => (
                        <TableRow key={row.machineID}>
                        <TableCell>{row.machineID}</TableCell>
                        <TableCell>{row.machineIP}</TableCell>
                        <TableCell>{row.machineName}</TableCell>
                        <TableCell>{row.username}</TableCell>
                        <TableCell>{row.password}</TableCell>
                        <TableCell>{row.machineOS}</TableCell>
                        <TableCell>
                            <Button
                            variant="contained"
                            color="error"
                            endIcon ={<DeleteIcon/>}
                            onClick={() => handleDelete(row.machineID)}
                            >
                            Delete
                            </Button>
                        </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    </div>
  )
}

export default UserDetailsTable
