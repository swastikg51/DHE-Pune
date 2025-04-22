import firebase from "firebase"
require('firebase/firestore')

 const CreateAdmin=(props)=> {
    console.log(props);
         const { clgname ,email, password1,error} = props;
         console.log(clgname ,email, password1)
        
       const err= firebase.auth().createUserWithEmailAndPassword(email, password1)
              .then((usercredential) => {
                const user=firebase.auth().currentUser
                user.updateProfile({displayName:"Admin"}).then(()=>{
                    console.log(user.displayName)
                   })
                firebase.firestore().collection("Admin")
                .doc(user.uid)
                .set(
                    {
                        uid:user.uid,
                        email
                    }
                )
                .then(()=>{
                    console.log("Admin added")
                    return "Admin Added.."
                })
                .catch((error)=>{
                    console.log(error.message)
                    return error.message
                })
        })
        console.log(err)
        return err;
        
    }

export default CreateAdmin;