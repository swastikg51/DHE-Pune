const VerifyCard=(data)=>{
    data=data.data
    //let pdate=new Date(data.pdate).getMonth()+'/'+new Date(data.pdate).getFullYear()
    let danger=data.isVerified==="block"?'bg-danger':null
    let success=data.isVerified==="true"?'bg-success':null
    let dark=data.isVerified==="false"?'bg-dark':null
    return(
        <div className="py-3">
            <table className="table table-bordered">
                <thead>
                    <tr>
                    <th scope="col">Sr.No</th>
                    <th scope="col">First</th>
                    <th scope="col">Last name</th>
                    <th scope="col">Middle name</th>
                    <th scope="col">Colleage</th>
                    <th scope="col">Stream</th>
                    <th scope="col">Email</th>
                    <th scope="col">Occupation</th>
                    <th scope="col">Passing Out Date</th>
                    <th scope="col">isVerified</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <th scope="row">1</th>
                    <td>{data.name}</td>
                    <td>{data.sirname}</td>
                    <td>{data.mname}</td>
                    <td>{data.colleage}</td>
                    <td>{data.stream}</td>
                    <td>{data.email}</td>
                    <td>{data.occupation}</td>
                    <td>{data.pdate}</td>
                    <td className= {`${danger} ${success} ${dark} text-white`} >{data.isVerified}</td>
                    </tr>
                </tbody>
                </table>
            </div>
    )
}

export default VerifyCard;