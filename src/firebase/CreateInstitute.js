import firebase from "firebase"
require('firebase/firestore')

 const CreateInstitute=(props)=> {
    console.log(props);
         const { clgname ,email, password1,error} = props;
         console.log(clgname ,email, password1)
        
       const err= firebase.auth().createUserWithEmailAndPassword(email, password1)
              .then((usercredential) => {
                const user=firebase.auth().currentUser
                user.updateProfile({displayName:"Institute"}).then(()=>{
                    console.log(user.displayName)
                   })
                firebase.firestore().collection("Institutes")
                .doc(user.uid)
                .set(
                    {
                        uid:user.uid,
                        email,
                        clgname:clgname,
                    }
                )
                .then(()=>{
                    console.log("Institute added")
                    return "Institute Added.."
                })
                .catch((error)=>{
                    console.log(error.message)
                    return error.message
                })
        })
        console.log(err)
        return err;
        
    }

export default CreateInstitute;