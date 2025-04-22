
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Components/constants/Header/Header2";
import CollegeLogin from "./Components/Registration/CollegeLogin";
import Login from "./Components/Registration/Login";
import Registeration1 from "./Components/Registration/Registration1";
import Home from './Components/Home/Main'
import Inbox from "./Components/Inbox/Inbox";
import Discord from "./Components/Discord/Discord";
import Profile from "./Components/Profile/Profile";
import Landing from "./Components/Landing/Landing";
import app from './firebase/Config';
import ClgInbox from "./Components/Inbox/ClgInbox";
import Verify from "./Components/Discord/Verify";
import ShowStudents from "./Components/Profile/ShowStudents";
import UniInbox from "./Components/Inbox/UniInbox";
import AllStudents from "./Components/Discord/AllStudents";
import ClgRegister from "./Components/Registration/ClgRegister";
import AdminLogin from "./Components/Registration/AdminLogin";
import ForgetPass from "./firebase/ForgetPass";

function App() {
  return (
    <div className="App">
         <BrowserRouter>
         <Routes>
          <Route path="/" element={<Landing/>} />
          <Route path="/clogin" element={<CollegeLogin/>} />
          <Route path="/adminlogin" element={<AdminLogin/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/Registration" element={<Registeration1/>} />
          <Route path="/Inbox" element={<Inbox/>}/>
          <Route path="/ClgInbox" element={<ClgInbox/>} />
          <Route path="/UniInbox" element={<UniInbox/>} />
          <Route path="/home" element={<Home/>} />
          <Route path="/allstudent" element={<AllStudents/>}/>
          <Route path="/discord" element={<Discord/>} />
          <Route path="/profile" element={<Profile/>} />
          <Route path="/showstudents" element={<ShowStudents/>} />
          <Route path="/verify" element={<Verify/>}/>
          <Route path="/clg" element={<ClgRegister/>} />
          <Route path="/forgetpassword" element={<ForgetPass/>} />
         </Routes>
         </BrowserRouter>
    </div>
  );
}

export default App;
