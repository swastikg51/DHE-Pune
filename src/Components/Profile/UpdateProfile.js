import React from "react";
import firebase from "firebase";
import { Link } from "react-router-dom";

class UpdateProfile extends React.Component {
  componentDidMount(){
      //this.setState({user:this.props.user})
      firebase.firestore().collection("students")
      .doc(firebase.auth().currentUser.uid)
      .onSnapshot((snapshot)=>{
      const data=snapshot.data()
      this.setState({sirname:data.sirname,name:data.name,mname:data.mname,occupation:data.occupation,img:data.profile_pic})
    })

  }

  constructor(props){
    super(props)
    this.state={
      sirname:'',
      name:'',
      mname:'',
      occupation:'',
      img:'',
      new_pic:'',
      error:""
    }
  }
  render() {
    const update=(e)=>{
      e.preventDefault()

      if(this.state.new_pic){
      
        // firebase.storage().refFromURL(`${this.state.img}`).delete().then(()=>{console.log("Deleted..")})
        // .catch((err)=>{
        //   console.log(err)
        // })
        const imgUrl = `profile/${firebase.auth().currentUser.uid}/${Math.random().toString(36)}`;
        const fileMetaData = { contentType: 'image/jpeg' };
    
        const task = firebase.storage().ref(imgUrl)
        const uploadTask = task.put(this.state.new_pic,fileMetaData);
        uploadTask.on("state_changed",console.log(),console.error(),()=>{
            task.getDownloadURL()
            .then((link)=>{
                console.log(link)
                this.setState({"img":link})
                console.log("Profile uploaded");
                firebase.firestore()
                .collection('students')
                .doc(firebase.auth().currentUser.uid)
                .update(
                    {
                        uid:firebase.auth().currentUser.uid,
                        profile_pic: this.state.img,
                        sirname: this.state.sirname,
                        name: this.state.name,
                        mname: this.state.mname,
                        occupation:this.state.occupation
                    }
                )
                .then(function () {
                    console.log("Data Updated");
                }
                )
            })
        })
    
    }
    else{
      console.log(this.state)
      firebase.firestore()
      .collection('students')
      .doc(firebase.auth().currentUser.uid)
      .update(
          {
              uid:firebase.auth().currentUser.uid,
              profile_pic: this.state.img,
              sirname: this.state.sirname,
              name: this.state.name,
              mname: this.state.mname,
              occupation:this.state.occupation
          }
      )
        .then(function () {
            console.log("Data Updated");
            // return "Post Uploaded"
        }
        )
}
}
      return (
      <div>
        <a className="col m-3 px-5 py-2 btn btn-info" 
            data-bs-toggle="offcanvas"
            href="#offcanvasExample"
            role="button"
            aria-controls="offcanvasExample"
        >Update Profile</a>

  <div
    className="offcanvas offcanvas-start"
    tabIndex={-1}
    id="offcanvasExample"
    aria-labelledby="offcanvasExampleLabel"
  >
    <div className="offcanvas-header">
      <h5 className="offcanvas-title" id="offcanvasExampleLabel">
        Update Profile
      </h5>
      <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"/>
    </div>
    <div className="offcanvas-body row">
      <div className="col-10 col-lg-10 m-auto">
      <form onSubmit={update}>
                <div className="text-center">
                <img className="m-auto rounded-circle" src={this.state.img} height={100} width={100} />
                </div>
               
                  <div className="mb-3">
                    <label className="form-label">Surname</label>
                    <input type="text" className="form-control" id="Username"
                    value={this.state.sirname}
                    onChange={(event) => this.setState({ sirname: event.target.value })}
                    required
                     />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input type="text" className="form-control" id="Name"
                    value={this.state.name}
                    onChange={(event) => this.setState({ name: event.target.value })}
                    required
                     />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Middle Name</label>
                    <input type="text" className="form-control" id="Branch"
                    value={this.state.mname}
                    onChange={(event) => this.setState({ mname: event.target.value })}
                    required
                     />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Occupation</label>
                    <input type="text" className="form-control" id="bio"
                    value={this.state.occupation}
                    onChange={(event) => this.setState({ occupation: event.target.value })}
                    required
                     />
                  </div>          

                  <div className="text-center">
                  <button disabled={this.state.loading} type="submit" className="btn btn-info my-2 mx-5 px-5 py-2">Update</button>
                  </div>
                </form>
      </div>
    </div>
  </div>

            
    </div>
      )
    }
  }
  export default UpdateProfile

