import React, { useState, useEffect } from 'react';
import useAuthContext from "../hooks/useAuthContext";
import {Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Paper,Button,} from '@mui/material';
import '../style/userdetails.css'
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate ,Link} from 'react-router-dom';
import Swal from 'sweetalert2';


function UserDetailsTable() {


    const navigate = useNavigate();
    const [tableData, setTableData] = useState([]);
      
    const getAllUserDetails = () =>{
        fetch('https://pamapp-704ebd397b20.herokuapp.com/api/v1/admin/getAll',
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
                    setTableData(data);
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
        

    const userDelete = (id) =>
        fetch('https://pamapp-704ebd397b20.herokuapp.com/api/v1/admin/deleteByUserId?userID='+id,
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
                    if(resp.status === 202){
                        Swal.fire({
                            icon: 'success',
                            title: 'Successful !',
                            text: id+' Successfully Deleted!',
                            customClass: {
                                confirmButton: 'c'
                              },
                              buttonsStyling: false
                          });
                          navigate('/userGetDetails');
                    }
                    else if(resp.status === 406){
                        Swal.fire({
                          icon: 'error',
                          title: 'Warning !',
                          text: "You Can't Remove an Admin!!!!",
                          customClass: {
                              confirmButton: 'my-button-class'
                            },
                            buttonsStyling: false
                        });
                        navigate('/userGetDetails');
                      }
                }
            )
            .catch(error => {
                }
            );
            const handleDelete = (id) => {
                const updatedTableData = tableData.filter((row) => row.userID !== id);
                setTableData(updatedTableData);
                userDelete(id);
              };

  return (
    <div className="main_user_table_container">
        
        
        <div className="user_detail_table_div">
            <TableContainer component={Paper}>
                <Link to="/AddUser">
                        <button style={{width:'100px',borderRadius:'10px',fontSize:'15px',alignItems:'center',marginTop:'10px',marginLeft:'20px',marginBottom:'10px',background: 'darkred', color: '#fff', border: 'none', padding: '8px 10px', cursor: 'pointer'}} >
                        Add User 
                        </button>
                </Link>
            
                <Table sx={{ minWidth: 650 }} aria-label="user table">
                
                    <TableHead>
                    <TableRow className='table_row_user_table'>
                        <TableCell sx={{color: '#fff'}}>User ID</TableCell>
                        <TableCell sx={{color: '#fff'}}>User Name</TableCell>
                        <TableCell sx={{color: '#fff'}}>E-mail</TableCell>
                        <TableCell sx={{color: '#fff'}}>Role</TableCell>
                        <TableCell sx={{color: '#fff'}}>DELETE</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableRow>
                        
                    </TableRow>
                    
                    <TableBody>
                    {tableData.map((row) => (
                        <TableRow key={row.userID}>
                        <TableCell>{row.userID}</TableCell>
                        <TableCell>{row.username}</TableCell>
                        <TableCell>{row.email}</TableCell>
                        <TableCell>{row.role}</TableCell>
                        <TableCell>
                            <Button
                            variant="contained"
                            color="error"
                            endIcon ={<DeleteIcon/>}
                            onClick={() => handleDelete(row.userID)}
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
