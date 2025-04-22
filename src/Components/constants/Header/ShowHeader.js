import Header from "./Header";
import ClgHeader from "./ClgHeader";
import AdminHeader from "./AdminHeader";

const ShowHeader=(user)=>{
    user=user.user;
    if(user==="Student"){
        return (<Header/>)
    }
    if(user==="Institute"){
        return(<ClgHeader/>)
    }
    if(user==="Admin"){
        return(<AdminHeader/>)
    }
    else{
        return(<Header/>)
    }
}
export default ShowHeader;