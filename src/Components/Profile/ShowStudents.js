import ShowHeader from '../constants/Header/ShowHeader';
import React from 'react';
import firebase from 'firebase';
import { Navigate } from 'react-router-dom';
import VerifyCard from './VerifyCard';
import Select from 'react-select';

class ShowStudents extends React.Component{
    componentDidMount(){
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
              console.log("Authenticated",user.uid)
              this.setState({user:user})
              firebase.firestore().collection('students')
              .where("clgid","==",user.uid)
              .onSnapshot((snapshot) => {
                let data = snapshot.docs.map(doc => {
                    const data = doc.data();
                    const id = doc.id;
                    return { id, ...data }
                })
                console.log(data)
               this.setState({ students: data })
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
            students:[], // display filter result data 
            searchByName:'',
            searchByStream:'',
            searchByPdate:''
        }
    }
    render(){
        if(this.state.user===null){
            return(<Navigate to="/login" replace={true}/> )
        }
    else{
        if(this.state.user.displayName==="Institute"){
            const year = [
                { label: "2018", value: 1 },
                { label: "2019", value: 2 },
                { label: "2020", value: 3 },
                { label: "2021", value: 4 },
              ]
        const SearchByName=()=>{
            firebase.firestore().collection("students")
            .where("clgid","==",`${this.state.user.uid}`)
            .where("name","==",`${this.state.searchByName}`)
            .get().then((snapshot)=>{
              let users=snapshot.docs.map(doc=>{
                  const data=doc.data();
                  const id=doc.id;
                  return {id,...data}
              })
              console.log(users)        
              this.setState({students:users})
            })
        }

        const SearchByStream=()=>{
            firebase.firestore().collection("students")
            .where("clgid","==",`${this.state.user.uid}`)
            .where("stream","==",`${this.state.searchByStream}`)
            .get().then((snapshot)=>{
              let users=snapshot.docs.map(doc=>{
                  const data=doc.data();
                  const id=doc.id;
                  return {id,...data}
              })
              console.log(users)        
              this.setState({students:users})
            })
        }

        const SearchByYear=()=>{
            firebase.firestore().collection("students")
            .where("clgid","==",`${this.state.user.uid}`)
            .where("pdate","==",`${this.state.searchByPdate.label}`)
            .get().then((snapshot)=>{
              let users=snapshot.docs.map(doc=>{
                  const data=doc.data();
                  const id=doc.id;
                  return {id,...data}
              })
              console.log(users)        
              this.setState({students:users})
            })
        }
        console.log(this.state.searchByName)
        return(
            <div>
                <ShowHeader user={this.state.user.displayName}/>
            <div className="container py-5">
            <h3 className="pt-5 text-center mt-3">ALL Alumni Students </h3>
            <div className="row py-3">
                <div className="col-sm-6 px-5">
                <div className='d-flex'>
                <input
                className="form-control me-2"
                type="search"
                placeholder="Search By Name"
                aria-label="Search"
                value={this.state.searchByName}
                onChange={(event)=>this.setState({searchByName:event.target.value})}
                />
                <button className="btn btn-outline-info" onClick={SearchByName}>
                    Search
                </button>
                </div>
                </div>

                <div className="col-sm-6 px-5">
                <div className="d-flex">
                <input
                className="form-control me-2"
                type="search"
                placeholder="Search By Stream"
                aria-label="Search"
                value={this.state.searchByStream}
                onChange={(event)=>this.setState({searchByStream:event.target.value})}
                />
                <button className="btn btn-outline-info" onClick={SearchByStream}>
                    Search
                </button>
                </div>
                </div>

                <div className="col-sm-6 px-5 pt-2">
                <div className="d-flex">
                <div className="dropdown m-4 text-center">
                    <Select options={year}
                      value={this.state.searchByPdate}
                      onChange={(value) => this.setState({ searchByPdate: value })}
                      placeholder="Search By Passing Year"
                      required
                    />
                  </div>
                <button className="btn btn-outline-info" onClick={SearchByYear}>
                    Search
                </button>
                </div>
                </div>
            </div>

            <div className="row pt-4">
            {this.state.students[0]?
             this.state.students.map(data=>(
             <VerifyCard data={data} key={data.id}/>
           ))
           :
           <h4 className='text-center'>No Result Found</h4>
           }     
               
            </div>
            </div>
            </div>
        )
    }
    else{
        return (<h1 className='text-center'>Permission Denied ..!</h1>)
    }
}
}
}

export default ShowStudents;