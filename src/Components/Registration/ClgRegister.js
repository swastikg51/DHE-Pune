import Header2 from "../constants/Header/Header2";
import React from "react";
import Alert from "../constants/Alert";
import CreateInstitute from "../../firebase/CreateInstitute";
import CreateAdmin from "../../firebase/CreateAdmin";

class ClgRegister extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      clgname: '',
      email: '',
      password1: '',
      password2: '',
      error: ''
    }

    this.createAccount = async(event) => {
      event.preventDefault();
      if (this.state.password1 !== this.state.password2) {
        this.setState({ error: "Password Must Be Same ..!" })
      }
      else {
        //this.setState({error: await CreateAdmin(this.state)}) 
        this.setState({error: await CreateInstitute(this.state)}) 
        //console.log(CreateUser(this.state))
      }
    }
  }
  render() {
    return (
      <div>
        <Header2 />
        <div className="sign-bg">
          <div className="row py-2">
            <div className="text-center py-2">
              <h2>College Regesteration</h2>
            </div>

            <div>
              {this.state.error ? <Alert error={this.state.error} /> : ''}
            </div>


            <form onSubmit={this.createAccount}>
              <div className="row">
                <div className="col-md-5 col-10 m-auto">
                  <div className="m-4">
                    <label className="form-label">Colleage Name</label>
                    <input type="text" className="form-control"
                      value={this.state.clgname}
                      onChange={(event) => this.setState({ clgname: event.target.value })}
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


export default ClgRegister;