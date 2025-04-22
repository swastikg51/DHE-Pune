import React from "react";
import Header2 from "../constants/Header/Header2";
import firebase from "firebase";
import Alert from '../constants/Alert'
import { Link, Navigate } from 'react-router-dom';

class AdminLogin extends React.Component {
  constructor(props){
    super(props)
      this.state={
        email:'',
        password:'',
        error:null,
      }
      this.login=(event)=>{
        event.preventDefault()
     firebase.auth().signInWithEmailAndPassword(this.state.email,this.state.password )
        .then((results) => {
              if(firebase.auth().currentUser.displayName==="Admin"){
                this.setState({error:"Login"})
              }
              else{
                this.setState({error:"Credential Not Valid"})
              }
         //
           
        
        })
        .catch((error) => {
            if (error.message === "There is no user record corresponding to this identifier. The user may have been deleted.") {
        
               this.setState({error:"No User Found"})
            }
            else if (error.message === "The email address is badly formatted.") {
              
               this.setState({error:"Please enter valid mail"})
            }
            else {
                console.log(error.message)
                
                this.setState({error:error.message})
            }
        })
    }
   // console.log(err)

}
    render() {
      if(this.state.error==="Login"){
        return (<Navigate to="/home" replace={true} />)
      }
      return(
          <div>
            <Header2/>
            <div className="sign-bg">
            <div className="row py-4">
            <div className="text-center py-2">
                <h2 className="fw-bold">Admin Login</h2>
            </div>

            { this.state.error? <Alert error={this.state.error}/> :''}

            <div className="col-10 col-sm-6 col-lg-4 m-auto">
            <form onSubmit={this.login}>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input type="email" className="form-control" id="Email" aria-describedby="email"
                  value={this.state.email}
                  onChange={event => this.setState({ email: event.target.value })}
                  required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <input type="password" className="form-control" id="Password" 
                  value={this.state.password}
                  onChange={event => this.setState({ password: event.target.value })}
                  required
                  />
                </div>
                <div className="text-center">
                <button type="submit" className="btn btn-dark my-2 mx-5">Submit</button>
                </div>
            </form>
          </div>
      </div>
    </div>
 </div>
)
}}

export default AdminLogin;