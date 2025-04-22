
import React from "react";
import ShowHeader from "../constants/Header/ShowHeader";
import { Navigate } from "react-router-dom";
import firebase from "firebase";

import MessageCard from "./MessageCard";
import ShareMessage from "./ShareMessage";
import MessagetoStudent from "./MessagetoStudent";

class Inbox extends React.Component{
    componentDidMount(){
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
              console.log("Authenticated")
              this.setState({user:user})

              firebase.firestore().collection("Messages")
              .where("from","==",firebase.auth().currentUser.uid)
              .onSnapshot((snapshot)=>{
                  let data = snapshot.docs.map(doc => {
                      const data = doc.data();
                      const id = doc.id;
                      return { id, ...data }
                  })
                  console.log(data)
                  this.setState({inboxrecieved:data})
              })
            firebase.firestore().collection("Messages")
              .where("to","==",firebase.auth().currentUser.uid)
              .onSnapshot((snapshot)=>{
                  let data = snapshot.docs.map(doc => {
                      const data = doc.data();
                      const id = doc.id;
                      return { id, ...data }
                  })
                  console.log(data)
                  this.setState({inboxsend:data})
              })
            } else {
              console.log("Not Authenticated")
              this.setState({user:null})
            }
          })
    }
    constructor(){
        super()
        this.state={
            user:'none',
            inboxrecieved:[],
            inboxsend:[],
            recieved:false
        }
    }
    render(){
    if(this.state.user===null){
        return(<Navigate to="/login" replace={true}/> )
    }
    else{
    if(this.state.user.displayName==="Student"){
        
    return(
        <div>
            <ShowHeader user={this.state.user.displayName}/>
                <div className="container pt-5 ">
                    <div className="row mt-5">
                    <h3 className="text-center pt-5">Inbox</h3>
                    <div className="col-4 m-auto">
                        <ShareMessage/>
                        <button className="btn btn-dark m-2" onClick={()=>this.setState({recieved:!this.state.recieved})}>{this.state.recieved?'See Revieved Message':'See Send Messages'}</button>
                    </div>
                    <h4 className="text-center"> {this.state.recieved?'Send Messages':' Revieved Message'} </h4>
                    
                    {
                        this.state.recieved?
                        this.state.inboxrecieved.map(data=>(
                        <MessageCard data={data} key={data.id} />
                    ))
                    :
                    this.state.inboxsend.map(data=>(
                        <MessageCard data={data} key={data.id} />
                    ))
                    }
                    
                    
                    </div>
                </div>
            </div>
        )
    }
    else{
        return(<h2>Permission Denied..!</h2>)
    }
}
}
}
export default Inbox;