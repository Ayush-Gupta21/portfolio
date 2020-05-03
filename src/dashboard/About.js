import React, {useState, useEffect} from "react"
import Base from "./base"
import { getAbout, updateAbout } from "../core/helper/aboutapis"
import { isAuthenticated } from "../auth/helper/authapis"

const DashboardAbout = () => {

    const {token} = isAuthenticated()

    const [values, setValues] = useState({
        content: "",
        loading: false,
        error: "",
        success: "",
        getaRedirect: false,
    })

    const {content, loading, error, success, getaRedirect} = values;

    const aboutId = "5ea8386ad16d080d6f3f36dc"

    const preload = (aboutId) => {
        getAbout(aboutId).then(data => {
            if(data.error){
                console.log(data.error)
            } else{
                setValues({...values, content: data.content})
            }
        })
    }

    useEffect(() => {
        preload(aboutId)
    }, [])

    const onSubmit = (event) => {
        console.log(content)
        event.preventDefault()
        setValues({...values, error: "", loading: true})
        updateAbout(aboutId, "ayush", token, {content}).then(data => {
            if(data.error){
                setValues({...values, error: data.error})
            } else{
                setValues({
                    ...values,
                    content: "",
                    error: false,
                    loading: false,
                    success: true,
                    getaRedirect: true
                })
            }
        })
    }

    const handleChange = name => event => {
        setValues({...values, error:false, [name]: event.target.value}) 
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
        style={{display: success ?  "" : "none"}}>
            <h4>About Me Updated Successfully</h4>
        </div>
    )

    const errorMessage = () => (
        <div className="alert alert-danger mt-3"
        style={{display: error ? "" : "none"}}>
            <h4>{error}</h4>
        </div>
    )

    return(
        <div>
            <Base />
            <h2 className="text-center">About Me</h2>
            <div style={{width:"600px", marginTop: "50px"}} className="container">
                {loadingMessage()}
                {errorMessage()}
                {successMessage()}
                <form>
                    <div className="form-group">
                        <textarea onChange={handleChange("content")} name="content" value={content} style={{height: "300px"}} className="form-control" name="content" ></textarea>
                    </div>
                    <button onClick={onSubmit} className="btn btn-primary">Update</button>
                </form>
                {performRedirect()}
            </div>
        </div>
    )
}

export default DashboardAbout;