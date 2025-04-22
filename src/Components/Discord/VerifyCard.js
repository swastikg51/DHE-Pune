import firebase from "firebase"

const VerifyCard=(data)=>{
    // Verify Student 
    const VerifyStudent=(data)=>{
        console.log(data.uid,firebase.auth().currentUser.uid)
        //Update isVerified value
        firebase.firestore().collection('students')
        .doc(`${data.id}`)
        .update({
            isVerified:"true"
        },{merge:true})
        .then(()=>{
            console.log("True..")

        })
        // delete doc 
        firebase.firestore().collection("verify")
        .doc(`${firebase.auth().currentUser.uid}`)
        .collection('students')
        .doc(`${data.uid}`)
        .delete()
        .then(()=>{
            console.log("Deleted ..")
        })
    }
    // Block Student
    const BlockStudent=(data)=>{
        console.log(data.uid,firebase.auth().currentUser.uid)
        //Update isVerified value
        firebase.firestore().collection('students')
        .doc(`${data.id}`)
        .update({
            isVerified:"block"
        },{merge:true})
        .then(()=>{
            console.log("True..")

        })
        // delete doc 
        firebase.firestore().collection("verify")
        .doc(`${firebase.auth().currentUser.uid}`)
        .collection('students')
        .doc(`${data.uid}`)
        .delete()
        .then(()=>{
            console.log("Deleted ..")
        })
    }

    data=data.data
   


    return(
        <div className="col-lg-4 py-3">
                <div className="card">
                <div className="card-body">
                    <div className="text-center pb-2">
                    <img
                    height={100}  
                    src='https://firebasestorage.googleapis.com/v0/b/pccoer-web-d4e66.appspot.com/o/icons%2Fprofile.png?alt=media&token=20ea9a22-db9b-421f-a48c-8d379cf23bee'
                    className="rounded-circle"
                    />
                    </div>
                    <h5 className="card-title text-center">{data.name} {data.mname} {data.sirname}</h5>
                    <div className="card-text">
                    <table className="table">
                    <tbody>
                        <tr>
                        <th scope="row">Colleage </th>
                        <td>{data.colleage}</td>
                        </tr>
                        <tr>
                        <th scope="row">Stream</th>
                        <td>{data.stream}</td>
                        </tr>
                        <tr>
                        <th scope="row">Email</th>
                        <td>{data.email}</td>
                        </tr>
                        <tr>
                        <th scope="row">Occupation</th>
                        <td>{data.occupation}</td>
                        </tr>
                        <tr>
                        <th scope="row">PassOut Date</th>
                        <td>{data.pdate}</td>
                        </tr>
                    </tbody>
                    </table>
                    </div>
                    <div className="d-flex justify-content-between">
                    <a className="btn btn-danger" onClick={()=>BlockStudent(data)}>
                    Reject
                    </a>
                    <button className="btn btn-info" onClick={()=>VerifyStudent(data)}>Verify</button>
                    </div>
                </div>
                </div>
            </div>
    )
}
export default VerifyCard;