import ShowHeader from '../constants/Header/ShowHeader';
import firebase from 'firebase';
import React from 'react';
import { Navigate } from 'react-router-dom';
import VerifyCard from './VerifyCard';
class Verify extends React.Component{
    componentDidMount(){
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
              console.log("Authenticated")
              this.setState({user:user})
              if(user.displayName==="Institute"){
                firebase.firestore().collection("verify")
                .doc(`${user.uid}`)
                .collection('students')
                .onSnapshot((snapshot) => {
                    let data = snapshot.docs.map(doc => {
                        const data = doc.data();
                        const id = doc.id;
                       return { id, ...data }
                    })
                    console.log(data)
                    this.setState({ students: data })
                })
            }
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
            students:[]
        }
    }
    render(){
    
    const verifyStudent=()=>{
        
    }

    if(this.state.user===null){
        return(<Navigate to="/login" replace={true}/> )
    }
    else{
        console.log(this.state.user.displayName);
        if(this.state.user.displayName==="Institute"){
        return(
            <div>
            <ShowHeader user={this.state.user.displayName}/>
            <div className="container py-5">
            <h3 className="pt-5 text-center mt-3">Verify Alumni Students </h3>
                <div className="row pt-4">
                {this.state.students[0]? 
                this.state.students.map(data=>(
                    <VerifyCard data={data} key={data.id}/>
                )) : 
                <h4 className='text-center'>No Student Detail </h4>
                }
                </div>
            </div>
            </div>
        )
    }
    else{
       return (<h2 className='text-center py-5'>Permission Denied ..!"</h2>)
    }
}
}
}

export default Verify;