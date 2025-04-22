
import { Link } from "react-router-dom"
const MessageCard=(data)=>{
    data=data.data
    return(
        <>
        <div className="row py-2">
        <div className="col-2 text-center">
        <img className="rounded-circle" src={data.profile} JK height={40} width={40}/>
        </div>
        <div className="col-10"> 
        <h6>{data.name} </h6>
        <p>{data.message} </p>
        </div>
        </div>
        </>
    )

}
export default MessageCard;