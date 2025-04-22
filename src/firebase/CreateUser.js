import firebase from "firebase"
require('firebase/firestore')

 const CreateUser=(props)=> {
    console.log(props);
         const { branch,colleage,mname, name , occupation ,pdate,sirname,email, password1 ,error,loading } = props;
         console.log(branch,colleage,mname, name , occupation ,pdate,sirname,email, password1 ,error,loading )
        
        var err= firebase.auth().createUserWithEmailAndPassword(email, password1)
              .then((usercredential) => {
                const user=firebase.auth().currentUser
                firebase.auth().currentUser.updateProfile({displayName:"Student"}).then(()=>{
                    console.log(firebase.auth().currentUser.displayName)
                   })
                console.log("Somethis is going on - ")
                 firebase.firestore().collection("students")
                 .doc(firebase.auth().currentUser.uid)
                      .set(
                          {
                              uid:firebase.auth().currentUser.uid,     
                              profile_pic: "https://firebasestorage.googleapis.com/v0/b/pccoer-web-d4e66.appspot.com/o/icons%2Fprofile.png?alt=media&token=20ea9a22-db9b-421f-a48c-8d379cf23bee",
                              email,
                              name,
                              sirname,
                              mname,
                              occupation,
                              stream:branch.label,
                              colleage:colleage.label,
                              clgid:colleage.value,
                              pdate:pdate.label,
                              isVerified:"false"
                          }
                      ).then(()=>{
                        firebase.firestore().collection("verify")
                        .doc(`${colleage.value}`)
                        .collection("students")
                        .doc(firebase.auth().currentUser.uid)
                        .set(
                            {
                                uid:firebase.auth().currentUser.uid,     
                                profile_pic: "https://firebasestorage.googleapis.com/v0/b/pccoer-web-d4e66.appspot.com/o/icons%2Fprofile.png?alt=media&token=20ea9a22-db9b-421f-a48c-8d379cf23bee",
                                email,
                                name,
                                sirname,
                                mname,
                                occupation,
                                stream:branch.label,
                                colleage:colleage.label,
                                clgid:colleage.value,
                                pdate:pdate.label,
                                isVerified:"false"
                            }
                        )
                      })
                 console.log(user)
                 user.sendEmailVerification().then(()=>{
                     console.log("Check email")
                 })
                .catch((error) => {
                console.log(error.message)
                return error.message
                }) 
                 console.log(firebase.auth().currentUser.emailVerified)
                 //return "Account Created"
                return "Please Verify your Email.."
        }).catch((error)=>{
            console.log(error.message)
            return error.message
        })
        console.log(err)
        return err
    }

export default CreateUser;