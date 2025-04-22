
import React from "react";
import ShowHeader from "../constants/Header/ShowHeader";
import { Navigate } from "react-router-dom";
import Select from "react-select";
import firebase from "firebase";
import Permission from "../constants/Permision";

class UniInbox extends React.Component{
    componentDidMount(){
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
              console.log("Authenticated")
              this.setState({user:user})
            } else {
              console.log("Not Authenticated")
              this.setState({user:null})
            }
          });
    }
    constructor(){
        super()
        this.state={
            user:'none'
        }
    }
    render(){
        if(this.state.user===null){
            return(<Navigate to="/login" replace={true}/> )
        }
        else{
        const users=[
                {label:'user1' ,value:1},
                {label:'user2' , value:2}
            ]
        if(this.state.user.displayName==="Admin"){
        return(
            <div>
                <ShowHeader user={this.state.user.displayName}/>
                <div className="container pt-5 ">
                    <div className=" container row mt-5 ">
                    <h3 className="text-center pt-5"> Adminstrator Inbox</h3>
                    <div className="col-10 col-sm-4">
                    <div className="dropdown m-4 text-center">
                    <Select options={users}
                      //value={this.state.branch}
                      //onChange={(value) => this.setState({ branch: value })}
                      placeholder="Select Stream"
                      required
                    />
                  </div>
                </div>
                    <div className="card border-dark col-12 col-sm-8" >
                        <div className="card-header text-center">
                        <div className="m-2">
                        <input type="text" className="form-control"
                        placeholder="Message Title"
                        //value={this.state.name}
                        //onChange={(event) => this.setState({ name: event.target.value })}
                        required
                        />
                        </div>
                        </div>
                        <div className="card-body text-dark">
                        <div className="form-group">
                        <textarea className="form-control" 
                        rows={8} 
                        placeholder="Add Message Description "
                        defaultValue={""} />
                        </div>
                        </div>
                        <div className="card-footer text-muted">
                        <button className="btn btn-info"> Send</button>
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
export default UniInbox;