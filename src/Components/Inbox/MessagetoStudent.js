import React from "react";
import Select from "react-select";
import firebase from "firebase";

class MessagetoStudent extends React.Component{
    componentDidMount(){
    firebase.firestore().collection("students")
    .get().then((snapshot) => {
      let data = snapshot.docs.map(doc => {
          const label = doc.data().name;
          const value = doc.id;
          return { value, label }
      })
      console.log(data)
      this.setState({allstudent:data})
    })

    firebase.firestore().collection('Institutes')
        .doc(`${firebase.auth().currentUser.uid}`)
        .get().then((doc)=>{
            console.log(doc.data().clgname)
            this.setState({clgname:doc.data().clgname})
        })
    }

    constructor(){
        super()
        this.state={
            title:'',
            desc:'',
            student:'',
            allstudent:'',
            clgname:''
        }
    }
    render(){
    

    const Share=()=>{
        firebase.firestore().collection("Messages")
        .doc()
        .set({
            from:firebase.auth().currentUser.uid,
            to:this.state.student.value,
            senduname:this.state.clgname,
            touname:this.state.student.label,
            title:this.state.title,
            desc:this.state.desc,
            creation:firebase.firestore.FieldValue.serverTimestamp()
        })
        .then(()=>{
            console.log("Uploaded ..")
        })
    }
    return(
        <>
            <button
                type="button"
                className="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
            >
            Share Message
            </button>

            <div
                className="modal fade"
                id="exampleModal"
                tabIndex={-1}
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">
                        Send Message
                    </h5>
                    <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                    />
                    </div>
                    <div className="modal-body">

                    <div className="dropdown m-4 text-center">
                                <Select options={this.state.allstudent}
                                value={this.state.student}
                                onChange={(value) => this.setState({student:value}) }
                                placeholder="Select Student"
                                required
                                />
                            </div>
                                    <div className="card-header text-center">
                                    <div className="m-2">
                                    <input type="text" className="form-control"
                                    placeholder="Message Title"
                                    value={this.state.title}
                                    onChange={(event) => this.setState({title:event.target.value})}
                                    required
                                    />
                                    </div>
                                    </div>
                                    <div className="card-body text-dark">
                                    <div className="form-group">
                                    <textarea className="form-control" 
                                    rows={8} 
                                    value={this.state.desc}
                                    onChange={(event) => this.setState({desc:event.target.value})}
                                    placeholder="Add Message Description "
                                    />
                                    </div>
                                    </div>
                                    <div className="card-footer text-muted">
                                    <button className="btn btn-info" onClick={Share}> Send</button>
                                    </div>  
                    </div>
                </div>
                </div>
            </div>
</>
    )
}
}
export default MessagetoStudent;