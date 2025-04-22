import React from "react";
import Header from "../constants/Header/Header";
import { Link, Navigate } from "react-router-dom";
import firebase from "firebase";
import Permission from "../constants/Permision";
import UpdateProfile from "./UpdateProfile";

class Profile extends React.Component {
  componentDidMount(){
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          console.log("Authenticated")
          this.setState({user:user})
          firebase.firestore()
          .collection("students")
          .where("uid","==",user.uid)
          .onSnapshot((snapshot) => {
            let data = snapshot.docs.map(doc => {
                return doc.data(); 
            })
           this.setState({ students: data[0] })
           console.log(this.state.students)
        })
        } else {
          console.log("Not Authenticated")
          this.setState({user:null})
        }
      });
}
  constructor(){
    super()
    this.state={
      user:'user',
      students:[],
      logout:false
    }
  }
    render() {

      if(this.state.user===null){
        return(<Navigate to="/login" replace={true}/> )
      }
      else{
      const LogOut=(e)=>{
        e.preventDefault();
        sessionStorage.clear();
        firebase.auth().signOut();
        console.log("User Signed Out !")
        this.setState({logout:true})
      }
      if(this.state.logout){
        return(<Navigate to="/login" replace={true} />)
      }
      else{
      if(this.state.user.displayName==="Student")
      {
      let pdate=new Date(this.state.students.pdate).getMonth()+'/'+new Date(this.state.students.pdate).getFullYear()
      return(
      <div>
      <Header/>
      <div className="container-fluid">
        <div className="container-fluid pt-5 ">
          <div className="row pt-5 pb-2">
            <div className="col-sm-12 col-lg-4 mt-3 py-2 m-auto">
              <div className="text-center pt-5">
                <img className=" m-auto rounded-circle" src={this.state.students.profile_pic} height={150} width={150}/>
              </div>
    
              <div className="px-5 py-3">

              <table className="table table-bordered">
              <tbody>
                <tr>
                  <th scope="row">Surname </th>
                  <td>{this.state.students.sirname}</td>
                </tr>
                <tr>
                  <th scope="row">Name</th>
                  <td>{this.state.students.name}</td>
                </tr>
                <tr>
                  <th scope="row">Middle Name</th>
                  <td>{this.state.students.mname}</td>
                </tr>
                <tr>
                  <th scope="row">College</th>
                  <td>{this.state.students.colleage}</td>
                </tr>
                <tr>
                  <th scope="row">Stream</th>
                  <td>{this.state.students.stream}</td>
                </tr>
                <tr>
                  <th scope="row">Email</th>
                  <td>{this.state.students.email}</td>
                </tr>
                <tr>
                  <th scope="row">Passing Out Date</th>
                  <td> {pdate}</td>
                </tr>
                <tr>
                  <th scope="row">Occupation</th>
                  <td>{this.state.students.occupation}</td>
                </tr>
             
              </tbody>
            </table> 
                <div className="row">
                <div className="col-lg-6">
                <UpdateProfile/>
                </div>
                <div className="col-lg-6" >
                <a className="col m-3 px-5 py-2 btn btn-info" onClick={LogOut} >LogOut</a>
                </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
      )
    }
    else{
      return(<Permission/>)
    }
  }
  }
}
}
  
  export default Profile;

