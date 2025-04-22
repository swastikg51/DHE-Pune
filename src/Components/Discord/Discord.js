
import React from "react";
import firebase from "firebase";
import { Navigate } from "react-router-dom";
import ShowHeader from "../constants/Header/ShowHeader";
import MessageCard from "./MessageCard";
import send from './send.png'

class Discord extends React.Component{
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
            })
            firebase.firestore()
            .collection("Discord")
            .orderBy('creation')
            .onSnapshot((snapshot)=>{
            let comments=snapshot.docs.map(doc=>{
                const data = doc.data();
                const id = doc.id;
                return { id, ...data }
            })
           this.setState({allmessage:comments})
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
            user:'none',
            students:'',
            message:'',
            allmessage:[]
        }
    }
    render(){
        if(this.state.user===null){
            return(<Navigate to="/login" replace={true}/> )
        }
    else{
        if(this.state.user.displayName==="Student"){
            const sharemessage=()=>{
                if(this.state.comment!=""){
                    //Add Comments
                firebase.firestore()
                  .collection("Discord")
                  .doc()
                  .set({
                    uid:this.state.user.uid,
                    profile:this.state.students.profile_pic,
                    name:this.state.students.name,
                    message:this.state.message,
                    creation:firebase.firestore.FieldValue.serverTimestamp()
                  })
                  .then(()=>{
                    this.setState({message:''})
                  console.log("Message Send ..")
                  }
                  )
                }
                else{
                    console.log("Blank Message Does't Send")
                }
            }
            
        return(
            <div>
                <ShowHeader/>
                <div className="container pt-5 ">
                    <div className="row mt-5 ">
                    <h3 className="text-center pt-5">DHE Community</h3>
                    <div className="card border-dark mb-3 col-10 mt-2 m-auto" >
                        <div className="card-header text-center"><h5>Discord Server</h5></div>
                        <div className="card-body text-dark" style={{height:350,overflow:'scroll'}}>
                        {
                            this.state.allmessage.map(data =>(
                                <MessageCard data={data} key={data.id}/>
                            ))
                        }
                        
                        </div>
                        <div className="row py-2">
                            <div className="col-10"> 
                            <input type="text" className="form-control" 
                            value={this.state.message}
                            onChange={(e)=>this.setState({message:e.target.value})}
                             required/>
                            </div>
                            <div className="col-2">
                            <img className="rounded" src={send} height={25}
                                onClick={sharemessage}
                            />
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        )
        }
        else{
         return (<h2 className='text-center py-5'>Permission Denied ..!</h2>)
        }
    }
}
}
export default Discord;