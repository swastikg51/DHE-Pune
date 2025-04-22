import React from "react";
import Alert from "../Components/constants/Alert";
import firebase from "firebase";
import Header2 from "../Components/constants/Header/Header2";

class ForgetPass extends React.Component {
  constructor(props){
    super(props)
      this.state={
        email:'',
        error:null,
        isSend:false
      }
      this.senEmail=(event)=>{
        event.preventDefault();
        firebase.auth().sendPasswordResetEmail(this.state.email)
        .then(()=>{
            console.log("send")
            this.setState({error: "Please Check you Email"}) 
            this.setState({"isSend":true})
        })
        .catch((error)=>{
            console.log(error.code)
            this.setState({error: error.code})      
        })

      }
  }
    render() {
      console.log(this.state.isSend)
      return(
          <div>
            <Header2/>
            <div className="sign-bg">
            <div className="row py-4">
            <div className="text-center py-2">
                <h2>Forget Password</h2>
            </div>

            { this.state.error? <Alert error={this.state.error}/> :''}

            <div className="col-10 col-sm-6 col-lg-4 m-auto">
            <form onSubmit={this.senEmail}>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input type="email" className="form-control" id="Email" aria-describedby="emailHelp"
                  value={this.state.email}
                  onChange={event => this.setState({ email: event.target.value })}
                  />
                </div>
                <div className="text-center">
                <button type="submit" disabled={this.state.isSend} className="btn btn-dark my-2 mx-5">Submit</button>
                </div>
            </form>
          </div>
      </div>
    </div>
 </div>
        
)
}}

export default ForgetPass;