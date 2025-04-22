import { useState ,useEffect} from "react"
import firebase from "firebase";

const MessageCard=(data)=>{
    const recieved=data.recieved
    data=data.data
    try{
        var PosdDate=new Date(data.creation.seconds*1000)
        PosdDate=PosdDate.getDate()+"/"+PosdDate.getMonth()+"/"+PosdDate.getFullYear()
    }catch(err)
    {
    console.log(err)
    }

    return(
        <div >
        <div className="card border-dark mb-3 col-10 col-lg-10 mt-3 m-auto">
                <div className="card-header">   
                
                <h5 className="card-title">
                From :-{data.senduname} 
                </h5>
                <h5>
                To :- {data.touname} 
                </h5>
               
                <h5>Title :- {data.title}</h5>
                </div>
                <div className="card-body text-dark">
                <p className="card-text">
                            {data.desc}
                </p>
                 </div>
                <div className="card-footer text-muted">
                {PosdDate}
                </div>
                </div>
        </div>
       
    )
}

export default MessageCard