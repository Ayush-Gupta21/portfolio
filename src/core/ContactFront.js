import React, {useState} from "react"
import { createContact } from "./helper/contactapis";
import { Link } from "react-router-dom";
import insta from "../images/insta.svg"
import github from "../images/github.svg"
import facebook from "../images/facebook.svg"
import {Element} from "react-scroll"

const ContactFront = () => {

    const [values, setValues] = useState({
        name: "",
        email: "",
        message: "",
        error: false,
        loading: false,
        didRedirect: false,
        nametothank: ""
    })

    const {name, email, message, error, loading, didRedirect, nametothank} = values;

    const onSubmit = (event) => {
        event.preventDefault()
        setValues({...values, loading: true})
        createContact({name, email, message})
        .then(data => {
            if(data.error){
                setValues({...values, error: data.error, loading: false})
            } else{
                setValues({
                    ...values,
                    name: "",
                    email: "",
                    message: "",
                    error: false,
                    loading: false,
                    didRedirect: true,
                    nametothank: data.name
                })
            }
        })
    }

    const handleChange = name => event => {
        setValues({...values, error:false, [name]: event.target.value}) 
    }

    const performRedirect = () => {
        if(didRedirect){
            setTimeout(() => {
                 window.location.href = `/`
            }, 4000)
        }
    }
    

    const loadingMessage = () => {
        return(
            loading && (
            <div id="loadingmessage" className="alert alert-info mt-3">
                <h4>Please Wait...</h4>
            </div>
        )
        )}

    const successMessage = () => (
        <div id="successmessage" className="alert alert-success mt-3"
        style={{display: nametothank ?  "" : "none"}}>
            <h4>Thankyou {nametothank} for Contacting me. I will get in touch with you Soon.</h4>
        </div>
    )

    const errorMessage = () => (
        <div id="errormessage" className="alert alert-danger mt-3"
        style={{display: error ? "" : "none"}}>
            <h4>{error}</h4>
        </div>
    )

    const openGithub = () => {
        window.open("https://github.com/Ayush-Gupta21")
    }

    const openFacebook = () => {
        window.open("https://www.facebook.com/freelancer.ayush.3")
    }

    const openInsta = () => {
        window.open("https://www.instagram.com/16_a_y_u_s_h")
    }

    const contactArea = () => {
        return(
            <div id="contactcontainer"  style={{marginTop: "50px",  background : "#313D3F", padding: "0px 0px 30px 0px"}}>
            <div id="formcontainer" >
                <Element id="contact"> 
                    <h1 data-scroll className="text-white text-center">CONTACT ME</h1>
                </Element>
                
                <div id="rowinsidecontact" className="row" >
                    <div id="formborder" className="col-md-12 col-lg-7">
                        
                        <form id="form">
                        {successMessage()}
                        {errorMessage()}
                        {loadingMessage()}
                            <input data-scroll value={name} onChange={handleChange("name")} name="name" id="nameform" className="text-white" type="text" placeholder="Your Name" required/>
                            <input data-scroll value={email} onChange={handleChange("email")} name="email" id="emailform" className="text-white" required type="email" placeholder="Your Email" />
                            <textarea data-scroll value={message} onChange={handleChange("message")}  name="message" id="textarea" className="text-white" placeholder="Message" required></textarea>
                            <button data-scroll onClick={onSubmit} type="submit" id="formbutton" className="text-white" >Send Message</button>
                        </form>
                    </div>
                    <div className="col-md-12 col-lg-5">
                        <h3 data-scroll className="text-white ">Get In Touch</h3>
                        <h5 data-scroll className="text-white"><i style={{marginRight:"5px"}} className="fas fa-map-marker-alt"></i>Address</h5>
                        <p data-scroll  className="text-white">
                            H.no-6/774, Shivpuri Colony, Bhuteshwar Mandir Road, Saharanpur
                        </p>
                        <h5 data-scroll className="text-white"><i style={{marginRight:"5px"}} className="fas fa-envelope"></i>Email</h5>
                        <p data-scroll  className="text-white">
                            ayugupcse@gmail.com<br/>
                            ayush0212.cse19@chitkara.edu.in
                        </p>
                        <h5 data-scroll className="text-white"><i style={{marginRight:"5px"}} className="fas fa-phone-alt"></i>Phone</h5>
                        <p data-scroll className="text-white">
                            +(91)-9568547612
                        </p>
                    </div>
                </div>
                <div id="contacticonscontainer" className="text-center">
                    <h3  style={{marginBottom: "20px"}} className="text-white">FOLLOW ME</h3>
                    <Link  onClick={openGithub}> <img id="contacticon1" className="contacticons" src={github} alt="can't load"/></Link>
                    <Link  onClick={openFacebook}><img id="contacticon2" className="contacticons"  src={facebook} alt="can't load"/></Link>
                    <Link  onClick={openInsta}><img id="contacticon3" className="contacticons" src={insta} alt="can't load"/></Link>
                </div>
            </div>
        </div>
        )
    }

    return(
        <div>
            {contactArea()}
            {performRedirect()}
        </div>
    )
}

export default ContactFront;