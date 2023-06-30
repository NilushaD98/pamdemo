import React from "react";
import NavigationBar from "./compo/NavigationBar";
import AddUser from "./Admin pages/AddUser"
import '../src/style/app.css'
import LoginPage from './Client page/LoginPage';
import ChooseMachine from "./Client page/ChooseMachine";
import AddMachine from './Admin pages/AddMachine'
import MachineDetails from './Admin pages/MachinesDetails';
import UserGetDetails from "./Admin pages/UserGetDetails";
import { Routes, Route } from "react-router-dom";
import AuthRoute from "./utils/AuthRoute";


function App() {
  return (
    <div>
      <div className="nvigation_bar_container">
            <NavigationBar/>
      </div>
      <Routes>
        <Route path="/AddUser" element={<AddUser/>}/>
        <Route path="/" element ={<LoginPage/>}/>
        <Route path="/addMachine" element={<AddMachine/>}/>
        <Route path="/machineDetails" element ={<MachineDetails/>}/>
        <Route path="/userGetDetails" element ={<UserGetDetails/>}/>
        <Route path="/chooseMachine" element ={<ChooseMachine/>}/>
      </Routes>
    </div>
  );
}

export default App;
