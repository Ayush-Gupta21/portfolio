import React, {useState, useEffect} from "react"
import Base from "./base"
import { updatePortfolio, getPortfolio} from "../core/helper/portfolioapis"
import {isAuthenticated} from "../auth/helper/authapis"
import { Link } from "react-router-dom"


const UpdateMyPortflio = ({match}) => {
console.log("PORTFOLIOOOOOOOOOOOOOO", match.params)
    const {token} = isAuthenticated()

    const [values, setValues] = useState({
        title: "",
        description: "",
        github: "",
        site: "",
        photo: "",
        loading: false,
        error: "",
        createdPortfolio: "",
        getaRedirect: false,
        formData: ""
    })

    const {title, description,github, site, loading, error, createdPortfolio, getaRedirect, formData} = values

    const preloadPortfolio = portfolioId => {
        getPortfolio(portfolioId).then(data => {
            if(data.error){
                setValues({...values, error: data.error})
            } else{
                setValues({
                    ...values,
                    title: data.title,
                    description: data.description,
                    github: data.github,
                    site: data.site,
                    formData: new FormData()   
                })   
            }
        })
    }
    
    useEffect(() => {
        preloadPortfolio(match.params.portfolioId);
    }, [])

    const onSubmit = (event) => {
        event.preventDefault()
        setValues({...values, error: "", loading: true})
        updatePortfolio(match.params.portfolioId, "ayush", token, formData).then(data => {
            if(data.error){
                setValues({...values, error: data.error})
            } else{
                setValues({
                    ...values,
                    title: "",
                    description: "",
                    photo: "",
                    error: false,
                    loading: false,
                    createdPortfolio: data.title,
                    getaRedirect: true
                })
            }
        })
    }

    const handleChange = name => event => {
        const value = name === "photo" ? event.target.files[0] : event.target.value;
        formData.set(name, value);
        setValues({...values, error:false, [name]: value}) 
    }

    const performRedirect = () => {
        if(getaRedirect){
            setTimeout(() => {
                 window.location.href = `/dashboard`
            }, 2000)
        }
    }
    

    const loadingMessage = () => {
        return(
            loading && (
            <div className="alert alert-info mt-3">
                <h4 className="text-white">Loading...</h4>
            </div>
        )
        )}

    const successMessage = () => (
        <div className="alert alert-success mt-3"
        style={{display: createdPortfolio ?  "" : "none"}}>
            <h4>{createdPortfolio} Updated Successfully</h4>
        </div>
    )

    const errorMessage = () => (
        <div className="alert alert-danger mt-3"
        style={{display: error ? "" : "none"}}>
            <h4>{error}</h4>
        </div>
    )

    const updatePortflioForm = () => {
        return(
            <div className="container">
                <div className="row">
                    <div className="col-md-6 offset-md-3">
                        {successMessage()}
                        {errorMessage()}
                        {loadingMessage()}
                        <form id="createPortfolioform">
                            <div className="form-group">
                                <input
                                    className="btn btn-primary btn-block"
                                    onChange={handleChange("photo")}
                                    type="file"
                                    name="photo"
                                    accept="image"
                                    placeholder="choose a file"
                                />
                            </div>
                            <div className="form-group">
                                <input 
                                type="text" 
                                className="form-control"
                                onChange={handleChange("title")}
                                name="title"
                                placeholder="Enter Title"
                                value={title}
                                />
                            </div>
                            <div className="form-group">
                                <input 
                                type="text" 
                                className="form-control"
                                onChange={handleChange("github")}
                                name="github"
                                placeholder="Github url"
                                value={github}
                                />
                            </div>
                            <div className="form-group">
                                <input 
                                type="text" 
                                className="form-control"
                                onChange={handleChange("site")}
                                name="site"
                                placeholder="Site url"
                                value={site}
                                />
                            </div>
                            <div className="form-group">
                            <textarea
                            style={{height:"200px"}}
                            name="description"
                            onChange={handleChange("description")}
                            placeholder="Enter Description"
                            className="form-control"
                            value={description}
                            />
                            </div>
                            <button onClick={onSubmit} type="submit" className="btn btn-lg btn-primary">Update</button>  
                            <Link style={{marginLeft: "270px"}} to="/dashboard" className="btn btn-sm btn-primary">Go Back</Link>           
                        </form>
                    </div>
                </div>
            </div>
        )
    }

    return(
        <div>
            <Base />
    <h2 className="text-center">Update {title}</h2>
            {updatePortflioForm()}
            {performRedirect()}
        </div>
    )
}

export default UpdateMyPortflio;