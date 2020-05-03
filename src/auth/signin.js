import React, {useState} from "react"
import "../styles.css"
import {signin, isAuthenticated, authenticate} from "./helper/authapis"
import {Redirect} from "react-router-dom"

const Signin = () => {

    const [values, setValues] = useState({
        email: "",
        password: "",
        loading: "",
        error: false,
        didRedirect: false
    })

    const {email, password, loading, error, didRedirect} = values;
    const {user} = isAuthenticated()

    const handleChange = name => event => {
        setValues({...values, error:false, [name]: event.target.value})
    }

    const onSubmit = event => {
        event.preventDefault()
        setValues({...values, error: false, loading: true})
        signin({email, password})
        .then(data => {
          if(data.errors || data.error){
            setValues({...values, error: data.errors || data.error, loading: false})
          } else{
            authenticate(data, () => {
              setValues({
                ...values,
                didRedirect: true
              })
            })
          }
        })
        .catch(err => console.log(err));
      }

      const performRedirect = () => {
        if(didRedirect){
          if(user){
            return <Redirect to="/dashboard" />
          }else{
            return <Redirect to="/" />
          }
        }
      }
    
      const loadingMessage = () => {
        return(
          //if loading is true then component will always be true because of the && sign.
          loading && (
            <div className="alert alert-info">
              <h2 style={{fontSize: "20px"}}>Loading...</h2>
            </div>
          )
        )
      }
    
      const errorMessage = () => {
        return(
              <div className="alert alert-danger"
              style={{display: error ? "" : "none"}}
              >
                {error}
             </div>
          )
      }
    

    const signInForm = () => {
        return(
            <div className="container " >
                <div className="row" id="dashboardsignin">
                    <div className="col-md-6 offset-md-3" >

                        <form id="signinform">
                            {loadingMessage()}
                            {errorMessage()}
                            <h1 style={{textAlign: "center"}}>Welcome Ayush</h1>
                            <div className="form-group">
                                <label>Email address</label>
                                <input 
                                type="email" 
                                className="form-control"
                                onChange={handleChange("email")}
                                name="email"
                                />
                            </div>
                            <div className="form-group">
                                <label>Password</label>
                                <input 
                                type="password" 
                                className="form-control"
                                onChange={handleChange("password")}
                                name="password"
                                />
                            </div>
                            <button onClick={onSubmit} type="submit" id="signinbutton" className="btn btn-primary">Signin</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }


    return(
        <div>
            
            
            {signInForm()}
            {performRedirect()}
        </div>
    )
}

export default Signin;