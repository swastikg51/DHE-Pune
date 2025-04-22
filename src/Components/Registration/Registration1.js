import Header2 from "../constants/Header/Header2";
import React from "react";
import Alert from "../constants/Alert";
import Select from 'react-select';
import CreateUser from "../../firebase/CreateUser";
import firebase from "firebase";

class Registeration1 extends React.Component {
  componentDidMount(){
    firebase.firestore().collection("Institutes")
    .get().then((snapshot) => {
      let data = snapshot.docs.map(doc => {
          const label = doc.data().clgname;
          const value = doc.id;
          return { value, label }
      })
      console.log(data)
      this.setState({allcolleage:data})
    })
  }

  constructor(props) {
    super(props)
    this.state = {
      allcolleage:[],
      sirname: '',
      name: '',
      mname: '',
      branch: '',
      pdate: '',
      colleage: '',
      occupation: '',
      email: '',
      password1: '',
      password2: '',
      loading: false,
      error: ''
    }
    const setloading = () => {
      this.setState({ loading: true })
    }
    this.createAccount = async(event) => {
      event.preventDefault();
      if(
        this.state.branch==="" | this.state.branch===""|
        this.state.password1==="" | this.state.email===""|
        this.state.mname==="" | this.state.name===""|
        this.state.occupation==="" | this.state.pdate===""|
        this.state.colleage==="" | this.state.sirname===""
      )
      {
        this.setState({ error: "All Field Must Required ..!" })
      }
      else {
        if(this.state.password1 !== this.state.password2) {
          this.setState({ error: "Password Must Be Same ..!" })
        }
        else{
          console.log(this.state)
          this.setState({error: await CreateUser(this.state)}) 
           console.log(this.state.error)
        }
      }
    }
  }
  render() {
    const stream = [
      { label: "Arts", value: 1 },
      { label: "Science", value: 2 },
      { label: "Law", value: 3 },
    ]
    const year = [
      { label: "2018", value: 1 },
      { label: "2019", value: 2 },
      { label: "2020", value: 3 },
      { label: "2021", value: 4 },
    ]
    return (
      <div>
        <Header2 />
        <div className="sign-bg">
          <div className="row py-2">
            <div className="text-center py-2">
              <h2>Student Regesteration</h2>
            </div>

            <div>
              {this.state.error ? <Alert error={this.state.error} /> : ''}
            </div>


            <form onSubmit={this.createAccount}>
              <div className="row">
                <div className="col-md-5 col-10 mx-4">
                  <div className="m-4">
                    <label className="form-label">Surname</label>
                    <input type="text" className="form-control" 
                      value={this.state.sirname}
                      onChange={(event) => this.setState({ sirname: event.target.value })}
                      required
                    />
                  </div>
                  <div className="m-4">
                    <label className="form-label">Name</label>
                    <input type="text" className="form-control"
                      value={this.state.name}
                      onChange={(event) => this.setState({ name: event.target.value })}
                      required
                    />
                  </div>
                  <div className="m-4">
                    <label className="form-label">Middle Name</label>
                    <input type="text" className="form-control"
                      value={this.state.mname}
                      onChange={(event) => this.setState({ mname: event.target.value })}
                      required
                    />
                  </div>

                  <div className="dropdown m-4 text-center">
                    <Select options={stream}
                      value={this.state.branch}
                      onChange={(value) => this.setState({ branch: value })}
                      placeholder="Select Stream"
                      required
                    />
                  </div>

                  <div className="m-4">
                    <label className="form-label">Email</label>
                    <input type="email" className="form-control"  aria-describedby="emailHelp"
                      value={this.state.email}
                      onChange={(event) => this.setState({ email: event.target.value })}
                      required
                    />
                  </div>

                </div>

                <div className="col-md-5 col-10 mx-4">
                  <div className="dropdown m-4 text-center">
                    <Select options={year}
                      value={this.state.pdate}
                      onChange={(value) => this.setState({ pdate: value })}
                      placeholder="Select Passing Out Year"
                      required
                    />
                  </div>

                  <div className="dropdown m-4 text-center">
                    <Select options={this.state.allcolleage}
                      value={this.state.colleage}
                      onChange={(value) => this.setState({ colleage: value })}
                      placeholder="Select University"
                      required
                    />
                  </div>

                  <div className="m-4">
                    <label className="form-label">Current Occupation</label>
                    <input type="text" className="form-control" aria-describedby="emailHelp"
                      value={this.state.occupation}
                      onChange={(event) => this.setState({ occupation: event.target.value })}
                      required
                    />
                  </div>
                  <div className="m-4">
                    <label className="form-label">Password</label>
                    <input type="password" className="form-control" 
                      value={this.state.password1}
                      onChange={(event) => this.setState({ password1: event.target.value })}
                      required
                    />
                  </div>
                  <div className="m-4">
                    <label className="form-label">Re-Enter Password</label>
                    <input type="password" className="form-control" 
                      value={this.state.password2}
                      onChange={(event) => this.setState({ password2: event.target.value })}
                      required
                    />
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div className="text-center">
            <button disabled={this.state.loading} onClick={this.createAccount} type="submit" className="btn btn-dark my-2 mx-5 px-5 py-2">Submit</button>
          </div>
        </div>
      </div>

    )
  }
}


export default Registeration1;