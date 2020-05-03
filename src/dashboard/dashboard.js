import React, {useState, useEffect} from "react"
import Base from "./base"
import { getAllPortfolios, deletePortfolio } from "../core/helper/portfolioapis"
import ImageHelper from "../core/helper/ImageHelper"
import { Link } from "react-router-dom"
import { isAuthenticated } from "../auth/helper/authapis"


const MyDashboard = () => {

    const {token} = isAuthenticated()

    const [portfolios, setPortfolios] = useState([])
    const [error, setError] = useState(false)
    const [success, setSuccess] = useState(false)
    
    const preloadportfolios = () => {
        getAllPortfolios().then(data => {
            if(data.error){
                console.log(data.error)
            } else{
                setPortfolios(data)
                setSuccess(false)
                setError(false)
            }
        })
    }

    useEffect(() => {
        preloadportfolios()
    }, [])

    const deleteOnSubmit = (portfolioId) => {
        deletePortfolio(portfolioId, "ayush", token)
        .then(data => {
            if(data.error){
                setError(true)
            } else{
                setSuccess(true)
                setTimeout(preloadportfolios, 2000)
                
            }
        })
    }


    const successMessage = () => {
        return(
            <div className="alert alert-success mt-3"
        style={{display: success ?  "" : "none"}}>
            <h4>Deleted Successfully</h4>
        </div>
        )
    }

    const errorMessage = () => (
        <div className="alert alert-danger mt-3"
        style={{display: error ? "" : "none"}}>
            <h4>{error}</h4>
        </div>
    )

    return(
        <div>
            <Base />
            <h2 className="text-center">Portfolio Items</h2>
            <div className="container">
            {successMessage()}
                {errorMessage()}
            <Link to="/dashboard/createportfolio" style={{marginBottom: "20px"}} className="btn btn-lg btn-primary">Create New Portfolio</Link>
                
                <div className="row">
                    {portfolios.map((portfolio, index) => {
                        return(
                            <div key={index} style={{marginBottom: "10%"}} className="team-area col-sm-12 col-md-6">
                                <div className="single-team">
                                    <ImageHelper portfolio={portfolio} />
                                    <div className="team-text">
                                        <h2>{portfolio.title}</h2>
                                        <p>{portfolio.description}</p>
                                        <Link 
                                    style={{marginLeft: "150px", marginRight: "10px"}} 
                                    to={`/dashboard/updateportfolio/${portfolio._id}`}
                                    className="btn btn-sm btn-warning">Update</Link>
                                    <button onClick={() => {deleteOnSubmit(portfolio._id)}} className="btn btn-sm btn-danger">Delete</button>

                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default MyDashboard;

