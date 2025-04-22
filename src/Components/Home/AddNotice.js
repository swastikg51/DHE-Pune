import firebase from "firebase";
import React,{ useState } from "react";

const AddNotice=(role)=>{
    role=role.role
    const [title, setTitle] = useState('');
    const [desc,setDesc] =useState('');
    const [link,setLink] =useState('');

    if(role==="Institute" | role==="Admin"){
        
            const ShareNotice=(e)=>{
                e.preventDefault();
                console.log(link,desc,title)
                if(role==="Admin"){
                firebase.firestore().collection(`${role}portal`)
                .doc().set({
                    adminid:firebase.auth().currentUser.uid,
                    title,
                    desc,  
                    link,
                    //clgname:'pccoer',
                })
                }
                else{
                console.log(link,desc,title)
                const uid=firebase.auth().currentUser.uid;
                firebase.firestore().collection('Institutes')
                .where("uid","==",uid)
                .get().then((snapshot) => {
                let clg = snapshot.docs.map(doc => {
                    return doc.data().clgname; 
                })
                console.log(clg)
                firebase.firestore().collection(`${role}portal`)
                .doc().set({
                    clgid:uid,
                    title,
                    desc,  
                    link,
                    clgname:clg[0],
                })
                })
                 
            }
        }
        return(
            <div className="row py-4">
            <form className="col-6 m-auto" onSubmit={ShareNotice}>
            <h5>Add Notice</h5>
                <div className="form-group">
                <label>Title</label>
                <input type="text" className="form-control" 
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                />
                </div>
                <div className="form-group">
                <label>Description</label>
                <textarea className="form-control" rows={3}
                    onChange={(e) => setDesc(e.target.value) }
                    value={desc}
                />
                </div>
                <div className="form-group">
                <label>Link</label>
                <input type="text" className="form-control" 
                    onChange={(e) =>  setLink(e.target.value) }
                    value={link}
                />
                </div>
                <button className="btn btn-info mt-2">Share</button>
            </form>
            </div>
        )
    }
    else{
        return(
            ''
        )
    }
}

export default AddNotice;