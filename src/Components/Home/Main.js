
import React from "react";
import ShowHeader from "../constants/Header/ShowHeader";
import firebase from "firebase";
import { Link, Navigate } from "react-router-dom";
import {FaTrash} from 'react-icons/fa'
import AddNotice from "./AddNotice";

const Portalcard=(data)=>{
    
    let role=data.role
    console.log("role ===",role)
    data=data.data
    if(role==="Institute" || role==="Admin"){
    
    const DeletePost=(id)=>{
        if(window.confirm("Are you sure want to delete ..!")===true){
            if(role==="Institute"){
            firebase.firestore().collection('Instituteportal')
              .doc(`${id}`)
              .delete().then(()=>{
                  console.log("deleted by institute..!")
              })
            }
            else{
                firebase.firestore().collection('Adminportal')
                .doc(`${id}`)
                .delete().then(()=>{
                    console.log("deleted by admin ..!")
                })
            }
    }
    }
    return(
    <div className="py-2">
        <div className="d-flex justify-content-between">
        <h5 className="card-title l-0">{data.title}</h5>
        <span>
        <FaTrash size={15} color="red"
            onClick={()=>{DeletePost(data.id)}}
        />
        </span> 
        </div>
        <p className="card-text">
           {data.desc}
        </p>
        <a href={`${data.link}`} target="_blank">
            {data.link}
        </a>
    </div>
    )
    }
    else{
    return(
        <div className="py-2">
            <div className="d-flex justify-content-between">
            <h5 className="card-title l-0">{data.title}</h5>
            </div>
            <p className="card-text">
           {data.desc}
            </p>
            <Link to={`${data.link}`}>
            {data.link}
            </Link>
        </div>
    )
    }
}

class Main extends React.Component{
    componentDidMount(){
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
              console.log("Authenticated")
              this.setState({user:user})
              console.log(user)
              // Check for login tpye
              if(user.displayName==="Student"){
                // fetch student college detail 
                firebase.firestore().collection('students')
                .where("uid","==",user.uid)
                .onSnapshot((snapshot) => {
                  let clgid = snapshot.docs.map(doc => {
                      return doc.data().clgid; 
                  })
                 this.setState({ collegeid: clgid [0] })
                 
                // fetch institute portal 
                console.log(this.state.collegeid)
                firebase.firestore().collection('Instituteportal')
                .where("clgid","==",`${this.state.collegeid}`)
                .onSnapshot((snapshot)=>{
                    let clg = snapshot.docs.map(doc => {
                        const data = doc.data();
                        const id = doc.id;
                        return { id, ...data }
                    })
                    console.log(clg)
                    console.log(clg[0].clgname)
                    this.setState({clgnotice:clg , clgname:clg[0].clgname})
                })

                firebase.firestore().collection('Adminportal')
                .onSnapshot((snapshot)=>{
                    let admin = snapshot.docs.map(doc => {
                        const data = doc.data();
                        const id = doc.id;
                        return { id, ...data }
                    })
                    console.log(admin)
                    this.setState({adminnotice:admin})
                })
              })
            }


            if(user.displayName==="Institute"){   
                // fetch institute portal 

                firebase.firestore().collection('Instituteportal')
                .where("clgid","==",`${user.uid}`)
                .onSnapshot((snapshot)=>{
                    let clg = snapshot.docs.map(doc => {
                        const data = doc.data();
                        const id = doc.id;
                        return { id, ...data }
                    })
                    console.log(clg)
                    this.setState({clgnotice:clg , clgname:clg[0].clgname})

                    firebase.firestore().collection('Adminportal')
                    .onSnapshot((snapshot)=>{
                        let admin = snapshot.docs.map(doc => {
                            const data = doc.data();
                            const id = doc.id;
                            return { id, ...data }
                        })
                        console.log(admin)
                        this.setState({adminnotice:admin})
                    })
                })
            
            }
            if(user.displayName==="Admin"){   
                // fetch institute portal 

                firebase.firestore().collection('Adminportal')
                .onSnapshot((snapshot)=>{
                    let admin = snapshot.docs.map(doc => {
                        const data = doc.data();
                        const id = doc.id;
                        return { id, ...data }
                    })
                    console.log(admin)
                    this.setState({adminnotice:admin})
                })
            
            }

            }
             else {
              console.log("Not Authenticated")
              this.setState({user:null})
            }
          })
    }
    constructor(){
        super()
        this.state={
            user:'none',
            collegeid:'',
            clgnotice:[],
            adminnotice:[],
            clgname:''
        }
    }
    render(){
        const LogOut=(e)=>{
            e.preventDefault();
            sessionStorage.clear();
            firebase.auth().signOut();
            console.log("User Signed Out !")
            this.setState({logout:true})
          }
        if(this.state.user===null){
            return(<Navigate to="/login" replace={true}/> )
        }
        else{
        console.log(this.state.user.displayName,"asdfasdfsdfasfd")
        return(
            <div>
                <ShowHeader user={this.state.user.displayName}/>
                <div className="container pt-5 ">
                    <div className="row mt-5 ">
                    <div className="card border-dark mb-3 col-10 mt-5 mx-4" >
                        <div className="card-header text-center"><h5>{this.state.clgname}</h5></div>
                        <div className="card-body text-dark">
                        {this.state.clgnotice.map(data=>(
                            <Portalcard role={this.state.user.displayName} data={data} key={data.id}/>
                        ))}
                       
                        </div>
                    </div>
                  
                    <div className="card border-dark mb-3 col-10  mt-5 mx-4" >
                        <div className="card-header text-center"><h5>Admin Portal</h5></div>
                        <div className="card-body text-dark">
                        {this.state.adminnotice.map(data=>(
                            <Portalcard role={this.state.user.displayName} data={data} key={data.id}/>
                        ))}
                        </div>
                    </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-6">
                        <a className="col m-3 px-5 py-2 btn btn-info" onClick={LogOut} >Log Out</a>
                        </div>
                    </div>
                    <AddNotice role={this.state.user.displayName}/>
                </div>
            </div>
        )
    }
}
}
export default Main;