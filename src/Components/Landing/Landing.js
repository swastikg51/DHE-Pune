import Header2 from "../constants/Header/Header2"

const Landing =()=>{
    return(
        <div>
            <Header2/>
            <div className="text-center py-5">
                <div className="row py-5">
                    <div className="col-6 m-auto">
                    <img className="img-fluid pt-4" src="https://dhepune.gov.in/images/mh1.png"></img>
                    <h3 className="pt-2">
                       DIRECTOR OF HIGHER EDUCATION 
                        </h3>
                        <h4>
                        Government of Maharashtra 
                        </h4>
                    </div>
                </div>
                <div className="container pt-5">
                    <h2 className="PT-3">Community of 1000+ Student connected from 7 Government  and   26 aided colleges to DHE .....</h2>
                </div>
            </div>
        </div>
    )
}

export default Landing;